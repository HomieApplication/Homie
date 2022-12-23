import express from "express";
import { db } from "../firebase/config.js";
import { Timestamp } from "firebase-admin/firestore";

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
 * @property {string} localization
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.get("/", async (req, res) => {
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
                res.status(500).send({
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
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message,
            cause: "Server error",
        });
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
 * @param {string} req.body.localization
 * @param {Array<string>} req.body.photoURLArray
 * @param {string} req.body.title
 *
 * @returns {Offer} Added offer
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {string} localization
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.post("/", async (req, res) => {
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
        creationDate: Timestamp.now(),
    };

    try {
        const offersRef = db.collection("offers");
        await offersRef
            .add(docData)
            .then(() => {
                docData.creationDate = docData.creationDate.toDate();
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
 * @property {string} localization
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.get("/:id", async (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }

    try {
        const id = req.params.id;
        const offerSnapshot = await db.collection("offers").doc(id).get();

        if (offerSnapshot.exists) {
            res.send(offerSnapshot.data());
        } else {
            res.status(404).send({
                cause: "Offer not found",
                message: `Offer with ID ${id} does not exist`,
            });
        }
    } catch (error) {
        res.status(500).send({
            cause: "Server error",
            message: error.message,
        });
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
 * @param {string} req.body.localization
 * @param {Array<string>} req.body.photoURLArray
 * @param {string} req.body.title
 *
 * @returns {Offer} Added offer
 * @typedef {Object} Offer
 * @property {string} offerId
 * @property {string} userId
 * @property {string} localType
 * @property {string} description
 * @property {string} localization
 * @property {Array<string>} photoURLArray
 * @property {string} title
 * @property {Date} creationDate
 */
router.put("/:id", (req, res) => {
    const user = req["currentUser"];
    if (!user) {
        res.status(403).send({
            message: "User not logged in!",
        });
    }
    const id = req.params.id;

    res.status(501).send("Not implemented");
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
router.delete("/:id", (req, res) => {
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
