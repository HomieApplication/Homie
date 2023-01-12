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

describe("GET /api/users/my-offers", () => {
    let testOfferId;

    beforeAll(async () => {
        await request(app)
            .post("/api/users")
            .set("Authorization", "Bearer " + idToken)
            .send(testUserData);

        const postOfferRes = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);
        testOfferId = postOfferRes.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get("/api/users/my-offers");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status if authorized", async () => {
        const response = await request(app)
            .get("/api/users/my-offers")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
    });

    test("should return an array of offers", async () => {
        const response = await request(app)
            .get("/api/users/my-offers")
            .set("Authorization", "Bearer " + idToken);
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
