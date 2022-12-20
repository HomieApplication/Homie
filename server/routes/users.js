import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    // zwraca niektóre dane użytkownika o danym id
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
                const {
                    firstName,
                    lastName,
                    yearOfStudy,
                    phoneNumber,
                    birthDate,
                    gender,
                    photoURL,
                } = docSnap.data();
                res.send({
                    firstName: firstName,
                    lastName: lastName,
                    yearOfStudy: yearOfStudy,
                    phoneNumber: phoneNumber,
                    birthDate: birthDate,
                    gender: gender,
                    photoURL: photoURL,
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
    // zwraca dane obecnie zalogowanego użytkownika
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
                        message: "User not found",
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
    // dodaje nowozarejestrowanego użytkownika do tabeli users, zwraca utworzony obiekt
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
        interests: [],
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
    // aktualizuje dane obecnie zalogowanego użytkownika, zwraca zaktualizowany obiekt, jeśli brak rekordu - 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    res.status(501).send("Not implemented");
});

router.delete("/", async (req, res) => {
    // usuwa obecnie zalogowanego użytkownika z bazy danych, nic nie zwraca, jeśli brak rekordu - 404
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
            .delete()
            .then(() => {
                res.sendStatus(200);
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

router.get("/favs", (req, res) => {
    // zwraca tablicę danych polubionych ofert obecnie zalogowanego użytkownika, jeśli brak rekordu - 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    res.status(501).send("Not implemented");
});

router.put("/favs", (req, res) => {
    // aktualizuje tablicę polubionych ofert obecnie zalogowanego użytkownika, zwraca zaktualizowany obiekt, jeśli brak rekordu - 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    res.status(501).send("Not implemented");
});

router.get("/my-offers", (req, res) => {
    // zwraca tablicę danych opublikowanych przez obecnie zalogowanego użytkownika ofert, jeśli brak rekordu - 404
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    res.status(501).send("Not implemented");
});

export default router;
