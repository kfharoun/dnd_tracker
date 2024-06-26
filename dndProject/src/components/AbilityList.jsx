import axios from "axios"
import { useState, useEffect} from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Accordion from 'react-bootstrap/Accordion'
import { Alert } from "react-bootstrap"


export default function AbilityList () {
    
    const abilities = [
        // Wizard Spells

        { "ability_name": "Magic Missile", "level_learned": 1, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Mage Armor", "level_learned": 1, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Shield", "level_learned": 1, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Chromatic Orb", "level_learned": 1, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Detect Magic", "level_learned": 1, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Misty Step", "level_learned": 3, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Scorching Ray", "level_learned": 3, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Invisibility", "level_learned": 3, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Web", "level_learned": 3, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Mirror Image", "level_learned": 3, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Fireball", "level_learned": 5, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Counterspell", "level_learned": 5, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Fly", "level_learned": 5, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Lightning Bolt", "level_learned": 5, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Dispel Magic", "level_learned": 5, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Dimension Door", "level_learned": 7, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Polymorph", "level_learned": 7, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Ice Storm", "level_learned": 7, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Greater Invisibility", "level_learned": 7, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Stoneskin", "level_learned": 7, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Teleportation Circle", "level_learned": 9, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Wall of Force", "level_learned": 9, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Cone of Cold", "level_learned": 9, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Cloudkill", "level_learned": 9, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Animate Objects", "level_learned": 9, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Disintegrate", "level_learned": 11, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Globe of Invulnerability", "level_learned": 11, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "True Seeing", "level_learned": 11, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Sunbeam", "level_learned": 11, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Chain Lightning", "level_learned": 11, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Teleport", "level_learned": 13, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Prismatic Spray", "level_learned": 13, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Plane Shift", "level_learned": 13, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Etherealness", "level_learned": 13, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Finger of Death", "level_learned": 13, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Forcecage", "level_learned": 13, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Sunburst", "level_learned": 15, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Feeblemind", "level_learned": 15, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Maze", "level_learned": 15, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Antipathy/Sympathy", "level_learned": 15, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Mind Blank", "level_learned": 15, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Meteor Swarm", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Time Stop", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Foresight", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Power Word Kill", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Shapechange", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "Wish", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
        { "ability_name": "True Polymorph", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false },
    

    // Barbarian "Spells" (Note: Barbarians use abilities, not spells, but we'll list some iconic abilities)

        { "ability_name": "Rage", "level_learned": 1, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Reckless Attack", "level_learned": 2, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Danger Sense", "level_learned": 2, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Frenzy", "level_learned": 3, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Mindless Rage", "level_learned": 6, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Retaliation", "level_learned": 14, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Persistent Rage", "level_learned": 15, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Indomitable Might", "level_learned": 18, "ability_class": "Barbarian", "ability_equipped": false },
        { "ability_name": "Primal Champion", "level_learned": 20, "ability_class": "Barbarian", "ability_equipped": false },
    

    // Bard Spells

        { "ability_name": "Healing Word", "level_learned": 1, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Vicious Mockery", "level_learned": 1, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Cure Wounds", "level_learned": 1, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Faerie Fire", "level_learned": 1, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Bane", "level_learned": 1, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Invisibility", "level_learned": 3, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Heat Metal", "level_learned": 3, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Shatter", "level_learned": 3, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Hold Person", "level_learned": 5, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Enhance Ability", "level_learned": 3, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Hypnotic Pattern", "level_learned": 5, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Dispel Magic", "level_learned": 5, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Leomund's Tiny Hut", "level_learned": 5, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Fear", "level_learned": 5, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Sending", "level_learned": 5, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Greater Invisibility", "level_learned": 7, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Dimension Door", "level_learned": 7, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Polymorph", "level_learned": 7, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Freedom of Movement", "level_learned": 7, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Confusion", "level_learned": 7, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Mass Cure Wounds", "level_learned": 9, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Raise Dead", "level_learned": 9, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Dispel Evil and Good", "level_learned": 9, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Teleportation Circle", "level_learned": 9, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Dominate Person", "level_learned": 9, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Eyebite", "level_learned": 11, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Mass Suggestion", "level_learned": 11, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Otto's Irresistible Dance", "level_learned": 11, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Programmed Illusion", "level_learned": 11, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "True Seeing", "level_learned": 11, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Teleport", "level_learned": 13, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Regenerate", "level_learned": 13, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Resurrection", "level_learned": 13, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Forcecage", "level_learned": 13, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Mirage Arcane", "level_learned": 13, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Dominate Monster", "level_learned": 15, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Mind Blank", "level_learned": 15, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Power Word Stun", "level_learned": 15, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Feeblemind", "level_learned": 15, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Maze", "level_learned": 15, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Power Word Kill", "level_learned": 17, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "True Resurrection", "level_learned": 17, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Foresight", "level_learned": 17, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Time Stop", "level_learned": 17, "ability_class": "Bard", "ability_equipped": false },
        { "ability_name": "Wish", "level_learned": 17, "ability_class": "Bard", "ability_equipped": false },
    

    // Cleric Spells

        { "ability_name": "Cure Wounds", "level_learned": 1, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Bless", "level_learned": 1, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Guiding Bolt", "level_learned": 1, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Healing Word", "level_learned": 1, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Shield of Faith", "level_learned": 1, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Spiritual Weapon", "level_learned": 3, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Lesser Restoration", "level_learned": 3, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Prayer of Healing", "level_learned": 3, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Hold Person", "level_learned": 5, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Silence", "level_learned": 3, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Dispel Magic", "level_learned": 5, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Spirit Guardians", "level_learned": 5, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Revivify", "level_learned": 5, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Daylight", "level_learned": 5, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Mass Healing Word", "level_learned": 5, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Death Ward", "level_learned": 7, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Freedom of Movement", "level_learned": 7, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Guardian of Faith", "level_learned": 7, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Divination", "level_learned": 7, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Locate Creature", "level_learned": 7, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Greater Restoration", "level_learned": 9, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Raise Dead", "level_learned": 9, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Flame Strike", "level_learned": 9, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Mass Cure Wounds", "level_learned": 9, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Commune", "level_learned": 9, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Heal", "level_learned": 11, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Harm", "level_learned": 11, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Heroes' Feast", "level_learned": 11, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Word of Recall", "level_learned": 11, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Blade Barrier", "level_learned": 11, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Regenerate", "level_learned": 13, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Resurrection", "level_learned": 13, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Etherealness", "level_learned": 13, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Plane Shift", "level_learned": 13, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Fire Storm", "level_learned": 13, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Holy Aura", "level_learned": 15, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Sunburst", "level_learned": 15, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Antimagic Field", "level_learned": 15, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Earthquake", "level_learned": 15, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Tsunami", "level_learned": 15, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Mass Heal", "level_learned": 17, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "True Resurrection", "level_learned": 17, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Gate", "level_learned": 17, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Foresight", "level_learned": 17, "ability_class": "Cleric", "ability_equipped": false },
        { "ability_name": "Power Word Heal", "level_learned": 17, "ability_class": "Cleric", "ability_equipped": false },

    

    // Druid Spells
    { "ability_name": "Entangle", "level_learned": 1, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Goodberry", "level_learned": 1, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Healing Word", "level_learned": 1, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Faerie Fire", "level_learned": 1, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Thunderwave", "level_learned": 1, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Moonbeam", "level_learned": 3, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Barkskin", "level_learned": 3, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Flame Blade", "level_learned": 3, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Heat Metal", "level_learned": 3, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Spike Growth", "level_learned": 3, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Call Lightning", "level_learned": 5, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Plant Growth", "level_learned": 5, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Wind Wall", "level_learned": 5, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Daylight", "level_learned": 5, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Water Breathing", "level_learned": 5, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Freedom of Movement", "level_learned": 7, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Conjure Woodland Beings", "level_learned": 7, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Polymorph", "level_learned": 7, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Stoneskin", "level_learned": 7, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Blight", "level_learned": 7, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Mass Cure Wounds", "level_learned": 9, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Reincarnate", "level_learned": 9, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Wall of Stone", "level_learned": 9, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Insect Plague", "level_learned": 9, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Commune with Nature", "level_learned": 9, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Heal", "level_learned": 11, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Heroes' Feast", "level_learned": 11, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Sunbeam", "level_learned": 11, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Transport via Plants", "level_learned": 11, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Wall of Thorns", "level_learned": 11, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Regenerate", "level_learned": 13, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Resurrection", "level_learned": 13, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Fire Storm", "level_learned": 13, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Plane Shift", "level_learned": 13, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Etherealness", "level_learned": 13, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Sunburst", "level_learned": 15, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Earthquake", "level_learned": 15, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Tsunami", "level_learned": 15, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Animal Shapes", "level_learned": 15, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Storm of Vengeance", "level_learned": 17, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Shapechange", "level_learned": 17, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "True Resurrection", "level_learned": 17, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Power Word Heal", "level_learned": 17, "ability_class": "Druid", "ability_equipped": false },
    { "ability_name": "Foresight", "level_learned": 17, "ability_class": "Druid", "ability_equipped": false },

    // Paladin Spells
    { "ability_name": "Cure Wounds", "level_learned": 2, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Bless", "level_learned": 2, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Compelled Duel", "level_learned": 2, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Shield of Faith", "level_learned": 2, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Searing Smite", "level_learned": 2, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Aid", "level_learned": 5, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Magic Weapon", "level_learned": 5, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Zone of Truth", "level_learned": 5, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Lesser Restoration", "level_learned": 5, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Hold Person", "level_learned": 5, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Dispel Magic", "level_learned": 9, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Revivify", "level_learned": 9, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Spirit Shroud", "level_learned": 9, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Daylight", "level_learned": 9, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Aura of Vitality", "level_learned": 9, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Guardian of Faith", "level_learned": 13, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Freedom of Movement", "level_learned": 13, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Locate Creature", "level_learned": 13, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Staggering Smite", "level_learned": 13, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Destructive Wave", "level_learned": 17, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Circle of Power", "level_learned": 17, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Holy Weapon", "level_learned": 17, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Commune", "level_learned": 17, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Banishing Smite", "level_learned": 17, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Heal", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Harm", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Heroes' Feast", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Blade Barrier", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Regenerate", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Resurrection", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Fire Storm", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Plane Shift", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Etherealness", "level_learned": 19, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Holy Aura", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Sunburst", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Antimagic Field", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Earthquake", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Tsunami", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Mass Heal", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "True Resurrection", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Gate", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Foresight", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },
    { "ability_name": "Power Word Heal", "level_learned": 20, "ability_class": "Paladin", "ability_equipped": false },

    // Ranger Spells
    { "ability_name": "Ensnaring Strike", "level_learned": 2, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Hunter's Mark", "level_learned": 2, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Goodberry", "level_learned": 2, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Hail of Thorns", "level_learned": 2, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Zephyr Strike", "level_learned": 2, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Spike Growth", "level_learned": 5, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Barkskin", "level_learned": 5, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Pass without Trace", "level_learned": 5, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Lesser Restoration", "level_learned": 5, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Find Traps", "level_learned": 5, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Conjure Animals", "level_learned": 9, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Lightning Arrow", "level_learned": 9, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Nondetection", "level_learned": 9, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Flame Arrows", "level_learned": 9, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Elemental Weapon", "level_learned": 9, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Guardian of Nature", "level_learned": 13, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Locate Creature", "level_learned": 13, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Freedom of Movement", "level_learned": 13, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Stoneskin", "level_learned": 13, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Grasping Vine", "level_learned": 13, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Swift Quiver", "level_learned": 17, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Conjure Volley", "level_learned": 17, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Commune with Nature", "level_learned": 17, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Steel Wind Strike", "level_learned": 17, "ability_class": "Ranger", "ability_equipped": false },
    { "ability_name": "Tree Stride", "level_learned": 17, "ability_class": "Ranger", "ability_equipped": false },
    
        // Monk Abilities
        { "ability_name": "Flurry of Blows", "level_learned": 2, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Patient Defense", "level_learned": 2, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Step of the Wind", "level_learned": 2, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Deflect Missiles", "level_learned": 3, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Slow Fall", "level_learned": 4, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Extra Attack", "level_learned": 5, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Stunning Strike", "level_learned": 5, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Ki-Empowered Strikes", "level_learned": 6, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Evasion", "level_learned": 7, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Stillness of Mind", "level_learned": 7, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Purity of Body", "level_learned": 10, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Tongue of the Sun and Moon", "level_learned": 13, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Diamond Soul", "level_learned": 14, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Timeless Body", "level_learned": 15, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Empty Body", "level_learned": 18, "ability_class": "Monk", "ability_equipped": false },
        { "ability_name": "Perfect Self", "level_learned": 20, "ability_class": "Monk", "ability_equipped": false },

// Fighter Abilities
{ "ability_name": "Second Wind", "level_learned": 1, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Action Surge", "level_learned": 2, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Improved Critical", "level_learned": 3, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Extra Attack", "level_learned": 5, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Indomitable", "level_learned": 9, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Brutal Critical", "level_learned": 10, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Relentless", "level_learned": 15, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Survivor", "level_learned": 18, "ability_class": "Fighter", "ability_equipped": false },
{ "ability_name": "Indomitable Might", "level_learned": 20, "ability_class": "Fighter", "ability_equipped": false },

// Rogue Abilities
{ "ability_name": "Sneak Attack", "level_learned": 1, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Cunning Action", "level_learned": 2, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Uncanny Dodge", "level_learned": 5, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Evasion", "level_learned": 7, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Reliable Talent", "level_learned": 11, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Blindsense", "level_learned": 14, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Slippery Mind", "level_learned": 15, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Elusive", "level_learned": 18, "ability_class": "Rogue", "ability_equipped": false },
{ "ability_name": "Stroke of Luck", "level_learned": 20, "ability_class": "Rogue", "ability_equipped": false },

// Sorcerer Abilities
{ "ability_name": "Magic Missile", "level_learned": 1, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Mage Armor", "level_learned": 1, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Shield", "level_learned": 1, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Burning Hands", "level_learned": 1, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Mirror Image", "level_learned": 2, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Scorching Ray", "level_learned": 2, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Web", "level_learned": 2, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Counterspell", "level_learned": 3, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Fireball", "level_learned": 3, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Lightning Bolt", "level_learned": 3, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Dimension Door", "level_learned": 4, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Polymorph", "level_learned": 4, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Cone of Cold", "level_learned": 5, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Wall of Force", "level_learned": 5, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Chain Lightning", "level_learned": 6, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Disintegrate", "level_learned": 6, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Teleport", "level_learned": 7, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Finger of Death", "level_learned": 7, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Maze", "level_learned": 8, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Mind Blank", "level_learned": 8, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Meteor Swarm", "level_learned": 9, "ability_class": "Sorcerer", "ability_equipped": false },
{ "ability_name": "Wish", "level_learned": 9, "ability_class": "Sorcerer", "ability_equipped": false },

    // Artificer Spells
    { "ability_name": "Cure Wounds", "level_learned": 1, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Guiding Bolt", "level_learned": 1, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Thunderwave", "level_learned": 1, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Magic Missile", "level_learned": 1, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Healing Word", "level_learned": 2, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Invisibility", "level_learned": 2, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Mirror Image", "level_learned": 2, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Scorching Ray", "level_learned": 2, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Counterspell", "level_learned": 3, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Fireball", "level_learned": 3, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Fly", "level_learned": 3, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Haste", "level_learned": 3, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Lightning Bolt", "level_learned": 3, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Arcane Eye", "level_learned": 4, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Dimension Door", "level_learned": 4, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Fabricate", "level_learned": 4, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Greater Invisibility", "level_learned": 4, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Wall of Fire", "level_learned": 4, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Cloudkill", "level_learned": 5, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Cone of Cold", "level_learned": 5, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Dominate Person", "level_learned": 5, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Wall of Force", "level_learned": 5, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Animate Objects", "level_learned": 6, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Globe of Invulnerability", "level_learned": 6, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Mass Suggestion", "level_learned": 6, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "True Seeing", "level_learned": 6, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Delayed Blast Fireball", "level_learned": 7, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Etherealness", "level_learned": 7, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Finger of Death", "level_learned": 7, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Forcecage", "level_learned": 7, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Teleport", "level_learned": 7, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Crown of Stars", "level_learned": 7, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Demiplane", "level_learned": 8, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Dominate Monster", "level_learned": 8, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Feeblemind", "level_learned": 8, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Meteor Swarm", "level_learned": 9, "ability_class": "Artificer", "ability_equipped": false },
    { "ability_name": "Power Word Stun", "level_learned": 9, "ability_class": "Artificer", "ability_equipped": false },

    // Warlock Spells

        { "ability_name": "Eldritch Blast", "level_learned": 1, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Hex", "level_learned": 1, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Armor of Agathys", "level_learned": 1, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Hellish Rebuke", "level_learned": 1, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Witch Bolt", "level_learned": 1, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Mirror Image", "level_learned": 2, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Misty Step", "level_learned": 2, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Hold Person", "level_learned": 2, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Invisibility", "level_learned": 2, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Darkness", "level_learned": 2, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Counterspell", "level_learned": 3, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Fly", "level_learned": 3, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Fireball", "level_learned": 3, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Stinking Cloud", "level_learned": 3, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Fear", "level_learned": 3, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Banishment", "level_learned": 4, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Dimension Door", "level_learned": 4, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Blight", "level_learned": 4, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Phantasmal Killer", "level_learned": 4, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Greater Invisibility", "level_learned": 4, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Hold Monster", "level_learned": 5, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Cloudkill", "level_learned": 5, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Contact Other Plane", "level_learned": 5, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Dominate Person", "level_learned": 5, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Infernal Calling", "level_learned": 5, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Planar Binding", "level_learned": 5, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Blight", "level_learned": 6, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Create Undead", "level_learned": 6, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Eyebite", "level_learned": 6, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Flesh to Stone", "level_learned": 6, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Mass Suggestion", "level_learned": 6, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "True Seeing", "level_learned": 6, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Circle of Death", "level_learned": 7, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Finger of Death", "level_learned": 7, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Forcecage", "level_learned": 7, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Plane Shift", "level_learned": 7, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Scrying", "level_learned": 7, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Arcane Gate", "level_learned": 8, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Demiplane", "level_learned": 8, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Dominate Monster", "level_learned": 8, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Feeblemind", "level_learned": 8, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Glibness", "level_learned": 8, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Power Word Stun", "level_learned": 8, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Time Stop", "level_learned": 9, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "True Polymorph", "level_learned": 9, "ability_class": "Warlock", "ability_equipped": false },
        { "ability_name": "Wish", "level_learned": 9, "ability_class": "Warlock", "ability_equipped": false }
    ]
    
    const [levelFilter, setLevelFilter] = useState()

    const [classFilter, setClassFilter] = useState()

    

    function omegaFilter (element){
        console.log('element', element)
        return  element.level_learned <= levelFilter &&  element.ability_class == classFilter && element.ability_equipped == false
        
    }

    let omgegaAbilities = abilities.filter(omegaFilter)

   
    

    let abiltitiesEquipped = []

    const [equippedAbilities, setEquippedAbilities] = useState([])

    const [character, setCharacter]= useState([])

    let { characterId } = useParams() 

    let navigate = useNavigate()

    useEffect(()=>{
        const getAbilities = async () => {
            const response = await axios.get(`http://localhost:3001/Ability/character/${characterId}`)
            setEquippedAbilities(response.data)
            
            
            
        }
        getAbilities()
        const getCharacters = async () => {
            const characterRes = await axios.get(`http://localhost:3001/Character/${characterId}`)
            setCharacter(characterRes.data)
            setClassFilter(characterRes.data.class_name)
            setLevelFilter(characterRes.data.level)
            
        }
        getCharacters()
        console.log("levelAbilities",levelAbilities.length)
        
            omgegaAbilities.forEach((levelAbility) => {
        const setAbilities = async () => {
            const abilityRes = await axios.post(`http://localhost:3001/Ability`, {
                ability_name: levelAbility.ability_name,
                level_learned: levelAbility.level_learned,
                ability_equipped: levelAbility.ability_equipped,
                ability_class: `${character.class_name}`,
                characterId: `${characterId}`

            },)
        }
    setAbilities()})
    }, [])

    const setTrue = (array,index) =>{//array is filtered abilities
       
        if (array.ability_equipped === false){
            array.ability_equipped = true  

          abilities.forEach((abilities) => {
           
            if (abilities.ability_name == array.ability_name && abilities.ability_class == character.class_name) {
                abilities.ability_equipped = array.ability_equipped
                abiltitiesEquipped.push(abilities)
                const addEquipped = async() => {
                    try{
                   const response = await axios.post(`http://localhost:3001/Ability`,{
                    ability_name: abilities.ability_name,
                    level_learned: abilities.level_learned,
                    ability_equipped: abilities.ability_equipped,
                    ability_class: `${character.class_name}`,
                    characterId: `${characterId}`
                   }, ) 
                    console.log("Added ability", response.data)  
                    } catch (error) {
                        console.error('Slippery fingers! Could not equip ability!', error)
                    }
                }
                addEquipped()
                
                navigate('')        
            }            
          })
          
          navigate('')
        } else{

        }
        
     }

     const setFalse = (array, index) => {
        console.log("Equipped", equippedAbilities)
        console.log("array", array, "index", index)
        array.ability_equipped = false
        console.log('id',array._id)
        const toggleEquip = async () => {
          const response = await axios.put(`http://localhost:3001/Ability/${array._id}`, {
                
                ability_name: `${array.ability_name}`,
                level_learned: `${array.level_learned}`,
                ability_equipped: false,
                ability_class: `${array.ability_class}`,
                characterId: `${array.characterId}`
            },)
            navigate(``) } 
        toggleEquip()

        console.log('TEST',equippedAbilities[index])        
        navigate(``)
     }

    

     


    

    function equipFilter (element) {
        return element.ability_equipped == true
    }

    const displayedAbilities = equippedAbilities.filter(equipFilter)
    console.log('displayedAbilities', displayedAbilities)
    
    const levelAbilities = equippedAbilities.filter(omegaFilter)

    console.log('displayed abilities', levelAbilities)  
    
return (   
            
                <div className ="AbilityList">
                   
                    <h1>Add {character.class_name} Abilities!</h1>
                   
                    
                         <div className ="chooseAbility">
                            <input type="number" value={levelFilter} onChange={e => setLevelFilter(e.target.value)} min = {1} max = {20} />
                            <ul>                               
                                {
                                    levelAbilities.map((levelAbility, index) => (
                                        <li key ={index} onClick={()=>setTrue(levelAbility,index)}>{levelAbility.ability_name}</li>
                                    ))
                                }
                            </ul>

                         </div>
                         <div className="equippedAbilities">
                            <h3> {character.character_name}'s equipped abilities</h3>
                            {
                                displayedAbilities.map((displayedAbility, index)=> (
                                    <div className="equipABilityDiv" key ={index} onClick={()=>setFalse(displayedAbility, index)} >
                                        <h3>{displayedAbility.ability_name}</h3>

                                    </div>
                                ))
                            }
                         </div>                       

                           
                         </div>
        )
}



  {/* <Accordion  alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Acid Splash</Accordion.Header>
                                <Accordion.Body>
                                    Throw some dang acid on them man
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Fire Bolt</Accordion.Header>
                                <Accordion.Body>
                                    Throw some dang fire on them man
                                </Accordion.Body>
                            </Accordion.Item>

                         </Accordion> */}

                          {/* <DropdownButton id="drop-basic-button" title={classFilter} >
                        <Dropdown.Item href="#/action-1" onClick={()=>setClassFilter("Barbarian")} >Barbarian</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={()=>setClassFilter("Bard")}>Bard</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={()=>setClassFilter("Cleric")}>Cleric</Dropdown.Item>
                        <Dropdown.Item href="#/action-4" onClick={()=>setClassFilter("Druid")}>Druid</Dropdown.Item>
                        <Dropdown.Item href="#/action-5" onClick={()=>setClassFilter("Fighter")}>Fighter</Dropdown.Item>
                        <Dropdown.Item href="#/action-6" onClick={()=>setClassFilter("Monk")}>Monk</Dropdown.Item>
                        <Dropdown.Item href="#/action-7" onClick={()=>setClassFilter("Paladin")}>Paladin</Dropdown.Item>
                        <Dropdown.Item href="#/action-8" onClick={()=>setClassFilter("Ranger")}>Ranger</Dropdown.Item>
                        <Dropdown.Item href="#/action-9" onClick={()=>setClassFilter("Rogue")}>Rogue</Dropdown.Item>
                        <Dropdown.Item href="#/action-10" onClick={()=>setClassFilter("Sorcerer")}>Sorcerer</Dropdown.Item>
                        <Dropdown.Item href="#/action-11" onClick={()=>setClassFilter("Warlock")}>Warlock</Dropdown.Item>
                        <Dropdown.Item href="#/action-12" onClick={()=>setClassFilter("Wizard")}>Wizard</Dropdown.Item>
                    </DropdownButton> */}