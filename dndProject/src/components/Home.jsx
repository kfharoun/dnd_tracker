import { Link } from 'react-router-dom'

export default function Home () {
    return(
        <div className="Home">
            <div className="homepic"></div>
            <div className='welcomehome'>
                
                <h1 className='welcome'>Welcome Traveler</h1>

                <Link to ="/Campaign" className='buttonlink'><button className='linkbutton one'>record your adventures</button></Link>

                <Link to="/Character" className='buttonlink'><button className='linkbutton two'>new party members?</button></Link>

            </div>
        </div>
    )
}