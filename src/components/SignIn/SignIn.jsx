import { Link, useNavigate, Navigate } from "react-router"
import { useState, useContext } from 'react'
import {signin} from "../../services/auth"
import { setToken, getUserFromToken } from "../../utils/auth"
import {UserContext} from '../../contexts/UserContext'

export default function SignIn(){
  // * Context
  const { user, setUser } = useContext(UserContext)

  // * State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // * Location variables
  const navigate = useNavigate()

  // * Functions
  const handleChange = ({ target: { name, value }}) => {
    setFormData({ ...formData, [name]: value })
    setError({ ...error, [name]: '' })
  }

const handleSubmit = async (evt) => {
    evt.preventDefault()
    setIsLoading(true)
    try {
const { data } = await signin(formData) 
setToken(data.token) 
setUser(getUserFromToken())
// to check 1 
navigate('/movies')
    } catch (error) {
        setError(error.response.data)
    } finally {
        setIsLoading(false)
    }
}
// if (user) {
//     return <Navigate to="/" />
// }
 return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="form">
        <h1>Welcome back!</h1>

        {/* Email */}
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
        </div>

        {/* Password */}
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
        </div>

        { error.message && <p className="error-message">{error.message}</p> }

          <button type="submit"> Signin
        </button> 

        <small>Don't have an account? <Link to="/register">Register here</Link></small>
      </form>
    </section>
  )
}