import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export function Orders() {

  // const [orders, setOrders] = useState(null);

  // let {userId} = useParams()
  // console.log(userId);

  // useEffect(() => {
  //   getUserOrders()
  // }, []);


  // async function getUserOrders(){
  //   let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" +userId );

  //   console.log(data);
  //   setOrders(data);
  // }



  return (
    <>
    <div className='container mx-auto h-80 bg-transparent mt-20 text-center'>
      <p className='text-5xl text-purple-600 font-semibold'>All Orders</p>
    </div>
    </>
    
  )
}
