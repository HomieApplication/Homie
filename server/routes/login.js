import { doc, getDoc } from "firebase/firestore";
import express from "express";
import { db } from "../fireBase/config.js";

const router = express.Router();

router.get("/", (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    // weryfikacja loginu i hasła

    res.status(404).send("Not implemented");
});

export default router;
