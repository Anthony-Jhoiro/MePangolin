import express from 'express';
import {db} from "./app/tools/mongoConnexion.js";
const app = express();


const port = process.env.PORT | 8080;


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
