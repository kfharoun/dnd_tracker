const { Schema } = require('mongoose')

const CharacterSchema = new Schema(
  {
    character_name: { type: String, required: true },
    character_image: {type: String, required: false},
    race: { type: String, required: true },
    class_name: {type: String, required: true},
    subclass_name: { type: String, required: true },
    strength: { type: Number, required: true },
    dexterity: { type: Number, required: true },
    constitution: { type: Number, required: true },
    intelligence: {type: Number, required: true}, 
    wisdom: {type:Number, required:true}, 
    charisma: {type: Number, required: true}, 
    level: {type: Number, required: true}, 
    lore: {type: String, required: true},
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign'}, 
    abilityId: {type: Schema.Types.ObjectId, red: 'Ability'}
  },
  { timestamps: true }
)

module.exports = CharacterSchema;