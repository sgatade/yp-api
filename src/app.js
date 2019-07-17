/**
 * App.js
 * @SG on 2019-07-17, 21:35
 */

// Local Requires
const express = require("express");
const supplierRouter = require("./routes/supplier");

// Start DB
require("./db/mongoose");

// App
const app = express();

// Use JSON
app.use(express.json());

// Routes
app.use(supplierRouter);

// Exports
module.exports = app;
