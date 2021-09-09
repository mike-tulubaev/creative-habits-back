import { questionRouter } from "./questions/router";

const express = require('express');
const app = express();

app.use("/questions", questionRouter);

export const api = app;