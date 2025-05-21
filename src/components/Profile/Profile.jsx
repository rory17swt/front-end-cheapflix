import './Profile.css'
import { Link, useParams } from 'react-router'
import { getSingleMovie } from '../../services/movies'
import useFetch from '../../hooks/useFetch'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import { createComment, updateComment, deleteComment } from '../../services/comments'
import MovieDelete from '../MovieDelete/MovieDelete.jsx'
import Spinner from '../Spinner/Spinner.jsx'

export default function Profile() {}