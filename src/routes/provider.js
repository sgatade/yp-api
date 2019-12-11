/**
 * Provider Routes
 * @SG on 2019-07-17, 22:03
 */

// Libraries
const express = require("express");

 // Local
const Provider = require("../models/provider");
const auth = require("../middleware/auth");

// Router
const router = new express.Router();

// Create Provider
router.post("/providers", auth, async (req, res) => {

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

// Login provider
router.post("/providers/login", async (req, res) => {

   try {
      const provider = await Provider.findProvider(req.body.email, req.body.password);
      const token = await provider.getAuthToken();
   
      res.send( { provider: provider.getPublicProfile(), token} );
         
   } catch (error) {
      res.status(400).send({
         message: error.message
      });
   }
});

// Logout provider
router.post("/providers/logout", auth, async (req, res) => {

   try {

      console.log("[LOGOUT] Auth Provider", req.provider);
      req.provider.tokens = req.provider.tokens.filter( (token) => {
         return token.token !== req.token; 
      });
      
      await req.provider.save();

      res.send();

   } catch (error) {
      res.status(500).send({
         message: error.message
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
         message: error.message
      });
   };
});


// Module Exports
module.exports = router;