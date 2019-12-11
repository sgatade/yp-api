const Provider = require("../models/provider");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

    try {
        
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        console.log("Auth Provider with ID : " + decoded);

        const provider = await Provider.findOne( {_id: decoded, 'tokens.token': token} );
        if(!provider) {
            throw new Error("Unable to find user, please log in again!");
        }   

        // Success, add token and provider to the req object
        req.token = token;
        req.provider = provider;

        next();

    } catch (error) {
        return res.status(404).send({
            message: error.message
        });
    } 
}

module.exports = auth;