import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataContext from '../DataContext'

const CharacterList = () => {
  const { setCharInfo } = useContext(DataContext)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const getCharacters = async () => {
        const response = await axios.get('http://localhost:3001/Character')
        const characterNames = response.data.map(character => ({
          name: character.character_name,
          id: character._id
        }));
        setCharacters(response.data)
        setCharInfo({
          names: characterNames.map(character => character.name),
          ids: characterNames.map(character => character.id)
        })
    }

    getCharacters()
  }, [setCharInfo])

  return (
    <div className="CharacterList">
      {characters.map(character => (
        <Link
          key={character._id}
          to={`/character/${character._id}`}
          className="characterDiv"
        >
          <h3 className='charListName'>{character.character_name}</h3>
          <img
            className='charPic'
            src={character.character_image}
            alt={`image of ${character.character_name}`}
            width="200px"
          />
        </Link>
      ))}
      <div className='charListImage'></div>
    </div>
  )
}

export default CharacterList





