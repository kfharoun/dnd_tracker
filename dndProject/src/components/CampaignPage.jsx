import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CharacterList() {
  const [characterInfo, setCharacterInfo] = useState(null);
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

        // Check if campaignData contains a character_id or another identifier for character
        if (campaignData._id) {
          // Fetch character details if character_id is present
          const characterResponse = await axios.get(`http://localhost:3001/Character/campaign/${id}`);
          setCharacterInfo(characterResponse.data);
        } else {
          console.log('No character ID found in campaign data')
          setCharacterInfo(null); // Reset character state if no valid character ID
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id])


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Character Details</h2>
      {characterInfo.length > 0 ? (
        characterInfo.map((character) => (
          <div key={character._id}>
            <h3>{character.character_name}</h3>
            {/* Display other character details as needed */}
          </div>
        ))
      ) : (
        <p>No characters found for this campaign.</p>
      )}

      <h2>Campaign Details</h2>
      <div>
        <h3>{campaign.campaign_name}</h3>
        <p>{campaign.campaign_info}</p>
        <p>Dungeon Master: {campaign.dungeon_master}</p>
        <p>Players: {campaign.players ? campaign.players.join(', ') : ''}</p>
      </div>
    </div>
  );
}