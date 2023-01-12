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

const testOfferData = {
    title: "test",
    description: "test",
    localization: "test",
};

describe("POST /api/users/favs", () => {
    let testOfferId;

    beforeAll(async () => {
        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);

        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        testOfferId = postResponse.body.offerId;
    });

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

    test("should add offer to user's favs and return favs offers' data", async () => {
        const response = await request(app)
            .post("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: testOfferId });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(testOfferData)])
        );

        const getResponse = await request(app)
            .get("/api/users/")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body.favs).toEqual(
            expect.arrayContaining([testOfferId])
        );
    });

    afterAll(async () => {
        await request(app)
            .delete("/api/offers/" + testOfferId)
            .set("Authorization", "Bearer " + idToken);
    });
});

describe("GET /api/users/favs", () => {
    let testOfferId;

    beforeAll(async () => {
        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);

        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        await request(app)
            .post("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: postResponse.body.offerId });

        testOfferId = postResponse.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get("/api/users/favs");
        expect(response.statusCode).toBe(403);
    });

    test("should return array of offers", async () => {
        const response = await request(app)
            .get("/api/users/favs")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining(testOfferData)])
        );
    });

    afterAll(async () => {
        await request(app)
            .delete("/api/offers/" + testOfferId)
            .set("Authorization", "Bearer " + idToken);
    });
});

describe("DELETE /api/users/favs", () => {
    let testOfferId;

    beforeAll(async () => {
        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);

        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        testOfferId = postResponse.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).delete("/api/users/favs");
        expect(response.statusCode).toBe(403);
    });

    test("should remove offer from user's favs", async () => {
        const deleteResponse = await request(app)
            .delete("/api/users/favs")
            .set("Authorization", "Bearer " + idToken)
            .send({ offerId: testOfferId });
        expect(deleteResponse.statusCode).toBe(200);

        const getResponse = await request(app)
            .get("/api/users/")
            .set("Authorization", "Bearer " + idToken);
        expect(getResponse.body.favs).not.toContain(testOfferId);
    });
});
