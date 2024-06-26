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
                if (campaignData._id) {
                    const characterResponse = await axios.get(`http://localhost:3001/Character/campaign/${id}`);
                    setCharacterInfo(characterResponse.data);
                } else {
                    console.log('No character ID found in campaign data');
                    setCharacterInfo([]);
                }

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

    return (
        <div className="CampaignDetails">
            <h2>Campaign Details</h2>
            <div>
                <h3>{campaign.campaign_name}</h3>
                <p>{campaign.campaign_info}</p>
                <p>Dungeon Master: {campaign.dungeon_master}</p>
                <p>Players: {campaign.players ? campaign.players.join(', ') : ''}</p>
            </div>

            <h2>Character Details</h2>
            {characterInfo.length > 0 ? (
                characterInfo.map((character) => (
                    <div
                        key={character._id}
                        style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}
                        onClick={() => navigate(`/Character/${character._id}`)}
                    >
                        <img
                            src={character.character_image}
                            alt={`${character.character_name}`}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                        />
                        <h3 style={{ margin: 0 }}>{character.character_name}</h3>
                    </div>
                ))
            ) : (
                <p>No one has yet taken this path. Add a character?</p>
            )}

            <button className="newCharacterButton" onClick={handleNewCharacterClick}>New Character</button>

            <div style={{ marginTop: '20px' }}>
                <h2>Import Character</h2>
                <select
                    value={selectedCharacter}
                    onChange={(e) => setSelectedCharacter(e.target.value)}
                >
                    <option value="">Select a character</option>
                    {allCharacters.map((character) => (
                        <option key={character._id} value={character._id}>
                            {character.character_name}
                        </option>
                    ))}
                </select>
                <button onClick={handleImportCharacter}>Import Character</button>
            </div>
        </div>
    );
}
