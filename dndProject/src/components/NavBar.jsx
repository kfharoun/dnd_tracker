import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export default function NavBar() {
    return (
        <div className="NavBar">
            <Link className="pageTitle" to="/">ADVENTURER'S ATLAS</Link>
            <div className='navGroup'>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Categories
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link className="campaignNav listNav" to="/Campaign">Campaigns</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Link className="characterNav listNav" to="/Character">Characters</Link>
                {/* Uncomment the following Link when needed */}
                {/* <Link className="abilitiesNav listNav" to="/Abilities">Abilities</Link> */}
            </div>
        </div>
    );
}
