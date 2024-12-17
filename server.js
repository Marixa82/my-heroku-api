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


