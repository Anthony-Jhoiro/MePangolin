const mongoose = require('mongoose');
const environment = require("../../environment.js");


// Connection to mongodb database
mongoose.connect(environment.DATABASE_URL + environment.DATABASE_NAME, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
/**
 * to handle database events
 */
const db = mongoose.connection;

/**
 * to create schema
 */
const Schema = mongoose.Schema;

/**
 * to create model (see mongoose.model)
 * @type {function(name, schema, collection, *=): Model}
 */
const makeModel = mongoose.model; //

module.exports = { Schema, makeModel, db };
