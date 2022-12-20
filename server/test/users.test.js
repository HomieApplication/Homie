import request from "supertest";
import app from "../app.js";
import { auth } from "../firebase/testconfig.js";

const idToken = await auth.currentUser.getIdToken();

const testUserData = {
    firstName: "Test",
    lastName: "User",
    age: 20,
    gender: "male",
    yearOfStudy: 1,
    photoURL: "https://example.com",
    phoneNumber: "123456789",
    description: "This is a test user",
    myOffers: [],
    favs: [],
    interests: [],
};

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
            ...testUserData,
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
            ...testUserData,
        });

        const getResponse = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body).toEqual({
            userId: auth.currentUser.uid,
            ...testUserData,
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
