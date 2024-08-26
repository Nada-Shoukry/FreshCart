import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import cartlogo from "/src/assets/images/cart.png"

export function Products() {

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()

  }, []);

  async function getProducts() {
    setIsLoading(true)

    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data)

    setIsLoading(false)

  }

  return (
    <>
    <Helmet>
      <title>Products</title>
      <link rel='icon' type="image/svg+xml" href={cartlogo} />
    </Helmet>

    
    {isLoading? <LoadingScreen />
    :
    
    <div className='grid grid-cols-4 gap-3 mx-2 md:mx-10'>
        {products.map((product, index) => {
          return < Product key={index} product={product} />
        })}  

    </div>

    }
    </>
  )
}
