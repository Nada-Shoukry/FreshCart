import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { Helmet } from 'react-helmet';

export function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    let {setUserToken} = useContext(AuthContext)

    const initialValues = {
        "email": "",
        "password": "",
    }

    const validationSchema = Yup.object({

        email: Yup.string().required("Email is required").matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ ,"Please enter valid Email address"),

        password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ , "Minimum eight characters, at least one letter, one number and one special character"),

      })

    async function onSubmit() {
        setErrorMsg("")
        setIsLoading(true)

        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({data}) => {
            setIsLoading(false)

            // console.log(data.token)
            setUserToken(data.token)
            localStorage.setItem("token", data.token)

            if (location.pathname == "/login"){
                navigate("/")
            } else {
                navigate(location.pathname)
            }

        }).catch((err) => {
            setIsLoading(false);
            // console.log(err.response.data.message);
            setErrorMsg(err.response.data.message);
        })
    }

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,  
    });


  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>

    <div className='my-10 flex justify-center items-center'>
        <div className="mx-3 md:mx-auto w-full md:w-2/3 lg:w-1/3 bg-transparent dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center dark:text-gray-200 mb-8 text-ellipsis text-purple-600 ">Welcome to FreshCart</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.email && errors.email && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.email}</div>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.password && errors.password && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.password}</div>}
                </div>

                <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-500" disabled={isLoading}>Log in {isLoading && <i className='fas fa-spinner fa-spin mx-2'></i>}</button>

                {errorMsg && <p className='text-red-600 text-center'>{errorMsg}</p>}
            </form>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
                <Link to={"/register"} className="text-purple-500 hover:text-purple-600">Register</Link>
            </div>
            <div className="mt-4 text-center">
            <Link to={"/forgetpassword"} className="text-purple-500 hover:text-purple-600">Forgotten Password?</Link>
            </div>
        </div>
    </div>

    </>
  )
}

