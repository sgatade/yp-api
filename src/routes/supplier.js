/**
 * User Routes : Common routes for Subscriber, Provider and Affiliate
 * @SG on 2019-07-17, 22:03
 */

 // Libraries
 const express = require("express");

 // Local
 const Supplier = require("../models/supplier");

 // Router
 const router = new express.Router();

 router.get("/", (req, res) => {
    res.send("Supplier GET...");
 });

 // Module Exports
 module.exports = router;