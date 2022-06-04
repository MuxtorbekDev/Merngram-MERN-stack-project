const express = require("express");
const app = express();
const login = require("./middleware/login");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./keys");
const Post = require("./models/post");
const User = require("./models/user");

// app.use(User);
// app.use(Post);

app.use(express.json());

// Port
const PORT = 5000;

// Routes
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

mongoose.connect(MONGODB_URI, () => {
  console.log("MongoDB was connected successfully");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
