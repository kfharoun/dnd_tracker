const Ability = require('../models/ability')


const getAllAbilities = async (req,res) => {
    try {
        const abilities = await Ability.find({})
        res.json(abilities)

    } catch (error) {
        console.error("Error Finding Abilities", error)
        res.status(500).json({error: error.message})
    }
}

const getAbilitiesById = async (req, res) => {
    const { id } = req.params
    try {
        const ability = await Ability.findById(id)
        if (!ability) {
            return res.status(404).json({ message: 'Ability not found' })
        }
        res.status(200).json(ability)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAbilitiesByType = async (req, res) => {
    try {
        const type = req.params.type
        const abilities = await Character.find({ type: { $regex: new RegExp(type, "i") } })
        res.json(abilities)
    } catch (error) {
        console.error("Error fetching abilities by type:", error)
        res.status(500).json({ error: error.message })
    }
}

const getAbilitiesByWord = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm
        const abilities = await Ability.find({
            $or: [
                { ability_name: { $regex: new RegExp(searchTerm, "i") } },
                { ability_equipped: { $regex: new RegExp(searchTerm, "i") } },
                { level_learned: { $regex: new RegExp(searchTerm, "i") } },
                { ability_class: { $regex: new RegExp(searchTerm, "i") } },
            ]
        })
        console.log("Abilities by search term:", abilities)
        res.json(abilities)
    } catch (error) {
        console.error("Error fetching Abilities by search term:", error)
        res.status(500).json({ error: error.message })
    }
}

const deleteAbility = async (req, res) => {
    const { id } = req.params
    try {
        const Ability = await Ability.findByIdAndDelete(id)
        if (!Ability) {
            return res.status(404).json({ message: 'Ability not found' })
        }
        res.status(200).json({ message: 'Ability successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateAbility  = async (req, res) => {
    try {
        let { id } = req.params
        let ability = await Ability.findByIdAndUpdate(id, req.body, { new: true })
        if (ability) {
            return res.status(200).json(ability)
        }
        throw new Error("Ability not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createAbility  = async (req, res) => {
    try {
        const newAbility = await new Ability (req.body)
        await newAbility.save()
        return res.status(201).json({
            newAbility 
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllAbilities,   
    getAbilitiesById,
    getAbilitiesByType,
    getAbilitiesByWord,
    deleteAbility, 
    updateAbility,   
    createAbility

}
