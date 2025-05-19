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
             <div>
                <section className="movie-list">
                    {error 
                    ? <p className='error-message'>{error}</p>
                        : isLoading
                            ? <Spinner />
                            : movies.length > 0
                            ? 
                                <section>
                                    <div>
                                        <img src={movies[index].movieImage} alt='movie cover'/>
                                        <h1>{movies[index].title}</h1>
                                    </div>
                                     <div>
                                        <img src={movies[index + 1].movieImage} alt='movie cover'/>
                                        <h1>{movies[index + 1].title}</h1>
                                    </div>
                                     <div>
                                        <img src={movies[index + 2].movieImage} alt='movie cover'/>
                                        <h1>{movies[index + 2].title}</h1>
                                    </div>
                                    <button onClick={next}>next</button>
                                    <button onClick={back}>back</button>
                                </section>
                                
                                    : <h1>No movies on our raider</h1>
                                }
                </section>  
            </div>
            
        </>
    )
}
        