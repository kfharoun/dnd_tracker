import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import DataContext from './DataContext'

function App() {
  const [charInfo, setCharInfo] = useState({
    names: [], 
    ids: []
  })

  return (  
    <div className ="App">
      <DataContext.Provider value={{ charInfo, setCharInfo }}>
        <Header />
        <Main />
        <Footer />
      </DataContext.Provider>
    </div>
  )
}

export default App;

