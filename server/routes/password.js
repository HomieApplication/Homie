import { doc, setDoc, getDoc } from "firebase/firestore";
import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/forgot-password", (req, res) => {
    // Tu nie wiem co...
    res.status(501).send("Empty");
});

router.put("/reset-password", (req, res) => {
    // Tego nie da się zastąpić PUT api/users?
    res.status(501).send("Empty");
});

export default router;
