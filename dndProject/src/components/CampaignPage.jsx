import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CampaignPage() {
    const [characterInfo, setCharacterInfo] = useState([]);
    const [allCharacters, setAllCharacters] = useState([]);
    const [campaign, setCampaign] = useState({});
    const [selectedCharacter, setSelectedCharacter] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const campaignResponse = await axios.get(`http://localhost:3001/Campaign/${id}`);
                const campaignData = campaignResponse.data;
                setCampaign(campaignData);

                // Fetch characters already in this campaign
                const characterResponse = await axios.get(`http://localhost:3001/Character/campaign/${id}`);
                setCharacterInfo(characterResponse.data);

                // Fetch all characters
                const allCharacterResponse = await axios.get(`http://localhost:3001/Character`);
                setAllCharacters(allCharacterResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleNewCharacterClick = () => {
        navigate(`/NewCharacter?campaignId=${id}`);
    };

    const handleImportCharacter = async () => {
        if (selectedCharacter) {
            try {
                await axios.put(`http://localhost:3001/Character/${selectedCharacter}`, {
                    campaignId: id,
                });
                // Refresh character list
                const characterResponse = await axios.get(`http://localhost:3001/Character/campaign/${id}`);
                setCharacterInfo(characterResponse.data);
                setSelectedCharacter("");
            } catch (error) {
                console.error('Error importing character:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Create a Set of IDs of characters already in the campaign
    const characterIdsInCampaign = new Set(characterInfo.map(character => character._id));

    // Filter all characters to exclude those already in the campaign
    const availableCharacters = allCharacters.filter(character => !characterIdsInCampaign.has(character._id));

    return (
        <div className="CampaignDetails">
            <div className="divAndList">

                <div className="charPageBack"></div>
                <div className="CampaignDetailDesc">
                    <h3 className="campaignname">{campaign.campaign_name}</h3>
                    <p className="campaigninfo">{campaign.campaign_info}</p>
                    <p className="dm">Dungeon Master: {campaign.dungeon_master}</p>
                    <p className="players">Players: {campaign.players ? campaign.players.join(', ') : ''}</p>
                </div>
                <div className="characterdetails">
                    <h2 className="CharacterDetailTitle">Characters on this journey</h2>
                    <div className="characterdet">
                        {characterInfo.length > 0 ? (
                            characterInfo.map((character) => (
                                <div
                                    className="CharacterDetailCharacterList list"
                                    key={character._id}
                                    style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}
                                    onClick={() => navigate(`/Character/${character._id}`)}
                                >
                                    <img
                                        className="CharacterDetailImage list"
                                        src={character.character_image}
                                        alt={`image of ${character.character_name}`}
                                    />
                                    <h3 className="CharacterDetailCharName">{character.character_name}</h3>
                                </div>
                            ))
                        ) : (
                            <p>No one has yet taken this path. Add a character?</p>
                        )}

                    </div>
                </div>
            </div>
            <div className="ImportCharacter" style={{ marginTop: '20px' }}>

                <div className="CampaignPageStuff"> 
                    <h2 className="ImportCharText">Import Character</h2>
                    <select
                        className="importcharselect"
                        value={selectedCharacter}
                        onChange={(e) => setSelectedCharacter(e.target.value)}
                    >
                        <option value="">Select a character</option>
                        {availableCharacters.map((character) => (
                            <option className="importcharoption" key={character._id} value={character._id}>
                                {character.character_name}
                            </option>
                        ))}
                    </select>
                    <button className="btn btn-primary importcharbutton" onClick={handleImportCharacter}>Import Character</button>

                </div>
                <button className="btn btn-primary newchar-button" onClick={handleNewCharacterClick}>Create New Character</button>
            </div>
        </div>
    );
}
