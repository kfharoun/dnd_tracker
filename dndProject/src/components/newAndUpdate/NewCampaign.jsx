// src/components/NewCampaign.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCharacter from "./NewCharacter"
import { Link } from "react-router-dom";

export default function NewCampaign() {
    const [campaignName, setCampaignName] = useState("");
    const [campaignInfo, setCampaignInfo] = useState("");
    const [dungeonMaster, setDungeonMaster] = useState("");
    const [players, setPlayers] = useState("");
    const navigate = useNavigate();

    const handleCreateCampaign = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/Campaign', {
                campaign_name: campaignName,
                campaign_info: campaignInfo,
                dungeon_master: dungeonMaster,
                players: players.split(',').map(player => player.trim())
            });
            navigate(`/campaign/${response.data._id}`);
        } catch (error) {
            console.error('Error creating campaign', error);
        }
    };
    const handleNewCharacter = () => {
        navigate("/NewCharacter");
      };

    return (
        <div className="NewCampaign">
        <div className="CampaignListBack"></div>
        <Link className="returnCL" to="/Campaign">return to campaign list</Link>
        <div className="form">
        
            <h1 className="newcampigntitle">Starting a new adventure?</h1>
            
            <form onSubmit={handleCreateCampaign} className="campaign-form">
                <div className="form-group">
                    <label htmlFor="campaignName">Campaign Name</label>
                    <input 
                        type="text" 
                        id="campaignName"
                        className="form-control"
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dungeonMaster">Dungeon Master</label>
                    <input 
                        type="text" 
                        id="dungeonMaster"
                        className="form-control"
                        value={dungeonMaster}
                        onChange={(e) => setDungeonMaster(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="players">Players (comma separated)</label>
                    <input 
                        type="text" 
                        id="players"
                        className="form-control"
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                        required 
                    />
                <div className="form-group">
                    <label htmlFor="campaignInfo">Campaign Info</label>
                    <textarea
                        id="campaignInfo"
                        className="form-control campaignInfo"
                        value={campaignInfo}
                        onChange={(e) => setCampaignInfo(e.target.value)}
                        required
                    />
                </div>
                </div>
                <div className="characterbuttons">
                <button type="submit" className="btn btn-primary two">Create Campaign</button>
                {/* <button type="button" className="btn btn-primary one" onClick={handleNewCharacter}>Create Character</button> */}
                </div>
            </form>
        </div>
    </div>
)
}