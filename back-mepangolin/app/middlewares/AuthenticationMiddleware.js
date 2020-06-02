import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../environment.js";
import addJwtToken from "../tools/jwtAdder.js";

/**
 * Middleware to control that the pangolin is connected
 * @param req
 * @param res
 * @param next
 * @return {any}
 * @constructor
 */
const AuthenticationMiddleware = (req, res, next) => {
    // Get the token
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({error: "Vous n'êtes pas connecté"});

    // Verify the token and add a new one
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({error: "Vous n'êtes pas autorisé à acceder à cette ressource"});

        req.userId = decoded.id;
        addJwtToken(res, {id: decoded.id});
        next();
    })
};

export default AuthenticationMiddleware;
