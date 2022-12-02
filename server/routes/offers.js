import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    try {
        const querySnapshot = await db.collection("offers").get(db);

        const data = new Array();
        querySnapshot.forEach((doc) => {
            data.push({
                offerId: doc.id,
                ...doc.data(),
            });
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message,
            cause: "Server error",
        });
    }
});

router.post("/", async (req, res) => {
    // dodaje pojedynczy rekord o kolejnym id do tabeli offers, zwraca utworzony obiekt
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
        photoURL: req.body.photoURL || "",
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
    // zwraca pojedynczy rekord z tabeli offers, jeśli brak rekordu 404
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
