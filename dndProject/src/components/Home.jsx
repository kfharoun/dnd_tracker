import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div className="Home">
      <div className="homepic"></div>
      <div className='welcomehome'>
        <h1 className='welcome'>Welcome Traveler</h1>
        <div className='homebuttons'>
        <Link to="/Campaign" className='buttonlink'><button className='linkbutton one'>Record your adventures</button></Link>
        <Link to="/Newcharacter" className='buttonlink'><button className='linkbutton two'>New party members?</button></Link>
        </div>
      </div>
    </div>
  )
}
