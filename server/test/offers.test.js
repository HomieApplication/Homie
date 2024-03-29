import request from "supertest";
import app from "../app.js";
import { auth } from "../firebase/testconfig.js";

const idToken = await auth.currentUser.getIdToken();

const testOfferData = {
    localType: "test",
    description: "test",
    localization: [1, 1],
    photoURLArray: ["test"],
    title: "test",
};

describe("POST /api/offers", () => {
    let testOfferId;

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).post("/api/offers");
        expect(response.statusCode).toBe(403);
    });

    // test("should return 400 status if offer data is not provided", async () => {
    //     const response = await request(app)
    //         .post("/api/offers")
    //         .set("Authorization", "Bearer " + idToken)
    //         .send({});
    // });

    test("should create new offer and return it", async () => {
        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);
        expect(postResponse.statusCode).toBe(200);
        expect(postResponse.body).toEqual({
            userId: auth.currentUser.uid,
            ...testOfferData,
            creationDate: postResponse.body.creationDate,
            offerId: postResponse.body.offerId,
        });

        testOfferId = postResponse.body.offerId;

        const getIdResponse = await request(app)
            .get(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
        expect(getIdResponse.statusCode).toBe(200);

        const usersGetResponse = await request(app)
            .get(`/api/users`)
            .set("Authorization", "Bearer " + idToken);
        expect(usersGetResponse.body.myOffers).toContain(testOfferId);
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
    });
});

describe("GET /api/offers/:id", () => {
    let testOfferId;

    beforeAll(async () => {
        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        testOfferId = postResponse.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get(`/api/offers/${testOfferId}`);
        expect(response.statusCode).toBe(403);
    });

    test("should return 404 status if offer not found", async () => {
        const response = await request(app)
            .get(`/api/offers/123`)
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(404);
    });

    test("should return offer object", async () => {
        const response = await request(app)
            .get(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            userId: auth.currentUser.uid,
            ...testOfferData,
            creationDate: response.body.creationDate,
            offerId: response.body.offerId,
        });
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
    });
});

describe("PUT /api/offers/:id", () => {
    let testOfferId;

    beforeAll(async () => {
        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        testOfferId = postResponse.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).put(`/api/offers/${testOfferId}`);
        expect(response.statusCode).toBe(403);
    });

    test("should update offer with given id", async () => {
        const updatedData = {
            localType: "test2",
            description: "test2",
            title: "test2",
        };

        const expectedResponse = {
            userId: auth.currentUser.uid,
            ...testOfferData,
            localType: "test2",
            description: "test2",
            title: "test2",
        };

        const putResponse = await request(app)
            .put(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken)
            .send(updatedData);
        expect(putResponse.statusCode).toBe(200);
        expect(putResponse.body).toEqual({
            ...expectedResponse,
            creationDate: putResponse.body.creationDate,
            offerId: putResponse.body.offerId,
        });

        const getIdResponse = await request(app)
            .get(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
        expect(getIdResponse.body).toEqual({
            ...expectedResponse,
            creationDate: putResponse.body.creationDate,
            offerId: putResponse.body.offerId,
        });
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
    });
});

describe("GET /api/offers", () => {
    let testOfferId;

    beforeAll(async () => {
        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        testOfferId = postResponse.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get("/api/offers");
        expect(response.statusCode).toBe(403);
    });

    test("should return array of offers", async () => {
        const response = await request(app)
            .get("/api/offers")
            .set("Authorization", "Bearer " + idToken);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty("offerId");
            expect(response.body[0]).toHaveProperty("userId");
            expect(response.body[0]).toHaveProperty("description");
            expect(response.body[0]).toHaveProperty("localization");
            expect(response.body[0]).toHaveProperty("title");
            expect(response.body[0]).toHaveProperty("creationDate");
            // expect(response.body[0]).toHaveProperty("localType");
        }
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
    });
});

describe("DELETE /api/offers/:id", () => {
    let testOfferId;

    beforeAll(async () => {
        const postResponse = await request(app)
            .post("/api/offers")
            .set("Authorization", "Bearer " + idToken)
            .send(testOfferData);

        testOfferId = postResponse.body.offerId;
    });

    test("should return 403 status if not authorized", async () => {
        const response = await request(app).delete(
            `/api/offers/${testOfferId}`
        );
        expect(response.statusCode).toBe(403);
    });

    test("should delete offer with given id", async () => {
        const deleteResponse = await request(app)
            .delete(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
        expect(deleteResponse.statusCode).toBe(200);

        const getIdResponse = await request(app)
            .get(`/api/offers/${testOfferId}`)
            .set("Authorization", "Bearer " + idToken);
        expect(getIdResponse.statusCode).toBe(404);

        const usersGetReponse = await request(app)
            .get(`/api/users`)
            .set("Authorization", "Bearer " + idToken);
        expect(usersGetReponse.body.myOffers).not.toContain(testOfferId);
    });
});
