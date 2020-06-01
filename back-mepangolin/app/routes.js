import authenticationController from "./controllers/AuthenticationController.js";
import pangolinController from "./controllers/PangolinController.js";
import friendController from "./controllers/FriendController.js";
import AuthenticationMiddleware from "./middlewares/AuthenticationMiddleware.js";

const loadRoutes = app => {
    // Default route
    app.get('/', (req, res) => res.json({"Hello": "Pangolin !"}));

    // Authentication
    app.post('/auth/register', authenticationController.register);
    app.post('/auth/login', authenticationController.login);
    app.post('/auth/logout', authenticationController.logout);

    // Pangolin
    // app.use('/pangolins?', );
    app.get('/pangolins', AuthenticationMiddleware, pangolinController.getPangolins);
    app.get('/pangolin/:id', AuthenticationMiddleware, pangolinController.getPangolinById);
    app.patch('/pangolin', AuthenticationMiddleware, pangolinController.updatePangolin);

    // Friends
    app.use('/friend', AuthenticationMiddleware);
    app.get('/friend', friendController.getFriends);
    app.post('/friend', friendController.addFriend);
    app.delete('/friend', friendController.removeFriend);

};

export default loadRoutes;
