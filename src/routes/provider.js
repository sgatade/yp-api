/**
 * User Routes : Common routes for Subscriber, Provider and Affiliate
 * @SG on 2019-07-17, 22:03
 */

// Libraries
const express = require("express");

 // Local
const Provider = require("../models/provider");
const Subscriber = require("../models/subscriber");

// Router
const router = new express.Router();

// Get all subscriers
router.get("/providers/subscribers/", async (req, res) => {

   // Set default query limit value
   let queryLimit = 0;
   if(req.query.limit) {
       queryLimit = parseInt(req.query.limit);
   } 

   // Set default query skip value
   let querySkip = 0;
   if(req.query.skip) {
       querySkip = parseInt(req.query.skip);
   }

   console.log("Query Limit : " + queryLimit + " & Skip : " + querySkip);

   try {
       
       const subs = await Subscriber.find().limit(queryLimit).skip(querySkip);
       res.send(subs);

   } catch (error) {
       res.status(500).send({
           message: "Failed to list all Subscribers",
           error
       });
   }
});

// Module Exports
module.exports = router;