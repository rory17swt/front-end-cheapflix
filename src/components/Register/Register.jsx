import { Link, useNavigate, Navigate } from "react-router"
import { useState, useContext ,  } from "react" 
import { register } from "../../services/auth"
import { UserContext } from "../../contexts/UserContext"

export default function Register(){
    const { user } = useContext(UserContext) 

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
    })
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState ({})

const navigate = useNavigate()

const handleChange = ({target: {name, value }}) => {
    setFormData({
        ...formData, 
        [name]: value  
    })
    setError ({...error, [name]: ''})
}

const handleSubmit = async (evt) => {
evt.preventDefault()
setIsLoading(true)
try {
await register (formData)  
navigate('/login') 
}catch (error) {
     const message = error.response?.data.message || "registration failed ="
     console.error("register error:", message)
    setError(error.response.data) || ({message:"registration failed"})
} finally {
    setIsLoading(false)
          console.log('Submitting formData:', formData)


}
}
//  if (user) {
//     return <Navigate to="/" />
//   }

return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="form">
        <h1>Create an account</h1>

        {/* Email */}
        <div className="input-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" required onChange={handleChange} value={formData.email}/>
          { error.email && <p className="error-message">{error.email}</p>}
        </div>

        {/* Username */}
        <div className="input-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="Username" required onChange={handleChange} value={formData.username} />
          { error.username && <p className="error-message">{error.username}</p>}
        </div>

        {/* Password */}
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
          { error.password && <p className="error-message">{error.password}</p>}
        </div>

        {/* Password Confirmation */}
        <div className="input-control">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="Password Confirmation" required onChange={handleChange} value={formData.passwordConfirmation} />
          { error.passwordConfirmation && <p className="error-message">{error.passwordConfirmation}</p>}
        </div>

        <button type="submit"> Register
        </button> 
        

        <small>Already have an account? <Link to="/signin">Sign in</Link></small>
      </form>
    </section>
  )
}
