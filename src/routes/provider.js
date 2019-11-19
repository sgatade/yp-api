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

// Create Provider
router.post("/providers", async (req, res) => {

   try {
      
      /**
       * TODO: Check if provider with the same name already exists
       * @SG on 2019-11-19, 15:20
       */

      const prov = new Provider(req.body);
      await prov.save();
      res.send(prov)

   } catch (error) {
      res.status(500).send({
         message: "Failed to create Provider",
         error
      });
   }
});

// Update provider
router.patch("/providers/:id", async (req, res) => {
   
   const updates = Object.keys(req.body);
   const allowedUpdates = ["name", "email", "password"];
   const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

   if(!isValidUpdate) {
      return res.status(400).send({
         message: "This operation is now allowed"
      });
   }

   const id = req.params.id;
   try {
      // Switching to find, update and save to enable Pre-Save hook to Hash Password in the Provider Model
      // @SG on 2019-11-19, 16:01
      const prov = await Provider.findById(id);
      updates.forEach((update) => prov[update] = req.body[update]);
      await prov.save();

      if(!prov) {
         return res.status(400).send({
            message: "Failed to update Subscriber details"
         });
      }

      res.send(prov);

   } catch (error) {
      res.status(500).send({
         message: "Failed to update Subscriber details",
         error
      });
   };
});

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