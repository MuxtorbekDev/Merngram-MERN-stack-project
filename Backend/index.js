const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");

// Port
const PORT = 5000;

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose.connect(MONGODB_URI, () => {
  console.log("MongoDB was connected successfully");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// 8jWRuQtBCw7uEWb0
