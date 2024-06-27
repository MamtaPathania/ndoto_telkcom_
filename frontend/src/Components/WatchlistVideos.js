import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiTimeFive } from 'react-icons/bi';
import axios from 'axios';
import './Login.css'
import { baseUrl } from '../data/data';


const WatchlistVideos = ({ani,portal,cat}) => {
console.log("bty",portal)
  const [list,setList]=useState([])
 const base_url=process.env.REACT_APP_PUBLIC_URL
  
  const watch = async () => {
    try {

      if( ani.length!=10 ){
        console.log("not fetching watchlist")
        return;
      }
    else{
      const res = await axios.get(`/api/watchlist/${ani}/${portal}`);
      setList(res.data);
  
    }
     
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  useEffect(() => {
    watch(); 
    const intervalId = setInterval(watch, 3000);

    return () => clearInterval(intervalId);
}, []);


  return (
   <>
    {list.length == 0 ?"":  <>
    <div className='mt-6'>
     <h1 className="lg:text-3xl sm:text-2xl mx-6 md:mx-[52px] text-white relative " style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>WATCHLIST</h1>
     {/* <div className='bg-[#F6CA42] vt-divider w-[200px] mx-11 mt-1 h-0.5'></div> */}
   
  <div   className="grid grid-cols-3 vt-video-box mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-10">
  {list.map((video) => {
         return (
           <div
           key={video.videoid}
             className="flex flex-col sm:w-[250] vt-video-box  mx-auto my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-black dark:border-gray-700"
           >
             <Link to={`/video/${video.videoid}/${portal}/${ani}/${cat}`}>
               <img
                 className=" lg:h-[250px]  w-full object-cover  "
                 src={video.imgurl}
                 alt="Video Thumbnail"
                 />
             </Link>

             <div className="mt-2 vt-title-main justify-around items-center">
               <h5 className="mb-2 text-md tracking-tight text-white dark:text-white" style={{ fontFamily: "'Saira Semi Condensed', sans-serif"}}>
                 {video.name}
               </h5>
               <p className="text-white flex  gap-1">
                 <BiTimeFive color="#F1C63E" className="mt-1 " />
                 {video.duration}
               </p>
             </div>
           </div>
         );
       })}
  </div>
      
     
     </div>
   
    </>}
   
        </>
  );
};

export default WatchlistVideos;
