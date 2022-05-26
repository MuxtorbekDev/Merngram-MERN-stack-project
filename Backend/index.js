const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");
require("./models/user");
require("./models/post");

app.use(express.json());

// Port
const PORT = 5000;

// Routes
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

mongoose.connect(MONGODB_URI, () => {
  console.log("MongoDB was connected successfully");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
