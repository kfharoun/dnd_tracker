// NewCharacter.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const defaultImageUrl = "https://www.gamersdecide.com/sites/default/files/styles/news_images/public/screenhunter_02_6.jpg"

const classesOptions = [
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard"
];

const NewCharacter = ({ campaignId }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(campaignId || "");
  const [characterData, setCharacterData] = useState({
    character_name: "",
    played_by: "",
    character_image: "url, optional",
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
      // Check if character_image is still "url, optional", then set it to defaultImageUrl
      const imageData = {
        ...characterData,
        character_image: characterData.character_image === "url, optional" ? defaultImageUrl : characterData.character_image,
      };
  
      // Make a single API call to create the character
      const response = await axios.post(
        "http://localhost:3001/Character",
        imageData
      );
  
      console.log("Character created:", response.data);
  
      // Reset form fields after successful character creation
      setCharacterData({
        character_name: "",
        played_by: "",
        character_image: "url, optional",
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
  
      // Navigate to the campaign page after successful creation
      navigate(`/campaign/${characterData.campaignId}`);
    } catch (error) {
      console.error("Error creating character:", error);
    }
  };
  

  return (
    <div className="NewCharacter NewCampaign">
      <div className="charPageBack"></div>
      <div className="container form newcharform">
        <h2 className="createnewchar">Create New Character</h2>
        <Form onSubmit={handleSubmit} className="needs-validation" noValidate>
  <Row>
    <Col lg={4} md={3} sm={3}>
      {/* Character Name */}
      <Form.Group controlId="formCharacterName">
        <Form.Label>Character Name</Form.Label>
        <Form.Control
          type="text"
          name="character_name"
          value={characterData.character_name}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter a character name.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Played By */}
      <Form.Group controlId="formPlayedBy">
        <Form.Label>Played By</Form.Label>
        <Form.Control
          type="text"
          name="played_by"
          value={characterData.played_by}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the player's name.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Race */}
      <Form.Group controlId="formRace">
        <Form.Label>Race</Form.Label>
        <Form.Control
          type="text"
          name="race"
          value={characterData.race}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's race.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Class Name */}
      <Form.Group controlId="formClassName">
        <Form.Label>Class Name</Form.Label>
        <Form.Control
          as="select"
          name="class_name"
          value={characterData.class_name}
          onChange={handleChange}
          required
        >
          <option value="">Select Class</option>
          {classesOptions.map((classOption, index) => (
            <option key={index} value={classOption}>
              {classOption}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select a character class.
        </Form.Control.Feedback>
      </Form.Group>
    {/* Subclass Name */}
    <Form.Group controlId="formSubclassName">
        <Form.Label>Subclass Name</Form.Label>
        <Form.Control
          type="text"
          name="subclass_name"
          value={characterData.subclass_name}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's subclass name.
        </Form.Control.Feedback>
      </Form.Group>
    
    
    </Col>

    <Col lg={4} md={3} sm={3}>
    {/* Character Image */}
    <Form.Group controlId="formCharImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="character_image"
          value={characterData.character_image}
          onChange={handleChange}
          placeholder="url, optional"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's armor class.
        </Form.Control.Feedback>
        {/* Display the image */}
      </Form.Group>
      {/* Level */}
      <Form.Group controlId="formLevel">
        <Form.Label>Level</Form.Label>
        <Form.Control
          type="number"
          name="level"
          value={characterData.level}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's level.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Armor Class */}
      <Form.Group controlId="formArmorClass">
        <Form.Label>Armor Class</Form.Label>
        <Form.Control
          type="number"
          name="armor_class"
          value={characterData.armor_class}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's armor class.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Hit Points */}
      <Form.Group controlId="formHitPoints">
        <Form.Label>Hit Points</Form.Label>
        <Form.Control
          type="number"
          name="hit_points"
          value={characterData.hit_points}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's hit points.
        </Form.Control.Feedback>
      </Form.Group>

          {/* Strength */}
      <Form.Group controlId="formStrength">
        <Form.Label>Strength</Form.Label>
        <Form.Control
          type="number"
          name="strength"
          value={characterData.strength}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's strength.
        </Form.Control.Feedback>
      </Form.Group>
      
    </Col>

    <Col lg={4} md={3}sm={2}> 
      

      {/* Dexterity */}
      <Form.Group controlId="formDexterity">
        <Form.Label>Dexterity</Form.Label>
        <Form.Control
          type="number"
          name="dexterity"
          value={characterData.dexterity}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's dexterity.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Constitution */}
      <Form.Group controlId="formConstitution">
        <Form.Label>Constitution</Form.Label>
        <Form.Control
          type="number"
          name="constitution"
          value={characterData.constitution}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's constitution.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Intelligence */}
      <Form.Group controlId="formIntelligence">
        <Form.Label>Intelligence</Form.Label>
        <Form.Control
          type="number"
          name="intelligence"
          value={characterData.intelligence}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's intelligence.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Wisdom */}
      <Form.Group controlId="formWisdom">
        <Form.Label>Wisdom</Form.Label>
        <Form.Control
          type="number"
          name="wisdom"
          value={characterData.wisdom}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's wisdom.
        </Form.Control.Feedback>
      </Form.Group>

      {/* Charisma */}
      <Form.Group controlId="formCharisma">
        <Form.Label>Charisma</Form.Label>
        <Form.Control
          type="number"
          name="charisma"
          value={characterData.charisma}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please enter the character's charisma.
        </Form.Control.Feedback>
      </Form.Group>
    </Col>
  
          <Col lg={12} md={3} sm={4}>
  {/* Lore */}
  <Form.Group controlId="formLore">
    <Form.Label>Lore</Form.Label>
    <Form.Control
      className="loreform"
      as="textarea"
      rows={6}
      name="lore"
      value={characterData.lore}
      onChange={handleChange}
      required
    />
    <Form.Control.Feedback type="invalid">
      Please enter the character's lore.
    </Form.Control.Feedback>
  </Form.Group>

  {/* Campaign */}
  <Form.Group controlId="formCampaign">
    <Form.Label>Campaign</Form.Label>
    <Form.Control
      as="select"
      name="campaignId"
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
    </Form.Control>
    <Form.Control.Feedback type="invalid">
      Please select a campaign.
    </Form.Control.Feedback>
  </Form.Group>
  </Col>
  </Row>
  {/* Submit Button */}
  <Button variant="primary" type="submit">
    Create Character
  </Button>
</Form>
      </div>
    </div>
)
}

export default NewCharacter;





