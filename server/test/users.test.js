import request from "supertest";
import app from "../app.js";
import { auth } from "../firebase/testconfig.js";

describe("GET /api/users", () => {
    test("should return 403 status if not authorized", async () => {
        const response = await request(app).get("/api/users");
        expect(response.statusCode).toBe(403);
    });

    test("should return 200 status", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Authorization", "Bearer " + await auth.currentUser.getIdToken());
        expect(response.statusCode).toBe(200);
    });
});
