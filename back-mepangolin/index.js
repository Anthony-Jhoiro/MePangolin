import express from 'express';
import {db} from "./app/tools/mongoConnexion.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import {FRONT_URL} from "./environment.js";
import loadRoutes from "./app/routes.js";

const app = express();

app.use(cors({
    origin: FRONT_URL,
    exposedHeaders: ['_token']
}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));


const port = process.env.PORT | 8080;

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
    // Listen to the PORT environment variable or to the 8080 port
    app.listen(port, () => console.log("🌐 Listening on port " + port));
});
