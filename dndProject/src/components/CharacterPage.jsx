import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function CharacterList() {
  const [character, setCharacter] = useState(null)
  const [campaignName, setCampaignName] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false) 
  const [formData, setFormData] = useState({
    character_name: "",
    lore: "",
    level:"", 
    race: "", 
    class_name: "", 
    subclass_name: "", 
    armor_class: "", 
    hit_points: "", 
    strength: "", 
    dexterity:"", 
    constitution:"", 
    intelligence:"", 
    wisdom:"", 
    played_by:"",
    character_image: ""
  })
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
          character_image: characterData.character_image

        })
        setLoading(false)
      } catch (error) {
        console.error('Cannot get character:', error)
        setLoading(false)
      }
    }

    getCharAndCampaign()
  }, [id])

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

      toggleModal() // close the modal when it works
    } catch (error) {
      console.error('Cannot update character:', error)
    }
  }

  return loading ? (
    <h1>Loading...</h1>
  ) : character ? (
    <div className="CharacterPage">
      <div className="char-list">
        <img
          src={character.character_image}
          width="250px"
          alt={`Image of ${character.character_name}`}
        />
        <h1>{character.character_name}</h1>
        <p>
          <b>{campaignName}</b>
        </p>
        <p className="charLore">{character.lore}</p>
      </div>

      <div className="char-list-two">
        <div className="stattitle">
          <h1>Stats</h1>
          <div className="stat-info">
            <p>Played by {character.played_by}</p>
            <p>Level {character.level}</p>
            <p>
              {character.race} {character.class_name}
            </p>
            <p>{character.subclass_name}</p>
          </div>
        </div>
        <div className="stats">
          <p>Armor Class: {character.armor_class}</p>
          <p>Hit Points: {character.hit_points}</p>
          <p>Strength: {character.strength}</p>
          <p>Dexterity: {character.dexterity}</p>
          <p>Constitution: {character.constitution}</p>
          <p>Intelligence: {character.intelligence}</p>
          <p>Wisdom: {character.wisdom}</p>
          <p>Charisma: {character.charisma}</p>
        </div>
        <div className="charPageButtons">
          <button className="abilityButton">Ability Log</button>
          {/* Button to open modal */}
          <button className="updateButton" onClick={toggleModal}>Update Character</button>
        </div>
      </div>

      {/* Modal for update form */}
            <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Form.Group controlId="formLore">
              <Form.Label>Lore</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="lore"
                value={formData.lore}
                onChange={handleChange}
                required
              />
            </Form.Group>

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
                type="text"
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                required
              />
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



