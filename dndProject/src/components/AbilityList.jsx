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

//    const setTrue = (index) =>{
//           ability.ability_equipped === false ? ability.ability_equipped = true : ability.ability_equipped = false
//           abilities.push(ability.ability_equipped)
//     }



    // const [abilities, setAbilities] = useState([])

    // useEffect (() => {
    //     const getAbilities = async() => {
    //         const response = await axios.get(`http://localhost:3001/Ability`)
    //         setAbilities(response.data)
    //     }
    //     getAbilities()
    // },[])
    // console.log('Abilties', abilities)
return (
    
            
                <div className ="AbilityList">
                    <h1>Character's Abilities!</h1>
                         <Accordion defaultActiveKey={["0"]} alwaysOpen>
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
                         </Accordion>  


                         </div>
                 

                
                
            
        )
        
    
}