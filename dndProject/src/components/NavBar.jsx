import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function NavBar () {
    return(
        <div className="NavBar">
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <Link className="pageTitle" to="/">ADVENTURER'S ATLAS </Link>
                </Navbar.Brand>
            <div className='navGroup'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavDropdown className="campaignNav listNav" title="campaigns" id="basic-nav-dropdown">

                <NavDropdown.Item href="#action/3.1">
                    <Link className="campaignNav listNav" to="/Campaign">all campaigns </Link>
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">
                    <Link className="campaignNav listNav" to="/Campaign">campaign name</Link>
                </NavDropdown.Item>

                 </NavDropdown>
            <Link className="characterNav listNav" to="/Character">characters </Link>
            {/* <Link to="/Abilities">abilities</Link> */}
            
            
          </Nav>
        </Navbar.Collapse>
        </div>
        </Container>
        </Navbar>
        
        </div>
    )
}