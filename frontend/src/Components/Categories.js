
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiTimeFive } from 'react-icons/bi';
import { baseUrl } from '../data/data';
const Categories = ({ selectedSubcategory }) => {
  const [videos, setVideos] = useState([]);
 
  // const base_url=process.env.REACT_APP_PUBLIC_URL

  useEffect(() => {
    if (selectedSubcategory) {
      fetchVideosForSubcategory(selectedSubcategory);
    }
  }, [selectedSubcategory]);

  const fetchVideosForSubcategory = async (subcategoryId) => {
    try {
      const response = await axios.get(`/api/videos/${subcategoryId}`);
      setVideos(response.data);
   
    } catch (error) {
      console.error('Error fetching videos for subcategory:', error);
    }
  };




  return (
    <div>
      {selectedSubcategory && (
        <div>
          <h1 className="text-3xl mx-10 text-white font-bold">Videos for ({selectedSubcategory.sub_cat_name})</h1>
          <div className="bg-[#F6CA42] w-[250px] mx-11 mt-1 h-0.5"></div>

          <div className="grid grid-cols-2 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-10">
            {videos.map((video) => (
              <div key={video.videoid}   className="flex flex-col sm:w-[250]  mx-auto my-3 bg-[#0a0b0c] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/video/${video.videoid}`}>
                  <img className="rounded-t-lg h-[250px] w-full object-cover rounded-lg" src={video.imgurl} alt="Video Thumbnail" />
                </Link>

                <div className="mt-2 flex justify-around">
                  <h5 className="mb-2 text-md font-bold tracking-tight text-white dark:text-white">{video.name}</h5>
                  <p className="text-white flex gap-1">
                    <BiTimeFive color="#F1C63E" className="mt-1" />
                    {video.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
