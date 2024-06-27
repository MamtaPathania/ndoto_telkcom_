import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiTimeFive } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Login.css'
import { baseUrl } from '../data/data';
// import { baseUrl } from '../data/data';
const RandomVideos = ({selectedSubcategory,portal,ani,cat}) => {
    const [randomVideos, setRandomVideos] = useState([]);
    const base_url=process.env.REACT_APP_PUBLIC_URL

    const fetchRandomVideos = async (subcategoryId) => {
      try {
    console.log("subcatid",subcategoryId)
        const response = await axios.get(`/api/videos/${subcategoryId}`);
   
        const shuffledVideos = response.data.sort(() => Math.random() - 0.5);
      
        const randomSixVideos = shuffledVideos.slice(0, 10);
        setRandomVideos(randomSixVideos);

      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
  
    useEffect(() => {
      if (selectedSubcategory) {
        fetchRandomVideos(selectedSubcategory);
      }
    }, [selectedSubcategory]);
  return (

    <div>
      {randomVideos.length > 0 && (
        <div>
          <h1 className="lg:text-3xl sm:text-2xl  mx-6  md:mx-[52px] mt-10 text-white relative  capitalize"  style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>RECOMMENDED VIDEOS</h1>
          {/* <div className="bg-[#F6CA42] vt-divider w-[250px] mx-11 mt-1 h-0.5" /> */}
       
  <div   className="grid grid-cols-3 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-2 sm:mx-4 md:mx-8 lg:mx-10">
  {randomVideos.map((video) => {
              return (
                <div key={video.videoid} className="flex  vt-video-box flex-col sm:w-[250px] mx-3 my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-black dark:border-gray-700">
                  <Link to={`/video/${video.videoid}/${portal}/${ani}/${cat}`}>
                    <img className=" lg:h-[250px] w-full object-cover " src={video.imgurl} alt="Video Thumbnail" />
                  </Link>
                  <div className="mt-2 vt-title-main justify-around">
                    <h5 className="mb-2 text-md  tracking-tight text-white dark:text-white" style={{ fontFamily: "'Saira Semi Condensed', sans-serif"}}>{video.name}</h5>
            
                  </div>
                </div>
              );
            })}
</div>
        
          </div>
        
      )}
      
    </div>
  )
}

export default RandomVideos
