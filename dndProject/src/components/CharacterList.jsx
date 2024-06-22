import axios from "axios"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function CharacterList () {

    // let navigate = useNavigate()

    // const showCharacter = (index) => {
    //     navigate(`${$index}`)
    // }

    const [characters,setCharacters] = useState([])

    useEffect (()=>{
        const getCharacters = async () => {
            const response = await axios.get(`http://localhost:3001/Character`)
            setCharacters(response.data)
        }
        getCharacters()
    },[])
    console.log(`characters`, characters)
    return (
        <div classname="CharacterList">
            <h1> Character List!</h1>
            {
                characters.map((character, index)=> (
                    <div className="characterDiv" key ={index}>
                        <h3>{character.character_name}</h3>

                    </div>
                ))
            }
        </div>
    )
}