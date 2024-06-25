import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CampaignPage() {
    const [characterInfo, setCharacterInfo] = useState([]);
    const [campaign, setCampaign] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // This is the campaign ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch campaign details
                const campaignResponse = await axios.get(`http://localhost:3001/Campaign/${id}`);
                const campaignData = campaignResponse.data;
                setCampaign(campaignData);

                // Fetch character details if campaignData contains a valid _id
                if (campaignData._id) {
                    const characterResponse = await axios.get(`http://localhost:3001/Character/campaign/${id}`);
                    setCharacterInfo(characterResponse.data);
                } else {
                    console.log('No character ID found in campaign data');
                    setCharacterInfo([]); // Reset character state if no valid character ID
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Campaign Details */}
            <h2>Campaign Details</h2>
            <div>
                <h3>{campaign.campaign_name}</h3>
                <p>{campaign.campaign_info}</p>
                <p>Dungeon Master: {campaign.dungeon_master}</p>
                <p>Players: {campaign.players ? campaign.players.join(', ') : ''}</p>
            </div>

            {/* Character Details */}
            <h2>Character Details</h2>
            {characterInfo.length > 0 ? (
                characterInfo.map((character) => (
                    <div key={character._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img
                            src={character.character_image}
                            alt={`${character.character_name}`}
                            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                        />
                        <h3 style={{ margin: 0 }}>{character.character_name}</h3>
                    </div>
                ))
            ) : (
                <p>No characters found for this campaign.</p>
            )}
        </div>
    );
}
