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
});


module.exports = AbilitySchema;