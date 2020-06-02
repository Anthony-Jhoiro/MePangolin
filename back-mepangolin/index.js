import express from 'express';
import {db} from "./app/tools/mongoConnexion.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import {FRONT_URL, PORT} from "./environment.js";
import loadRoutes from "./app/routes.js";

const app = express();

/**
 * Configure CORS
 */
app.use(cors({
    origin: FRONT_URL,
    exposedHeaders: ['_token']
}));

/**
 * Add body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Load the routes
 */
loadRoutes(app);

/**
 * Database events : on error
 */
db.on('error', function callback () {
    console.error("❌ Connection error");
});

/**
 * Database events : on open
 */
db.once('open', function callback () {
    console.log("Connected to the Mongodb database")
    // Start listening on the port
    const port = process.env.PORT | PORT;
    app.listen(port, () => console.log("🌐 Listening on port " + port));
});
