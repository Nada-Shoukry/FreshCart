
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import cartlogo from "/src/assets/images/cart.png"


export function SubCategories() {

  const [isLoading, setIsLoading] = useState(true);

  const [subCategories, setSubCategories] = useState ([]);

  useEffect(() => {
    getSubCategories();
  }, []);

async function getSubCategories() {
  setIsLoading(true)

  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/subcategories");
  // console.log(data.data);
  setSubCategories(data.data)

  setIsLoading(false)

}  

  return (
    <>
    <Helmet>
      <title>SubCategories</title>
      <link rel='icon' type="image/svg+xml" href={cartlogo} />
    </Helmet>

    {isLoading? <LoadingScreen />
    :

    <div className='grid grid-cols-4 gap-y-4 md:gap-4 mt-5 mx-4 md:mx-10'>
      {subCategories.map((subCategory, index) => {
        return <div key={index} className="subCategory-item hover:bg-purple-100 col-span-4 md:col-span-2 lg:col-span-1 bg-white shadow-md hover:shadow-purple-500 rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
            <div>
              <div className='subCategory-title py-5'>          
                <h2 className='text-center text-purple-900 text-xl my-2 font-bold'>{subCategory.name}</h2>
              </div>
            </div>
        </div> 
      })}
    </div>

    }
    </>
  )
}

