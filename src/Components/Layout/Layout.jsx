import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { Footer } from '../Footer/Footer'


export function Layout() {
  return (
    <>
    <Navbar />
    <div className='pt-24 pb-10 container mx-auto'>
        <Outlet />
    </div>
    <Footer />
    </>
  )
}
