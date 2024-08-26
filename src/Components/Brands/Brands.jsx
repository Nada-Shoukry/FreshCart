import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import cartlogo from "/src/assets/images/cart.png"


export function Brands() {

  const [isLoading, setIsLoading] = useState(true);

  const [brands, setBrands] = useState ([]);

  useEffect(() => {
    getBrands();
  }, []);

  async function getBrands() {
  setIsLoading(true)

  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  // console.log(data.data);
  setBrands(data.data)

  setIsLoading(false)

}  

  return (
    <>
    <Helmet>
      <title>Brands</title>
      <link rel='icon' type="image/svg+xml" href={cartlogo} />
    </Helmet>

    {isLoading? <LoadingScreen />
    :

    <div className='grid grid-cols-4 gap-y-4 md:gap-4 mt-5 mx-4 md:mx-10' >
      {brands.map((brand, index) => {
        return <div  key={index} className="col-span-4 md:col-span-2 lg:col-span-1 bg-white shadow-md hover:shadow-purple-500 rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
            <Link to={"/SpecBrand/" + brand._id}>
              <div className='relative brand-item overflow-hidden'>
                <img src={brand.image} alt="brands" className='w-full rounded-lg hover:scale-110 transition-all' />
                <div className='brand-title w-full bg-purple-100 py-2 absolute'>
                  <h2 className='text-center text-xl pb-2 text-purple-600 font-bold '>{brand.name}</h2>
                </div>
              </div>          
            </Link>
        </div>
      })}
    </div>

    }
    </>
  )
}
