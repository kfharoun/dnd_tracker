import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function CharacterList() {
  const [character, setCharacter] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Character/${id}`)
        setCharacter(response.data)
      } catch (error) {
        console.error("character not found:", error)
        setCharacter(null) 
      }
    }

    getCharacter()
  }, [id])

  console.log("character", character)

  if (!character) {
    return <h1>character not found. try again?</h1> 
  }

  return (
    <div className="CharacterPage">

        <div className="char-list">
            <img src={character.character_image} width="250px" alt={`image of ${character.character_name}`} />
            <h1>{character.character_name}</h1>
            <p><b>campaign name will go here</b></p>
            <p className="charLore">{character.lore}</p>
        </div>

        <div className="char-list-two">
          <div className="stattitle">
                <h1>stats</h1>
                <div className="stat-info">
                  <p>played by {character.played_by}</p>
                  <p>level {character.level}</p>
                  <p>{character.race} {character.class_name}</p>
                  <p>{character.subclass_name}</p>
                </div>
          </div>
            <div className="stats">
                <p>armor class: {character.armor_class}</p>
                <p>hit points: {character.hit_points}</p>
                <p>strength: {character.strength}</p>
                <p>dexterity: {character.dexterity}</p>
                <p>constitution: {character.constitution}</p>
                <p>intelligence: {character.intelligence}</p>
                <p>wisdom: {character.wisdom}</p>
                <p>charisma: {character.charisma}</p>
            </div>
            <div className="charPageButtons">
                <button className="abilityButton">ability log</button>
                <button className="updateButton">update character</button>
            </div>
        </div>
      </div>
  )
}
