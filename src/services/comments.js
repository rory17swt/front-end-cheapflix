import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const createComment = async (formData) => {
  try {
    return axios.post(`${BASE_URL}/comments`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateComment = async (commentId, formData) => {
  try {
    return axios.put(`${BASE_URL}/comments/${commentId}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteComment = async (commentId) => {
  try {
    return axios.delete(`${BASE_URL}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}