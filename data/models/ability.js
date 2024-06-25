const { Schema } = require('mongoose')

const AbilitySchema = new Schema({
    ability_name: {
        type: String,
        required: true,
    },
    level_learned: {
        type: Number,
        
    },
    ability_equipped: {
        type: Boolean,
        required: true,
    },
    ability_class: {
    type: String,
    required: true,  
},
    characterId: { type: Schema.Types.ObjectId, ref: 'Character' }
})


module.exports = AbilitySchema;
