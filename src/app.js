/**
 * App.js
 * @SG on 2019-07-17, 21:35
 */

// Local Requires
const express = require("express");
const userRouter = require("./routes/user");

// Start DB
require("./db/mongoose");

// App
const app = express();

// Use JSON
app.use(express.json());

// Routes
app.use(userRouter);

// Exports
module.exports = app;
