import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Link } from 'react-router-dom';
import cartlogo from "/src/assets/images/cart.png"


export function Categories({category}) {

  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState ([]);

  useEffect(() => {
    getCategories();
  }, []);

async function getCategories() {
  setIsLoading(true)

  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  // console.log(data.data);
  setCategories(data.data)

  setIsLoading(false)

}  

  return (
    <>
    <Helmet>
      <title>Categories</title>
      <link rel='icon' type="image/svg+xml" href={cartlogo} />
    </Helmet>

    {isLoading? <LoadingScreen />
    :

    <div className='grid grid-cols-4 gap-y-4 md:gap-4 mt-5 mx-4 md:mx-10'>
      {categories.map((category, index) => {
        return <div key={index} className="category-item hover:bg-purple-100 col-span-4 md:col-span-2 lg:col-span-1 bg-white shadow-md hover:shadow-purple-500 rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <Link to={"/speccategory/" +category._id}>
            <div>
              <div className='overflow-hidden'>          
                <img src={category.image} alt="products categories" className='w-full h-80 rounded-lg object-cover hover:scale-125 transition-all' />
              </div>
              <div className='category-title py-2'>          
                <h2 className='text-center text-purple-900 text-xl my-2 font-bold'>{category.name}</h2>
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
