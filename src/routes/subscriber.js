/**
 * Subscriber Routes
 * @SG on 2019-07-17, 22:02
 */

// Libraries
const express = require("express");

// Local
const Subscriber = require("../models/subscriber");

// Route
const router = new express.Router();

// Create Subscriber
router.post("/subscribers", async (req, res) => {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.send(subscriber);
});



// Module Exports
module.exports = router;
