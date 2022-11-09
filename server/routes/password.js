import express from "express";
const router = express.Router();

router.get("/forgot-password", (req, res) => {
    // Tu nie wiem co...
    res.status(404).send("Empty");
});

router.put("/reset-password", (req, res) => {
    // Tego nie da się zastąpić PUT api/users?
    res.status(404).send("Empty");
});

export default router;
