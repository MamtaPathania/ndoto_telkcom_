import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './Login.css'
import { BsFillPlayFill,BsInfoLg } from 'react-icons/bs';
import NdotoNavbar from './NdotoNavbar';
import { useParams ,Link} from 'react-router-dom';
import {MdOutlineSignalCellularAlt2Bar} from 'react-icons/md'
import './Login.css'
import Loader from './Loader';
import NdotoFooter from './NdotoFooter';
import { baseUrl } from '../data/data';

const NdotoAllVideos = () => {

const [videos,setVideos]=useState([])
const params=useParams()
console.log("allparams",params)


    const [data,setData]=useState([])
    const fetchImg=async()=>{
        const res=await axios.get(`/api/streamlogo`)
        setData(res.data)
       
    }

    useEffect(()=>{
        fetchImg()
    },[])

    const fetchSubCat = async () => {
      try {
        const response = await axios.get(`/api/ndotocategory/${params.videoid}`);
        setVideos(response.data);
        console.log("allvideos",response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
  };
  useEffect(()=>{
    fetchSubCat()
  },[params.videoid])
    
    


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
             <>
             <div key={index} className="p-4">
               
               <img
                 src={img}
                 alt={'banners'}
                 className="w-full h-[250px] md:h-[250px] object-fit rounded-lg shadow-lg"
               />
             
           </div>
             </>
              
            );
          })}
        </Slider>
      
</div>

{!data || data.length === 0 ? <Loader service='videos'/> :
<>
<h1 className='text-white flex font-family relative mx-7 md:mx-12 mt-10 text-lg md:text-2xl'><MdOutlineSignalCellularAlt2Bar color='#F5676D' className='mt-1' />All Videos</h1>
<div className="grid grid-cols-2 md:grid-cols-3 md:gap-2 mt-4">

{videos.map((video) => (
    <div key={video.videoid} className="flex flex-col sm:w-[250] md:w-[430px] vt-video-box  mx-10 my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
     <Link to={`/ndotosingle/${video.videoid}/${params.ani}`}>
        <img className="lg:h-[450px] w-full rounded-lg object-cover" src={video.imgurl} alt="Video Thumbnail" />
        </Link>
    </div>
))}
</div>
</>
}

<NdotoFooter/>

  </div>
  )
}

export default NdotoAllVideos
