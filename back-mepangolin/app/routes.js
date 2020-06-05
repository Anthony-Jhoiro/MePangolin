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

    // Pangolin
    app.get('/pangolins', AuthenticationMiddleware, pangolinController.getPangolins);
    app.get('/pangolin/profile', AuthenticationMiddleware, pangolinController.getProfile);
    app.patch('/pangolin', AuthenticationMiddleware, pangolinController.updatePangolin);

    // Friends
    app.use('/friend', AuthenticationMiddleware);
    app.post('/friend/create', friendController.createFriend);
    app.post('/friend', friendController.addFriend);
    app.delete('/friend/:id', friendController.removeFriend);

};

export default loadRoutes;
