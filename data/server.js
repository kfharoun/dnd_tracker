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
app.put('/Campaign/id', campaignController.updateCampaign)
app.delete('/Campaign/id', campaignController.deleteCampaign)
app.get('/Campaign/search/:searchTerm', campaignController.getCampaignsByWord)
app.get('/Campaign/search/:players', campaignController.getCampaignsByPlayers)
app.get('/Campaign/search/:dungeon_master', campaignController.getCampaignsByDM)