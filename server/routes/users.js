import express from "express";
import { db } from "../firebase/config.js";
import { FieldValue } from "firebase-admin/firestore";
import { async } from "@firebase/util";

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
 * @property {string} university
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
                    const userData = docSnap.data();
                    res.send({
                        userId: req.params.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        yearOfStudy: userData.yearOfStudy,
                        phoneNumber: userData.phoneNumber,
                        age: userData.birthDate
                            ? calculateAge(userData.birthDate.toDate())
                            : userData.age,
                        gender: userData.gender,
                        photoURL: userData.photoURL,
                        description: userData.description,
                        interests: userData.interests,
                        university: userData.university,
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
 * @property {string} university
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
 * @param {string} req.body.university
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
 * @property {string} university
 */
router.post("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    // TODO: Add validation
    const userData = {
        ...req.body,
        userId: user.uid,
        birthDate: req.body.birthDate
            ? new Date(req.body.birthDate)
            : undefined,
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
 * @param {string} req.body.university
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
 * @property {string} university
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

        const docSnap = await db
            .collection("users")
            .doc(user.uid)
            .get()
            .catch((error) => res.status(500).send({ message: error.message }));
        const userData = docSnap.data();

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
 *
 * @returns {Array<Offer>}
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {string} localization [latitute, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.get("/favs", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        const favs = await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((docSnap) => docSnap.data())
            .then((userData) => userData.favs)
            .catch((error) => {
                res.status(500).send({ message: error.message });
            });

        if (!favs) {
            res.status(404).send({ message: "User not found!" });
        }

        await Promise.all(
            favs.map((offerId) =>
                db
                    .collection("offers")
                    .doc(offerId)
                    .get()
                    .then((docSnap) => docSnap.data())
                    .then((offerData) => ({
                        ...offerData,
                        offerId,
                        creationDate: offerData.creationDate?.toDate(),
                    }))
                    .catch((error) => {
                        res.status(500).send({ message: error.message });
                    })
            )
        ).then((favsData) => res.send(favsData));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
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
 *
 * @returns {Array<Offer>}
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {Array<number} localization [latitude, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.post("/favs", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .update({
                favs: FieldValue.arrayUnion(req.body.offerId),
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        const userSnapshot = await db
            .collection("users")
            .doc(user.uid)
            .get()
            .catch((error) => res.status(500).send({ message: error.message }));

        let favsData = [];
        for (const offerId of userSnapshot.data().favs) {
            const offerSnapshot = await db
                .collection("offers")
                .doc(offerId)
                .get()
                .catch((error) =>
                    res.status(500).send({ message: error.message })
                );
            const offerData = offerSnapshot.data();
            favsData = [...favsData, offerData];
        }

        res.send(favsData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
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
 */
router.delete("/favs", (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }
    try {
        db.collection("users")
            .update({
                favs: FieldValue.arrayRemove(req.body.offerId),
            })
            .then(() => res.sendStatus(200))
            .catch((error) => res.status(500).send({ message: error.message }));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
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
 *
 * @returns {Array<Offer>}
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {Array<number} localization [latitude, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.get("/my-offers", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        const offers = await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((docSnap) => docSnap.data())
            .then((userData) => userData.myOffers);

        if (!offers) {
            res.status(404).send({ message: "User not found!" });
        }

        await Promise.all(
            offers.map((offerId) =>
                db
                    .collection("offers")
                    .get()
                    .then((docSnap) => docSnap.data())
                    .then((offerData) => ({
                        ...offerData,
                        offerId,
                        creationDate: offerData.creationDate?.toDate(),
                    }))
                    .catch((error) => {
                        res.status(500).send({ message: error.message });
                    })
            )
        ).then((offerData) => res.send(offerData));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Calculates user's age from their birthDate
 * @param {Date} birthDate
 * @returns {number} age - integer
 */
function calculateAge(birthDate) {
    const ageDifMs = Date.now() - birthDate;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default router;
