import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", (req, res) => {
    // zwraca kolumnę offer_id z tabeli offers, ew. wszystkie kolumny ale tylko dla kilku ofert
    const doc = doc(db, "offers", "offer-id");
    getDoc(doc)
        .then((result) => {
            if (result.exists()) {
                res.send(result.data);
            } else {
                res.status(404).send({ message: "Not Found" });
            }
        })
        .catch((error) => {
            res.status(500).send({
                errorCode: error.code,
                message: error.message,
            });
        });
});

router.post("/", (req, res) => {
    // dodaje pojedynczy rekord o kolejnym id do tabeli offers, zwraca utworzony obiekt
});

router.get("/:id", (req, res) => {
    // zwraca pojedynczy rekord z tabeli offers, jeśli brak rekordu 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.post("/:id", (req, res) => {
    // dodaje pojedynczy rekord do tabeli offers, zwraca utworzony obiekt
    const id = req.params.id;

    const docData = {
        offerId: id,
        userId: req.body.userId,
        title: req.body.title,
        // ..
    };

    console.log(docData);

    const record = doc(db, "offers", id);

    setDoc(record, docData)
        .then(() => {
            res.send(docData);
        })
        .catch((error) => {
            res.status(500).send({
                errorCode: error.code,
                message: error.message,
            });
        });
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
