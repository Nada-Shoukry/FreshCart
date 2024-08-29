import { Bounce, toast } from 'react-toastify'
import axios from 'axios'


export async function addProductToWishlist(productId, userToken) {
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
      productId : productId
    }, {
      headers : {
        token : userToken 
      }
    })

    // console.log(data);

    toast.success(data.message, {
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



