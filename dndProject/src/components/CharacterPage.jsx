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
    lore: ""

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

            {/* Add more Form.Group components for other fields */}

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



