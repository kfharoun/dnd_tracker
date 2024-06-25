const db = require('../db')
const { Ability } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await Ability.deleteMany({})
        console.log('All collection reset')
    } catch (error) {
        console.error('Error resetting collections:', error)
    }
}


const main = async () => {
    await resetCollections()

   
// await Ability.insertMany(abilities)
console.log(`Created abilities`)
}
const run = async () => {
await main()
db.close()
}

run()

