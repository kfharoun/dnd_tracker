import { Link } from 'react-router-dom'

export default function Home () {
    return(
        <div className="Home">
            <div class="homepic"></div>
            <div className='welcomehome'>
                
                <h1 className='welcome'>Welcome Traveler</h1>

                <button className='linkbutton one'><Link to ="/Campaign" className='buttonlink'>record your adventures</Link></button>

                <Link to="/Character" className='buttonlink'><button className='linkbutton two'>new party members?</button></Link>

            </div>
        </div>
    )
}