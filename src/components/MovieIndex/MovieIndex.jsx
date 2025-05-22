import './MovieIndex.css'
import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'

import { getAllMovies } from '../../services/movies'
import Spinner from '../Spinner/Spinner'

export default function MovieIndex (){
    const { data: movies, isLoading, error } = useFetch(getAllMovies, [])

    console.log( movies );
    return (
        <>
          <h1 className='title'>MOVIES</h1>
            <section className="movie-list">
                {error 
                ? <p className='error-message'>{error}</p>
                : isLoading
                    ? <Spinner />
                    : movies.length > 0
                    ? movies.map(movie => (
                        <Link key={movie._id} to={`/movies/${movie._id}`}>
                        <article>
                            <div className='image'>
                                <img src={movie.movieImage} alt='movie cover'/>
                            </div>
                            <h2>{movie.title}</h2>
                            <p>{movie.director}</p>
                            <p>{Math.floor(movie.runTime / 60)}h {movie.runTime % 60}mins</p>
                            <div className="tags">
                                {movie.tags && movie.tags.map(tag => (
                                    <li key={tag} className="tag-item">{tag}</li>
                                ))}
                            </div>
                        </article>
                        </Link>
                    ))
                    : <h1>No movies on our raider</h1>
                }
            </section>  
        </>
    )
}