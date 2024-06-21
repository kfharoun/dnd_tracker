const { Schema } = require('mongoose')

const CampaignSchema = new Schema(
  {
    campaign_name: { type: String, required: true },
    campaign_info: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = CampaignSchema;