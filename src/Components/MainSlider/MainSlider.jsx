import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

import sliderImg1 from "/src/assets/images/sale-idea.jpg"
import sliderImg2 from "/src/assets/images/shopping-bags.jpg"
import sliderImg3 from "/src/assets/images/shopping-bagt.jpg"
import sliderImg4 from "/src/assets/images/woman-salet.jpg"
import sliderImg5 from "/src/assets/images/slide1.jpg"
import sliderImg6 from "/src/assets/images/slide2.jpg"
import sliderImg7 from "/src/assets/images/slide3.jpg"
import sliderImg8 from "/src/assets/images/slide4.jpg"
import sliderImg9 from "/src/assets/images/slide5.jpg"



export function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 950,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }    
        },
        {
            breakpoint: 768,
            settings: {
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }    
        }
    ]

};

return (
<>
    <div className="grid grid-cols-5 mb-10 gap-y-2">
      <div className='md:col-span-4 col-span-5 h-full cursor-pointer'>
        <Slider {...settings}>
          <div className='relative'>
            <img src={sliderImg2} className='w-full h-[300px] object-fit' alt="cart Images" />
            <div className='absolute top-0 right-0 mx-5 my-3 md:my-5 flex flex-col items-start w-1/2'>
              <span className='bg-yellow-300 px-1 rounded-md'>Free Shipping - Orders Over 100$</span>
              <h1 className='text-2xl lg:text-4xl xl:text-5xl text-white font-semibold my-1'>Free Shipping on Orders Over <span className='text-purple-500'>100$</span></h1>
              <p className='text-slate-900 italic mt-2 line-clamp-2'>Free Shipping to First-Time Customers only, after Promotions and Discounts are applied.</p>
              <div className='flex justify-center items-center bg-purple-400 px-2 py-1 mt-3 md:mt-5 rounded-lg text-white hover:bg-purple-500'>
                <Link to="/products"><span className='text-lg '>Shop Now</span> <i className='fas fa-arrow-right mx-1'></i></Link>
              </div>
            </div>
          </div>
          <div className='relative'>
            <img src={sliderImg1} className='w-full h-[300px] object-fit' alt="cart Images" />
            <div className='absolute top-0 right-0 mx-5 my-3 md:my-5 flex flex-col items-start w-1/2'>
              <span className='bg-purple-300 px-1 rounded-md'>Opening Sale Discount 50%</span>
              <h1 className='text-2xl lg:text-4xl xl:text-5xl text-white font-semibold my-2'>Get Benfits of our Big Sale this Month.</h1>
              <p className='text-slate-900 italic mt-2'>Buy Two, Get One Free. Buy Three, Get 25% Discount.</p>
              <div className='flex justify-center items-center bg-purple-400 px-2 py-1 mt-3 md:mt-5 rounded-lg text-white hover:bg-purple-500'>
                <Link to="/products"><span className='text-lg '>Shop Now</span> <i className='fas fa-arrow-right mx-1'></i></Link>
              </div>
            </div>
          </div>

          <div className='relative'>
            <img src={sliderImg3} className='w-full h-[300px] object-fit' alt="cart Images" />
            <div className='absolute top-0 left-0 mx-5 my-3 md:my-5 flex flex-col items-start w-1/2'>
              <span className='bg-purple-300 px-1 rounded-md'>10% Cash Back on Self-Care Products.</span>
              <h1 className='text-2xl lg:text-4xl xl:text-5xl text-white font-semibold my-2'><span className='text-purple-500'>10%</span> Cash Back on Self-Care Products.</h1>
              <p className='text-slate-900 italic mt-2'>All Shopping Categories in One Place.</p>
              <div className='flex justify-center items-center bg-purple-400 px-2 py-1 mt-3 md:mt-5 rounded-lg text-white hover:bg-purple-500'>
                <Link to="/products"><span className='text-lg '>Shop Now</span> <i className='fas fa-arrow-right mx-1'></i></Link>
              </div>
            </div>
          </div>
          
          <div className='relative'>
            <img src={sliderImg4} className='w-full h-[300px] object-fit' alt="cart Images" />
            <div className='absolute top-0 right-0 mx-5 my-3 md:my-5 flex flex-col items-start w-1/3'>
              <span className='bg-rose-400 px-1 rounded-md'>Sale Discount 50%</span>
              <div className='grid grid-cols-4 gap-x-1 mt-2'>
                <div className='rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px] m-2 col-span-2 lg:col-span-1'>
                  <img src={sliderImg6} className='w-full h-full rounded-full object-fit' alt="slider products" />
                </div>
                <div className='rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px] m-2 col-span-2 lg:col-span-1'>
                  <img src={sliderImg5} className='w-full h-full rounded-full object-fit' alt="slider products" />
                </div>
                <div className='rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px] m-2 col-span-2 lg:col-span-1'>
                  <img src={sliderImg8} className='w-full h-full rounded-full object-fit' alt="slider products" />
                </div>
                <div className='rounded-full w-[60px] h-[60px] md:w-[80px] md:h-[80px] m-2 col-span-2 lg:col-span-1'>
                  <img src={sliderImg9} className='w-full h-full rounded-full object-fit' alt="slider products" />
                </div>

              </div>
              <div className='flex justify-center items-center bg-purple-400 px-2 py-1 mt-1 md:mt-3 rounded-lg text-white hover:bg-purple-500'>
                <Link to="/products"><span className='text-lg '>Shop Now</span> <i className='fas fa-arrow-right mx-1'></i></Link>
              </div>
            </div>
          </div>
        </Slider>

      </div>
      <div className='md:col-span-1 col-span-5 px-1 md:px-0'>
        <div className="flex md:flex-col md:w-100 flex-row">
          <img src={sliderImg7} className='w-1/3 md:w-full h-[100px]' alt="cart Images" />
          <img src={sliderImg8} className='w-1/3 md:w-full h-[100px]' alt="cart Images" />
          <img src={sliderImg9} className='w-1/3 md:w-full h-[100px]' alt="cart Images" />
        </div>
      </div>
    </div>

</>
)
}

