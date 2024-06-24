import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import DataContext from './DataContext';
import axios from 'axios'; // Import axios for API calls

function App() {
  const [charInfo, setCharInfo] = useState({
    names: [], 
    ids: []
  });

  // Function to update charInfo with new character
  const updateCharInfo = (name, id) => {
    const updatedNames = [...charInfo.names];
    const updatedIds = [...charInfo.ids];
    const index = updatedIds.indexOf(id);

    if (index !== -1) {
      updatedNames[index] = name;
    } else {
      updatedNames.push(name);
      updatedIds.push(id);
    }

    setCharInfo({
      names: updatedNames,
      ids: updatedIds
    });
  };

  return (  
    <div className ="App">
      <DataContext.Provider value={{ charInfo, setCharInfo, updateCharInfo }}>
        <Header />
        <Main />
        <Footer />
      </DataContext.Provider>
    </div>
  );
}

export default App;


