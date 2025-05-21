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
        <NavLink to="/"><img src="/" alt="/"/>🎥🍿</NavLink>
      </div>
      <nav className="functions">
        <NavLink to="/movies">movies</NavLink>
      </nav>
      <nav className="authentication">
    {user
    ?(
      <>
      {/* signed in routes */}
        <NavLink to="/profile">Profile page</NavLink>
        <NavLink to="/movies/new">Post your movie</NavLink>
        <NavLink onClick={handleSignOut} to="/signIn">Sign out</NavLink>
      </>
    )
    :(
<> 
      {/* signed out routes */}
        <NavLink to="/register">Create an account</NavLink>
        <NavLink to="/signIn">SignIn</NavLink>
</>
    )
    }
      </nav>
    </header>
  )
}