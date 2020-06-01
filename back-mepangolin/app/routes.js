import authenticationController from "./controllers/AuthenticationController.js";
import pangolinController from "./controllers/PangolinController.js";
import friendController from "./controllers/FriendController.js";

const loadRoutes = app => {
    // Authentication
    app.post('/auth/register', authenticationController.register);
    app.post('/auth/login', authenticationController.login);
    app.post('/auth/logout', authenticationController.logout);

    // Pangolin
    app.get('/pangolins', pangolinController.getPangolins);
    app.patch('/pangolin', pangolinController.updatePangolin);

    // Friends
    app.get('/friend', friendController.getFriends);
    app.post('/friend', friendController.addFriend);
    app.delete('/friend', friendController.removeFriend);

};

export default loadRoutes;
