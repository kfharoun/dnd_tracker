import { Link } from 'react-router-dom'


export default function NavBar () {
    return(
        <div className="NavBar">
            <Link className="pageTitle" to="/">ADVENTURER'S ATLAS </Link>
            <div className='navGroup'>
            <Link className="campaignNav listNav" to="/Campaign">campaigns </Link>
            <Link className="characterNav listNav" to="/Character">characters </Link>
            {/* <Link to="/Abilities">abilities</Link> */}
            </div>
        </div>
    )
}