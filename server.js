import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();



const { MONGO_URI, PORT} = process.env

console.log("MONGO_URI:", MONGO_URI);

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined.");
  process.exit(1);  
}
mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 4000, () => {
      console.log('Database connection successful');
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//             app.listen(PORT || 4000, () => {
//                 console.log(`Database connection successful`)
//             })
//         })
//   .catch((err) => console.error('MongoDB connection error:', err));

// const uri = process.env.MONGODB_URI;
// mongoose.connect(MONGO_URI)
//     .then(() => {
//         app.listen(PORT || 4000, () => {
//             console.log(`Database connection successful`)
//         })
//     })
//     .catch(error => {
//         console.log(error.message);
//         process.exit(1);
//     })
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
