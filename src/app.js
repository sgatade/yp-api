/**
 * App.js
 * @SG on 2019-07-17, 21:35
 */

// Local Requires
const express = require("express");

// Start DB
require("./db/mongoose");

// App
const app = express();

// Use JSON
app.use(express.json());

// Exports
module.exports = app;
