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
    async function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })        
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
                {error.title && <p className="error-message">{error.description}</p>}
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
                {error.title && <p className="error-message">{error.description}</p>}
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
                {error.title && <p className="error-message">{error.description}</p>}
            </div>

            {/* Tags */}
            <div className="input-control">
                <label htmlFor="tags">Tags </label>
                <input
                    type="text"
                    name="tags"
                    id="title"
                    placeholder="Tags"
                    onChange={handleInputChange}
                    value={formData.tags}
                    required
                />
                {error.title && <p className="error-message">{error.description}</p>}
            </div>

            {/* Image */}
            <div className="input-control">
                <label htmlFor="image">Image </label>
                <input
                    type="text"
                    name="image"
                    id="image"
                    placeholder="Image"
                    onChange={handleInputChange}
                    value={formData.movieImage}
                    required
                />
                {error.title && <p className="error-message">{error.description}</p>}
            </div>

            {/* Submit */}
            <button type="submit">Post your movie</button>
        </form>
        </>
    )
}