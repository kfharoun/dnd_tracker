const { Schema } = require('mongoose')

const CampaignSchema = new Schema(
  {
    campaign_name: { type: String, required: true },
    campaign_info: { type: String, required: false }, 
    dungeon_master: {type: String, required: true}, 
    players: [{type: String, required: true}]
  },
  { timestamps: true }
)

module.exports = CampaignSchema;