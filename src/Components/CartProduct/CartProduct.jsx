import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import { AuthContext } from '../Contexts/AuthContext';
import { CartContext } from '../Contexts/CartContext';

export function CartProduct({product, setCart, cart}) {

    const [loadingIncrease, setLoadingIncrease] = useState(false)
    const [loadingDecrease, setLoadingDecrease] = useState(false)

    const [productCount, setProductCount] = useState(product.count);

    const {cartItems, setCartItems} = useContext(CartContext);


    let {userToken}= useContext(AuthContext)

    async function updateProductCount(productId, count){

        if(count > product.count){
          setLoadingIncrease(true)
        } else {
          setLoadingDecrease(true)
        }

        let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, {
            count: count
        }, {
            headers: {
              token: userToken
            }
        })
        setCart(data);
        setCartItems(data.numOfCartItems);
        setLoadingIncrease(false)
        setLoadingDecrease(false)

    }

    // useEffect(() => {
    //   updateProductCount(product.prduct._id, productCount)
    // }, [productCount]);

    useEffect(() => {
      setProductCount(product.count)
    }, [cart])
    

    async function removeProductFromCart(productId){
        let {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId , {
          headers : {
            token : userToken
          }
        })
    
        setCart(data);
        setCartItems(data.numOfCartItems);

    
        toast.success("Product has been removed. ", {
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
      <div className="justify-between mb-6 rounded-lg bg-white px-6 py-6 md:py-0 shadow-md sm:flex sm:justify-start items-center">
        <img src={product.product.imageCover} alt="product-image" className="w-full rounded-lg sm:w-40" />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{product.product.title}</h2>
            <p className="mt-1 text-xs text-gray-700">${product.price}</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button disabled={product.count==1 || loadingDecrease} onClick={() => updateProductCount(product.product._id, product.count -1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-purple-500 hover:text-purple-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black">{loadingDecrease ? <i className='fas fa-spinner fa-spin'></i> : '-'} </button>
              <input onBlur={() => product.count != productCount && updateProductCount(product.product._id, productCount)} onChange={(e) => setProductCount(e.target.value)} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={productCount} min="1" />
              <button disabled={loadingIncrease} onClick={() => updateProductCount(product.product._id, product.count +1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-purple-500 hover:text-purple-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 disabled:hover:text-black"> {loadingIncrease ? <i className='fas fa-spinner fa-spin'></i> : '+'}</button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">${product.price * product.count}</p>
              <svg onClick={() => removeProductFromCart(product.product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
