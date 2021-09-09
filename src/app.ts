import express, { Application, NextFunction, Response, Request } from "express";
import { api } from "./api";
import { initializeDatabase } from "./database/database";
import cors from 'cors';
import bodyParser from 'body-parser';

require('dotenv').config();

initializeDatabase();

const app: Application = express();

app.use(cors({
  origin: (o, cb) => {
    if (!o || process.env.ORIGINS && process.env.ORIGINS.split(' ').includes(o)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid origin header'));
    }
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.status(200).send('OK');
});

app.use("/api", api);

// 404 Handler
app.get('*', (req: Request, res: Response) => res.status(404).send('Page Not found 404'));

// Error Handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  res.status((error as any).code < 600 ? (error as any).code : 500).send({ errors: error.message || (error as any).error || "Internal Server Error 500" })
});

export = app;