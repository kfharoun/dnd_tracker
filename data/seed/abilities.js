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

    const abilities = [
        // Level 1 Abilities
        {
            ability_name: 'Magic Missile',
            level_learned: 1,
            ability_equipped: true,
        },
        {
            ability_name: 'Cure Wounds',
            level_learned: 1,
            ability_equipped: true,
        },
        {
            ability_name: 'Shield',
            level_learned: 1,
            ability_equipped: true,
        },
        // Level 2 Abilities
        {
            ability_name: 'Misty Step',
            level_learned: 2,
            ability_equipped: true,
        },
        {
            ability_name: 'Hold Person',
            level_learned: 2,
            ability_equipped: true,
        },
        {
            ability_name: 'Flaming Sphere',
            level_learned: 2,
            ability_equipped: true,
        },
        // Level 3 Abilities
        {
            ability_name: 'Fireball',
            level_learned: 3,
            ability_equipped: true,
        },
        {
            ability_name: 'Counterspell',
            level_learned: 3,
            ability_equipped: true,
        },
        {
            ability_name: 'Fly',
            level_learned: 3,
            ability_equipped: true,
        },
        // Level 4 Abilities
        {
            ability_name: 'Dimension Door',
            level_learned: 4,
            ability_equipped: true,
        },
        {
            ability_name: 'Polymorph',
            level_learned: 4,
            ability_equipped: true,
        },
        {
            ability_name: 'Ice Storm',
            level_learned: 4,
            ability_equipped: true,
        },
        // Level 5 Abilities
        {
            ability_name: 'Teleportation Circle',
            level_learned: 5,
            ability_equipped: true,
        },
        {
            ability_name: 'Wall of Force',
            level_learned: 5,
            ability_equipped: true,
        },
        {
            ability_name: 'Animate Objects',
            level_learned: 5,
            ability_equipped: true,
        },
        // Level 6 Abilities
        {
            ability_name: 'Sunbeam',
            level_learned: 6,
            ability_equipped: true,
        },
        {
            ability_name: 'Disintegrate',
            level_learned: 6,
            ability_equipped: true,
        },
        {
            ability_name: 'True Seeing',
            level_learned: 6,
            ability_equipped: true,
        },
        // Level 7 Abilities
        {
            ability_name: 'Teleport',
            level_learned: 7,
            ability_equipped: true,
        },
        {
            ability_name: 'Prismatic Spray',
            level_learned: 7,
            ability_equipped: true,
        },
        {
            ability_name: 'Plane Shift',
            level_learned: 7,
            ability_equipped: true,
        },
        // Level 8 Abilities
        {
            ability_name: 'Sunburst',
            level_learned: 8,
            ability_equipped: true,
        },
        {
            ability_name: 'Feeblemind',
            level_learned: 8,
            ability_equipped: true,
        },
        {
            ability_name: 'Maze',
            level_learned: 8,
            ability_equipped: true,
        },
        // Level 9 Abilities
        {
            ability_name: 'Meteor Swarm',
            level_learned: 9,
            ability_equipped: true,
        },
        {
            ability_name: 'Time Stop',
            level_learned: 9,
            ability_equipped: true,
        },
        {
            ability_name: 'Foresight',
            level_learned: 9,
            ability_equipped: true,
        },
        // Level 10 Abilities (Placeholder, D&D 5e typically only has spells up to level 9, so using level 9 spells for example)
        {
            ability_name: 'Power Word Kill',
            level_learned: 10,
            ability_equipped: true,
        },
        {
            ability_name: 'Wish',
            level_learned: 10,
            ability_equipped: true,
        },
        {
            ability_name: 'Shapechange',
            level_learned: 10,
            ability_equipped: true,
        },
        // Level 11 Abilities (Placeholder)
        {
            ability_name: 'Gate',
            level_learned: 11,
            ability_equipped: true,
        },
        {
            ability_name: 'Storm of Vengeance',
            level_learned: 11,
            ability_equipped: true,
        },
        {
            ability_name: 'Mass Heal',
            level_learned: 11,
            ability_equipped: true,
        },
        // Level 12 Abilities (Placeholder)
        {
            ability_name: 'Invulnerability',
            level_learned: 12,
            ability_equipped: true,
        },
        {
            ability_name: 'Psychic Scream',
            level_learned: 12,
            ability_equipped: true,
        },
        {
            ability_name: 'True Polymorph',
            level_learned: 12,
            ability_equipped: true,
        },
    ];
await Ability.insertMany(abilities)
console.log(`Created abilities`)
}
const run = async () => {
await main()
db.close()
}

run()
