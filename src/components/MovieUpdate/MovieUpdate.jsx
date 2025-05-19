import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import { updateMovie, getSingleMovie } from "../../services/movies.js"
import { UserContext } from "../../contexts/UserContext.jsx"
import Select from "react-select"
import makeAnimated from 'react-select/animated'


//Tags array
const options = [
            { value: 'horror', label: 'Horror' },
            { value: 'comedy', label: 'Comedy' },
            { value: 'action', label: 'Action' },
            { value: 'adventure', label: 'Adventure' },
            { value: 'history', label: 'History' },
            { value: 'science fiction', label: 'Science Fiction' },
            { value: 'romance', label: 'Romance' },
            { value: 'drama', label: 'Drama' },
            { value: 'fantasy', label: 'Fantasy' },
            { value: 'crime', label: 'Crime'}
        ]


export default function MovieUpdate() {
    // * Context
    const { user } = useContext(UserContext)

    // * States
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        runTime: 0,
        tags: [],
        movieImage: ''
    })

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // * Varibles
    const { movieId } = useParams()
    const navigate = useNavigate()
    const animatedComponents = makeAnimated()

    // * Form Functions 
    async function handleInputChange({ target: { name, value, type, files } }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({ ...formData, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventdefault()
        setIsLoading(true)
        try {
            await updateMovie(movieId, formData)
            navigate(`/movies/${movieId}`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    // * useEffect
    useEffect(() => {
        async function getMovieData() {
            try {
                const { data } = await getSingleMovie(movieId)
                setFormData(data)
            } catch (error) {
                console.log(error)
                throw error
            }
        }
        getMovieData()
    }, [movieId])

    if (!user) {
        return <Navigate to="/signIn" />
    }


    // Form
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Update Your Movie</h1>

                {/* Title */}
                <div className="input-control">
                    <label htmlFor="title">Title </label>
                    <input
                        key={formData.title}
                        type="text"
                        name="title"
                        id="title"
                        placeholder='Title'
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
                        key={formData.director}
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
                        key={formData.runTime}
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
                    <Select
                        key={formData.tags}
                        options={options}
                        components={animatedComponents}
                        onChange={(tags) => setFormData({ ...formData, tags: tags })}
                        defaultValue={formData.tags}
                        isMulti
                    />
                    {error.tags && <p className="error-message">{error.tags}</p>}
                </div>

                {/* Movie Image */}
                <div className="input-control">
                    <label htmlFor="movieImage">Movie Image </label>
                    <input
                        key={formData.movieImage}
                        type="file"
                        name="movieImage"
                        id="movieImage"
                        onChange={handleInputChange}
                        required
                    />
                    {error.movieImage && <p className="error-message">{error.movieImage}</p>}
                </div>

                {/* Submit */}
                <button type="submit">Update your movie</button>
            </form>
        </>
    )
}
