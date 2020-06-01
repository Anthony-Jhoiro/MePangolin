import Pangolin from "../schemas/Pangolin.js";

class PangolinController {

    getPangolins (req, res) {
        // Get all pangolins except the current user
        Pangolin.find({_id: {$ne: req.userId}})
            .then(data => {
                res.json(data);
            });
        return res;
    }

    getPangolinById(req, res) {
        Pangolin.find({_id: req.params.id})
            .then(d => res.json(d));
        return res;
    }

    updatePangolin (req, res) {
        // Check if the current pangolin is the one that is updated
        if (req.body.id !== req.userId) {
            return res.status(403).json("Vous n'êtes pas authorisé à modifier votre ami pangolin");
        }

        // Get the pangolin to update
        Pangolin.findOne({_id: req.userId})
            .then(pangolin => {
                // Set the new attributes
                pangolin.age = req.body.age;
                pangolin.family = req.body.family;
                pangolin.race = req.body.race;
                pangolin.food = req.body.food;
                // Save the pangolin
                pangolin.save((err, pangolin) => {
                    if (err) {
                        // Error during the update
                        res.status(500).json("Echec pendant la modification du pangolin");
                        return;
                    }
                    // Success !
                    res.json({success: "Votre profil a bien été modifié"});
                })
            });

        return res;
    }

}

const pangolinController = new PangolinController();

export default pangolinController;
