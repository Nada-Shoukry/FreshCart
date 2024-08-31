import React, { useContext, useEffect, useState } from 'react'
import Rating from '../Rating/Rating'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'
import { addProductToCart } from '../../cartServices'
import { addProductToWishlist } from '../../wishlistServices'


export default function Product({ product }) {

  let {userToken} = useContext(AuthContext);

  return (
    <>
        <div className="max-w-2xl mx-2 md:mx-0 col-span-4 md:col-span-2 lg:col-span-1">
           <div className="relative bg-transparent shadow-md shadow-purple-400 hover:shadow-purple-600 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
              <div className='absolute top-0 left-0 border-[1px] text-sm px-1 border-purple-500 my-1 mx-5 rounded-md bg-white text-purple-700 hover:bg-purple-500 hover:text-white cursor-pointer'>{product.category.name}</div>
              <Link to={"/productDetails/" +product.id}>
                <img className="rounded-t-lg p-4" src={product.imageCover} alt="product image" />
              </Link>
              <div className="px-5">
                <div className='flex justify-between items-start'>
                  <Link to={'/productDetails/' +product._id}>
                    <div className="flex flex-col justify-between">
                      <div className='flex justify-between items-center'>
                         <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
                         <span className="text-2xl font-bold text-gray-900 dark:text-white ms-3">${product.price}</span>
                      </div>
                      <div>
                      <p className='line-clamp-1 dark:text-white my-1'>{product.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <Rating rating={product.ratingsAverage} />
              </div>

                <div className="flex items-center justify-between px-5 py-2">

                  <button onClick={() => addProductToWishlist(product._id, userToken)} className=" bg-white text-purple-700 border-2 border-purple-400 hover:bg-purple-500 hover:text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-purple-400 dark:hover:bg-purple-500 dark:focus:ring-purple-700">
                    <div className='flex justify-center items-center'>
                      <div className=''><i className='fa-regular fa-heart'></i> Add to Wishlist</div>
                    </div>                     
                  </button>

                  <button onClick={() => addProductToCart(product._id, userToken)} className="bg-white text-purple-700 border-2 border-purple-400 hover:text-white hover:bg-purple-500 transition-all focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm p-2 text-center dark:bg-purple-400 dark:hover:bg-purple-500 dark:focus:ring-purple-700">
                    <div className='flex justify-center items-center'>
                    <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      <div className='ms-[1px]'> Add to Cart</div>
                    </div>                     
                  </button>

                </div>

            </div>
        </div>
          
    </>
  )
}






