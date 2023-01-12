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

const testOfferData1 = {
    title: "test",
    description: "test",
    localization: "test",
};

const testOfferData2 = {
    title: "test2",
    description: "test2",
    localization: "test2",
    photoURLArray: ["test2"],
};

let testOfferId1;
let testOfferId2;

beforeAll(async () => {
    await request(app)
        .post("/api/users")
        .set("Authorization", "Bearer " + idToken)
        .send(testUserData);

    const postResponse1 = await request(app)
        .post("/api/offers")
        .set("Authorization", "Bearer " + idToken)
        .send(testOfferData1);

    const postResponse2 = await request(app)
        .post("/api/offers")
        .set("Authorization", "Bearer " + idToken)
        .send(testOfferData2);

    testOfferId1 = postResponse1.body.offerId;
    testOfferId2 = postResponse2.body.offerId;
});

describe("POST /api/users/favs", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).post("/api/users/favs");
        expect(response.statusCode).toBe(403);
    });

    // test("should return 400 status if offerId is not provided", async () => {
    //     const response = await request(app)
    //         .post("/api/users/favs")
    //         .set("Authorization", "Bearer " + idToken)
    //         .send({ offerId: "" });
    //     expect(response.statusCode).toBe(400);
    // });

    test("should return 200 status if user posted", async () => {
        const response = await request(app)
            .post("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: testOfferId1 });
        expect(response.statusCode).toBe(200);
    });

    test("should add offer to user's favs and return favs offers' data", async () => {
        const response = await request(app)
            .post("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: testOfferId2 });
        expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(testOfferData2)])
        );

        const getResponse = await request(app)
            .get("/api/users/")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body.favs).toEqual(
            expect.arrayContaining([testOfferId2])
        );
    });
});

describe("GET /api/users/favs", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get("/api/users/favs");
        expect(response.statusCode).toBe(403);
    });

    test("should return array of offers", async () => {
        const response = await request(app)
            .get("/api/users/favs")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(testOfferData1),
                expect.objectContaining(testOfferData2),
            ])
        );
    });
});

describe("DELETE /api/users/favs", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).delete("/api/users/favs");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status", async () => {
        const response = await request(app)
            .delete("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: testOfferId1 });
        expect(response.statusCode).toBe(200);
    });

    test("should remove offer from user's favs", async () => {
        await request(app)
            .delete("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: testOfferId2 });

        const getResponse = await request(app)
            .get("/api/users/")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body.favs).not.toContain(testOfferId2);
    });
});

afterAll(async () => {
    await request(app)
        .delete("/api/offers/" + testOfferId1)
        .set("Authorization", "Bearer " + idToken);
    await request(app)
        .delete("/api/offers/" + testOfferId2)
        .set("Authorization", "Bearer " + idToken);
});
