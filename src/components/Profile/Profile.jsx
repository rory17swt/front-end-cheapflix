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
    <section className="profile-page">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <header className="profile-header">
            <h1>{profile?.user?.username}'s Profile</h1>
          </header>

          <div className="profile-controls">
            <Link to="/movies/new" className="create-button">Create Movie Review</Link>
          </div>

         <div className="profile-grid">
  {profile.movies.map(movie => (
    <div key={movie._id} className="movie-card">
      <img src={movie.movieImage} alt={movie.title} className="movie-image" />
      <h3>{movie.title}</h3>
      <p>{movie.director}</p>
      <p>{movie.runTime} min</p>
      <div className="tags">
        {movie.tags?.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
      </div>

      <div className="card-actions">
        <Link to={`/movies/${movie._id}/edit`} className="btn">Edit</Link>
        <button className="btn">Delete</button>
      </div>

      <div className="comment-section">
        <h4>Comments:</h4>
        {profile.comments
          .filter(c => c.movie._id === movie._id)
          .map(c => (
            <p key={c._id}><strong>{c.author?.username}:</strong> {c.content}</p>
          ))}
      </div>
    </div>
  ))}
</div>

        </>
      )}
    </section>
  )
}
