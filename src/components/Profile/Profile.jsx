import { useEffect, useState } from 'react'
import { getProfile } from '../../services/profile'
import { getUserFromToken } from '../../utils/auth'
import Spinner from '../Spinner/Spinner'
import './Profile.css'
import { Link } from 'react-router'

export default function Profile() {
    console.log('Profile component loaded')

    const [profile, setProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const user = getUserFromToken()

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const profileData = await getProfile(user._id)
                console.log('profile data:', profileData)

                if (!profileData) {
                    throw new Error('Profile data missing')
                }

                setProfile(profileData)
            } catch (err) {
                console.error('Failed to load profile:', err)
                setError('Failed to load profile.')
            } finally {
                setIsLoading(false)
            }
        }

        if (user?._id) {
            getProfileData()
        }
    }, [user?._id])

    return (
        <section className="profile-page" >
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <header className="profile-header">
                        <h1>{profile?.user?.username}'s Profile</h1>

                        <div className="controls">
                            <Link to="/movies/new" className="create-button">Create Movie Review</Link>
                        </div>
                    </header>


                    <div className="singleMovie">
                        {profile.movies.map(movie => (
                            <div key={movie._id} className="single-movie">
                                <img className="singleMovieImage" src={movie.movieImage} alt={`Poster of ${movie.title}`} />
                                <div className="singleMovieDetail">
                                    <h2>{movie.title}</h2>
                                    <h3>Director: {movie.director}</h3>
                                    <h3>Runtime: {Math.floor(movie.runTime / 60)}h {movie.runTime % 60}mins</h3>

                                    <div id="tags">
                                        <h2>Tags:</h2>
                                        <ul>
                                            {movie.tags.map((tag, index) => (
                                                <li key={index}>{tag}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="controls">
                                        <Link className='edit-movie' to={`/movies/${movie._id}/edit`}>Edit</Link>
                                        <button className='edit-movie'>Delete</button>
                                    </div>
                                </div>

                                <section className="comments">
                                    <h2>Comments:</h2>
                                    {profile.comments.filter(comment => comment.movie && comment.movie._id === movie._id).length === 0 ? (
                                        <p>No comments yet</p>
                                    ) : (
                                        <ul>
                                            {profile.comments
                                                .filter(comment => comment.movie && comment.movie._id === movie._id)
                                                .map(comment => (
                                                    <li key={comment._id}>
                                                        <p>: {comment.content}</p>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </section>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}
