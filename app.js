import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use("/api/auth", authRouter);
// app.use("/api/waters", waterRouter);
// app.use("/api/user", userRouter);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from Heroku!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
