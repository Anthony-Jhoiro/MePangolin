import Pangolin from "../schemas/Pangolin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../../environment.js";

class AuthenticationController {

    register (req, res) {
        // TODO : Check request valid

        // Check Unique Name
        Pangolin.findOne({name: req.body.name})
            .then(optionalPangolin => {
                // If the pangolin name is already taken
                if (optionalPangolin) {
                    res.status(401).json({ error: "Le nom d'utilisateur est déjà utilisé" });
                    return;
                }

                // Create the pangolin
                const pangolin = new Pangolin({
                    name: req.body.name,
                    password: bcrypt.hashSync(req.body.password, 8),
                    age: req.body.age,
                    family: req.body.family,
                    race: req.body.race,
                    food: req.body.food,
                    friends: []
                });
                // Save it in the database
                pangolin.save((err, pangolin) => {
                    if (err) res.status(500).send({error: err});

                    // Create token (valid for 1h)
                    const token = jwt.sign({id: pangolin._id}, JWT_SECRET, {expiresIn: 3600});
                    res.set('_token', token);

                    res.json({success: "Votre compte a bien été créé, ami Pangolin"});

                });
            });
        return res;
    }

    login (req, res) {
        // TODO : Check request valid

        // Check Unique Name
        Pangolin.findOne({name: req.body.login})
            .then(pangolin => {
                // Check if the username exists
                if (!pangolin) {
                    res.status(401).json({ error: "Le nom d'utilisateur est incorrecte" });
                    return;
                }

                // Check the password
                if (!bcrypt.compareSync(req.body.password, pangolin.password)) {
                    res.status(401).json({ error: "Le mot de passe est incorrecte" });
                    return;
                }

                const token = jwt.sign({id: pangolin._id}, JWT_SECRET, {expiresIn: 3600});
                res.set('_token', token);
                res.json({"success": "Vous êtes connecté !"});

            });
        return res;
    }

    logout (req, res) {
        console.warn("To Implement");
    }

    addToken(response, data) {

    }

}

const authenticationController = new AuthenticationController();

export default authenticationController;
