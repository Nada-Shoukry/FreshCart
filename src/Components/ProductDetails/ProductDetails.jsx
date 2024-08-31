import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../Rating/Rating';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { RelatedProducts } from '../RelatedProducts/RelatedProducts';
import { AuthContext } from '../Contexts/AuthContext';
import { addProductToCart } from '../../cartServices';
import { Helmet } from 'react-helmet';
import { addProductToWishlist } from '../../wishlistServices';



export function ProductDetails() {

    let {id} = useParams();
    // console.log(id)

    const [productDetails , setProductDetails] = useState(null);
    const [relatedProducts , setRelatedProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    let {userToken} = useContext(AuthContext)

    useEffect(() => {
        getProductDetails()
    },[id]);

    async function getProductDetails() {
        setIsLoading(true)
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id)
        // console.log(data.data)
        setProductDetails(data.data)

        getRelatedProducts(data.data?.category._id)

        setIsLoading(false)
    }

    async function getRelatedProducts(categoryId) {
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" ,{
            params: {
                "category": categoryId
            }
        })

        setRelatedProducts(data.data)
    }


    return (
    <>

     <Helmet>
        <title>Product Details</title>
     </Helmet>
    {
        isLoading ? <LoadingScreen />
        : 
        <div className= "bg-transparent">
            <main className="py-10 ">
                <div className="container px-16 mx-auto">
                    <div className="md:flex md:items-center ">
                        <div className="w-full md:w-6/12 lg:w-3/12 ">
                            <ProductSlider images={productDetails?.images} />
                        </div>

                        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-6/12 lg:w-9/12">
                            <h3 className="text-gray-700 uppercase text-lg">{productDetails?.title}</h3>
                            <span className="text-gray-500 mt-3">${productDetails?.price}</span>
                            <hr className="my-3" />

                            <div className="mt-3">
                                <label className="text-gray-700 text-sm">Ratings:</label>
                                <Rating rating={productDetails?.ratingsAverage ?? 0} />
                            </div>

                            <div className="mt-3 me-5">
                                <label className="text-gray-700 text-sm">Description:</label>
                                <h3>{productDetails?.description}</h3>
                            </div>

                            <div className="mt-3">
                                <label className="text-gray-700 text-sm">Category:</label>
                                <h3>{productDetails?.category.name}</h3>
                            </div>
                    
                            <div className="mt-3">
                                <label className="text-gray-700 text-sm">SubCategory:</label>
                                <h3>{productDetails?.subcategory[0].name}</h3>
                            </div>

                            <div className="mt-3">
                                <label className="text-gray-700 text-sm">Brand:</label>
                                <h3>{productDetails?.brand.name}</h3>
                            </div>
                            
                            <div className="flex items-center  mt-6 gap-y-1">

                                <button onClick={() => addProductToCart(productDetails._id, userToken)} className="me-2 px-1 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    <div className='flex justify-center items-center'>
                                        <svg className="h-4 w-4 ms-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                        <div className='mx-1 text-md'> Add to Cart</div>
                                    </div>
                                </button>

                                <button onClick={() => addProductToWishlist(productDetails._id, userToken)} className=" px-1 py-2 bg-purple-500 text-white text-sm font-medium rounded-lg hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    <div className='flex justify-center items-center'>
                                        <i className='fa-regular fa-heart text-md ms-1'></i>
                                        <div className='mx-1 text-md'> Add to WishList</div>
                                    </div>
                                </button>
                                
                            </div>
                        </div>
                    </div>

                   <RelatedProducts products={relatedProducts} /> 

                </div>
            </main>
        </div>  
    }

    </>
  )

}
