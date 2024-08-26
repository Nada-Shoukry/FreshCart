import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import { Helmet } from 'react-helmet';

export function ResetCode() {

    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    let {setUserToken} = useContext(AuthContext);

    const initialValues = {
        "resetCode":""
    }

    async function onSubmit() {
        setErrorMsg("")
        setIsLoading(true)

       await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values).then(({data}) => {
        setIsLoading(false)

        setUserToken(data.token)
        localStorage.setItem("token", data.token)

        // console.log(data);

        if (data.status === "Success"){
            navigate("/setnewpassword")
        }

        }).catch((err) => {
            setIsLoading(false);
            // console.log(err?.response?.data?.message);
            setErrorMsg(err?.response?.data?.message);
        })
    }

    let { handleSubmit, values, handleChange, handleBlur } = useFormik({
        initialValues,
        onSubmit,
    });


  return (
    <>
    <Helmet>
      <title>Reset Code</title>
    </Helmet>

    <div className='my-10 flex justify-center items-center'>
        <div className="mx-3 md:mx-auto w-full md:w-2/3 lg:w-1/3 bg-transparent dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center dark:text-gray-200 mb-8 text-ellipsis text-purple-600 ">Welcome to FreshCart</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="text" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Enter Reset Code:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.resetCode} type="text" id="resetCode" name="resetCode" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>

                <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-500" disabled={isLoading}>Submit {isLoading && <i className='fas fa-spinner fa-spin mx-2'></i>}</button>

                {errorMsg && <p className='text-red-600 text-center'>{errorMsg}</p>}
            </form>

        </div>
    </div>

    </>
  )
}


