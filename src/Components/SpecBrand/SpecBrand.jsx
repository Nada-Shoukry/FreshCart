import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';

export function SpecBrand() {

  const [isLoading, setIsLoading] = useState(true);

  let {id} = useParams()
  // console.log(id);

  const [specBrand, setSpecBrand] = useState([]);

  useEffect(() => {
      getSpecBrand();
  }, []);

  async function getSpecBrand(){
      setIsLoading(true);

      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands/" + id);
      // console.log(data.data);
      setSpecBrand(data?.data);

      setIsLoading(false);

  }
return (
  <>

    <Helmet>
      <title>Specific Brand</title>
    </Helmet>

  {isLoading? <LoadingScreen />
     :

  <div className='flex justify-center items-start my-10 lg:my-16'>
    <div className='relative brand-item overflow-hidden w-3/4 lg:w-1/4 bg-white shadow-md shadow-purple-400 hover:shadow-purple-500 rounded-lg dark:bg-gray-800 dark:border-gray-700 cursor-pointer'>
      <img src={specBrand.image} alt="brands" className='w-full rounded-lg hover:scale-110 transition-all' />
      <div className='brand-title w-full bg-purple-100 py-2 absolute'>
        <h2 className='text-center text-xl pb-2 text-purple-600 font-bold '>{specBrand.name}</h2>
      </div>
    </div>
  </div>
     
  }
   
  </>
)
}
