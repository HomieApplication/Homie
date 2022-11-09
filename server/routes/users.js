import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    // zwraca kolumnę user_id z tabeli users, ew. wszystkie kolumny ale tylko dla kilku użytkowników

    res.status(404).send("Not implemented");
});

router.get("/:id", (req, res) => {
    // zwraca pojedynczy rekord z tabeli users, jeśli brak rekordu - 404
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

router.post("/:id", (req, res) => {
    // dodaje nowego użytkownika do tabeli users, zwraca utworzony obiekt
    const title = req.body.name;
    // itd...
    const id = req.params.id;

    res.status(404).send("Not implemented");
});

router.put("/:id", (req, res) => {
    // zmienia pojedynczy rekord z tabeli users, zwraca zaktualizowany obiekt, jeśli brak rekordu - 404
    const title = req.body.name;
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
