import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", (req, res) => {
    // zwraca kolumnę offer_id z tabeli offers, ew. wszystkie kolumny ale tylko dla kilku ofert

    res.status(501).send("Not implemented");
});

router.get("/:id", (req, res) => {
    // zwraca pojedynczy rekord z tabeli offers, jeśli brak rekordu 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.post("/:id", (req, res) => {
    // dodaje pojedynczy rekord do tabeli offers, zwraca utworzony obiekt
    const title = req.body.title;
    // itd...
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.put("/:id", (req, res) => {
    // zmienia pojedynczy rekord z tabeli offers, zwraca zaktualizowany obiekt, jeśli brak rekordu 404
    const title = req.body.title;
    // itd...
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.delete("/:id", (req, res) => {
    // usuwa pojedynczy rekord z tabeli offers, nic nie zwraca, jeśli brak rekordu 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

export default router;
