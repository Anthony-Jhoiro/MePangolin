import Pangolin from "../schemas/Pangolin.js";

class PangolinController {

    /**
     * Get all pangolins, except the current one, depending of the filters
     * @param req
     * @param res
     * @returns {*}
     */
    getPangolins (req, res) {
        // Handle filters
        const searchItem = req.query.searchItem;
        const onlyFriends = req.query.onlyFriends;

        // Get current pangolin
        Pangolin.findOne({_id: req.userId})
            .then(currentPangolin => {
                let filters = {
                    $and: [
                        {
                            // Do not return the current pangolin
                            _id: {$ne: req.userId}
                        },
                        (onlyFriends === '1')? {_id: {$in: currentPangolin.friends}}:{}
                    ],
                name: {$regex: searchItem}
                };
                Pangolin.find(filters, {password: 0}).lean()
                    .then(pangolins => {
                        // Add the friend attribute to know if the pangolin is a friend with the current pangolin
                        pangolins.forEach(pangolin => pangolin.friend = currentPangolin.friends.indexOf(pangolin._id) !== -1);
                        res.json(pangolins);
                    });
            });
        return res;
    }

    /**
     * Get the current pangolin profile
     * @param req
     * @param res
     * @return {*}
     */
    getProfile(req, res) {
        Pangolin.findOne({_id: req.userId}, {password: 0})
            .then(d => res.json(d));
        return res;
    }

    /**
     * Update the information of a pangolin
     * @param req
     * @param res
     * @return {any}
     */
    updatePangolin (req, res) {
        // Check if the current pangolin is the one that is updated
        if (req.body._id !== req.userId) {
            return res.status(403).json({"error": "Vous n'êtes pas authorisé à modifier votre ami pangolin"});
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
