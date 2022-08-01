import express from "express";
import { errors } from "celebrate";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import questions from "./routes/questions.js";
import authRoute from "./routes/auth.js";

// Connect Db
mongoose.connect('mongodb+srv://dombreaker36:ssemugabimartinofsda@martcluster.grlhs.mongodb.net/test'
)

const app = express();

app.use(bodyParser.json());

// MiddleWares
app.use("/api/user", authRoute);
app.use("/questions", questions);

app.get("/", (req, res) => {
  res.send("Welcome to Our Home Page");
});

app.use(errors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on Port ${PORT}`));

export default app;
