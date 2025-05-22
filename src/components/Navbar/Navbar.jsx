import {NavLink} from "react-router"
import './Navbar.css'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
import { removeToken } from "../../utils/auth"

export default function Navbar(){
// context 
const { user, setUser } = useContext(UserContext)

const handleSignOut = () => {
  removeToken()
  setUser(null)
}

  return (
    <header>
      <div className='brand-logo'>
        <NavLink className="navlinks" id="logo-img" to="/"><img src="https://res.cloudinary.com/dmqk8mtwl/image/upload/v1747907017/Screenshot_2025-05-21_145350_o2tqp9.png" alt="logo"/></NavLink>
      </div>
      
      <nav className="authentication">
        <NavLink className="navlinks" to="/movies">Movies</NavLink>
    {user
    ?(
      <>
      {/* signed in routes */}
        <NavLink className="navlinks" to="/profile">Profile page</NavLink>
        <NavLink className="navlinks" to="/movies/new">Post your movie</NavLink>
        <NavLink className="navlinks" onClick={handleSignOut} to="/signIn">Sign out</NavLink>
      </>
    )
    :(
<> 
      {/* signed out routes */}
        <NavLink className="navlinks" to="/register">Create an account</NavLink>
        <NavLink className="navlinks" to="/signIn">SignIn</NavLink>
</>
    )
    }
      </nav>
    </header>
  )
}