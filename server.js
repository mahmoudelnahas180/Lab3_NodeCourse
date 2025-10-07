const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/userRoutes");
const { errorHandler } = require("./MiddleWare/errorHanler");
require("dotenv").config();
const app = express();
app.use(express.json());

// Router
app.use("/users", router);
app.use(errorHandler);
// Connect to MongoDB
const dbConn = process.env.MONGO_URL;

mongoose
  .connect(dbConn)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start server
const PORT = process.env.port;
console.log(typeof PORT);
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
