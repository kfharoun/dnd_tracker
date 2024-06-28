import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import DataContext from "../DataContext";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([])
  const navigate = useNavigate()
  const { camInfo, setCamInfo } = useContext(DataContext)

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Campaign')
        setCampaigns(response.data)
        
        const campaignInfo = response.data.map(campaign => ({
          name: campaign.campaign_name,
          id: campaign._id
        }))

        if (camInfo.names.length === 0 && camInfo.ids.length === 0) {
          setCamInfo({
            names: campaignInfo.map(campaign => campaign.name),
            ids: campaignInfo.map(campaign => campaign.id)
          })
        }
      } catch (error) {
        console.error("Error fetching campaigns", error)
      }
    }
    getCampaigns()
  }, [setCamInfo, camInfo.names.length, camInfo.ids.length])

  const handleCampaignClick = (_id) => {
    if (_id) {
      navigate(`/campaign/${_id}`)
    } else {
      console.error("Campaign ID is undefined")
    }
  };

  const handleNewCampaignClick = () => {
    navigate('/NewCampaign')
  };

  return (
    <div className="CampaignList">
      <div className="CampaignList2">
        <div className="CampaignListBack"></div>
        {campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div
              className="campaignDiv"
              key={campaign._id}
              onClick={() => handleCampaignClick(campaign._id)}
              style={{ cursor: "pointer" }}
            >
              <h3 className="campaignNameList">{campaign.campaign_name}</h3>
            </div>
          ))
        ) : (
          <p>No current campaigns, create one!</p>
        )}
      </div>
      <Link to="/NewCampaign">
        <button className="newcampaignbutton one" onClick={handleNewCampaignClick}>New Campaign</button>
      </Link>
    </div>
  );
}

