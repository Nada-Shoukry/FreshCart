import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export function Register() {

    const [isLoading, setIsLoading] = useState(false)

    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()

    const initialValues = {
        "name": "",
        "email": "",
        "password": "",
        "rePassword": "",
        "phone": ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name must be 3 chars or more").max(20, "Name must be less than 20 chars"),

        email: Yup.string().required("Email is required").matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ ,"Please enter valid Email address"),

        password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ , "Minimum eight characters, at least one letter, one number and one special character"),

        rePassword: Yup.string().required("Password is required").oneOf([Yup.ref("password")], "This repassword must match password"),

        phone: Yup.string().required("Phone Number is required").matches(/^01[0125][0-9]{8}$/ , "Please enter valid Phone Number")  
    });

    async function onSubmit() {
        setSuccessMsg("")
        setErrorMsg("")
        setIsLoading(true)

        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((response) => {
            setIsLoading(false)
            console.log(response.data)
            setSuccessMsg(response.data.message)

            setTimeout (() =>{
                navigate("/login")
            }, 500)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err.response.data.message)
            setErrorMsg(err.response.data.message)
        })
        
    }

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,

        // validate: validateData,

    });

    function validateData(values) {

        let errors = {};

        if (values.name == ""){
            errors.name = "Name is required"
        } else if (values.name.length < 3){
            errors.name = "Name must be 3 chars or more"
        } else if (values.name.length > 20){
            errors.name = "Name must be less than 20 chars"
        }

        if (values.email == ""){
            errors.email = "Email is required"
        } else if (/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(values.email) != true) {
            errors.email = "Please enter valid Email address"
        }

        if (values.password == ""){
            errors.password = "Password is required"
        } else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password) != true) {
            errors.password = "Minimum eight characters, at least one letter, one number and one special character"
        }

        if (values.rePassword == ""){
            errors.rePassword = "Password is required"
        } else if (values.rePassword != values.password) {
            errors.rePassword = "This repassword must match password"
        }

        if (values.phone == ""){
            errors.phone = "Phone Number is required"
        } else if (/^01[0125][0-9]{8}$/.test(values.phone) != true){
            errors.phone = "Please enter valid Phone Number"
        }

        console.log (errors);
        return errors;

    }

  return (
    <>

    <Helmet>
      <title>Register</title>
    </Helmet>
    
    <div className='flex justify-center items-center'>
        <div className="mx-3 md:mx-auto w-full md:w-2/3 lg:w-1/3 bg-transparent dark:bg-gray-800 rounded-lg shadow-xl px-8 py-8 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center dark:text-gray-200 mb-8 text-ellipsis text-purple-600 ">Welcome to FreshCart</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
      
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.name && errors.name && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.name}</div>}
                </div>

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

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.rePassword && errors.rePassword && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.rePassword}</div>}
                </div>

                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.phone && errors.phone && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.phone}</div>}
                </div>

                <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 my-2 rounded-md shadow-sm disabled:bg-slate-500" disabled= {isLoading}> <i className="fa-solid fa-user-plus me-1"></i> Register {isLoading && <i className='fas fa-spinner fa-spin mx-2'></i>}</button>
                {successMsg && <p className='text-green-700 text-center'>{successMsg}</p>}
                {errorMsg && <p className='text-red-600 text-center'>{errorMsg}</p>}
            </form>

            <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
                <Link to={"/login"} href="#" className="text-purple-500 hover:text-purple-600">Login</Link>
            </div>
        </div>
    </div>

    </>
  )
}
