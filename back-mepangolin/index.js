const express = require( 'express');
const db = require( "./app/tools/mongoConnexion.js");
const bodyParser = require( 'body-parser');
const cors = require( 'cors');
const environment = require( "./environment.js");
const loadRoutes = require( "./app/routes.js");

const app = express();

/**
 * Configure CORS
 */
app.use(cors({
    origin: environment.FRONT_URL,
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
db.db.on('error', () => {
    console.error("❌ Connection error");
});

/**
 * Database events : on open
 */
db.db.once('open', () => {
    console.log("Connected to the Mongodb database")
    // Start listening on the port
    const port = process.env.PORT | environment.PORT;
    app.listen(port, () => console.log("🌐 Listening on port " + port));
});
