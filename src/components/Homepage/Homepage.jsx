import './Homepage.css'
import { Link } from 'react-router'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'

import { getAllMovies } from '../../services/movies'
import Spinner from '../Spinner/Spinner'



export default function HomePage (){
    const { data: movies, isLoading, error } = useFetch(getAllMovies, [])
    const [index, setIndex] = useState(0)
    
    console.log(movies)

    const next = () => {
        if (index + 3 < movies.length) {
            setIndex(index + 3)
        }
        if (index + 3 === movies.length){
            setIndex(0)
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
                <h1>CheapFlix</h1>
                <p>premium low budget entertainment from the comfort of your screen</p>
            </div>
             <div className='movieDisplay'>
                <section className="movie-list">
                    {error 
                    ? <p className='error-message'>{error}</p>
                        : isLoading
                            ? <Spinner />
                            : movies.length > 0
                            ? 
                                <section className='displayMovie'>
                                    <button onClick={back}>back</button>
                                    <div className='singleDisplaymovie'>
                                        <div className='image'>
                                            <img src={movies[index].movieImage} alt='movie cover'/>
                                        </div>
                                        <Link key={movies[index]._id} to={`/movies/${movies[index]._id}`}><h1>{movies[index].title}</h1></Link>
                                        <p>{movies[index].director}</p>
                                        <p>{movies[index].runTime}</p>
                                    </div>
                                     <div className='singleDisplaymovie'>
                                        <div className='image'>
                                            <img src={movies[index + 1].movieImage} alt='movie cover'/>
                                        </div>
                                        <Link key={movies[index + 1]._id} to={`/movies/${movies[index + 1]._id}`}><h1>{movies[index + 1].title}</h1></Link>
                                        <p>{movies[index + 1].director}</p>
                                        <p>{movies[index + 1].runTime}</p>
                                    </div>
                                     <div className='singleDisplaymovie'>
                                        <div className='image'>
                                            <img src={movies[index + 2].movieImage} alt='movie cover'/>
                                        </div>
                                        
                                        <Link key={movies[index + 2]._id} to={`/movies/${movies[index + 2]._id}`}><h1>{movies[index + 2].title}</h1></Link>
                                        <p>{movies[index + 2].director}</p>
                                        <p>{movies[index + 2].runTime}</p>
                                    </div>
                                    <button onClick={next}>next</button>
                                    
                                </section>
                                
                                    : <h1>No movies on our raider</h1>
                                }
                </section>  
            </div>
            
        </>
    )
}
        