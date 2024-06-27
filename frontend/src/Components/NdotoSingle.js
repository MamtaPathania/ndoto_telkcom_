    import axios from 'axios'
    import React, { useState, useEffect, useRef } from 'react'
    import { useParams } from 'react-router-dom'
    import NdotoNavbar from './NdotoNavbar'
    import ReactPlayer from 'react-player'
    import { AiFillEye } from 'react-icons/ai'
    import { BiLike } from 'react-icons/bi'
    import Slider from 'react-slick';
    import 'slick-carousel/slick/slick.css';
    import 'slick-carousel/slick/slick-theme.css';
    import { MdOutlineSignalCellularAlt2Bar } from 'react-icons/md'
    import NdotoFooter from './NdotoFooter'
    import { Link } from 'react-router-dom'
    import { baseUrl } from '../data/data'
// import { baseUrl } from '../data/data'
    const NdotoSingle = () => {
        const params = useParams()
        // console.log("paramsndoto", params)
        const [randomVideos, setRandomVideos] = useState([]);

        const playerRef = useRef(null);
        const [playedSeconds, setPlayedSeconds] = useState(0);
        const [isPlaying, setIsPlaying] = React.useState(true);
        const [postcat, setPostCat] = useState('')
        const [selectedSubcategory, setSelectedSubcat] = useState('')
        const [showControls, setShowControls] = useState(false);


        const [isLiked, setIsLiked] = useState(false)
        // video/:videoid
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

        //     if (playerRef.current) {
        //         playerRef.current.seekTo(playedSeconds);
        //     }
        // }, [playedSeconds]);



        const [video, setVideo] = useState([])

        const fetchVideo = async () => {
            try {
                const response = await axios.get(`/api/video/${params.videoid}`);
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
        }, [params.videoid]);

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

        // const handleLikeClick = async () => {
        //     const createdDatetime = new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');

        //     try {
        //       const response = await axios.post('${baseUrl}/api/like', {
        //         name: ani,
        //         videoid: videoId,
        //         datetime: createdDatetime,
        //         category: cat,
        //         portal: beautyparam,
        //         like: isLiked ? 0 : 1,
        //       });

        //       if (response.status === 201 || response.status === 204) {

        //         setIsLiked(!isLiked);
        //         // setLikes(isLiked ? likes - 1 : likes + 1);
        //       }

        //       console.log('Like action performed successfully:', response.data);
        //     } catch (error) {
        //       console.error('Error performing like action:', error);
        //     }
        //   };
        return (
            <div className='bg-black'>
                <NdotoNavbar ani={params.ani} />
                <div className='bg-[#0A0B0C]   ' >

                    {video.map((video) => {

                        return (
                            <div key={video.videoid} className='mt-4 ' >
                                <div class="flex justify-center" 
                                onMouseEnter={() => setShowControls(true)} 
                                onMouseLeave={() => setShowControls(false)}
                                onClick={() => setShowControls(true)}>

                                    <ReactPlayer className="justify-center"
                                        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                        url={video.vurl}
                                        playing={isPlaying}
                                        loop={true}
                                        controls={showControls}
                                        autoplay={true}
                                        onProgress={handleProgress}
                                        onPlay={handlePlay}
                                        onPause={handlePause}
                                        ref={playerRef}
                                        muted={true}
                                    />
                                </div>

                                <div className=' mx-10   mt-5 flex-col md:flex md:flex-row  md :just
        gap-5'>

                                    <p className='text-white uppercase md:mx-6 text-2xl md:text-2xl font-medium font-family' >{video.name}</p>

                                    {/* <div className='flex  mt-5 md:mt-0 gap-5 '>
                                        <div className='flex gap-2'>
                                            <BiLike
                                                color={isLiked ? 'blue' : 'white'}
                                                size={23}
                                                className={`mt-1 cursor-pointer ${isLiked ? 'liked' : ''}`}
                                            // onClick={handleLikeClick}
                                            />
                                        </div>
                                        <div className='flex gap-1'>
                                            <AiFillEye color='white ' size={23} className='mt-1 cursor-pointer' /><p className='text-white mt-1'>{video.views}</p>

                                        </div>

                                    </div> */}
                                </div>
                                <div className='mt-4 flex mx-10 gap-2'>

                                    <p className='text-white text-xl md:mx-6 font-family ' ><span className='text-[#C59B0F]'>Description : </span>{video.description}</p>
                                </div>


                            </div>
                        )
                    })}
                    <h1 className='text-white flex relative mx-7 md:mx-12 mt-10 font-family text-2xl'><MdOutlineSignalCellularAlt2Bar color='#F5676D' className='mt-1' />More Videos</h1>
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
                    <Link to={`/ndotosingle/${video.videoid}/${params.ani}`}>
                    
                                <img className=" lg:h-[300px] w-full object-cover " src={video.imgurl} alt="Video Thumbnail" />
                                </Link>

                                {/* <div className="mt-2  vt-title-main  justify-around">
                                    <h5 className="mb-2  tracking-tight text-white dark:text-white"
                                        style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>{video.name}</h5>
                                    <p className="text-white flex gap-1">
                        <BiTimeFive color="#F1C63E" className="mt-1" />
                        {video.duration}
                    </p>
                                </div> */}
                            </div>
                        ))}
                    </Slider>


                </div>
                <NdotoFooter/>
            </div>
        )
    }

    export default NdotoSingle
