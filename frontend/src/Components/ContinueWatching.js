import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BiSolidCalendarWeek, BiTimeFive } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SubCategory.css'
import './Login.css'
import { baseUrl } from '../data/data';

const ContinueWatching = ({ subCategoryName, selectedSubcategory, ani, beautyParam, cat }) => {
  const [data, setData] = useState([])

  // const base_url = process.env.REACT_APP_PUBLIC_URL

  const continueWatching = async () => {
    try {
      if (ani.length < 10) {
        console.log("not sending continue")
        return;
      } else {
        const res = await axios.get(`/api/continue/${ani}/${beautyParam}`);
        setData(res.data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  useEffect(() => {
    continueWatching()
  }, [])

  return (
    <div className='mt-10'>
      {data.length === 0 ? "" : (
        <>
          <h1 className="lg:text-3xl sm:text-2xl mx-6 md:mx-[52px] relative text-white" style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>CONTINUE WATCHING</h1>
          <p></p>
          {data.length >= 4 ? (
            <Slider
              className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-3 sm:mx-4 md:mx-8 lg:mx-10"
              slidesToShow={4} // Number of slides to show at a time
              slidesToScroll={1} // Number of slides to scroll
              infinite={true} // Infinite looping
              autoplay={true} // Autoplay the carousel
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
              {data.map((video) => (
                <div key={video.videoid} className="card flex flex-col sm:w-[250] gap-4 mx-auto my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-black dark:border-gray-700"  >
                  <Link to={`/video/${video.videoid}/${beautyParam}/${ani}/${cat}`}>
                    <img className=" lg:h-[300px] w-full object-cover " src={video.imgurl} alt="Video Thumbnail" />
                  </Link>
                  <div className="mt-2  vt-title-main justify-around">
                    <h5 className="mb-2  tracking-tight text-white dark:text-white text-align"
                      style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>{video.name}</h5>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="grid grid-cols-3 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mx-3 sm:mx-4 md:mx-8 lg:mx-10">
              {data.map((video) => (
                <div key={video.videoid} className=" card flex flex-col sm:w-[250] gap-4 mx-auto my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-black dark:border-gray-700"  >
                  <Link to={`/video/${video.videoid}/${beautyParam}/${ani}/${cat}`}>
                    <img className=" lg:h-[300px] w-full object-cover " src={video.imgurl} alt="Video Thumbnail" />
                  </Link>
                  <div className="mt-2  vt-title-main  justify-around">
                    <h5 className="mb-2  tracking-tight text-white dark:text-white"
                      style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>{video.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ContinueWatching
