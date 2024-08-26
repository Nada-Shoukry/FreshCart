import React from 'react'
import { Helmet } from 'react-helmet'
import errorImg from '/src/assets/images/errorr404.jpg'
import { Link } from 'react-router-dom'

export function Notfound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>

      <div className='relative bg-white w-100 flex justify-center items-center p-20 -my-10'>
        <img className="w-100" src={errorImg} alt="page not found error image" />
        <div className="absolute top-5 text-center flex flex-col">
          <span className=' text-2xl font-bold'>Page not Found </span>
          <div className='felx items-center justify-center border-purple-400'>
            <Link to={"/"} className='text-xl font-semibold hover:underline'>Home</Link>
            <i className='fas fa-arrow-circle-right text-purple-600 mx-1'></i>
          </div>
          </div>
      </div>

    </>
  )
}
