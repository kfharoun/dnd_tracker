import axios from "axios"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import Accordion from 'react-bootstrap/Accordion'


export default function AbilityList () {

    // let navigate = useNavigate()

    // const showCharacter = (index) => {
    //     navigate(`${index}`)
    // }
    let abiltitiesEquipped = []

    // useEffect(()=> {
    //     const addEquipped = async() => {
    //         abiltitiesEquipped = await axios.post(`http://localhost:3001/Ability`) 
    //     }
    //     addEquipped()
    // })



    const setTrue = (array,index) =>{
        
          array.ability_equipped === false ? array.ability_equipped = true : array.ability_equipped = false
          
          abilities.forEach((abilities) => {
            if (abilities.ability_name == array.ability_name) {
                abilities.ability_equipped = array.ability_equipped
                abiltitiesEquipped.push(abilities)
                const addEquipped = async() => {
                    try{
                   const response = await axios.post(`http://localhost:3001/Ability`,{
                    ability_name: abilities.ability_name,
                    level_learned: abilities.level_learned,
                    ability_equipped: abilities.ability_equipped,
                    ability_class: abilities.ability_class
                   }, ) 
                    console.log("Added ability", response.data)  
                    } catch (error) {
                        console.error('Slippery fingers! Could not equip ability!', error)
                    }
                }
                addEquipped()
                console.log("here",abilities.ability_equipped,"break", abilities)
                console.log('equipped', abiltitiesEquipped)            
            }            
          })
        // abilities.forEach((abilities, index) => {
        //     if (abilities.ability_equipped === true) {
        //         abiltitiesEquipped.push(abilities)
        //         console.log('equipped', abiltitiesEquipped)
        //     }
        // })
     }

//     ~~~~~~~~~~ psuedocode ~~~~~~~~~~~~

// abilities.forEach((abilities) => {
    // if (abilities.abilities.class = buttonValue){
    // map it out
    //}})



    // ~~~~~~~~~~~~~~~~~~~abilities call ~~~~~~~~~~~~
    // const [abilities, setAbilities] = useState([])

    // useEffect (() => {
    //     const getAbilities = async() => {
    //         const response = await axios.get(`http://localhost:3001/Ability`)
    //         setAbilities(response.data)
    //     }
    //     getAbilities()
    // },[])
    // console.log('Abilties', abilities)

    const [levelFilter, setLevelFilter] = useState(0)


    const abilities = [
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
        { "ability_name": "True Polymorph", "level_learned": 17, "ability_class": "Wizard", "ability_equipped": false }
    ]
    

    function filterLevel (element){
        return element.level_learned <= levelFilter
    }

    console.log('abilities', abilities)

    const levelAbilities = abilities.filter(filterLevel)





return (
    
            
                <div className ="AbilityList">
                    <h1>Character's Abilities!</h1>

                    
                         <div className ="chooseAbility">
                            <input type="number" value={levelFilter} onChange={e => setLevelFilter(e.target.value)} min = {1} />
                            <ul>
                               
                                {
                                    levelAbilities.map((levelAbility, index) => (
                                        <li key ={index} onClick={()=>setTrue(levelAbility,index)}>{levelAbility.ability_name}</li>
                                    ))
                                }
                            </ul>

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