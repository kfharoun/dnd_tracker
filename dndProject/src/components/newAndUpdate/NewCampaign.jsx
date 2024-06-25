// src/components/NewCampaign.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewCharacter from "./NewCharacter"

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
        <div>
            <h1>Create New Campaign</h1>
            <form onSubmit={handleCreateCampaign}>
                <label>
                    Campaign Name:
                    <input 
                        type="text" 
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        required 
                    />
                </label>
                <br />
                <label>
                    Campaign Info:
                    <textarea
                        value={campaignInfo}
                        onChange={(e) => setCampaignInfo(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Dungeon Master:
                    <input 
                        type="text" 
                        value={dungeonMaster}
                        onChange={(e) => setDungeonMaster(e.target.value)}
                        required 
                    />
                </label>
                <br />
                <label>
                    Players (comma separated):
                    <input 
                        type="text" 
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                        required 
                    />
                </label>
                <br />
                <button type="submit">Create Campaign</button>
                <button onClick={handleNewCharacter}>Create Character</button>
            </form>
        </div>
    );
}