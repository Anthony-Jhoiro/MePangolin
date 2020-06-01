import {Schema, makeModel} from "../tools/mongoConnexion.js";

const pangolinSchema = new Schema({
    name: String,
    password: String,
    salt: String,
    age: Number,
    family: String,
    race: String,
    food: [String],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Pangolin'
    }]
});

const Pangolin = makeModel('Pangolin', pangolinSchema, 'pangolins');

export default Pangolin;


