import * as express from "express";
import * as questionRouter from "./questions/router";
const app = express();

app.use("/questions", questionRouter);

export = app;