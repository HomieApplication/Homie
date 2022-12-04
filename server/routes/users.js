import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    try {
        await db
            .collection("users")
            .doc(req.params.id)
            .get()
            .then((docSnap) => {
                const { firstName, lastName, yearOfStudy } = docSnap.data();
                res.send({
                    firstName: firstName,
                    lastName: lastName,
                    yearOfStudy: yearOfStudy,
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

router.get("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((docSnap) => {
                if (docSnap.exists) {
                    res.send(docSnap.data());
                } else {
                    res.status(404).send({
                        cause: "User not found",
                        message: error.message,
                    });
                }
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

router.post("/", async (req, res) => {
    // dodaje nowego użytkownika do tabeli users, zwraca utworzony obiekt
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    const userData = {
        userId: user.uid,
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
            .doc(user.uid)
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

    res.status(501).send("Not implemented");
});

router.delete("/:id", (req, res) => {
    // usuwa pojedynczy rekord z tabeli users, nic nie zwraca, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

// To poniżej opcjonalnie

router.get("/:id/favs", (req, res) => {
    // zwraca tablicę id polubionych ofert z tabeli users, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.put("/:id/favs", (req, res) => {
    // zmienia tablicę favs z tabeli users dla danego id, zwraca zaktualizowany obiekt, jeśli brak rekordu - 404
    const title = req.body.name;
    // itd...
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

// Te dwie już całkiem dodatkowe

router.post("/:id/favs", (req, res) => {
    // dodaje nową tablicę favs do tabeli users dla danego id, zwraca utworzoną tablicę
    const title = req.body.name;
    // itd...
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.delete("/:id/favs", (req, res) => {
    // usuwa pojedyncze pole favs z tabeli users dla danego id, nic nie zwraca, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

export default router;
