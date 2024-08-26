import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import { CategoriesSlider } from '../CategoriesSlider/CategoriesSlider';
import { MainSlider } from '../MainSlider/MainSlider';

import homelogo from "/src/assets/images/home.svg"


export function Home() {

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);

  async function getProducts() {
    setIsLoading(true)

    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    // console.log(data?.data);
    setProducts(data?.data);

    setIsLoading(false)

  }

  useEffect(() => {
    getProducts()

  }, []);



  return (
    <>
    <Helmet>
      <title>Home</title>
      <link rel='icon' type="image/svg+xml" href={homelogo} />
    </Helmet>

    {isLoading? <LoadingScreen />
    :

    <div>
      <MainSlider />
      <CategoriesSlider />
      <div className='grid grid-cols-4 gap-y-4 md:gap-4 mt-5 md:mx-10'>
        {products.map((product, index) => {
          return <Product key={index} product={product} />
        })}  
      </div>
    </div>

    }
    </>
  )
}
