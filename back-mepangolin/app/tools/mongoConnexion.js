import mongoose from 'mongoose';
import {DATABASE_NAME, DATABASE_URL} from "../../environment.js";


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
