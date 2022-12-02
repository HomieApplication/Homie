import express, { urlencoded } from "express";
import cors from "cors";
import offersRouter from "./routes/offers.js";
import usersRouter from "./routes/users.js";
import { decodeIdToken } from "./middlewares/tokenAuth.js";

const app = express();

app.use(
    cors({
        origin: "*", // temp
        methods: ["GET", "PUT", "POST", "DELETE"],
    })
);
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(decodeIdToken);

app.use("/api/offers", offersRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
