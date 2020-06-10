const db = require("../tools/mongoConnexion.js");

const pangolinSchema = new db.Schema({
    name: String,
    password: String,
    salt: String,
    age: Number,
    family: String,
    race: String,
    food: [String],
    friends: [{
        type: db.Schema.Types.ObjectId,
        ref: 'Pangolin'
    }]
});

const Pangolin = db.makeModel('Pangolin', pangolinSchema, 'pangolins');

module.exports = Pangolin;


