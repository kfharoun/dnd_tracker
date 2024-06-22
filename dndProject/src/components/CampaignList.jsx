import axios from "axios"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export default function CampaignList () {

    // let navigate = useNavigate()

    // const showCharacter = (index) => {
    //     navigate(`${index}`)
    // }

    const [campaigns, setCampaigns] = useState([])

    useEffect (() => {
        const getCampaigns = async() => {
            const response = await axios.get(`http://localhost:3001/Campaign`)
            setCampaigns(response.data.campaigns)
        }
        getCampaigns()
    },[])
    console.log('campaigns', campaigns)
    return (
        <div className ="CampaignList">
            <h1>Campaign List!</h1>
            {
                campaigns.map((campaign, index)=> (
                    <div className="campaignDiv" key = {index}>
                        <h3>{campaign.campaign_name}</h3>
                        </div>
                ))
            }
        </div>
    )
}