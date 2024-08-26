import React from 'react'
import Slider from "react-slick"


export function ProductSlider({ images }) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    }

  return (
    <>
        <Slider {...settings}>
            {images?.map((img, index) => {
                return <img key={index} className="w-full rounded-md object-cover max-w-lg mx-auto" src={img} alt="product image"/>
                })
            }
        </Slider>

    </>    
  )
}
