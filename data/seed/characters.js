const db = require('../db')
const { Character, Campaign, Ability } = require('../models')

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
    const ranger = await Ability.find({class_name:"Ranger"})
    const fighter = await Ability.find({class_name:"Fighter"})
    const barbarian = await Ability.find({class_name:"Barbarian"})
    const bard = await Ability.find({class_name:"Bard"})
    const cleric = await Ability.find({class_name:"Cleric"})
    const druid = await Ability.find({class_name:"Druid"})
    const rogue = await Ability.find({class_name:"Rogue"})
    const paladin = await Ability.find({class_name:"Paladin"})
    const sorcerer = await Ability.find({class_name:"Sorcerer"})
    const warlock = await Ability.find({class_name:"Warlock"})
    const wizard = await Ability.find({class_name:"Wizard"})
    const artificer = await Ability.find({class_name:"Artificer"})
    const monk = await Ability.find({class_name:"Monk"})
    const drizzt = await Campaign.find({campaign_name: "Adventures of Drizzt Do'Urden"})
    await resetCollections()
  

  const characters = [
    {
        character_name: "Drizzt Do'Urden",
        character_image: "https://miro.medium.com/v2/resize:fit:1135/1*g-7NcjhvVteOq7tsSevvsw.jpeg", 
        played_by: "Kass",
        race: "Drow", 
        class_name: "Ranger", 
        subclass_name: "Beast Master", 
        armor_class: 20, 
        hit_points: 92, 
        strength: 12, 
        dexterity: 18,
        constitution: 14,
        intelligence: 15,
        wisdom: 16,
        charisma: 13,
        level: 12, 
        lore:  `Drizzt Do'Urden is a legendary drow ranger who defied the ways of his evil society to live by the principles of justice and compassion. Born into the dark depths of the Underdark, Drizzt's upbringing was marked by constant struggle and conflict. Despite the prejudice and hostility he faced, he forged friendships with unlikely allies and earned the trust of many through his unwavering loyalty and exceptional skill with dual scimitars.

        Driven by a deep-seated desire to prove that individuals are not defined by their race or heritage, Drizzt ventured to the surface world where he continued to uphold his values as a protector of the innocent and a relentless foe of evil. Throughout his adventures, he faced numerous challenges, battled formidable foes, and forged lasting bonds with companions who shared his commitment to justice.

        Drizzt's tale is one of courage, resilience, and the enduring struggle between darkness and light. He remains a beacon of hope and inspiration, demonstrating that even in the darkest of times, true heroes emerge to champion the cause of righteousness.`,
        campaignId: drizzt._id, 
        abilityId: ranger._id
    }, 
    {
        character_name: "Bruenor Battlehammer",
        character_image: "https://static.wikia.nocookie.net/forgottenrealms/images/c/c2/Bruenor_Battlehammer_AFR.jpg/revision/latest?cb=20210701120700",
        played_by: "Tanner",
        race: "Dwarf",
        class_name: "Fighter",
        subclass_name: "Champion",
        armor_class: 18,
        hit_points: 104,
        strength: 18,
        dexterity: 12,
        constitution: 20,
        intelligence: 14,
        wisdom: 12,
        charisma: 16,
        level: 12,
        lore: `Bruenor Battlehammer is a stout-hearted dwarf warrior and king of Clan Battlehammer in Icewind Dale. Known for his fiery spirit and unwavering loyalty, Bruenor has led his people through countless battles against orcish hordes and the forces of darkness that threaten their homeland.
    
        From a young age, Bruenor showed exceptional skill in battle and a keen understanding of tactics, earning him respect among dwarves and allies alike. His deep-seated determination to protect his kin and reclaim lost dwarven territories has driven him to forge alliances with unlikely allies, including the renowned drow ranger Drizzt Do'Urden.
    
        Despite his gruff exterior, Bruenor possesses a heart of gold and a strong sense of justice. His leadership has inspired dwarves across Faerûn to stand against tyranny and defend their ancestral lands, making him a legendary figure among his people and a stalwart companion to Drizzt in their quests for justice and honor.`,
        campaignId: drizzt._id,
        abilityId: fighter._id
    }, 
    {
        character_name: "Catti-brie",
        character_image: "https://cdnb.artstation.com/p/assets/images/images/037/985/033/large/clint-cearley-cattie-brie-2k.jpg?1621869320",
        played_by: "Bobby Joe",
        race: "Human",
        class_name: "Fighter",
        subclass_name: "Battle Master",
        armor_class: 19,
        hit_points: 86,
        strength: 16,
        dexterity: 18,
        constitution: 14,
        intelligence: 15,
        wisdom: 16,
        charisma: 14,
        level: 12,
        lore: `Catti-brie is a skilled human warrior and one of Drizzt Do'Urden's closest companions. Raised among the dwarves of Icewind Dale, Catti-brie's upbringing instilled in her a strong sense of honor and a fierce determination to protect those she cares about.
    
        Gifted with exceptional agility and marksmanship, Catti-brie wields a deadly bow and blade with unmatched precision, making her a formidable adversary in battle. Her time spent with Drizzt and Bruenor has honed her skills as a fighter and strategist, earning her respect among allies and fear among enemies.
    
        Beyond her prowess in combat, Catti-brie is known for her unwavering loyalty and compassion. Her bond with Drizzt and her commitment to their shared ideals of justice and bravery have made her an indispensable member of their adventuring party, facing danger and adversity with courage and resilience.`,
        campaignId: drizzt._id,
        abilityId: fighter._id
    }
]

await Character.insertMany(characters)
console.log(`created characters with abilities and campaigns!`)
}
const run = async () => {
await main()
db.close()
}

run()