import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/Campaign`);
                setCampaigns(response.data);
            } catch (error) {
                console.error("Error fetching campaigns", error);
            }
        };
        getCampaigns();
    }, []);

    const handleCampaignClick = (_id) => {
        if (_id) {
            navigate(`/campaign/${_id}`);
        } else {
            console.error("Campaign ID is undefined");
        }
    };

    const handleNewCampaignClick = () => {
        navigate('/NewCampaign');
    };

    return (
        <div className="CampaignList">
            <h1>Campaign List!</h1>
            <button onClick={handleNewCampaignClick}>New Campaign</button>
            {campaigns.map((campaign) => (
                <div
                    className="campaignDiv"
                    key={campaign._id}
                    onClick={() => handleCampaignClick(campaign._id)}
                    style={{ cursor: "pointer" }}
                >
                    <h3>{campaign.campaign_name}</h3>
                </div>
            ))}
        </div>
    );
}