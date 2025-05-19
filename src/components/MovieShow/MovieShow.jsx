import './MovieShow.css'
import { Link, useParams } from 'react-router'
import { getSingleMovie } from '../../services/movies'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext } from 'react'

import MovieDelete from '../MovieDelete/MovieDelete.jsx'
import Spinner from '../Spinner/Spinner.jsx'


export default function MovieShow() {
  // * Params
  const { movieId } = useParams()

  const { user } = useContext(UserContext)

  // * State
  const { data: response, isLoading, error } = useFetch(
    getSingleMovie,
    {},
    movieId
  )
  const { movie, comments } = response


  return (
    <>
      {error ? (
        <p className='error-message'>{error}</p>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <section className="single-movie">
            <img src={movie.movieImage} alt='movie image' />
            <h1>{movie.title}</h1>
            <p>{movie.director}</p>
            <p>{movie.runTime}</p>
            <p>{movie.tags}</p>
            {user && user._id === movie.owner && (
              <div className="controls">
                <Link className='edit-movie' to={`/movies/${movieId}/edit`}>Edit</Link>
                <MovieDelete />
              </div>
            )}
          </section>

          <section className="comments">
            <h2>Comments</h2>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {comments.map(comment => (
                  <li key={comment._id}>
                    <p>{comment.content}</p>
                    <small>By: {comment.author?.username}</small>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  )
}
