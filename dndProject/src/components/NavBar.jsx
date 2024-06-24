import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import DataContext from '../DataContext'

const NavBar = () => {
  const { charInfo } = useContext(DataContext)

  return (
    <div className="NavBar">
      <Link className="pageTitle" to="/">ADVENTURER'S ATLAS</Link>
      <div className='navGroup'>
        <NavDropdown title="campaigns" id="campaigns-dropdown">
          <NavDropdown.Item as={Link} to="/Campaign">All Campaigns</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/Campaign/:campaignId">Campaign Name</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="characters" id="characters-dropdown">
          <NavDropdown.Item as={Link} to="/Character">All Characters</NavDropdown.Item>
          {charInfo.names && charInfo.names.map((name, index) => (
            <NavDropdown.Item as={Link} to={`/Character/${charInfo.ids[index]}`} key={index}>
              {name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </div>
    </div>
  )
}

export default NavBar




