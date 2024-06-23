import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function CharacterList() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get("http://localhost:3001/Character")
      setCharacters(response.data)
    }

    fetchCharacters()
  }, [])

  return (
    <div className="CharacterList">
      {characters.map((character) => (
        <Link key={character._id} to={`/character/${character._id}`} className="characterDiv">
          <h3>{character.character_name}</h3>
          <img src={character.character_image} alt={`image of ${character.character_name}`} width="200px" />
        </Link>
      ))}
    </div>
  )
}

