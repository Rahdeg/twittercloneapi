require("dotenv").config();
import { config } from "./config/config";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers";
const Errormiddleware = require("./middlewares/errormiddleware");

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

// const server = http.createServer(app);

app.listen(8080, () => {
  console.log("server running on http://localhost:8080/");
});

const DB_URI = config.dbUrI;

mongoose.Promise = Promise;
mongoose.connect(DB_URI, { dbName: "Twitter" });
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());

app.all("*", (req, res) => {
  res.send({
    status: false,
    messsage: "Oops! you've hit an invalid route.",
  });
});

app.use(Errormiddleware);
