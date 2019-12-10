const auth = async (req, res, next) => {
    console.log("In auth middleware...");
    next();
}

module.exports = auth;