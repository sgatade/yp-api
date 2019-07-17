/**
 * Subsriber Model <- User Model
 * @SG on 2019-07-17, 21:37
 */

// Libraries
const mongoose = require("mongoose");
const User = require("./user");

// Schema
const subscriberSchema = new mongoose.Schema({
    nick: {
        type: String,
        minlength: 5,
        maxlength: 20
    },
    mobile: {
        type: String,
        minlength: 9,
        maxlength: 15
    }
});

// Extend
const Subscriber = User.discriminator('Subscriber', subscriberSchema);

// Module Exports
module.exports = mongoose.model('Subscriber');