import express from "express";
import { db } from "../firebase/config.js";
import { Timestamp, FieldValue } from "firebase-admin/firestore";

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
 * @property {string} localization - for now: later array [lat, lng]
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
 * If user is not logged in, sends 403 status code
 * If there is an error, sends 500 status code
 * If everything is ok, sends 200 status and requested data
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {string} req.body.localType
 * @param {string} req.body.description
 * @param {string} req.body.localization - for now: later array [lat, lng]
 * @param {Array<string>} req.body.photoURLArray
 * @param {string} req.body.title
 *
 * @returns {Offer} Added offer
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {string} localization - for now: later array [lat, lng]
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.post("/", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({ message: "User not logged in!" });
    }

    // TODO: Add validation, localization to geopoint
    const docData = {
        userId: user.uid,
        localType: req.body.localType,
        description: req.body.description,
        localization: req.body.localization,
        photoURLArray: req.body.photoURLArray || [],
        title: req.body.title || "",
        creationDate: Timestamp.now(),
    };

    try {
        const offersRef = db.collection("offers");
        const docSnap = await offersRef
            .add(docData)
            .catch((error) => res.status(500).send({ message: error.message }));

        await offersRef
            .doc(docSnap.id)
            .update({ offerId: docSnap.id })
            .catch((error) => res.status(500).send({ message: error.message }));

        await db
            .collection("users")
            .doc(user.uid)
            .update({
                myOffers: FieldValue.arrayUnion(docSnap.id),
            })
            .catch((error) => res.status(500).send({ message: error.message }));

        res.send({
            ...docData,
            offerId: docSnap.id,
            creationDate: docData.creationDate.toDate(),
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
 * @property {string} localization - for now: later array [lat, lng]
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
 * @param {string} req.body.localization - for now: later array [lat, lng]
 * @param {Array<string>} req.body.photoURLArray
 * @param {string} req.body.title
 *
 * @returns {Offer} Added offer
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {string} localization - for now: later array [lat, lng]
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
            .then((docSnap) => {
                res.send({
                    ...docSnap.data(),
                    offerId: docSnap.id,
                    creationDate: docData.creationDate.toDate(),
                });
            })
            .catch((error) => res.status(500).send({ message: error.message }));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/**
 * Deletes offer with given id from offers table
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
