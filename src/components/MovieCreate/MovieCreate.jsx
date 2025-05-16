import { useContext, useState } from "react"
import { createMovie } from "../../services/movies.js"
import { Navigate, useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext.jsx"


export default function MovieCreate (){
    // Context
    const { user } = useContext(UserContext)
    // States
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        runTime: 0,
        tags: [''],
        movieImage: ''
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // varibles
    const navigate = useNavigate()

    // Form functions
    async function handleInputChange({ target: { name, value, type, files } }) {
        if (type === 'file'){
            value = files[0]
        }
        setFormData({ ...formData, [name]: value})        
    }
    
    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await createMovie(formData)
            navigate(`/movies/${data._id}`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    if (!user) {
        return <Navigate to="/signIn" />
    }
    
    // Form
    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <h1>Post a new movie</h1>

            {/* Title */}
            <div className="input-control">
                <label htmlFor="title">Title </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    onChange={handleInputChange}
                    value={formData.title}
                    required
                />
                {error.title && <p className="error-message">{error.title}</p>}
            </div>

            {/* Director */}
            <div className="input-control">
                <label htmlFor="director">Director </label>
                <input
                    type="text"
                    name="director"
                    id="director"
                    placeholder="Director"
                    onChange={handleInputChange}
                    value={formData.director}
                    required
                />
                {error.director && <p className="error-message">{error.director}</p>}
            </div>

            {/* Run time */}
            <div className="input-control">
                <label htmlFor="runTime">Run time </label>
                <input
                    type="number"
                    name="runTime"
                    id="runTime"
                    placeholder="Run time"
                    onChange={handleInputChange}
                    value={formData.runTime}
                    required
                />
                {error.runTime && <p className="error-message">{error.runTime}</p>}
            </div>

            {/* Tags */}
            <div className="input-control">
                <label htmlFor="tags">Tags </label>
                <select name="tags" id="tags" onChange={handleInputChange} value={formData.tags} multiple required>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                    <option value="Science fiction">Science fiction</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Animation">Animation</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Crime">Crime</option>
                    <option value="Historical">Historical</option>
                </select>              
                {error.tags && <p className="error-message">{error.tags}</p>}
            </div>

            {/* Image */}
            <div className="input-control">
                <label htmlFor="movieImage">Movie Image </label>
                <input
                    type="file"
                    name="movieImage"
                    id="movieImage"
                    onChange={handleInputChange}
                    required
                />
                {error.movieImage && <p className="error-message">{error.movieImage}</p>}
            </div>

            {/* Submit */}
            <button type="submit">Post your movie</button>
        </form>
        </>
    )
}