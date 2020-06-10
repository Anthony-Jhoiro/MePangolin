const Pangolin = require("../schemas/Pangolin.js");
const bcrypt = require('bcryptjs');
const addJwtToken = require("../tools/jwtAdder.js");
const pangolinController = require("./PangolinController.js");

class AuthenticationController {

    /**
     * Register a new pangolin friend
     * @param req
     * @param res
     * @return {*}
     */
    register(req, res) {
        // Check that the request is valid
        if (!(req.body.name && req.body.password && req.body.age && req.body.family && req.body.race && req.body.food)) {
            return res.status(400).json({"error": "Invalid Request"});
        }
        pangolinController.createPangolin(req.body, pangolin => {
            addJwtToken(res, {id: pangolin._id});
            res.json({success: "Votre compte a bien été créé ami pangolin"});
        }, (code, message) => {
            res.status(code).json({error: message});
        });
        return res;
    }

    /**
     * Try to log a pangolin
     * @param req
     * @param res
     * @return {*}
     */
    login(req, res) {
        // Check that the request is valid
        if (!(req.body.login && req.body.password)) {
            return res.status(400).json({"error": "Invalid Request"});
        }

        // Check Unique Name
        Pangolin.findOne({name: req.body.login})
            .then(pangolin => {
                // Check if the username exists
                if (!pangolin) {
                    res.status(401).json({error: "Le nom d'utilisateur est incorrect"});
                    return;
                }

                // Check the password
                if (!bcrypt.compareSync(req.body.password, pangolin.password)) {
                    res.status(401).json({error: "Le mot de passe est incorrect"});
                    return;
                }

                addJwtToken(res, {id: pangolin._id});

                res.json({"success": "Vous êtes connecté !"});
            });
        return res;
    }

}

const authenticationController = new AuthenticationController();

module.exports = authenticationController
// export default authenticationController;
