import { Link, useNavigate, Navigate } from "react-router"
import { useState, useContext } from 'react'
import {login} from "../../services/auth"
// import Spinner from "../Spinner/Spinner"
import { setToken, getUserFromToken } from "../../utils/auth"
import {UserContext} from '../../contexts/UserContext'

export default function  Signin 