import { Routes, Route } from 'react-router'

import Navbar from './components/Navbar/Navbar'

import HomePage from './components/Homepage/Homepage'
import MovieIndex from './components/MovieIndex/MovieIndex'
import MovieCreate from './components/MovieCreate/MovieCreate'
import MovieUpdate from './components/MovieUpdate/MovieUpdate'
import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn'
import MovieShow from './components/MovieShow/MovieShow'

import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'

function App(){
const { user } = useContext(UserContext)

return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/movies" element={<MovieIndex />} />
        <Route path="/movies/:movieId" element={<MovieShow />} />
        <Route path="/movies/new" element={<MovieCreate />} />
        <Route path="/movies/:movieId/edit" element={<MovieUpdate />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signIn" element={<SignIn />} />
        
        {/* { user
          ? <Route path="/" element={<Dashboard />} />
          : <Route path="/" element={<SplashPage />} />
        } */}
        
      </Routes>
    </>
  )
}

export default App