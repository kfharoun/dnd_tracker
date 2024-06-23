const { ObjectId } = require('mongodb');
const { Schema } = require('mongoose')

const AbilitySchema = new Schema({
    ability_name: {
        type: String,
        required: true,
    },
    level_learned: {
        type: Number,
        required: true,
    },
    ability_equipped: {
        type: Boolean,
        required: true,
    },
    ability_class: {
    type: String,
    required: true,  
},
    characterId: { ObjectId }
});


module.exports = AbilitySchema;

// if that character is gonna be that class you can have a limited set of options char can choose (if class = blank then abilities)
// then ability would get put in the db w that char id