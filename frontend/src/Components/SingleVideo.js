import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { BiLike } from 'react-icons/bi'
import ReactPlayer from 'react-player'
import './Login.css'
import { AiFillEye, AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineClose, AiOutlineMenu, AiFillCaretDown, AiOutlineSearch, AiFillTag, AiOutlineLeft } from 'react-icons/ai';
import { FaHome, FaPlus, FaSearch } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cookies from 'js-cookie'
import { baseUrl } from '../data/data';

const SingleVideoPage = () => {

  const navigate = useNavigate();
  const cookienum=Cookies.get('msisdn')
  if(!cookienum || cookienum==null || cookienum==undefined){
    navigate('/')
  }

  const [randomVideos, setRandomVideos] = useState([]);

  const [isLiked, setIsLiked] = useState(false)
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [serachedVideos, setSearchedVideos] = useState([])
  const [comments, setComments] = useState([]);
  const { videoId } = useParams();
  const [video, setVideo] = useState([]);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [nav, setNav] = useState(false);
  const [click, setClick] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [postcat, setPostCat] = useState('')
  const [selectedSubcategory, setSelectedSubcat] = useState('')
  const [watchlist, setWatchlist] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [videocomments, setVideoComments] = useState([])
  const [newCommentText, setNewCommentText] = useState('');
  const [showControls, setShowControls] = useState(false);


  const handleSearchIconClick = () => {
    setSearchOpen(!isSearchOpen);
  };
  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const [playedSeconds, setPlayedSeconds] = useState(0);
  const params = useParams()
  // console.log("params",params)
  const { beautyparam, ani, cat } = params;

  const playerRef = useRef(null);

  const handleVideoSearch = async () => {

    try {

      const response = await axios.get(`/api/videos/${cat}/search`, {
        params: { searchQuery }
      });
      setSearchedVideos(response.data);

      setNav(false);
      setClick(true);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };


  useEffect(() => {
    if (searchQuery.length > 0) {
      handleVideoSearch();
    } else {
      setSearchedVideos([]);
    }
  }, [searchQuery]);


  const fetchVideo = async () => {
    try {
      const response = await axios.get(`/api/video/${videoId}`);
      setVideo(response.data);
      console.log("videodata", response.data);
      setPostCat(response.data[0].category);
      setSelectedSubcat(response.data[0].sub_cat_id);
      console.log("ok");
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVideo();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${videoId}`);
      setVideoComments(response.data);
      console.log("videocomments", response.data);

    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  useEffect(() => {
    fetchComments()
  }, [videoId])

  useEffect(() => {
    fetchRandomVideos();
  }, [selectedSubcategory]);

  const fetchRandomVideos = async () => {
    try {
      // console.log("subcatid",subcategoryId)
      const response = await axios.get(`/api/videos/${selectedSubcategory}`);

      const shuffledVideos = response.data.sort(() => Math.random() - 0.5);

      const randomSixVideos = shuffledVideos.slice(0, 10);
      setRandomVideos(randomSixVideos);
      console.log("random", randomSixVideos)

    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };


  const addToWatchlistBackend = async (video) => {
    const createddatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');

    try {

      const wishvideo = {
        ani: ani,
        videoid: videoId,
        datetime: createddatetime,
        portal: beautyparam,

      }
      console.log("wish", wishvideo)
      await axios.post(`/api/addToWatchlist`, wishvideo);
      // fetchWatchlist()
      // // setClick(true)
      setIsInWatchlist(true);
      console.log('Video added to watchlist', wishvideo);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (videoId) => {
    try {
      await axios.delete(`/api/watchlist/${videoId}`);
      // fetchWatchlist(); // Fetch updated watchlist data

      setIsInWatchlist(false);
      console.log("video removed")
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  // const isInWatchlist = (videoid) => {
  //   return watchlist.some(item => item.videoid === videoid);
  // };




  const handleProgress = (progress) => {

    setPlayedSeconds(progress.playedSeconds);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // useEffect(() => {

  //   if (playerRef.current) {
  //     playerRef.current.seekTo(playedSeconds);
  //   }
  // }, [playedSeconds]);



  if (!video) {
    return <div>Loading...</div>;
  }



  const addComment = async () => {
    if (newCommentText.trim() === '') {
      // Handle empty comment text here (optional)
      return;
    }

    const createdDatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    console.log("videoid", videoId);
    try {
      const response = await axios.post(`/api/post`, {
        name: ani,
        videoid: videoId,
        datetime: createdDatetime,
        portal: beautyparam,
        comment: newCommentText, // Include the comment text
      });

      setComments([...comments, response.data]);
      setNewCommentText('');

      console.log('Comment added successfully:', response.data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  // console.log("videocat",video[0].category)

  const handleLikeClick = async () => {
    const createdDatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');

    try {
      const response = await axios.post('/api/like', {
        name: ani,
        videoid: videoId,
        datetime: createdDatetime,
        category: cat,
        portal: beautyparam,
        like: isLiked ? 0 : 1,
      });

      if (response.status === 201 || response.status === 204) {

        setIsLiked(!isLiked);
        // setLikes(isLiked ? likes - 1 : likes + 1);
      }

      console.log('Like action performed successfully:', response.data);
    } catch (error) {
      console.error('Error performing like action:', error);
    }
  };









  return (
    <>
      <div className='bg-[#0A0B0C] h-[1200px]'>
        <Navbar beautyParam={beautyparam} ani={ani} cat={cat} />
        <div className='bg-[#0A0B0C] mt-10   ' >

          {video.map((video) => {

            return (

           
              <div key={video.videoid} className='mt-4 ' >
                <div class="flex justify-center "
                     onMouseEnter={() => setShowControls(true)} 
              onMouseLeave={() => setShowControls(false)}
                  onClick={() => setShowControls(true)}
                  >
                  <ReactPlayer className="justify-center "
                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                    url={video.vurl}
                    playing={isPlaying}
                    loop={true}
                    controls={showControls}

                    onProgress={handleProgress}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    ref={playerRef}
                  />
                </div>

                <div className=' mx-10   mt-5 flex-col md:flex md:flex-row  md :just
                 gap-5'>

                  <p className='text-white uppercase text-sm md:text-2xl font-medium' style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>{video.name}</p>

                  <div className='flex  mt-5 md:mt-0 gap-5 '>
                    <div className='flex gap-2'>
                      <BiLike
                        color={isLiked ? 'blue' : 'white'}
                        size={23}
                        className={`mt-1 cursor-pointer ${isLiked ? 'liked' : ''}`}
                        onClick={handleLikeClick}
                      />
                    </div>
                    <div className='flex gap-1'>
                      <AiFillEye color='white ' size={23} className='mt-1 cursor-pointer' /><p className='text-white mt-1'>{video.views}</p>

                    </div>

                    <div>
                      {isInWatchlist ? (
                        <button
                          onClick={() => removeFromWatchlist(videoId)}
                          className="p-1  bg-gray-600 flex text-white rounded-md gap-1"
                          style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}
                        >
                          <AiOutlineCheck color="white" size={17} className="mt-1 cursor-pointer" />
                          Watchlist
                        </button>
                      ) : (
                        <button
                          onClick={() => addToWatchlistBackend(video)}
                          className="p-2 px-3 bg-gray-600 flex text-white rounded-md gap-1"
                          style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}
                        >
                          <AiOutlinePlus color="white" size={17} className="mt-1 cursor-pointer" />
                          Watchlist
                        </button>
                      )}
                    </div>

                  </div>



                </div>

                {/* <div className='bg-[#F6CA42] vt-divider w-[200px] mx-10 mt-1 h-0.5'></div> */}

                <div className='mt-6 flex mx-10 gap-2'>
                  <BsFillInfoCircleFill color='white' className='mt-1' />
                  <p className='text-white' style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>{video.description}</p>
                </div>

                <div className='mt-5  mx-10'>

                  <label for="message" class="block mb-2 text-lg font-medium text-gray-100 dark:text-white">Comment</label>
                  <div className='flex gap-2'>
                  <textarea
            id="message"
            className="w-full text-sm px-3 py-1 max-w-lg h-7 text-black border rounded-md bg-white border-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
            placeholder="Add comment"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          ></textarea>


                    <button
                      type="button"
                      onClick={() => addComment()}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </div>

                </div>
      
                <div
  className="block p-4 mt-5 text-sm text-white bg-[#0A0B0C] rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  style={{ width: 'calc(100% - 5rem)', marginLeft: '2rem', maxHeight: '200px', overflowY: 'auto' }}
>
  <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
    {videocomments.map((commentss, index) => {
      return (
        <div key={index} className='p-1 flex flex-col'>
          <p className='text-gray-100 text-md'>User:</p>
          <p className='text-sm'>{commentss.comment}</p>
        </div>
      );
    })}
  </div>
</div>

 
 







              </div>
            )
          })}

        </div>


        <div className='mt-10'>

          {randomVideos.length === 0 ? "" : <>
            <h1 className="lg:text-3xl sm:text-2xl mx-6 relative  text-white " style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>Related Videos</h1>
            <p></p>
            {/* <p className='text-white mx-10 sm:overflow-hidden'>-----------------------------------------------------</p> */}
            {/* <div className="bg-[#F6CA42] w-[250px] vt-divider  mx-11 mt-1 h-0.5"></div> */}

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

              {randomVideos.map((video) => (
                <div key={video.videoid} className=" card flex flex-col sm:w-[250] gap-4 mx-auto my-3 bg-[#0a0b0c] border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700"  >
                  <Link to={`/video/${video.videoid}/${beautyparam}/${ani}/${cat}`}>
                    <img className=" lg:h-[300px] w-full object-cover " src={video.imgurl} alt="Video Thumbnail" />
                  </Link>

                  <div className="mt-2  vt-title-main  justify-around">
                    <h5 className="mb-2  tracking-tight text-white dark:text-white"
                      style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>{video.name}</h5>
                    {/* <p className="text-white flex gap-1">
                    <BiTimeFive color="#F1C63E" className="mt-1" />
                    {video.duration}
                  </p> */}
                  </div>
                </div>
              ))}
            </Slider>

          </>}
        </div>


      </div>
      <nav className="bg-black sticky-footer border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex w-full mx-auto" id="navbar-default">
            <ul className="font-medium flex mx-auto gap-[200px] p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="text-white">
                <Link to={(`/redirect/${beautyparam}?msisdn=${ani}&result=Active`)}>

                  <FaHome color="white" className="mx-3" /> Home
                </Link>
              </li>
              <li className="text-white" onClick={handleSearchIconClick}>
                <FaSearch color="white" className="mx-3" /> Search
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Drawer */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 w-full h-full mt-[60px] bg-black z-50">
          <div className="bg-black rounded-lg p-4 w-[100%] ">
            <h2 className="text-white text-2xl flex font-bold gap-2 mb-2" style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>
              <AiOutlineLeft onClick={handleCloseSearch} color="white" className="mt-1" />
              SEARCH
            </h2>
            <div className="bg-white p-1">
              <div className="flex flex-col items-start">
                <div className="flex justify-between w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white px-3  focus:outline-none w-full text-black"
                  />
                  <AiOutlineSearch size={20} className="text-gray-500" />
                </div>
              </div>

            </div>
            <div className="mt-4 bg-black" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {serachedVideos.length > 0 ? (
                <ul className="divide-y w-full p-0 divide-gray-300">
                  {serachedVideos.map((video) => (
                    <Link
                      to={`/video/${video.videoid}/${beautyparam}/${ani}/${cat}`}
                      key={video.id}
                    >
                      <li
                        className="cursor-pointer text-white   px-4 py-2 bg-black hover:bg-gray-700"
                        style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}
                      >
                        {video.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      )}
    </>

  );
};

export default SingleVideoPage;
