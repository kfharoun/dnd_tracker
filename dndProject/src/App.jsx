import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import DataContext from './DataContext'
import axios from 'axios'

function App() {
  const [charInfo, setCharInfo] = useState({
    names: [],
    ids: []
  })

  useEffect(() => {
    axios.get('http://localhost:3001/Character')
      .then(response => {
        const names = response.data.map(character => character.character_name)
        const ids = response.data.map(character => character._id)
        setCharInfo({ names, ids })
      })
      .catch(error => {
        console.error('Error fetching character data:', error)
      })
  }, [])

  const updateCharInfo = (name, id) => {
    const updatedNames = [...charInfo.names]
    const updatedIds = [...charInfo.ids]
    const index = updatedIds.indexOf(id)

    if (index !== -1) {
      updatedNames[index] = name
    } else {
      updatedNames.push(name)
      updatedIds.push(id)
    }

    setCharInfo({
      names: updatedNames,
      ids: updatedIds
    })
  }

  return (
    <div className="App">
      <DataContext.Provider value={{ charInfo, setCharInfo, updateCharInfo }}>
        <Header />
        <Main />
        <Footer />
      </DataContext.Provider>
    </div>
  )
}

export default App



