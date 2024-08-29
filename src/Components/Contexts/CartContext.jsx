import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const CartContext = createContext();

export default function CartProvider({children}) {

  const [cartItems, setCartItems] = useState(0);

    
  useEffect(() => {
    getUserCart()
  }, []);

//   let {userToken}= useContext(AuthContext);

  async function getUserCart(){

    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
      headers : {
        // token : userToken 
        token: localStorage.getItem("token")
      }
    });

    // console.log(data.numOfCartItems);
    setCartItems(data.numOfCartItems);
  }


  return <CartContext.Provider value={ {cartItems , setCartItems} }>
    {children}
  </CartContext.Provider>
}