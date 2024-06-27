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

  const [camInfo, setCamInfo] = useState({
    names: [],
    ids: []
  })

  useEffect(() => {
    const contextData = async () => {
        const response = await axios.get('http://localhost:3001/Character')
        const names = response.data.map(character => character.character_name)
        const ids = response.data.map(character => character._id)
        setCharInfo({ names, ids })
      }
       contextData()
  }, [])

  useEffect(() => {
    const contextData = async () => {
      const response = await axios.get('http://localhost:3001/Campaign')
      const names = response.data.map(campaign => campaign.campaign_name)
      const ids = response.data.map(campaign => campaign._id)
      setCamInfo ({names, ids})
    }
    contextData()
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

  const updateCamInfo = (name, id) => {
    const updatedNames =[...camInfo.names]
    const updatedIds = [...camInfo.ids]
    const index = updatedIds.indesOf(id)

    if (index !== -1){
      updatedNames[index] = name
    } else {
      updatedNames.push(name)
      updatedIds.push(ids)
    }

    setCamInfo({
      names:updatedNames,
      ids: updatedIds
    })


  }

  return (
    <div className="App">
      <DataContext.Provider value={{ charInfo, setCharInfo, updateCharInfo , camInfo, setCamInfo, updateCamInfo}}>
        <Header />
        <Main />
        <Footer />
      </DataContext.Provider>
    </div>
  )
}

export default App



