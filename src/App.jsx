import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Login } from './Components/Login/Login'
import { Register } from './Components/Register/Register'
import { Layout } from './Components/Layout/Layout'
import { Home } from './Components/Home/Home'
import { Brands } from './Components/Brands/Brands'
import { Cart } from './Components/Cart/Cart'
import { Categories } from './Components/Categories/Categories'
import { Products } from './Components/Products/Products'
import { Notfound } from './Components/Notfound/Notfound'
import CounterContextProvider from './Components/Contexts/CounterContext'
import AuthContextProvider from './Components/Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoute from './Components/ProtectedAuthRoute/ProtectedAuthRoute'
import { ProductDetails } from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import { ShippingAddress } from './Components/ShippingAddress/ShippingAddress'
import { Orders } from './Components/Orders/Orders'
import { Offline, Online } from 'react-detect-offline'
import WishList from './Components/WishList/WishList'
import { ForgetPassword } from './Components/ForgetPassword/ForgetPassword'
import { ResetCode } from './Components/ResetCode/ResetCode'
import { SetNewPassword } from './Components/SetNewPassword/SetNewPassword'
import { SpecBrand } from './Components/SpecBrand/SpecBrand'
import { SubCategories } from './Components/SubCategories/SubCategories'
import { SpecCategory } from './Components/SpecCategory/SpecCategory'
import CartProvider from './Components/Contexts/CartContext'

function App() {

  const router = createBrowserRouter ([
    {path:"", element: <Layout/>, children:[
      {index: true , element: <ProtectedRoute> <Home /> </ProtectedRoute>},
      {path: 'login', element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute>},
      {path: 'register', element: <ProtectedAuthRoute><Register /></ProtectedAuthRoute>},
      {path: 'forgetpassword', element: <ProtectedAuthRoute><ForgetPassword /></ProtectedAuthRoute>},
      {path: 'resetcode', element: <ProtectedAuthRoute><ResetCode /></ProtectedAuthRoute>},
      {path: 'setnewpassword', element: <ProtectedAuthRoute><SetNewPassword /></ProtectedAuthRoute>},
      {path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute>},
      {path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute>},
      {path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute>},
      {path: 'specbrand/:id', element: <ProtectedRoute><SpecBrand /></ProtectedRoute>},
      {path: 'categories' , element: <ProtectedRoute><Categories /></ProtectedRoute>},
      {path: 'speccategory/:id' , element: <ProtectedRoute><SpecCategory /></ProtectedRoute>},
      {path: 'subcategories' , element: <ProtectedRoute><SubCategories /></ProtectedRoute>},
      {path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute>},
      {path: 'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute>},
      {path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute>},
      // {path: 'allorders/:userId', element: <ProtectedRoute><Orders /></ProtectedRoute>},
      {path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path: '*', element: <Notfound />}

    ]}
  ])

  return (
    <>

    <AuthContextProvider>
      <CounterContextProvider>
        <CartProvider>

          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
          <Offline>
            <div className='fixed bottom-4 start-4 rounded-md bg-yellow-300 px-2'>
              <div className='m-2'>
                Oops! You're offline
              </div>
            </div>
          </Offline>

        </CartProvider>
      </CounterContextProvider>
    </AuthContextProvider>


    </>
  )
}

export default App
