const Character = require('../models/campaigns')


const getAllCharacters = async (req,res) => {
    try {
        const characters = await Character.find({})
        res.json(characters)

    } catch (error) {
        console.error("Error Finding Characters", error)
        res.status(500).json({error: error.message})
    }
}

const getCharactersById = async (req, res) => {
    const { id } = req.params
    try {
        const character = await Character.findById(id)
        if (!character) {
            return res.status(404).json({ message: 'Character not found' })
        }
        res.status(200).json(character)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCharactersByType = async (req, res) => {
    try {
        const type = req.params.type
        const characters = await Character.find({ type: { $regex: new RegExp(type, "i") } })
        res.json(characters)
    } catch (error) {
        console.error("Error fetching characters by type:", error)
        res.status(500).json({ error: error.message })
    }
}

const getCharactersByWord = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm
        const characters = await Character.find({
            $or: [
                { character_name: { $regex: new RegExp(searchTerm, "i") } },
                { played_by: { $regex: new RegExp(searchTerm, "i") } }
            ]
        })
        console.log("Campaigns by search term:", accessories)
        res.json(campaigns)
    } catch (error) {
        console.error("Error fetching Campaigns by search term:", error)
        res.status(500).json({ error: error.message })
    }
}

const deleteCharacter = async (req, res) => {
    const { id } = req.params
    try {
        const character = await Character.findByIdAndDelete(id)
        if (!character) {
            return res.status(404).json({ message: 'Character not found' })
        }
        res.status(200).json({ message: 'Character successfully deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateCharacter  = async (req, res) => {
    try {
        let { id } = req.params
        let character = await Character.findByIdAndUpdate(id, req.body, { new: true })
        if (character) {
            return res.status(200).json(character)
        }
        throw new Error("Character not found")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createCharacter  = async (req, res) => {
    try {
        const newCharacter = await new Character (req.body)
        await newCharacter.save()
        return res.status(201).json({
            newCharacter 
        })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllCharacters,   
    getCharactersById,
    getCharactersByType,
    getCharactersByWord,
    deleteCharacter, 
    updateCharacter,   
    createCharacter

}
