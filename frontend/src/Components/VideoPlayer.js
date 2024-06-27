import React, { useState } from 'react' ;
import { BiTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const VideoPlayer = ({ video, updateVideoProgress }) => {
  const [watchedTime, setWatchedTime] = useState(0); // Initialize watchedTime to 0

  // Simulate user watching the video and updating watchedTime
  const handleWatch = (currentTime) => {
    setWatchedTime(currentTime);
    updateVideoProgress(video.videoid, watchedTime, video.duration);
  };

  // Simulate user completing the video
  const handleVideoCompletion = () => {
    setWatchedTime(video.duration);
    updateVideoProgress(video.videoid, video.duration, video.duration);
  };

  return (
    <div className="video-player">
      {/* Your video player UI */}
      <div className="grid grid-cols-2 mt-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2 sm:mx-4 md:mx-8 lg:mx-10">
      <div key={video.videoid} className="flex flex-col sm:w-[250px] mx-auto my-3 bg-[#0a0b0c] border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
      </div>
    </div>
  );
};

export default VideoPlayer;
