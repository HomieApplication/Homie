import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", async (req, res) => {
    // zwraca dane 50 ofert
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    try {
        const querySnapshot = await db
            .collection("offers")
            .get(db)
            .catch((error) => {
                res.status(404).send({
                    message: error.message,
                    cause: "Server error",
                });
            });

        const data = new Array();
        querySnapshot.forEach((doc) => {
            data.push({
                offerId: doc.id,
                ...doc.data(),
            });
        });
        res.send(data.slice((end = 50)));
    } catch (error) {
        res.status(500).send({
            message: error.message,
            cause: "Server error",
        });
    }
});

router.post("/", async (req, res) => {
    // dodaje nową ofertę do tabeli offers, zwraca utworzony obiekt
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    const docData = {
        userId: user.uid,
        localType: req.body.localType,
        description: req.body.description,
        localization: req.body.localization,
        photoURLArray: req.body.photoURLArray || [],
        title: req.body.title || "",
    };

    try {
        const offersRef = db.collection("offers");
        await offersRef
            .add(docData)
            .then(() => {
                res.send(docData);
            })
            .catch((error) =>
                res.status(500).send({
                    message: error.message,
                    cause: "Server error",
                })
            );
    } catch (error) {
        res.status(500).send({
            message: error.message,
            cause: "Server error",
        });
    }
});

router.get("/:id", (req, res) => {
    // zwraca ofertę o danym id z tabeli offers, jeśli brak rekordu 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.put("/:id", (req, res) => {
    // aktualizuje ofertę o danym id w tabeli offers, zwraca zaktualizowany obiekt, jeśli brak rekordu 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }
    const id = req.params.id;
    const title = req.body.title;
    // itd...

    res.status(501).send("Not implemented");
});

router.delete("/:id", (req, res) => {
    // usuwa ofertę o danym id z tabeli offers, nic nie zwraca, jeśli brak rekordu 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

export default router;
