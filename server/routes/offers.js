import { doc, setDoc, getDoc, deleteDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import express from "express";
import { collection ,addDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "offers"));

    const data = new Array();
    querySnapshot.forEach((doc) => {
        data.push({
            offerId: doc.id,
            ...doc.data()
        }) 
    });
    res.send(data);
});

router.post("/", async (req, res) => {
    // dodaje pojedynczy rekord o kolejnym id do tabeli offers, zwraca utworzony obiekt

    const docData = {
        userId: req.body.userId,
        localType: req.body.localType,
        description: req.body.description,
        localization: req.body.localization,
        // ..
    };

    const docRef = await addDoc(collection(db, "offers"), docData);
    console.log("Document written with ID: ", docRef.id);
    res.send(docData)
  
    
});

router.get("/:id", (req, res) => {
    // zwraca pojedynczy rekord z tabeli offers, jeśli brak rekordu 404
    const id = req.params.id;

    res.status(501).send("Not implemented");
});

router.post("/:id", (req, res) => {
    // dodaje pojedynczy rekord do tabeli offers, zwraca utworzony obiekt
    const id = req.params.id;

    const docData = {
        offerId: id,
        userId: req.body.userId,
        title: req.body.title,
        // ..
    };

    console.log(docData);

    const record = doc(db, "offers", id);

    setDoc(record, docData)
        .then(() => {
            res.send(docData);
        })
        .catch((error) => {
            res.status(500).send({
                errorCode: error.code,
                message: error.message,
            });
        });
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
