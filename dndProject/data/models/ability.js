// Ability.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const abilitySchema = new Schema({
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
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character',
        required: true,
    }
});

const Ability = model('Ability', abilitySchema);

module.exports = Ability;
