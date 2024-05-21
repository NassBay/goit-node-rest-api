// app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
import HttpError from "./helpers/HttpError.js";

const app = express();
dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.DB_URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
run().catch(console.dir);
mongoose.set("strict", true);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
  } else {
    next(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running.");
});
