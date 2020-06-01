import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../environment.js";

const AuthenticationMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({error: "Vous n'êtes pas connecté"});

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({error: "Vous n'êtes pas autorisé à acceder à cette ressource"});
        req.userId = decoded.id;
        next();
    })
};

export default AuthenticationMiddleware;
