import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <div className="CampaignListBack"></div>
            {campaigns.map((campaign) => (
                <div
                    className="campaignDiv"
                    key={campaign._id}
                    onClick={() => handleCampaignClick(campaign._id)}
                    style={{ cursor: "pointer" }}
                >
                    <h3 className="campaignNameList">{campaign.campaign_name}</h3>
                </div>
            ))}
            <Link to="/NewCampaign"><button className="newcampaignbutton one" onClick={handleNewCampaignClick}>New Campaign</button></Link>
        </div>
    );
}