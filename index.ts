import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Router/router";
const Port = 2002;

const app: Application = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://localhost/Walletdb";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Api ready for consumption",
  });
});

mongoose.connect(url).then(() => {
  console.log("Db is on too");
});

app.use("/api", router);

app.listen(Port, () => {
  console.log("Server is on");
});
