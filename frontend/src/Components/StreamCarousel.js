import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './Login.css'
import { BsFillPlayFill,BsInfoLg } from 'react-icons/bs';
import { baseUrl } from '../data/data';


const StreamCarousel = () => {



    const [data,setData]=useState([])
    const fetchImg=async()=>{
        const res=await axios.get(`/api/streamlogo`)
        setData(res.data)
       
    }

    useEffect(()=>{
        fetchImg()
    },[])
    
    


    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => (
          <div className='mt-5'>
            <div className="button-container">
            <button className="bg-white  text-black px-4 py-2 mx-2 rounded-md">
        <div className='flex'>
        <BsFillPlayFill className='mt-1'/> Play 
        </div>
    
      </button>
              <button className="bg-white text-black px-4 py-2 rounded-md">
      <div className='flex'>
        <BsInfoLg className='mt-1'/> Info 
        </div>
      </button>
            </div>
            <ul>{dots}</ul>
          </div>
        ),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <div>

      <div className="container w-full mx-auto slider-main">

      <Slider {...settings}>
          {data.map((img, index) => {
        
            return (
             
              <div key={index} className="p-4">
               
                  <img
                    src={img}
                    alt={'banners'}
                    className="w-full h-[250px] md:h-[250px] object-fit rounded-lg shadow-lg"
                  />
                
              </div>
            );
          })}
        </Slider>
</div>
  
  </div>
  )
}

export default StreamCarousel
