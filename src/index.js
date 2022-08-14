import express from "express";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import questions from "./routes/questions.js";
import authRoute from "./routes/auth.js";
import dotenv from "dotenv/config";
// Connect Db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connected to DB");
});

const app = express();

app.use(bodyParser.json());

// MiddleWares
app.use("/auth/user", authRoute);
app.use("/questions", questions);

app.get("/", (req, res) => {
  res.send("Welcome to Our Home Page");
});

app.use(errors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on Port ${PORT}`));

export default app;
