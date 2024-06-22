import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function NavBar () {
    return(
        <div className="NavBar">
            <Link className="pageTitle" to="/">ADVENTURER'S ATLAS </Link>
            <div className='navGroup'>
            <NavDropdown title="campaigns" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/Campaign">All Campaigns</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Campaign">Campaign Name</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="characters" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Character">all characters</NavDropdown.Item>
                </NavDropdown>
            {/* <Link to="/Abilities">abilities</Link> */}
            </div>
        </div>
    )
}