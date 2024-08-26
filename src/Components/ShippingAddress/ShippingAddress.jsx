import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

export function ShippingAddress() {

    let {userToken} =useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);

    const { cartId } = useParams()

    const initialValues = {
        "details": "Ahmad Maher St.",
        "city": "Mansoura", 
        "phone": "01008315735"
    }

    const validationSchema = Yup.object({
        details: Yup.string().required("Details are required"),
        city: Yup.string().required("City Name is required"),
        phone: Yup.string().required("Phone Number is required")
      })

    async function onSubmit() {
        setIsLoading(true)
        // console.log(values);

        await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId, {shippingAddress :values}, {
            headers: {
                token: userToken
                // token: localStorage.getItem("token")
            }, params:{
                url: 'http://localhost:5173'
            }
        }).then(({data}) => {
            setIsLoading(false)
            // console.log(data.session.url)
            location.href = data.session.url

        }).catch((err) => {
            setIsLoading(false);
           
        })
    }

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,  
    });


  return (
    <>
    
    <div className='my-5 flex justify-center items-center'>
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center dark:text-gray-200 mb-8 text-ellipsis text-purple-600 ">Shipping Address Form</h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Details:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.details && errors.details && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.details}</div>}
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">City:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.city && errors.city && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.city}</div>}
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
                    <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-purple-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                    {touched.phone && errors.phone && <div className='bg-red-300 w-full px-1 text-white rounded-md'>{errors.phone}</div>}
                </div>
                
                <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-slate-500" disabled={isLoading}>Check out {isLoading && <i className='fas fa-spinner fa-spin mx-2'></i>}</button>

            </form>
           
        </div>
    </div>
  
    </>
  )
}
