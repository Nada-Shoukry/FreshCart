import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'



export function CategoriesSlider() {

    const [categories, setCategories] = useState([]);

    async function getCategories(){
        axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((res) => {
            // console.log(res.data.data)
            setCategories(res?.data?.data)
        })
    }

    let {id} = useParams()

    useEffect(() => {
        getCategories()
    }, []);

    var settings = {
        dots: false,
        arrows:false,
        infinite: true,
        slidesToShow: 7,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1536,
                settings: {
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    initialSlide: 3
                }    
            },
            {
                breakpoint: 960,
                settings: {
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 3
                }    
            },
            {
                breakpoint: 576,
                settings: {
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 3
                }    
            }
        ]
    };

  return (
    <>
        <h2 className="m-3 text-lg font-semibold">Shop Popular Categories:</h2>
        <Slider {...settings}>
            {categories.map((category, index) => {
                return <div key={index} className='cursor-pointer'>
                    <Link to={"/speccategory/" +category._id}>
                        <div className='flex flex-col justify-center items-center'>
                           <div className='rounded-full overflow-hidden w-[115px] h-[115px] md:w-[180px] md:h-[180px] xl:h-[200px] xl:w-[200px] mx-[1px]'>
                              <img className='rounded-full w-full h-full object-cover hover:scale-110 transition-all' src={category.image} alt="freshcart categories slider imgs" />
                           </div>
                           <div>
                              <h4 className='text-center text-lg my-2'>{category.name}</h4> 
                           </div>
                        </div>
                    </Link>
                </div>
            })}
        </Slider>

    </>
  )
}
