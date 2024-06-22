import axios from "axios"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function AbilityList () {

    // let navigate = useNavigate()

    // const showCharacter = (index) => {
    //     navigate(`${index}`)
    // }

    const [abilities, setAbilities] = useState([])

    useEffect (() => {
        const getAbilities = async() => {
            const response = await axios.get(`http://localhost:3001/Ability`)
            setAbilities(response.data)
        }
        getAbilities()
    },[])
    console.log('Abilties', abilities)
    return (
        <div className ="AbilityList">
            <h1>Campaign List!</h1>
            {
                abilities.map((ability, index)=> (
                    <div className="just checking to see if you are paying attention muahahahaha" key = {index}>
                        <h3>{ability.ability_name}</h3>
                        </div>
                ))
            }
        </div>
    )
}