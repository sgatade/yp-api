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

    try {
        const subscriber = new Subscriber(req.body);
        await subscriber.save();
        res.send(subscriber);

    } catch (error) {
        res.status(500).send({
            message: "Failed to create Subscriber",
            error
        });
    }
});

// Get Subscriber Profile
router.get("/subscribers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const subscriber = await Subscriber.findById(id);
        res.send(subscriber);
    
    } catch (error) {
        res.status(500).send({
            message: "Failed to fetch Subscriber with id " + id,
            error
        });
    }
});

// Get all subscriers
router.get("/subscribers/", async (req, res) => {

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

// Update subscriber details
router.patch("/subscribers/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const subs = await Subscriber.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        res.send(subs);

    } catch (error) {
        res.status(500).send({
            message: "Failed to update Subscriber with id " + id,
            error
        });
    }
});

// Delete a subscriber
router.delete("/subscribers/:id", async (req, res) => {
    
    const id = req.params.id;

    try {
        const subs = await Subscriber.findByIdAndDelete(id);
        if(!subs)
            res.status(404).send({
                message: "Subscriber not found with id " + id
            });

        res.send(subs);

    } catch (error) {
        res.status(500).send({
            message: "Failed to remove Subscriber with id " + id,
            error
        });
    }
})

// Module Exports
module.exports = router;
