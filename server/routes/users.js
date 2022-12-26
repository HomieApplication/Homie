import express from "express";
import { db } from "../firebase/config.js";

const router = express.Router();

/**
 * Gets part of user data with given id from users table, sends it in response
 * If user is not logged in, sends 403 status code
 * If user is not in database, sends 404 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends user data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.params.id
 *
 * @returns {UserData}
 * @typedef {Object} UserData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} yearOfStudy
 * @property {string} phoneNumber
 * @property {number} age
 * @property {number} gender
 * @property {string} photoURL
 */
router.get("/:id", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        await db
            .collection("users")
            .doc(req.params.id)
            .get()
            .then((docSnap) => {
                if (docSnap.exists) {
                    const {
                        firstName,
                        lastName,
                        yearOfStudy,
                        phoneNumber,
                        birthDate,
                        gender,
                        photoURL,
                        age,
                    } = docSnap.data();
                    res.send({
                        firstName: firstName,
                        lastName: lastName,
                        yearOfStudy: yearOfStudy,
                        phoneNumber: phoneNumber,
                        age: birthDate ? calculateAge(birthDate) : age,
                        gender: gender,
                        photoURL: photoURL,
                    });
                } else {
                    res.status(404).send({ message: "User not found!" });
                }
            })
            .catch((error) => res.status(500).send({ message: error.message }));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Gets currently logged in user data from users table, sends it in response
 * If user is not logged in, sends 403 status code
 * If user is not in database, sends 404 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends user data
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @returns {UserData}
 * @typedef {Object} UserData
 * @property {string} userId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} yearOfStudy
 * @property {string} phoneNumber
 * @property {number} age
 * @property {Date} birthDate
 * @property {string} gender
 * @property {string} photoURL
 * @property {string} phoneNumber
 * @property {string} description
 * @property {Array<string>} myOffers
 * @property {Array<string>} favs
 * @property {Array<string>} interests
 */
router.get("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((docSnap) => {
                if (docSnap.exists) {
                    let userData = docSnap.data();
                    userData.birthDate = userData.birthDate?.toDate();
                    userData.age = userData.birthDate
                        ? calculateAge(userData.birthDate)
                        : userData.age;
                    res.send(userData);
                } else {
                    res.status(404).send({ message: "User not found" });
                }
            })
            .catch((error) => res.status(500).send({ message: error.message }));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Adds new user to users table, sends created object in response
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends created user data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.firstName
 * @param {string} req.body.lastName
 * @param {Date} req.body.birthDate
 * @param {string} req.body.yearOfStudy
 * @param {string} req.body.phoneNumber
 * @param {string} req.body.gender
 * @param {string} req.body.photoURL
 * @param {string} req.body.description
 * @param {Array<string>} req.body.interests
 *
 * @returns {UserData}
 * @typedef {Object} UserData
 * @property {string} userId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} yearOfStudy
 * @property {string} phoneNumber
 * @property {number} age
 * @property {Date} birthDate
 * @property {string} gender
 * @property {string} photoURL
 * @property {string} phoneNumber
 * @property {string} description
 * @property {Array<string>} myOffers
 * @property {Array<string>} favs
 * @property {Array<string>} interests
 */
router.post("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    // TODO: Add validation
    const userData = {
        userId: user.uid,
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        birthDate: req.body.birthDate
            ? new Date(req.body.birthDate)
            : new Date(2000, 1, 1),
        gender: req.body.gender || "Unknown",
        yearOfStudy: req.body.yearOfStudy || "Not a student",
        photoURL: req.body.photoURL || "No photo",
        phoneNumber: req.body.phoneNumber || "No phone number",
        description: req.body.description || "No description",
        myOffers: [],
        favs: [],
        interests: req.body.interests || [],
    };

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .set(userData)
            .then(() => {
                res.send({
                    ...userData,
                    age: calculateAge(userData.birthDate),
                });
            })
            .catch((error) => res.status(500).send({ message: error.message }));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Updates currently logged in user's data in users table, sends updated object in response
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends updated user data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.firstName
 * @param {string} req.body.lastName
 * @param {Date} req.body.birthDate
 * @param {string} req.body.yearOfStudy
 * @param {string} req.body.phoneNumber
 * @param {string} req.body.gender
 * @param {string} req.body.photoURL
 * @param {string} req.body.description
 * @param {Array<string>} req.body.interests
 *
 * @returns {UserData}
 * @typedef {Object} UserData
 * @property {string} userId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} yearOfStudy
 * @property {string} phoneNumber
 * @property {number} age
 * @property {Date} birthDate
 * @property {string} gender
 * @property {string} photoURL
 * @property {string} phoneNumber
 * @property {string} description
 * @property {Array<string>} myOffers
 * @property {Array<string>} favs
 * @property {Array<string>} interests
 */
router.put("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .update({
                ...req.body,
                birthDate: req.body.birthDate
                    ? new Date(req.body.birthDate)
                    : req.body.birthDate,
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        const docRef = await db
            .collection("users")
            .doc(user.uid)
            .get()
            .catch((error) => res.status(500).send({ message: error.message }));
        const userData = docRef.data();

        res.send({
            ...userData,
            birthDate: userData.birthDate.toDate(),
            age: userData.birthDate
                ? calculateAge(userData.birthDate.toDate())
                : userData.age,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Deletes currently logged in user from users table, sends 200 status code
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * @param {express.Request} req
 * @param {express.Response} res
 */
router.delete("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .delete()
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => res.status(500).send({ message: error.message }));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Gets currently logged in user's liked offers(favs array)
 * from users table and their data from offers table, sends them in response
 * If user is not logged in, sends 403 status code
 * If user is not in database, sends 404 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends user's offers
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.offerId - id of offer to add to favs
 * ...
 */
router.get("/favs", (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    res.status(501).send("Not implemented");
});

/**
 * Adds offer to currently logged in user's favs array in users table,
 * sends updated object in response
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends updated user data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.offerId - id of offer to add to favs
 * ...
 */
router.post("/favs", (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    res.status(501).send("Not implemented");
});

/**
 * Deletes offer from currently logged in user's favs array in users table,
 * sends updated object in response
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends updated user data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.offerId - id of offer to delete from favs
 * ...
 */
router.delete("/favs", (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    res.status(501).send("Not implemented");
});

/**
 * Gets currently logged in user's offers from users table and their data from offers table,
 * sends them in response
 * If user is not logged in, sends 403 status code
 * If user is not in database, sends 404 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends user's offers
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.offerId - id of offer to delete from favs
 * ...
 *
 * @returns {Offer[]} - array of offers
 * @typedef {Object} Offer
 * @property {string} id
 * @property {string} title
 */
router.get("/my-offers", (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    res.status(501).send("Not implemented");
});

function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default router;
