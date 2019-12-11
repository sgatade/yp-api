/**
 * Base user model
 * @SG on 2019-07-17, 21:36
*/

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// Return JWT
providerSchema.methods.getAuthToken = async function () {
    const provider = this;

    // Create a new token
    const token = jwt.sign( {_id: provider._id}, process.env.JWT_KEY );
    provider.tokens = provider.tokens.concat({ token });

    // Save user & token
    await provider.save();

    return token;
};

// Find provider
providerSchema.statics.findProvider = async function (email, password) {

    const provider = await Provider.findOne( {email} );
    if(!provider) {
        throw new Error("Unable to login! Bad email or password!!!");
    }

    // see if hashed password matches
    const isMatch = await bcrypt.compare(password, provider.password);
    if(!isMatch) {
        throw new Error("Unable to login! Bad email or password!!!");
    }

    return provider;
};

// Model
const Provider = mongoose.model('Provider', providerSchema);

// Module Exports
module.exports = Provider;
