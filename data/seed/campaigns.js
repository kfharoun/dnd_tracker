const db = require('../db')
const { Campaign } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await Campaign.deleteMany({})
        console.log('All collection reset')
    } catch (error) {
        console.error('Error resetting collections:', error)
    }
}



const main = async () => {
    await resetCollections()
  

  const campaigns = [
    {
         campaign_name: "Adventures of Drizzt Do'Urden", 
         campaign_info: "We dove into the dark depths of the Underdark alongside Drizzt Do'Urden. We began our journey in Menzoberranzan, where Drizzt, a paragon of virtue in a society steeped in treachery, seeks to forge a path of honor and redemption. We navigated deadly intrigues of drow politics, confronted ancient horrors lurking in the darkness, and unraveled the mysteries of forgotten civilizations. Now, with rebellion brewing in the underdark, the state of faerun and the Spider Queen are unbalanced.", 
         dungeon_master: "Gideon", 
         players: ["Tanner", "Kass", "Bobby Joe"]
    }
]

await Campaign.insertMany(campaigns)
console.log(`created campaigns!`)
}
const run = async () => {
await main()
db.close()
}

run()