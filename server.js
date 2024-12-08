import mongoose from "mongoose";
import app from "./app.js";

const { MONGO_URI, PORT} = process.env

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT || 4000, () => {
            console.log(`Database connection successful`)
        })
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    })
// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("Error connecting to MongoDB", err));

// // Routes
// app.get("/", (req, res) => {
//     res.send("Welcome to the Express server!");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
