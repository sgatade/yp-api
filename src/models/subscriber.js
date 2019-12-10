/**
 * Subscriber model
 * @SG on 2019-07-17, 21:36
 */

const mongoose = require("mongoose");
const validator = require("validator");

const Status = Object.freeze({
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    BARRED: 'barred',
    REMOVED: 'removed'
});

// Schema
const subscriberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid!");
                }
            }
        },
        status: {
            type: String,
            enum: Object.values(Status)
        },
        mobile: {
            type: String,
            maxlength: 20
        },
        password: {
            type: String,
            minlength: 3
        },
        devices: [
            {
                deviceId: {
                    type: String
                },
                added: {
                    type: Date,
                    default: Date.now
                },
                lastUsed: {
                    type: Date
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

Object.assign(subscriberSchema.statics, {Status});

// Model
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Module Exports
module.exports = Subscriber;
