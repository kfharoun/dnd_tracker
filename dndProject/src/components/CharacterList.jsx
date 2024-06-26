import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataContext from '../DataContext'

const CharacterList = () => {
  const { charInfo, setCharInfo, updateCharInfo } = useContext(DataContext)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Character')
        const characterNames = response.data.map(character => ({
          name: character.character_name,
          id: character._id
        }))
        setCharacters(response.data)

        if (charInfo.names.length === 0 && charInfo.ids.length === 0) {
          setCharInfo({
            names: characterNames.map(character => character.name),
            ids: characterNames.map(character => character.id)
          })
        }
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    getCharacters()
  }, [setCharInfo, charInfo.names, charInfo.ids])

  return (
    <div className='CharList'>
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
    <Link className="newcharbutton"to={'/NewCharacter'}>Create a new character?</Link>
    </div>
  )
}

export default CharacterList;






