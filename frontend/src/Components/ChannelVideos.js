import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

import './Login.css'
import { BsFillPlayFill,BsInfoLg } from 'react-icons/bs';
import NdotoNavbar from './NdotoNavbar';
import { useParams,Link } from 'react-router-dom';
import {MdOutlineSignalCellularAlt2Bar} from 'react-icons/md'
import Loader from './Loader';
import './Ndoto.css'
import NdotoFooter from './NdotoFooter';
import { baseUrl } from '../data/data';

const ChannelVideos = () => {


const params=useParams()
console.log("channelparam",params)
    const [data,setData]=useState([])
    const [subcat,setSubCat]=useState([])
    const [videos,setVideos]=useState([])

    const fetchImg=async()=>{
        const res=await axios.get(`/api/streamlogo`)
        setData(res.data)
       
    }

    const fetchVideos=async()=>{
      const res=await axios.get(`/api/subcategories/${params.id}/videos`)
      setVideos(res.data)
      console.log("subcatvideos=========",res.data)
     
    }
    useEffect(()=>{
        fetchImg()
    },[])
    
    useEffect(()=>{
      fetchVideos()
    },[params.id])
 
  
  

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
    <div className='bg-black'>
<NdotoNavbar ani={params.ani}/>
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

<Slider
                    className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-3 sm:mx-4 md:mx-8 lg:mx-10"
                    slidesToShow={4} // Number of slides to show at a time
                    slidesToScroll={1} // Number of slides to scroll
                    infinite={true} // Infinite looping
                    autoplay={false} // Autoplay the carousel
                    speed={500}

                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4, // Show 4 videos in desktop mode
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2, // Show 2 videos in tablet mode
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 3, // Show 1 video in mobile mode
                                slidesToScroll: 1,
                            },
                        },
                    ]}
                >

                    {subcat.map((video) => (
                        <div key={video.videoid} className=" card flex flex-col sm:w-[250] gap-4 mx-auto my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700"  >
                            {/* <Link to={`/video/${video.videoid}/${beautyparam}/${ani}/${cat}`}> */}
                            <img className=" lg:h-[300px] w-full object-cover " src={video.imgurl} alt="Video Thumbnail" />
                            {/* </Link> */}

                           
                        </div>
                    ))}
                </Slider>


                {!videos || videos.length === 0 ? <Loader service='videos'/> :
<div>
  {/* {videosData.map((data, index) => {
    // Check if videos are available for the sub-category
    if (data.videos && data.videos.length > 0) {
      return (
        <div key={index}>
          <div className='flex'>
            <h1 className='text-white flex relative mx-6 md:mx-12 mt-3 text-sm md:text-2xl'>
              <MdOutlineSignalCellularAlt2Bar color='#F5676D' className='mt-1' />
              {data.categoryName} -- {data.subCategory}
            </h1>
          </div>

          <Slider
            className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3 sm:mx-4 md:mx-8 lg:mx-10"
            slidesToShow={4}
            slidesToScroll={1}
            infinite={true}
            autoplay={false}
            speed={500}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {data.videos.map((video, videoIndex) => (
              <div key={videoIndex} className="w-1/4 p-2">
                <Link to={`/ndotosingle/${video.videoid}`}>
                  <img src={video.imgurl} alt={video.name} className="w-full rounded-md h-full object-cover" />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      );
    }
    return null;  // Return null if there are no videos for the sub-category
  })} */}

{videos.map((data, index) => {
    // Check if videos are available for the sub-category
    if (data.videos && data.videos.length > 0) {
      return (
        <div key={index}>
         <div className='flex justify-between items-center'>
    <h1 className='text-white flex relative mx-6 font-family md:mx-12 mt-3 text-sm md:text-2xl'>
        <MdOutlineSignalCellularAlt2Bar color='#F5676D' className='mt-1' />
          Videos for -- {data.sub_cat_name}
    </h1>
   
</div>


          <Slider
            className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-3 sm:mx-4 md:mx-8 lg:mx-10"
            slidesToShow={4}
            slidesToScroll={1}
            infinite={true}
            autoplay={false}
            speed={500}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {data.videos.map((video, videoIndex) => (
              <div key={videoIndex} className="w-1/4 p-2">
                <Link to={`/ndotosingle/${video.videoid}/${params.ani}`}>
                  <img src={video.imgurl} alt={video.name} className="w-full rounded-md h-full object-cover" />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      );
    }
    return null;  // Return null if there are no videos for the sub-category
  })}
</div>

}
  <NdotoFooter/>  
  </div>
  )
}

export default ChannelVideos
