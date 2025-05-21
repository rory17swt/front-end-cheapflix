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
            <h1 id='movieTitle'>{movie.title}</h1>
            <div className='singleMovie'>
              <img className="singleMovieImage" src={movie.movieImage} alt='movie image' />
              <div className='singleMovieDetail'>
                <div id="tags">
                  <h2>Tags:</h2>
                  <ul>
                    {movie.tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <h3>director: {movie.director}</h3>
                <h3>runtime: {Math.floor(movie.runTime / 60)}h {movie.runTime % 60}minutes</h3>
              </div>
            </div>
            <div className='the-movie'>
              <video className='the-movie-data'src='https://media.giphy.com/media/hbtN4wlbTyEla/giphy.mp4' controls/>
            </div>
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
