import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { CartContext } from '../Contexts/CartContext';

export function Navbar() {

  const [isOpen , setIsOpen] = useState(false);

  let { userToken, setUserToken } = useContext(AuthContext);

  let {cartItems} = useContext(CartContext);

  const navigate = useNavigate()

  function signOut(){
    setUserToken("")
    localStorage.removeItem("token")
    navigate('/login')
  }


  return (
  <>
  <header className="bg-gray-800 fixed top-0 w-full z-10">
  <nav className="container mx-auto px-5 md:px-10 py-4">

    <div className="flex items-center justify-between">
     <div className='flex justify-between items-center'>

      <div className="text-white text-2xl md:text-3xl pe-2 md:pe-5 flex justify-center items-center md:mb-[5px]">
        <div className= 'me-[5px]'>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <NavLink to={"/"}><span className='font-extrabold'>FreshCart</span></NavLink>
      </div>

      {userToken && <div className="hidden md:block navmenu">
        <ul className="flex items-center space-x-3">
          <li><NavLink to={"/"} className="text-white">Home</NavLink></li>
          <li><NavLink to={"/cart"} className="text-white">Cart</NavLink></li>
          <li><NavLink to={"/wishlist"} className="text-white">WishList</NavLink></li>
          <li><NavLink to={"/categories"} className="text-white">Categories</NavLink></li>
          <li><NavLink to={"/products"} className="text-white">Products</NavLink></li>
          <li><NavLink to={"/brands"} className="text-white">Brands</NavLink></li>
        </ul>
      </div>}

      <div className="md:hidden flex justify-center">
        <button onClick={ () => setIsOpen(!isOpen) } className="outline-none mobile-menu-button">
          <svg className="w-7 h-7 text-white mt-[2px]" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
     </div>

      <div className='flex items-center gap-2 '>

      {userToken && <Link to={"/cart"}>
        <div className="relative scale-75 pt-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white hover:text-purple-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">{cartItems}</span>
        </div>
      </Link>}

        <div className='social-icons cursor-pointer text-white hidden lg:block'>
          <i className='mx-1  hover:text-purple-400 hover:scale-125 fa-brands fa-instagram'></i>
          <i className='mx-1  hover:text-purple-400 hover:scale-125 fa-brands fa-facebook'></i>
          <i className='mx-1  hover:text-purple-400 hover:scale-125 fa-brands fa-tiktok'></i>
          <i className='mx-1  hover:text-purple-400 hover:scale-125 fa-brands fa-twitter'></i>
          <i className='mx-1  hover:text-purple-400 hover:scale-125 fa-brands fa-linkedin'></i>
          <i className='mx-1  hover:text-purple-400 hover:scale-125 fa-brands fa-youtube'></i>
        </div>

        <div className='auth-links'>
          <ul className='flex gap-2'>
            {!userToken && <>
              <li><NavLink to={"/login"} className="text-white" >Login</NavLink></li>
              <li><NavLink to={"/register"} className="text-white">Register</NavLink></li>
            </>}
            
            {userToken && <li><button onClick={signOut} className="text-white">Logout</button></li>}
          </ul>
        </div>
      </div>

    </div>

    {userToken && <div className={isOpen ? "mobile-menu md:hidden" : "mobile-menu md:hidden hidden" }>
      <ul className="mt-4 space-y-2">
        <li><NavLink onClick={() => setIsOpen(false) } to={"/"} className="block px-2 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
        <li><NavLink onClick={() => setIsOpen(false) } to={"/cart"} className="block px-2 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
        <li><NavLink onClick={() => setIsOpen(false) } to={"/wishlist"} className="block px-2 py-2 text-white bg-gray-900 rounded">WishList</NavLink></li>
        <li><NavLink onClick={() => setIsOpen(false) } to={"/categories"} className="block px-2 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
        <li><NavLink onClick={() => setIsOpen(false) } to={"/products"} className="block px-2 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
        <li><NavLink onClick={() => setIsOpen(false) } to={"/brands"} className="block px-2 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
      </ul>
    </div>}
    
  </nav>
  </header>

  </>
  )
}


