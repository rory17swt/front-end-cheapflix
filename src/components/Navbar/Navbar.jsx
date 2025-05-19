import {NavLink} from "react-router"
import './Navbar.css'

export default function Navbar(){
  return (
    <header>
      <nav className='brand-logo'>
        <NavLink to="/"><img src="https://res.cloudinary.com/dmqk8mtwl/image/upload/v1747667874/Screenshot_2025-05-19_161721_qf1qop.png" alt="🎥🍿"/></NavLink>
      </nav>
      <nav className="functions">
        <NavLink to="/movies" className= "nav-link">movies</NavLink>
        <NavLink to="/movies/new" className= "nav-link">Post your movie</NavLink>
      </nav>
      <nav className="authentication">
        <NavLink to="/register" className= "nav-link">create an account</NavLink>
        <NavLink to="/signIn" className= "nav-link">signIn</NavLink>
      </nav>
    </header>
  )
}