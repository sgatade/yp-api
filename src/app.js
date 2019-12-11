/**
 * App.js
 * @SG on 2019-07-17, 21:35
 */
const express = require("express");

// Local Requires
const supplierRouter = require("./routes/provider");
const subscriberRouter = require("./routes/subscriber");
const auth = require("./middleware/auth");

// Start DB
require("./db/mongoose");

// App
const app = express();

// Use JSON
app.use(express.json());

// Routes
app.use(supplierRouter);
app.use(subscriberRouter);

// Exports
module.exports = app;
