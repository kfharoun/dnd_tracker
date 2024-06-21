// Campaign.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const campaignSchema = new Schema({
    campaign_name: {
        type: String,
        required: true,
    },
    campaign_map: {
        type: String,
        required: false,
    },
    campaign_info: {
        type: String,
        required: false,
    }
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
