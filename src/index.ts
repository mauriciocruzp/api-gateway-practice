import express, { Application } from "express";
import morgan from "morgan";

import dotenv from "dotenv";
import { Signale } from "signale";
import proxy from "express-http-proxy";

const app: Application = express();
const signale = new Signale();

dotenv.config();

app.use(morgan("dev"));
const PORT = process.env.PORT || 3000;
const GATEWAY = process.env.SERVICE_NAME;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.use(`${API_PREFIX}/orders`, proxy("http://localhost:3001"));
app.use(`${API_PREFIX}/products`, proxy("http://localhost:3002"));

app.listen(PORT, () => {
    signale.success(`Server ${GATEWAY} running on http://localhost:${PORT}`);
});
