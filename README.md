# goit-node-rest-api

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB_HOST =
      "mongodb+srv://nastiabaydina:IIeZOmh8yRawjA9R@contactbook.xeqlg3m.mongodb.net/?retryWrites=true&w=majority&appName=ContactBook";
    await mongoose.connect(DB_HOST);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
