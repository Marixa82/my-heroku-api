import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express"; 
import { authRouter } from "./routes/auth-router.js";
import fs from 'fs';
import path from 'path';

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve('./swagger.json'), 'utf-8'));


const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRouter);
// app.use("/api/waters", waterRouter);
// app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("Hello from Heroku!");
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log('Swagger docs are available at /api-docs');

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;

