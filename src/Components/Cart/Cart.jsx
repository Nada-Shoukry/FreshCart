import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { CartProduct } from '../CartProduct/CartProduct';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import emptyCartImg from "/src/assets/images/emptycart1.png"
import cartlogo from "/src/assets/images/cart.png"


export function Cart() {

  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState(null);

  useEffect(() => {
    getUserCart()
  }, []);

  let {userToken}= useContext(AuthContext)

  async function getUserCart(){
    setIsLoading(true)

    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
      headers : {
        token : userToken 
      }
    }).finally(() => {
      setIsLoading(false)
    })

    setCart(data)
  }

  // async function clearCart(){
  //   let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
  //     headers : {
  //       token : userToken 
  //     }
  //   })
  //   setCart(null)
  // }

  function clearCart(){
    axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
      headers : {
        token : userToken 
      }
    }).finally(() => {
      setCart(null)
    })
  }

  return (
  <>
    <Helmet>
      <title>Cart</title>
      <link rel='icon' type="image/svg+xml" href={cartlogo} />
    </Helmet>

 {isLoading? <LoadingScreen />
 :

<div>
  {cart? <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
    {cart?.data.products.map((product, index) => {
      return <CartProduct key={index} product={product} setCart={setCart} cart={cart}/>
      })}
     <button onClick={() => clearCart()} className= 'mx-auto block w-full hover:text-purple-900 text-lg hover:bg-transparent border-2 border-purple-500 rounded-md py-2 px-4 bg-purple-500 text-white '>Clear Cart</button>
    </div>
    
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 ">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700 ">Subtotal</p>
        <p className="text-gray-700 ">${cart?.data.totalCartPrice}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$0</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">${cart?.data.totalCartPrice} USD</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <Link to={"/shippingAddress/" + cart?.data._id} className="mt-6 w-full block text-center rounded-md bg-purple-500 py-1.5 font-medium text-purple-50 hover:bg-purple-600">Check out</Link>
    </div>
   </div>
   : 
    <div className='flex flex-col justify-start items-center w-full'>
      <div className=' relative w-full h-[500px] -my-10 bg-white'>
        <div className='absolute top-1 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center w-full'>
            <h1 className=' text-xl font-bold text-center mt-8'>Your Cart is Empty</h1>
            <div className='felx items-center justify-center'>
              <Link to={"/"} className='text-xl font-semibold hover:underline'>Home</Link>
              <i className='fas fa-arrow-circle-right text-blue-400 mx-1'></i>
            </div>
        </div>
        <img src={emptyCartImg} className="w-full h-5/6 object-contain -z-10 my-20" alt="empty cart image" />
      </div>
    </div> 
  }
</div>

}
</>
)}

