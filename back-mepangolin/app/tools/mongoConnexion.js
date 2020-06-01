import mongoose from 'mongoose';
/**
 * TODO : Switch to environment variables
 */
const DATABASE_URL = "mongodb://localhost/";
const DATABASE_NAME = "mepangolin";

// Connection to mongodb database
mongoose.connect(DATABASE_URL + DATABASE_NAME, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
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

export { Schema, makeModel, db };
