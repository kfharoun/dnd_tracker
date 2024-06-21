const Campaign = require('../models/campaigns')


const getAllCampaigns = async (req,res) => {
    try {
        const campaigns = await Campaign.find({})
        res.json(campaigns)

    } catch (error) {
        console.error("Error Finding Campaigns", error)
        res.status(500).json({error: error.message})
    }
}

const getCampaignById = async (req, res) => {
    const { id } = req.params
    try {
        const campaign = await Campaign.findById(id)
        if (!campaign) {
            return res.status(404).json({ message: 'campaign not found' })
        }
        res.status(200).json(campaign)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCampaignsByType = async (req, res) => {
    try {
        const type = req.params.type
        const campaigns = await Campaign.find({ type: { $regex: new RegExp(type, "i") } })
        res.json(campaigns)
    } catch (error) {
        console.error("Error fetching campaigns by type:", error)
        res.status(500).json({ error: error.message })
    }
}


// const getCampaignsByColor = async (req, res) => {
//     try {
//         const color = req.params.color
//         const campaigns = await Campaign.find({ color: { $regex: new RegExp(color, "i") } })
//         res.json(campaigns)
//     } catch (error) {
//         console.error("Error fetching campaigns by color:", error)
//         res.status(500).json({ error: error.message })
//     }
// }

const getCampaignsByWord = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm
        const campaigns = await Campaign.find({
            $or: [
                { campaign_name: { $regex: new RegExp(searchTerm, "i") } },
                { dungeon_master: { $regex: new RegExp(searchTerm, "i") } }
            ]
        })
        console.log("Campaigns by search term:", campaigns)
        res.json(campaigns)
    } catch (error) {
        console.error("Error fetching Campaigns by search term:", error)
        res.status(500).json({ error: error.message })
    }
}

// const getCampaignsByCampaignId = async (req, res) => {
//     try {
//         const CampaignId = req.params.campaignId
//         console.log("campaignId:", campaignId)
//         const campaigns = await Campaign.find({ campaignId })
//         console.log("campaigns:", campaigns)
//         console.log("objectID2:", campaignId)
//         console.log("Campaign:", Campaign)
//         res.json(campaigns)
//     } catch (error) {
//         console.error("Error fetching campaignss by  ID:", error)
//         res.status(500).json({ error: error.message })
//     }
// }


const deleteCampaign = async (req, res) => {
    const { id } = req.params
    try {
        const campaign = await Campaign.findByIdAndDelete(id)
        if (!campaign) {
            return res.status(404).json({ message: 'campaign not found' })
        }
        res.status(200).json({ message: 'campaign successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateCampaign  = async (req, res) => {
    try {
        let { id } = req.params
        let campaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true })
        if (campaign) {
            return res.status(200).json(campaign)
        }
        throw new Error("campaign not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createCampaign  = async (req, res) => {
    try {
        const newCampaign = await new Campaign (req.body)
        await newCampaign.save()
        return res.status(201).json({
            newCampaign 
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}



module.exports = {
    getAllCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign, 
    getCampaignsByType,   
    getCampaignsByWord
    
}