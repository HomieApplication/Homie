import express, { urlencoded } from "express";

const app = express();
import indexRouter from "./routes/index.js";

const PORT = 3001;

app.use(urlencoded({ extended: false }));
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
