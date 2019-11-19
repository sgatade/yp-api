/**
 * Base user model
 * @SG on 2019-07-17, 21:36
*/

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    tokens: [{
        token: String
    }]
}, {
    timestamps: true
});

// PRE SAVE processing
// a. Hashing Password
providerSchema.pre("save", async function (next) {

    const provider = this;

    if(provider.isModified("password")) {
        /**
         * TODO: Change the hashing value to be picked up from env?
         * @SG on 2019-11-19, 15:32
         */
        provider.password = await bcrypt.hash(provider.password, 8);
    }

    next();
});

// Model
const Provider = mongoose.model('Provider', providerSchema);

// Module Exports
module.exports = Provider;
