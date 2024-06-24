const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const logger = require('morgan')

const app = express()
app.use(cors())
// app.use(logger('dev'))
app.use(bodyParser.json())

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const abilityController = require('./controllers/abilityController')
const campaignController = require('./controllers/campaignController')
const characterController = require('./controllers/characterController')

app.get('/', (req,res) => res.send('This is our landing page!'))

app.get('/Campaign', campaignController.getAllCampaigns)
app.get('/Campaign/:id', campaignController.getCampaignById)
app.post('/Campaign', campaignController.createCampaign)
app.put('/Campaign/:id', campaignController.updateCampaign)
app.delete('/Campaign/:id', campaignController.deleteCampaign)
app.get('/Campaign/search/:searchTerm', campaignController.getCampaignsByWord)
app.get('/Campaign/search/:players', campaignController.getCampaignsByPlayers)
app.get('/Campaign/search/:dungeon_master', campaignController.getCampaignsByDM)


app.get('/Character', characterController.getAllCharacters)
app.get('/Character/:id', characterController.getCharactersById)
app.post('/Character', characterController.createCharacter)
app.put('/Character/:id', characterController.updateCharacter)
app.delete('/Character/:id', characterController.deleteCharacter)
app.get('/Character/search/:searchTerm', characterController.getCharactersByWord)
app.get('/Character/ability/:abilityId', characterController.getCharacterByAbilityId)
app.get('/Character/search/:type', characterController.getCharactersByType)
app.get('/Character/campaign/:campaignId', characterController.getCharacterByCampaignId)


app.get('/Ability', abilityController.getAllAbilities)
app.get('/Ability/:id', abilityController.getAbilitiesById)
app.post('/Ability', abilityController.createAbility)
app.put('/Ability/:id', abilityController.updateAbility)
app.delete('/Ability/:id', abilityController.deleteAbility)
app.get('/Ability/search/:searchTerm', abilityController.getAbilitiesByWord)
app.get('/Ability/search/:abilityId', abilityController.getAbilitiesById)
app.get('/Ability/search/:level_learned', abilityController.getAbilitiesByLevel)
app.get('/Ability/search/:ability_class', abilityController.getAbilitiesByClass)
app.get('/Ability/search/:ability_name', abilityController.getAbilitiesByName)

