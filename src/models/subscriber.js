/**
 * Subsriber Model
 * @SG on 2019-07-17, 21:37
 */

// Libraries
const mongoose = require("mongoose");

// Schema
const subscriberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      minlength: 7,
      maxlength: 50,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      }
    },
    password: {
      type: String,
      minlength: 8
    },
    devices: [{
        uid: {
          type: String
        },
        make: {
            type: String
        },
    }],
    mobile: {
      type: String,
      minlength: 9,
      maxlength: 15
    }
  },
  {
    timestamps: true
  }
);

// Extend
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Module Exports
module.exports = Subscriber;
