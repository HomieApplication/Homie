import express, { urlencoded } from "express";
import cors from "cors";
import indexRouter from "./routes/index.js";

const app = express();

app.use(
    cors({
        origin: "*", // temp
        methods: ["GET", "PUT", "POST", "DELETE"],
    })
);
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api", indexRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
