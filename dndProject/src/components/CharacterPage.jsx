import axios from "axios"
import { useState, useEffect , useContext} from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Modal, Form, Button, Row, Col } from 'react-bootstrap'
import DataContext from '../DataContext'

export default function CharacterList(props) {
  const { updateCharInfo } = useContext(DataContext)
  const [character, setCharacter] = useState(null)
  const [campaignName, setCampaignName] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    character_name: "",
    lore: "",
    level: "",
    race: "",
    class_name: "",
    subclass_name: "",
    armor_class: "",
    hit_points: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    played_by: "",
    character_image: "",
    campaign: "" 
  })
  const [campaigns, setCampaigns] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getCharAndCampaign = async () => {
      try {
        const characterResponse = await axios.get(`http://localhost:3001/Character/${id}`)
        const characterData = characterResponse.data

        const campaignId = characterData.campaignId
        const campaignResponse = await axios.get(`http://localhost:3001/Campaign/${campaignId}`)
        const campaignData = campaignResponse.data

        setCharacter(characterData)
        setCampaignName(campaignData.campaign_name)
        setFormData({
          character_name: characterData.character_name,
          lore: characterData.lore,
          level: characterData.level,
          race: characterData.race,
          class_name: characterData.class_name,
          subclass_name: characterData.subclass_name,
          armor_class: characterData.armor_class,
          hit_points: characterData.hit_points,
          strength: characterData.strength,
          dexterity: characterData.dexterity,
          constitution: characterData.constitution,
          intelligence: characterData.intelligence,
          wisdom: characterData.wisdom,
          played_by: characterData.played_by,
          character_image: characterData.character_image,
          campaign: campaignData.campaign_name 
        })

        setLoading(false)
      } catch (error) {
        console.error('Cannot get character:', error)
        setLoading(false)
      }
    }

    getCharAndCampaign()
  }, [id])

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Campaign")
        setCampaigns(response.data) 
      } catch (error) {
        console.error('campaigns:', error)
      }
    }

    if (showModal) {
      getCampaigns()
    }
  }, [showModal])

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3001/Character/${id}`, formData)

      const updatedCharacterResponse = await axios.get(`http://localhost:3001/Character/${id}`)
      setCharacter(updatedCharacterResponse.data)
      updateCharInfo(formData.character_name, id)
      toggleModal() 
    } catch (error) {
      console.error('cant update character:', error)
    }
  }

  

  return loading ? (
    <h1>Loading...</h1>
  ) : character ? (
  <div className="CharacterPage">
      
  <div className="charPageBack"></div>
  
  <div className="characterlists">
 
  <div className="char-list">
    <img
      className="characterIMAGE"
      src={character.character_image}
      alt={`Image of ${character.character_name}`}
    />
    <h1 className="CharNameText">{character.character_name}</h1>
    <p className="campaignName">
      {campaignName}
    </p>
    <div className="charLore">
      <p className="charLoreText">{character.lore}</p>
    </div>
    <Link to="/Character" className='returncharacter'>return to character list</Link>

  </div>
  <div className="char-list-two">
  
    <div className="stattitle">
      <h1 className="topstats">Stats</h1>
      <div className="stat-info">
        <p>Played by {character.played_by}</p>
        <p>Level {character.level}</p>
        <p>{character.race} {character.class_name}</p>
        <p>{character.subclass_name}</p>
      </div>
    </div>
    
    <div className="stats">
      <p className="statinfo">Armor Class</p><p>{character.armor_class}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Hit Points</p><p>{character.hit_points}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Strength</p><p>{character.strength}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Dexterity</p><p>{character.dexterity}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Constitution</p><p>{character.constitution}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Intelligence</p><p>{character.intelligence}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Wisdom</p><p>{character.wisdom}</p>
    </div>

    <div className="stats">
      <p className="statinfo">Charisma</p><p>{character.charisma}</p>
    </div>
    
    <div className="charPageButtons">
    <Link to={`/Abilities/character/${character._id}`}><button className="abilityButton two" >Ability Log</button></Link>
      <button className="updateButton one" onClick={toggleModal}>Update Character</button>
    </div>
  </div>
  </div>

      {/* Modal for update form */}
      <Modal show={showModal} onHide={toggleModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Update Character</Modal.Title>
  </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6}>
              <Form.Group controlId="formCharacterName">
                <Form.Label>Character Name</Form.Label>
                <Form.Control
                  type="text"
                  name="character_name"
                  value={formData.character_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCampaign">
                <Form.Label>Campaign</Form.Label>
                <Form.Control
                  as="select"
                  name="campaignId"
                  value={formData.campaignId}
                  onChange={handleChange}
                >
                  <option value="">Select Campaign</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign._id} value={campaign._id}>
                      {campaign.campaign_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formLore">
                <Form.Label>Lore</Form.Label>
                <Form.Control
                className="loreinput"
                  as="textarea"
                  rows={12}
                  name="lore"
                  value={formData.lore}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              <Form.Group controlId="formLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formRace">
                <Form.Label>Race</Form.Label>
                <Form.Control
                  type="text"
                  name="race"
                  value={formData.race}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="formClassName">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                as="select"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="Barbarian">Barbarian</option>
                <option value="Bard">Bard</option>
                <option value="Cleric">Cleric</option>
                <option value="Druid">Druid</option>
                <option value="Fighter">Fighter</option>
                <option value="Monk">Monk</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Rogue">Rogue</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Wizard">Wizard</option>
              </Form.Control>
            </Form.Group>

              <Form.Group controlId="formSubclassName">
                <Form.Label>Subclass Name</Form.Label>
                <Form.Control
                  type="text"
                  name="subclass_name"
                  value={formData.subclass_name}
                  onChange={handleChange}
                  required
                />

                <Form.Group controlId="formCharacterImage">
                <Form.Label>Character Image</Form.Label>
                <Form.Control
                  type="text"
                  name="character_image"
                  value={formData.character_image}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              </Form.Group>
                  
              <Form.Group controlId="formArmorClass">
                <Form.Label>Armor Class</Form.Label>
                <Form.Control
                  type="number"
                  name="armor_class"
                  value={formData.armor_class}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formHitPoints">
                <Form.Label>Hit Points</Form.Label>
                <Form.Control
                  type="number"
                  name="hit_points"
                  value={formData.hit_points}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

                </Col>
                  <Col lg={3}>
              <Form.Group controlId="formStrength">
                <Form.Label>Strength</Form.Label>
                <Form.Control
                  type="number"
                  name="strength"
                  value={formData.strength}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDexterity">
                <Form.Label>Dexterity</Form.Label>
                <Form.Control
                  type="number"
                  name="dexterity"
                  value={formData.dexterity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConstitution">
                <Form.Label>Constitution</Form.Label>
                <Form.Control
                  type="number"
                  name="constitution"
                  value={formData.constitution}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formIntelligence">
                <Form.Label>Intelligence</Form.Label>
                <Form.Control
                  type="number"
                  name="intelligence"
                  value={formData.intelligence}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formWisdom">
                <Form.Label>Wisdom</Form.Label>
                <Form.Control
                  type="number"
                  name="wisdom"
                  value={formData.wisdom}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPlayedBy">
                <Form.Label>Played By</Form.Label>
                <Form.Control
                  type="text"
                  name="played_by"
                  value={formData.played_by}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              
            </Col>
          </Row>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
      
    </div>
  ) : (
    <h1>Character not found. Try again?</h1>
  )
}





