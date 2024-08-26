import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Helmet } from 'react-helmet'
import { AuthContext } from '../Contexts/AuthContext';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { addProductToCart } from '../../cartServices';
import cartlogo from "/src/assets/images/cart.png"

import { Bounce, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function WishList() {

  const [isLoading, setIsLoading] = useState(true);
  const {userToken} = useContext(AuthContext)

  const [wishlist, setWishlist] = useState(null)

  useEffect(() => {
    getUserWishlist()
  }, []);

  async function getUserWishlist() {
    setIsLoading(true);

    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
        headers : {
          token: userToken
        }
      }
    );

    // console.log(data?.data);
    setWishlist(data);
    
    setIsLoading(false);

  }

  async function deleteProductFromWishlist(productId){
    let {data} = await axios.delete ("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId , {
      headers : {
        token : userToken
      }
    })

    setWishlist(data);

    getUserWishlist();

    toast.success("Product has been deleted from Wishlist", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  }


  return (
<>
    <Helmet>
      <title>WishList</title>
      <link rel='icon' type="image/svg+xml" href={cartlogo} />
    </Helmet>

    {isLoading? <LoadingScreen />
     :

<div className="mx-auto container px-10 flex justify-center items-center min-h-96">
  <div className="flex flex-col jusitfy-start items-start">
    
    <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white ">Favourites</h1>
    
    <div className="mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
      {wishlist.data.map((product, index) => {
        return <div key={index} className="flex flex-col">
          <div className="relative">
            <Link to={'/productDetails/' + product._id}>
              <img className="w-full" src={product.imageCover} alt="Wishlist product" />
            </Link>  
            <button onClick={() => deleteProductFromWishlist(product._id) } aria-label="close" className="top-1 right-1 absolute p-0.5 text-gray-400 bg-gray-100 hover:bg-purple-400 hover:text-gray-300">
              <svg className="fil-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        <div className='border-[0.5px] border-purple-100'>
          <div className="mt-3 flex justify-between items-center">
            <Link to={'/productDetails/' + product._id}>
              <div className="flex justify-center items-center">
                <p className="tracking-tight text-xl font-semibold leading-6 text-gray-800 dark:text-white line-clamp-1">{product.title}</p>
              </div>
            </Link>  
          </div>
          <div id="menu1" className="flex flex-col jusitfy-start items-start">
            <div className="mt-3">
              <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">{product.price}$</p>
            </div>
            <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-3 w-full">
              <div onClick={() => addProductToCart(product._id, userToken)} className="w-full">
                <button className=" text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-purple-500 bg-purple-400 dark:hover:bg-gray-700 dark:hover:text-white"> Add to cart </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      })}
    </div>
  </div>
</div> 

  }
</>
    
  )
}
