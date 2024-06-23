import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import CharacterList from './CharacterList'
import CampaignList from './CampaignList'
import AbilityList from './AbilityList'
import CharacterPage from './CharacterPage'


export default function Main () {
    return (
       <div className ="Main">
        <Routes>
            <Route path ="/" element = {<Home />}/>
            <Route path ="/Character" element ={<CharacterList />}/>
            <Route path ="/Campaign" element ={<CampaignList />}/>
            <Route path ="/Abilities" element = {<AbilityList />}/>
            <Route path ="/Character/:id" element = {<CharacterPage/>}/>
        </Routes>
       </div>
    )

}