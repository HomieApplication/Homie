import { doc, setDoc } from "firebase/firestore";
import express from "express";
import { db } from "../fireBase/config.js";

const router = express.Router();

// To też może nie potrzebne. To samo, co POST api/users
router.post("/", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    // Tworzy nowego użytkownika

    res.status(404).send("Not implemented");
});

export default router;
