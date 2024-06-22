import { Link } from 'react-router-dom'


export default function NavBar () {
    return(
        <div className="NavBar">
            <Link to="/">ADVENTURER'S ATLAS </Link>
            <Link to="/Character">characters </Link>
            <Link to="/Campaign">campaigns </Link>
            <Link to="/Abilities">abilities</Link>
        </div>
    )
}