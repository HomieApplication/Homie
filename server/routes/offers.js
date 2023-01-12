import express from "express";
import { db } from "../firebase/config.js";
import { FieldValue } from "firebase-admin/firestore";

const router = express.Router();

/**
 * Gets all offers from offers table, send their data in response
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends 200 status and requested data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.params.id
 *
 * @returns {Array<Offer>} Array of offers
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {Array<number>} localization [latitude, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.get("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    try {
        const querySnapshot = await db
            .collection("offers")
            .get(db)
            .catch((error) => {
                res.status(500).send({ message: error.message });
            });

        const data = new Array();
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                offerId: doc.id,
                creationDate: doc.data().creationDate?.toDate(),
            });
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Adds new offer to offers table, sends it in response
 * Adds offerId to user's myOffers array
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends 200 status and requested data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.localType
 * @param {string} req.body.description
 * @param {Array<number>} req.body.localization
 * @param {Array<string>} req.body.photoURLArray
 * @param {string} req.body.title
 *
 * @returns {Offer} Added offer
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {Array<number>} localization [latitude, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.post("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    // TODO: Add validation
    const docData = {
        userId: user.uid,
        ...req.body,
        photoURLArray: req.body.photoURLArray || [],
        creationDate: new Date(),
    };

    try {
        const offersRef = db.collection("offers");
        const docRef = await offersRef
            .add(docData)
            .catch((error) => res.status(500).send({ message: error.message }));

        await offersRef
            .doc(docRef.id)
            .update({ offerId: docRef.id })
            .catch((error) => res.status(500).send({ message: error.message }));

        await db
            .collection("users")
            .doc(user.uid)
            .update({
                myOffers: FieldValue.arrayUnion(docRef.id),
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        const docSnap = await offersRef
            .doc(docRef.id)
            .get()
            .catch((error) => res.status(500).send({ message: error.message }));

        res.send({
            ...docSnap.data(),
            creationDate: docSnap.data().creationDate?.toDate(),
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Gets an offer with given id from offers table, sends it in response
 * If user is not logged in, sends 403 status code
 * If offer is not in database, sends 404 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends 200 status and requested data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.params.id
 *
 * @returns {Offer} Offer with given id
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {Array<number>} localization [latitude, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.get("/:id", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }
    const offerId = req.params.id;

    try {
        const offerSnapshot = await db.collection("offers").doc(offerId).get();
        if (offerSnapshot.exists) {
            res.send({
                ...offerSnapshot.data(),
                offerId: offerSnapshot.id,
                creationDate: offerSnapshot.data().creationDate?.toDate(),
            });
        } else {
            res.status(404).send({
                message: `Offer with ID ${offerId} does not exist`,
            });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Updates offer with given id in offers table, sends it in response
 * If user is not logged in, sends 403 status code
 * If the offer is not in current user's offers, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends 200 status and requested data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.params.id
 * @param {string} req.body.localType
 * @param {string} req.body.description
 * @param {Array<number>} req.body.localization
 * @param {Array<string>} req.body.photoURLArray
 * @param {string} req.body.title
 *
 * @returns {Offer} Added offer
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {Array<number>} localization [latitude, longitude]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.put("/:id", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    const offerId = req.params.id;

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((docSnap) => {
                if (!docSnap.data().myOffers.includes(offerId)) {
                    res.status(403).send({
                        message: "User does not have access to this offer",
                    });
                }
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        await db
            .collection("offers")
            .doc(offerId)
            .update(req.body)
            .catch((error) => res.status(500).send({ message: error.message }));

        const docSnap = await db
            .collection("offers")
            .doc(offerId)
            .get()
            .catch((error) => res.status(500).send({ message: error.message }));

        res.send({
            ...docSnap.data(),
            offerId: offerId,
            creationDate: docSnap.data().creationDate?.toDate(),
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Deletes offer with given id from offers table
 * Removes offer from user's myOffers array
 * If user is not logged in, sends 403 status code
 * If the offer is not in current user's offers, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends 200 status and requested data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.params.id
 */
router.delete("/:id", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }
    const offerId = req.params.id;

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((docSnap) => {
                if (!docSnap.data().myOffers.includes(offerId)) {
                    res.status(403).send({
                        message: "User does not have access to this offer",
                    });
                }
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        await db
            .collection("users")
            .doc(user.uid)
            .update({
                myOffers: FieldValue.arrayRemove(offerId),
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        await db
            .collection("offers")
            .doc(offerId)
            .delete()
            .catch((error) => res.status(500).send({ message: error.message }));

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default router;
