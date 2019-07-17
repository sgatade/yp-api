// Index

// Local requires
const app = require("./app");
const Log = require("./utils/logger");

Log.i("Starting Yuja REST API server...");

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    Log.s("Server started on port 3000");
})

