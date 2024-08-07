
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import CharacterList from './CharacterList';
import CampaignList from './CampaignList';
import AbilityList from './AbilityList';
import CharacterPage from './CharacterPage';
import CampaignPage from './CampaignPage';
import NewCampaign from './newAndUpdate/NewCampaign'
import NewCharacter from "./newAndUpdate/NewCharacter"

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Character" element={<CharacterList />} />
                <Route path="/Campaign" element={<CampaignList />} />
                <Route path="/Abilities/character/:characterId" element={<AbilityList />} />
                <Route path="/Character/:id" element={<CharacterPage />} />
                <Route path="/Campaign/:id" element={<CampaignPage />} />
                <Route path="/NewCampaign" element={<NewCampaign />} />
                <Route path="/NewCharacter" element={<NewCharacter />} />
            </Routes>
        </div>
    );
}

// modal