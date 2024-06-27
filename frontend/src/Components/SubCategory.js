import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import {BiTimeFive} from 'react-icons/bi'
import WatchlistVideos from './WatchlistVideos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Login.css'
import { baseUrl } from '../data/data';
const SubCategory = ({selectedSubcategory,subCategoryName,videos,ani,beautyParam,cat}) => {
  

  const [watchlist, setWatchlist] = useState([]);

  const navigate=useNavigate()


  const addToWatchlistBackend = async (video) => {
    const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');

    try {

      const wishvideo={
        ani:ani,
        videoid:video.videoid,
        datetime:createddatetime,
        portal:beautyParam,

      }
      console.log("wish",wishvideo)
      await axios.post(`/api/addToWatchlist`,  wishvideo );
      fetchWatchlist()
      // setClick(true)
      console.log('Video added to watchlist',wishvideo);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (videoId) => {
    try {
      await axios.delete(`/api/watchlist/${videoId}`);
      fetchWatchlist(); // Fetch updated watchlist data
      console.log("video removed")
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };
  


  const fetchWatchlist = async () => {
    try {

      const response = await axios.get(`/api/watchlist/${ani}/${beautyParam}`);
      setWatchlist(response.data);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
    console.log("watchlist fetching")
    const interval = setInterval(fetchWatchlist, 3000);
    return () => clearInterval(interval);
  }, []);


  const isInWatchlist = (videoid) => {
    return watchlist.some(item => item.videoid === videoid);
  };

  
  const handleVideoClick = async (video) => {
    console.log("click", video.videoid);
  
    const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    try {
      const videoLog = {
        videoid: video.videoid,
        ani: ani,
        createddatetime: createddatetime,
        type: 'video',
        view: 1,
        channel: beautyParam,
        portal: null,
      };
  
      console.log("bjnbjb jn", videoLog);
  
      // Fetch existing videos for the given ani from the backend
      const existingVideosResponse = await axios.get(`/api/continue/${ani}/${beautyParam}`);
      const existingVideos = existingVideosResponse.data;
  
      // Find if the video with the same videoid already exists
      const existingVideo = existingVideos.find(v => v.videoid === video.videoid);
  
      if (existingVideo) {
        // Delete the existing video record
        await axios.delete(`/api/video-logging/${video.videoid}/${ani}`);
        console.log("Existing video deleted:", existingVideo);
      }
  

      console.log("anii",ani)
      // Post the new video record
      await axios.post(`/api/video-logging`, videoLog).then((res)=>{
        console.log("===============Video log added successfully");
        console.log('Video log sent:', ani);
        
        navigate(`/video/${video.videoid}/${beautyParam}/${ani}/${cat}`);
      })
      
    } catch (error) {
      console.error('Error sending video log:', error);
    }
  };

  return (
    <div>
       {selectedSubcategory && (
        <div>
          <h1 class="lg:text-3xl sm:text-2xl mx-6  md:mx-[52px] text-white  uppercase  relative "  style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}> VIDEOS FOR ({subCategoryName})</h1>
          {/* <span  style={{ position: 'absolute', bottom: '-5px', width: '100%',color:'white' }}></span> */}


          {/* <div className='bg-[#F6CA42] w-[250px] vt-divider mx-11 mt-1 h-0.5'>

          </div> */}
  <div  className="grid grid-cols-3 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-10 ">

            {videos.map((video) => {
              // const inWatchlist = checkVideoInWatchlist(video.videoid);
            const inWatchlist = isInWatchlist(video.videoid);
     
              return (
                <div key={video.videoid}className="flex vt-video-box flex-col sm:w-[250px] mx-3 my-3 bg-[#0a0b0c] border-gray-200 shadow dark:bg-black dark:border-gray-700"  >
                  <Link   
                    onClick={() => handleVideoClick(video)} 
                    
                    >
                    <img className=" lg:h-[250px]  w-full object-cover  " src={video.imgurl} alt="Video Thumbnail" />
                  </Link>


                  <div className='mt-2 vt-title-main justify-around'>
                    <h5 className="mb-2 text-md tracking-tight  text-white dark:text-white" style={{ fontFamily: "'Saira Semi Condensed', sans-serif"}}>{video.name}</h5>
                  
                    {/* <p className='text-white flex  gap-1'> <BiTimeFive color='#F1C63E' className='mt-1 ' />{video.duration}</p> */}
                
                  </div>
                  {/* <div className='flex justify-center'>

                  <button
                    className={`px-2 md:py-1  rounded-md ${
                      inWatchlist
                        ? 'bg-[#0a0b0c] text-sm ms:text-sm text-white hover:bg-[#F6CA42] font-medium border border-[#F6CA42]'
                        : 'bg-[#0a0b0c] text-sm ms:text-sm text-white hover:bg-[#F6CA42] font-medium border border-[#F6CA42]'
                      } text-white`}
                      onClick={(e) => {
                        console.log("watchlist====",inWatchlist)
                        e.stopPropagation();
                        if (inWatchlist) {
                          removeFromWatchlist(video.videoid);
                        } else {
                          addToWatchlistBackend(video);
                        }
                      }}
                      
                    >
                    {inWatchlist ? 'Remove' : 'Watchlist'}
                  </button>

                  </div> */}
             

                </div>)

})}


</div>
        
          </div>
     
      )}
    </div>
  )
}

export default SubCategory
