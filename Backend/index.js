const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");
require("./models/user");

app.use(express.json());

// Port
const PORT = 5000;

// Routes
app.use(require("./routes/auth"));

mongoose.connect(MONGODB_URI, () => {
  console.log("MongoDB was connected successfully");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
