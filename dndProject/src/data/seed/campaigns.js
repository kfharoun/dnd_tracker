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