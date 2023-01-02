import request from "supertest";
import app from "../app.js";
import { auth } from "../firebase/testconfig.js";

const idToken = await auth.currentUser.getIdToken();

const testUserData = {
    firstName: "Test",
    lastName: "User",
    birthDate: new Date(2000, 1, 1),
    gender: "male",
    yearOfStudy: 1,
    photoURL: "https://example.com",
    phoneNumber: "123456789",
    description: "This is a test user",
    myOffers: [],
    favs: [],
    interests: [],
};

describe("GET /api/users/:id", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get(
            "/api/users/" + auth.currentUser.uid
        );
        expect(response.statusCode).toBe(403);
    });

    test("should return 404 status if user not found", async () => {
        const response = await request(app)
            .get("/api/users/" + "123")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(404);
    });

    test("should return 200 status if user posted", async () => {
        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);

        const response = await request(app)
            .get("/api/users/" + auth.currentUser.uid)
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
    });

    test("should respond with user data", async () => {
        const response = await request(app)
            .get("/api/users/" + auth.currentUser.uid)
            .set("Authorization", "Bearer " + idToken)
            .set("Accept", "application/json");
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body).toEqual({
            userId: auth.currentUser.uid,
            firstName: testUserData.firstName,
            lastName: testUserData.lastName,
            yearOfStudy: testUserData.yearOfStudy,
            phoneNumber: testUserData.phoneNumber,
            age: calculateAge(testUserData.birthDate),
            gender: testUserData.gender,
            photoURL: testUserData.photoURL,
            description: testUserData.description,
            interests: testUserData.interests,
        });
    });
});

describe("GET /api/users", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get("/api/users");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status if user posted", async () => {
        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);

        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
    });

    test("should respond with user data", async function () {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .set("Accept", "application/json");
        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
        expect(response.body).toEqual({
            userId: auth.currentUser.uid,
            age: calculateAge(testUserData.birthDate),
            ...testUserData,
            birthDate: testUserData.birthDate.toISOString(),
        });
    });

    test("should respond with 404 status if user not found", async () => {
        await request(app)
            .delete("/api/users")
            .set("Authorization", "Bearer " + idToken);

        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .set("Accept", "application/json");
        expect(response.statusCode).toBe(404);

        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);
    });
});

describe("POST /api/users", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).post("/api/users");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status", async () => {
        const response = await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
    });

    test("should add logged in user to database and respond with new user data", async () => {
        const postResponse = await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);
        expect(postResponse.body).toEqual({
            userId: auth.currentUser.uid,
            age: calculateAge(testUserData.birthDate),
            ...testUserData,
            birthDate: testUserData.birthDate.toISOString(),
        });

        const getResponse = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body).toEqual({
            userId: auth.currentUser.uid,
            age: calculateAge(testUserData.birthDate),
            ...testUserData,
            birthDate: testUserData.birthDate.toISOString(),
        });
    });
});

describe("DELETE /api/users", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).delete("/api/users");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status", async () => {
        const response = await request(app)
            .delete("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
    });

    test("should delete user", async () => {
        const deleteResponse = await request(app)
            .delete("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(deleteResponse.body).toEqual({});

        const getResponse = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.statusCode).toBe(404);

        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);
    });
});

describe("PUT /api/users", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).put("/api/users");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status", async () => {
        const response = await request(app)
            .put("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
    });

    test("should update user", async () => {
        const putResponse = await request(app)
            .put("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send({
                firstName: "Updated",
                lastName: "User",
                birthDate: new Date(2000, 1, 1),
            });
        expect(putResponse.body.firstName).toEqual("Updated");
        expect(putResponse.body.lastName).toEqual("User");
        expect(putResponse.body.birthDate).toEqual(
            new Date(2000, 1, 1).toISOString()
        );

        const getResponse = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body.firstName).toEqual("Updated");
        expect(getResponse.body.lastName).toEqual("User");
        expect(getResponse.body.birthDate).toEqual(
            new Date(2000, 1, 1).toISOString()
        );

        await request(app)
            .put("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send({
                firstName: "Test",
                lastName: "User",
                birthDate: new Date(2000, 1, 1),
            });
    });
});

function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
