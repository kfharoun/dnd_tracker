import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CampaignPage = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getCampaign = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/Campaign/${id}`);
        setCampaign(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Campaign not found:", error);
        setError("Campaign not found. Please try again.");
        setLoading(false);
      }
    };

    getCampaign();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if campaign is null or undefined (handle unexpected cases)
  if (!campaign) {
    return <div>Campaign data is not available.</div>;
  }

  // Join player names directly from the array
  const playerNames = campaign.players && campaign.players.length > 0
    ? campaign.players.join(", ")
    : "No players found";

  return (
    <div className="campaign-page">
      <h1>{campaign.campaign_name}</h1>
      <p>Campaign Information: {campaign.campaign_info}</p>
      <p>Dungeon Master: {campaign.dungeon_master}</p>
      <p>Players: {playerNames}</p>
    </div>
  );
};

export default CampaignPage;