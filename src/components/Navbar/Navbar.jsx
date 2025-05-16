import {NavLink} from "react-router"
import './Navbar.css'

export default function Navbar(){
  return (
    <header>
      <div className='brand-logo'>
        <NavLink to="/"><img src="/" alt="/"/>🎥🍿</NavLink>
      </div>
      <nav className="functions">
        <NavLink to="/movies">movies</NavLink>
        <NavLink to="/movies/new">Post your movie</NavLink>
      </nav>
      <nav className="authentication">
        <NavLink to="/register">create an account</NavLink>
        <NavLink to="/signIn">signIn</NavLink>
      </nav>
    </header>
  )
}