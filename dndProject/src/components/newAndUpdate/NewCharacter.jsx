// NewCharacter.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const classesOptions = [
  "Wizard",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Monk",
  "Fighter",
  "Rogue",
  "Sorcerer",
  "Artificer",
  "Warlock",
];

const NewCharacter = ({ campaignId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(campaignId || "");
  const [characterData, setCharacterData] = useState({
    character_name: "",
    played_by: "",
    character_image: "https://www.gamersdecide.com/sites/default/files/styles/news_images/public/screenhunter_02_6.jpg",
    race: "",
    class_name: "",
    subclass_name: "",
    armor_class: 0,
    hit_points: 0,
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    level: 1,
    lore: "",
    campaignId: campaignId,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available campaigns
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Campaign");
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCampaignChange = (e) => {
    setSelectedCampaign(e.target.value);
    setCharacterData((prevData) => ({
      ...prevData,
      campaignId: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/Character",
        characterData
      );
      console.log("Character created:", response.data);

      // Clear form fields after successful submission
      setCharacterData({
        character_name: "",
        played_by: "",
        character_image: "https://www.gamersdecide.com/sites/default/files/styles/news_images/public/screenhunter_02_6.jpg",
        race: "",
        class_name: "",
        subclass_name: "",
        armor_class: 0,
        hit_points: 0,
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        level: 1,
        lore: "",
        campaignId: campaignId,
      });

      // Navigate to the campaign page after character creation
      navigate(`/campaign/${characterData.campaignId}`);
    } catch (error) {
      console.error("Error creating character:", error);
    }
  };

  return (
    <div>
      <h2>Create New Character</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Character Name:
          <input
            type="text"
            name="character_name"
            value={characterData.character_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Played By:
          <input
            type="text"
            name="played_by"
            value={characterData.played_by}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Race:
          <input
            type="text"
            name="race"
            value={characterData.race}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Class:
          <select
            name="class_name"
            value={characterData.class_name}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            {classesOptions.map((classOption) => (
              <option key={classOption} value={classOption}>
                {classOption}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Subclass Name:
          <input
            type="text"
            name="subclass_name"
            value={characterData.subclass_name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Armor Class:
          <input
            type="number"
            name="armor_class"
            value={characterData.armor_class}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Hit Points:
          <input
            type="number"
            name="hit_points"
            value={characterData.hit_points}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Strength:
          <input
            type="number"
            name="strength"
            value={characterData.strength}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Dexterity:
          <input
            type="number"
            name="dexterity"
            value={characterData.dexterity}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Constitution:
          <input
            type="number"
            name="constitution"
            value={characterData.constitution}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Intelligence:
          <input
            type="number"
            name="intelligence"
            value={characterData.intelligence}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Wisdom:
          <input
            type="number"
            name="wisdom"
            value={characterData.wisdom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Charisma:
          <input
            type="number"
            name="charisma"
            value={characterData.charisma}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Level:
          <input
            type="number"
            name="level"
            value={characterData.level}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Lore:
          <textarea
            name="lore"
            value={characterData.lore}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Campaign:
          <select
            value={selectedCampaign}
            onChange={handleCampaignChange}
            required
          >
            <option value="">Select Campaign</option>
            {campaigns.map((campaign) => (
              <option key={campaign._id} value={campaign._id}>
                {campaign.campaign_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
};

export default NewCharacter;




