// MDB Mongoose
const mongoose = require("mongoose");
const Log = require("../utils/logger");

// const url = "mongodb://127.0.0.1:27017/yp-api-dev";
const url = "mongodb://" + process.env.dbhost + ":" + process.env.dbport + "/" + process.env.dbname;

// connect to MDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
      Log.s("Connected to MongoDB...");
  })
  .catch(e => {
    Log.e("" + e);
  });
