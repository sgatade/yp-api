// App JS
const express = require("express");

// App
const app = express();

// Use JSON
app.use(express.json());

// Exports
module.exports = app;
