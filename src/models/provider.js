/**
 * Base user model
 * @SG on 2019-07-17, 21:36
*/

const mongoose = require("mongoose");
const validator = require("validator");

// Schema
const providerSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

// Model
const Provider = mongoose.model('Provider', providerSchema);

// Module Exports
module.exports = Provider;
