import './MovieShow.css'
import { Link, useParams } from 'react-router'
import { getSingleMovie } from '../../services/movies'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import { createComment, updateComment, deleteComment } from '../../services/comments'
import MovieDelete from '../MovieDelete/MovieDelete.jsx'
import Spinner from '../Spinner/Spinner.jsx'

export default function MovieShow() {
  const { movieId } = useParams()
  const { user } = useContext(UserContext)

  const { data: response, isLoading, error } = useFetch(
    getSingleMovie,
    {},
    movieId
  )
  const { movie, comments } = response
  const [commentContent, setCommentContent] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingContent, setEditingContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createComment({
        content: commentContent,
        movie: movieId,
      })
      setCommentContent('')
      window.location.reload()
    } catch (err) {
      console.error(' Failed to post comment:', err)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId)
      window.location.reload()
    } catch (err) {
      console.error(' Failed to delete comment:', err)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      await updateComment(editingCommentId, { content: editingContent })
      setEditingCommentId(null)
      setEditingContent('')
      window.location.reload()
    } catch (err) {
      console.error('Failed to update comment:', err)
    }
  }

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
                    {editingCommentId === comment._id ? (
                      <form onSubmit={handleEdit} className="edit-comment-form">
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          required
                        />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditingCommentId(null)}>Cancel</button>
                      </form>
                    ) : (
                      <>
                        <p>{comment.content}</p>
                        <small>By: {comment.author?.username}</small>
                        {user && comment.author?._id === user._id && (
                          <>
                            <button onClick={() => {
                              setEditingCommentId(comment._id)
                              setEditingContent(comment.content)
                            }}>Edit</button>
                            <button onClick={() => handleDelete(comment._id)}>Delete</button>
                          </>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {user && (
            <form onSubmit={handleSubmit} className="comment-form">
              <label htmlFor="content">Add a comment:</label>
              <textarea
                name="content"
                id="content"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
              <button type="submit">Post Comment</button>
            </form>
          )}
        </>
      )}
    </>
  )
}
