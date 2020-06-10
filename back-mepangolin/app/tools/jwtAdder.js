const jwt = require("jsonwebtoken");
const environment = require("../../environment.js");

/**
 * Add a jwt token to the response
 * @param res
 * @param data
 */
const addJwtToken = (res, data) =>{
    const token = jwt.sign(data, environment.JWT_SECRET, {expiresIn: 3600});
    res.set('_token', token);
} ;

module.exports = addJwtToken;
