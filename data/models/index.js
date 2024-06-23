const mongoose = require('mongoose')
const CharacterSchema = require('./character')
const CampaignSchema = require('./campaign')
const AbilitySchema = require('./ability')
const ClassSchema = require('./class')

const Character = mongoose.model('Character', CharacterSchema)
const Campaign = mongoose.model('Campaign', CampaignSchema)
const Ability = mongoose.model('Ability', AbilitySchema)
const Class = mongoose.model('Class', AbilitySchema)

module.exports = {
    Character, 
    Campaign, 
    Ability, 
    Class
}

