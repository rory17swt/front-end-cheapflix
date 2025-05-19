import './Homepage.css'
import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'

import { getAllMovies } from '../../services/movies'
import Spinner from '../Spinner/Spinner'
let index = 0


export default function HomePage (){
    const { data: movies, isLoading, error } = useFetch(getAllMovies, [])
    
    const next = () => {
        if (index + 3 < movies.length) {
            setIndex(index + 3)
        }
    }

    const back = () => {
        if (index - 3 >= 0) {
            setIndex(index - 3)
        }
    }

    return(
        <>
            <div className='slogan'>
                <h1>CheapFlex</h1>
                <p>premium low budget entertainment from the comfort of your screen</p>
            </div>
            {/* <div>
                <section className="movie-list">
                    {error 
                    ? <p className='error-message'>{error}</p>
                        : isLoading
                            ? <Spinner />
                            : movies.length > 0
                            ? movies.map(movie => (
                                <Link key={movie._id} to={`/movies/${movie._id}`}>
                                    <div>
                                        <img src={movie[index].movieImage} alt='movie cover'/>
                                        <h1>{movie[index].title}</h1>
                                    </div>
                                     <div>
                                        <img src={movie[index + 1].movieImage} alt='movie cover'/>
                                        <h1>{movie[index + 1].title}</h1>
                                    </div>
                                     <div>
                                        <img src={movie[index + 2].movieImage} alt='movie cover'/>
                                        <h1>{movie[index + 2].title}</h1>
                                    </div>
                                    <button onClick={next}>next</button>
                                </Link>
                                    ))
                                    : <h1>No movies on our raider</h1>
                                }
                </section>  
            </div>
             */}
        </>
    )
}
        