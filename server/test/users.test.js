import supertest from "supertest";
import app from "../app.js";

describe("GET /api/users", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await supertest(app).get("/api/users");
        expect(response.statusCode).toBe(403);
    });
});
