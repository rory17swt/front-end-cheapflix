import axios from 'axios'
import { getToken } from '../utils/auth' 

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllMovies = async () => {
    try { 
        const response = await axios.get(`${BASE_URL}/movies`)
        return response 
    } catch (error) {
        console.log (error)
        throw error
    }
}

export const getSingleMovie = async (movieId) => {
try {
    const response = await axios.get(`${BASE_URL}/movies/${movieId}`)
return response 
} catch (error) {
    console.log (error)
    throw error 
}

}

export const createMovie = async (formData) => {
try {
    return axios.post(`${BASE_URL}/movies`,formData, {
headers:{
    Authorization: `Bearer ${getToken()}`
}
})
} catch (error) {
    console.log(error)
    throw erorr 
}
}

export const updateMovie = async (movieId, formData) => {
    try {
        return axios.put(`${BASE_URL}/movies/${movieId}`, formData,{
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        })
    } catch (error) {
        console.log (error)
        throw error 
    }
}

export const deleteMovie = async (movieId) => {
    try{
        return axios.delete(`${BASE_URL}/movies/${movieId}`,{
          headers:{
            Authorization: `Bearer ${getToken()}`  
    }
})
    } catch (error) {
        console.log(error)
        throw error 
    }
}