import Pangolin from "../schemas/Pangolin.js";
class FriendController {

    /**
     * Add a pangolin to the current pangolin friends
     * @param req
     * @param res
     * @return {*}
     */
    addFriend (req, res) {
        // Verify that the new friend is not the current pangolin
        if (req.userId === req.body.id) {
            res.status(403).json({error: "Vous ne pouvez hélas pas être ami avec vous même"});
        }

        // Get current pangolin
        Pangolin.findOne({_id: req.userId})
            .then(currentPangolin => {
                // verify that the new friend isn't already a friend
                if (currentPangolin.friends.indexOf(req.body.id) !== -1) {
                    res.status(401).json("Vous êtes déjà ami !")
                    return ;
                }

                // verify that the other pangolin exists
                Pangolin.findOne({_id: req.body.id})
                    .then(friend => {
                        if (!friend) {
                            res.status(403).json({"error": "Ce pangolin semble ne pas exister"});
                            return ;
                        }
                        currentPangolin.friends.push(friend._id);
                        currentPangolin.save((err, pangolin) => {
                            if (err) {
                                res.status(500).json("Il semblerait que votre amoitiée soit impossible");
                                return ;
                            }
                            res.json({success: friend.name + " et vous êtes maintenant ami !"});
                        });
                    })

            });
        return res;
    }

    /**
     * Remove a pangolin form the current pangolin friend list
     * @param req
     * @param res
     * @return {*}
     */
    removeFriend (req, res) {
        Pangolin.findOne({_id: req.userId})
            .then(currentPangolin => {
                // verify that the new friend isn't already a friend
                const oldFriendIndex = currentPangolin.friends.indexOf(req.params.id);
                if (oldFriendIndex === -1) {
                    res.status(401).json("Ce pangolin n'était pas votre ami !");
                    return ;
                }
                currentPangolin.friends.splice(oldFriendIndex, 1);
                console.log(currentPangolin);
                currentPangolin.save((err, pangolin) => {
                    if (err) {
                        res.status(500).json({error: "Il semblerait que votre amitié soit plus forte que le code"});
                        return;
                    }
                    res.json({"success": "Vous n'êtes plus ami avec ce pangolin. Ne vous en faites pas, vous en trouverez d'autres !"});
                });

            });
        return res;
    }

}

const friendController = new FriendController();

export default friendController;
