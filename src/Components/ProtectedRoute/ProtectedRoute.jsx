import React, { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { Login } from '../Login/Login'

export default function ProtectedRoute({children}) {

    const { userToken } = useContext(AuthContext)
  return (
    <>
    {
        // userToken ? children : <h1 className='text-white text-5xl text-center py-20 font-bold my-24'> Login First</h1>

        // userToken ? children : <Navigate to={"/login"} />

        userToken ? children : <Login />
    }
    </>
  )
}
