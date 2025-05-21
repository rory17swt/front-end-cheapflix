import { useState } from "react"
import { deleteMovie } from "../../services/movies"
import { useNavigate, useParams } from "react-router"
import Spinner from '../Spinner/Spinner'
import './MovieDelete.css'

export default function MovieDelete() {
    // * State
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // * Varibles
    const { movieId } = useParams()
    const navigate = useNavigate()

    // * Functions
    async function handleDelete() {
        setIsLoading(true)
        try {
            await deleteMovie(movieId)
            navigate('/movies')
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    // * UI
    return (
        <div className="movie-delete">
            {error && <p>{error}</p>}
            <button onClick={handleDelete}>
                {isLoading ? <Spinner /> : 'Delete'}
            </button>
        </div>
    )
}