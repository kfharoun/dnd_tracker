import { Link } from 'react-router-dom'

export default function Home () {
    return(
        <div className="Home">
            <h1>Welcome Traveler</h1>
            <button ><Link to ="/Campaign">record your adventures</Link></button>
            <button><Link to="/Character">new party members?</Link></button>
        </div>
    )
}