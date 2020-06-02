import Pangolin from "../schemas/Pangolin.js";
import bcrypt from 'bcryptjs';
import addJwtToken from "../tools/jwtAdder.js";

class AuthenticationController {

    /**
     * Register a new pangolin friend
     * @param req
     * @param res
     * @return {*}
     */
    register (req, res) {
        // Check that the request is valid
        if (!(req.body.name && req.body.password && req.body.age && req.body.family && req.body.race && req.body.food)) {
            return res.status(400).json({"error": "Invalid Request"});
        }

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
                    addJwtToken(res, {id: pangolin._id});

                    res.json({success: "Votre compte a bien été créé, ami Pangolin"});

                });
            });
        return res;
    }

    /**
     * Try to log a pangolin
     * @param req
     * @param res
     * @return {*}
     */
    login (req, res) {
        // Check that the request is valid
        if (!(req.body.login && req.body.password)) {
            return res.status(400).json({"error": "Invalid Request"});
        }

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

                addJwtToken(res, {id: pangolin._id});

                res.json({"success": "Vous êtes connecté !"});
            });
        return res;
    }

}

const authenticationController = new AuthenticationController();

export default authenticationController;
