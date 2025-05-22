import './Homepage.css'
import { Link } from 'react-router'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'

import { getAllMovies } from '../../services/movies'
import Spinner from '../Spinner/Spinner'



export default function HomePage() {
    const { data: movies, isLoading, error } = useFetch(getAllMovies, [])
    const [index, setIndex] = useState(0)

    console.log(movies)

    const next = () => {
        if (index + 3 < movies.length) {
            setIndex(index + 3)
        }
        if (index + 3 === movies.length) {
            setIndex(0)
        }
    }

    const back = () => {
        if (index - 3 >= 0) {
            setIndex(index - 3)
        }
    }

    return (
        <>
            <div className='slogan'>
                <img className='backgroundImage' src='https://res.cloudinary.com/dmqk8mtwl/image/upload/v1747835987/ChatGPT_Image_May_21_2025_02_50_01_PM_dr0q9g_c_pad_b_gen_fill_ar_16_9_e_improve_e_sharpen_qbhgnv.png' />
            </div>
            <div className='movieDisplay'>
                <button className='directionButton' onClick={back}>Back</button>
                <section className="home-movie-list">

                    {[index, index + 1, index + 2].map(i => (
                        movies[i] ? (
                            <Link key={movies[i]._id} to={`/movies/${movies[i]._id}`}>
                                <article className='displayMovie'>
                                    <div className='image'>
                                        <img src={movies[i].movieImage} alt='movie cover' />
                                    </div>
                                    <h2>{movies[i].title}</h2>
                                    <p>{movies[i].director}</p>
                                    <p>{movies[i].runTime} min</p>
                                    <div className="tags">
                                        {movies[i].tags && movies[i].tags.map(tag => (
                                            <li key={tag} className="tag-item">{tag}</li>
                                        ))}
                                    </div>
                                </article>
                            </Link>
                        ) : null
                    ))}

                </section>
                <button className='directionButton' onClick={next}>Next</button>

            </div>

        </>
    )
}
