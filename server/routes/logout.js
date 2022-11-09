import { doc, getDoc } from "firebase/firestore";
import express from "express";
import { db } from "../fireBase/config.js";

const router = express.Router();

router.get("/", (req, res) => {
    // To jest na pewno potrzebne?
    // Tylko przejście do MainScreen, chyba że normalnie jakoś pamiętamy sesję i tu trzeba ją zakończyć...
    
    res.status(404).send("Not implemented");
});

export default router;
