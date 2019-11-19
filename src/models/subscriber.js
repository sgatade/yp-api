/**
 * Base user model
 * @SG on 2019-07-17, 21:36
*/

const mongoose = require("mongoose");
const validator = require("validator");

// Schema
const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 50,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    devices: [
        {
            deviceId: String,
            added: new Date(),
        }
    ]
}, {
    timestamps: true
});

// Model
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Module Exports
module.exports = Subscriber;
