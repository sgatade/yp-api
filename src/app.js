// App JS
const express = require("express");

// Start DB
require("./db/mongoose");

// App
const app = express();

// Use JSON
app.use(express.json());

// Exports
module.exports = app;
