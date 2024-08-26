import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

export function SpecCategory() {

    const [isLoading, setIsLoading] = useState(true);

    let {id} = useParams()
    // console.log(id);

    const [specCategory, setSpecCategory] = useState([]);

    useEffect(() => {
        getSpecCategory();
    }, []);

    async function getSpecCategory(){
        setIsLoading(true)

        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories/"+ id);
        // console.log(data?.data);
        setSpecCategory(data?.data);

        setIsLoading(false)

    }


  return (
    <>
    <Helmet>
      <title>Specific Category</title>
    </Helmet>

    {isLoading? <LoadingScreen />
     :

     <div className='flex justify-center items-start my-10 lg:my-10'>
        <div className="category-item hover:bg-purple-100 w-3/4 lg:w-1/4 bg-white shadow-md hover:shadow-purple-500 rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
            <div>
              <div className='overflow-hidden'>          
                <img src={specCategory.image} alt="products categories" className='w-full h-96 rounded-lg object-cover hover:scale-125 transition-all' />
              </div>
              <div className='category-title py-2'>          
                <h2 className='text-center text-purple-900 text-xl my-2 font-bold'>{specCategory.name}</h2>
              </div>
            </div>
        </div> 
    </div>

    }
    </>
  )
}
