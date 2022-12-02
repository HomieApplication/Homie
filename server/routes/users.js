import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(404).send("Not implemented");
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db
            .collection("users")
            .doc(id)
            .then((docSnap) => {
                if (docSnap.exists()) res.send(docSnap.data());
                else
                    res.status(404).send({
                        cause: "User not found",
                    });
            })
            .catch((error) =>
                res.status(500).send({
                    cause: "Server Error",
                    message: error.message,
                })
            );
    } catch (error) {
        res.status(500).send({
            cause: "Server Error",
            message: error.message,
        });
    }
});

router.post("/:id", async (req, res) => {
    // dodaje nowego użytkownika do tabeli users, zwraca utworzony obiekt
    // itd...
    const id = req.params.id;
    const userData = {
        userId: id,
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        age: req.body.age || 0,
        gender: req.body.gender || "Unknown",
        yearOfStudy: req.body.yearOfStudy || "Not a student",
        photoURL: req.body.photoURL || "No photo",
        phoneNumber: req.body.phoneNumber || "No phone number",
        description: req.body.description || "No description",
        myOffers: [],
        favs: [],
    };

    try {
        await db
            .collection("users")
            .doc(id)
            .set(userData)
            .then(() => {
                res.send(userData);
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

router.put("/", (req, res) => {
    // zmienia pojedynczy rekord z tabeli users, zwraca zaktualizowany obiekt, jeśli brak rekordu - 404
    const name = req.body.name;
    // itd...
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

router.delete("/:id", (req, res) => {
    // usuwa pojedynczy rekord z tabeli users, nic nie zwraca, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

// To poniżej opcjonalnie

router.get("/:id/favs", (req, res) => {
    // zwraca tablicę id polubionych ofert z tabeli users, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

router.put("/:id/favs", (req, res) => {
    // zmienia tablicę favs z tabeli users dla danego id, zwraca zaktualizowany obiekt, jeśli brak rekordu - 404
    const title = req.body.name;
    // itd...
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

// Te dwie już całkiem dodatkowe

router.post("/:id/favs", (req, res) => {
    // dodaje nową tablicę favs do tabeli users dla danego id, zwraca utworzoną tablicę
    const title = req.body.name;
    // itd...
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

router.delete("/:id/favs", (req, res) => {
    // usuwa pojedyncze pole favs z tabeli users dla danego id, nic nie zwraca, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

export default router;
