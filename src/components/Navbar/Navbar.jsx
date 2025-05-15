import {NavLink} from "react-router"
import './navbar.css'

export default function Navbar(){
  return (
    <header>
      <div className='brand-logo'>
        <NavLink to="/"><img src=""></img></NavLink>
      </div>
      <nav className="functions">
        <NavLink to="/movies">movies</NavLink>
        <NavLink to="/movies/new">Post your movie</NavLink>
      </nav>
      <nav className="authentication">
        <NavLink to="/register">create an account</NavLink>
        <NavLink to="/login">login</NavLink>
      </nav>
    </header>
  )
}