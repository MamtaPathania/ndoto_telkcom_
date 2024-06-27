import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { AiOutlineClose, AiOutlineMenu, AiFillCaretDown, AiOutlineSearch, AiFillTag, AiOutlineLeft } from 'react-icons/ai';
import './Components/Login.css'
import Carousel from './Components/Carousel';

import { Link, useNavigate, useParams } from 'react-router-dom';

import SubCategory from './Components/SubCategory';

import RandomVideos from './Components/RandomVideos';
import ContinueWatching from './Components/ContinueWatching';
import WatchlistVideos from './Components/WatchlistVideos';

import { useDispatch, useSelector } from 'react-redux';

import Loader from './Components/Loader';

import Logo from './Components/Logo';
import Cookies from 'js-cookie';
import Stream from './Components/Stream';
import logoStream from './assets/ndotostream.png'
import {FaHome,FaSearch} from 'react-icons/fa'
import {BiSearch} from 'react-icons/bi'
import { baseUrl } from './data/data';
// import Cookies from 'js-cookie';
const SingleCategoryVideosPage = () => {

  const navigate = useNavigate();
// const cookienum=Cookies.get('msisdn')
// if(!cookienum || cookienum==null || cookienum==undefined){
//   navigate('/')
// }
  const listRef = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const msisdn = urlParams.get("msisdn");

  let sanitizedMsisdn;

  if (msisdn && msisdn.startsWith("27")) {
    sanitizedMsisdn = msisdn.substring(2);
  } else {
    sanitizedMsisdn = msisdn;
  }


  
  // console.log("Sanitized msisdn:", sanitizedMsisdn);


  const result = urlParams.get('result')
  // console.log("result", result)
  // const beautyParam = urlParams.get("service");
  // console.log("location", msisdn, beautyParam)


  const dispatch = useDispatch();
  const categoryname = useSelector((state) => state.category.categoryname);

  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subCategoryName, setSelectedSubcategoryName] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [nav, setNav] = useState(false);
  const [sub, setSub] = useState([]);
  const [data, setData] = useState([]);
  const [cat, setCat] = useState('');
  const [click, setClick] = useState(false)
  const [videoProgress, setVideoProgress] = useState({});
  const params = useParams();
  const [banner, setBanner] = useState([])
  const [Subcategoryname, setsubCategoryName] = useState('')

  // console.log("params", params.beauty)
  const beautyParam = params.beauty
  // const beautyParam ='luxury'


  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [serachedVideos, setSearchedVideos] = useState([])
  const [category, setCategory] = useState([])
  const [logo, setLogo] = useState([])
  const [streamData, setStreamData] = useState([])



  const fetchSubscription = async () => {
    if (beautyParam == 'videos') {
      try {
        const res = await axios.get(`/api/subscription/redirect/?msisdn=${sanitizedMsisdn}&service=${beautyParam}&result=${result}`);
        setStreamData(res.data);
console.log("ndoto",res.data)

      } catch (error) {
        console.error('Error fetching videos subscription:', error);
        navigate(`/`);
      }
    } else {
      try {
        const response = await axios.get(`/api/subscription/redirect/?msisdn=${msisdn}&service=${beautyParam}&result=${result}`);
        setStreamData(response.data);




        const category_name = response.data[0].category_name;

        setsubCategoryName(category_name);
        setCategory(response.data[0].name);
        setCat(category_name);

        Cookies.set('category_name', category_name, { expires: 0.5 });

        setTimeout(() => {
          navigate(`/`);
        }, 12 * 60 * 60 * 1000);

        const category_name_cookie = Cookies.get('category_name');

      } catch (error) {
        console.error('Error fetching subscription:', error);
        navigate(`/`);
      }
    }
  };




  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchLogo = async () => {

    try {
      const response = await axios.get(`/api/logos/${beautyParam}`);
      setLogo(response.data);

    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };


  useEffect(() => {
    fetchSubcategories();
    fetchLogo()
  }, [cat, beautyParam]);


  const fetchSubcategories = async () => {
    try {

      const response = await axios.get(`/api/categories/${cat}`);
      setSubcategories(response.data);


    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };




  const handleSubcategoryChange = async (subcategoryId, subCategoryName) => {
    setSelectedSubcategory(subcategoryId);

    setSelectedSubcategoryName(subCategoryName)

    setVideos([]);
    setSearchQuery('');

    try {

      // Fetch the list of videos for the selected subcategory
      const response = await axios.get(`/api/videos/${subcategoryId}`);
      setVideos(response.data);
      setNav(false)
      setClick(true)
      

    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    if (subcategories.length > 0) {
      // Select the first subcategory when subcategories are fetched initially
      setTimeout(() => {
        handleSubcategoryChange(subcategories[0].sub_cat_id, subcategories[0].sub_cat_name);
      }, 2000);
    }
  }, [subcategories]);



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





  useEffect(() => {
    fetchLogo()
  }, [cat])

  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearchIconClick = () => {
    setSearchOpen(!isSearchOpen);
  };
  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuIconClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleDropdownIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  return (

    <>
      {
        loading ? <Loader service={beautyParam} /> :
          <div className='bg-[#0a0b0c] relative'>



{beautyParam !== 'videos' ? (
  <div className="max-w-[1640px] sticky-navbar  bg-[#0a0b0c] mx-auto flex justify-around items-center p-3">
    <div className="flex items-center">
      <Link to={(`/redirectTo?service=${beautyParam}&msisdn=${sanitizedMsisdn}`)}>
        <div className="main-logo w-[120px] h-[50px]">
          {beautyParam !== 'videos' ? <Logo service={beautyParam} /> : <img src={logoStream} alt="logo" className="object-cover mt-4 " />}
        </div>
      </Link>
    </div>

    <div onClick={() => setMenuOpen(!isMenuOpen)} className="cursor-pointer">
      <AiOutlineMenu size={30} color="white" />
    </div>

    {isMenuOpen && (
      <div className="absolute top-0 left-0 bg-black/80 z-50 h-[40px] w-[300px]">
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-2xl flex font-bold gap-2">
              <p className="text-white text-xl uppercase">{category}</p>
              <AiFillCaretDown onClick={() => setDropdownOpen(!isDropdownOpen)} color="white" size={20} className="cursor-pointer mx-10" />
            </h2>
            <AiOutlineClose onClick={() => setMenuOpen(!isMenuOpen)} color='white' size={30} className="cursor-pointer" />
          </div>
          {isDropdownOpen && (
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                {subcategories.map((subcategory) => (
                  // <li
                  //   key={subcategory.sub_cat_id}
                  //   style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}
                  //   className="cursor-pointer py-1 text-white  border-gray-300 hover:bg-[#0a0b0c] hover:text-[#F6CA42]"
                  //   onClick={() => {
                  //     handleSubcategoryChange(subcategory.sub_cat_id, subcategory.sub_cat_name);
                  //     setMenuOpen(false); // Close the menu after clicking a list item
                  //   }}
                  // >
                  //   <span>{subcategory.sub_cat_name}</span>
                  //   {selectedSubcategory === subcategory.sub_cat_id && <AiFillCaretDown size={20} />}
                  // </li>

                  <li
  key={subcategory.sub_cat_id}
  style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}
  className="cursor-pointer py-1 text-white  border-gray-300 hover:bg-[#0a0b0c] hover:text-[#F6CA42]"
  onClick={() => {
    handleSubcategoryChange(subcategory.sub_cat_id, subcategory.sub_cat_name);
    setMenuOpen(false); // Close the menu after clicking a list item

    // Scroll more than halfway down the screen
    if (listRef.current) {
      const listItemHeight = listRef.current.offsetHeight;
      const extraScrollAmount = 930; // Adjust this value to scroll more or less
      const halfScreenHeight = window.innerHeight / 2;
      window.scrollTo({
        top: listRef.current.offsetTop - halfScreenHeight + listItemHeight / 2 + extraScrollAmount,
        behavior: 'auto', // 'auto' will scroll without smooth animation
      });
    }
  }}
  ref={selectedSubcategory === subcategory.sub_cat_id ? listRef : null}
>
  <span>{subcategory.sub_cat_name}</span>
  {selectedSubcategory === subcategory.sub_cat_id && <AiFillCaretDown size={20} />}
</li>
                ))}
              </ul>
            </nav>
          )}
          {/* <Link to={`/terms/${beautyParam}/${sanitizedMsisdn}`} className="md:hidden text-white mx-4 cursor-pointer text-lg mt-2">
            Terms
          </Link> */}
        </div>
      </div>
    )}
  </div>
) : null}


            <>
              {beautyParam == 'videos' ? <Stream videosData={streamData} cat={cat} beautyParam={beautyParam} ani={msisdn} /> :

                <>
                  <Carousel Subcategoryname={Subcategoryname} service={beautyParam} ani={msisdn} />
                  <ContinueWatching cat={cat} subCategoryName={subCategoryName} selectedSubcategory={selectedSubcategory} ani={msisdn} beautyParam={beautyParam} />
                  {click &&
                    <SubCategory selectedSubcategory={selectedSubcategory} subCategoryName={subCategoryName} beautyParam={beautyParam} videos={videos} ani={msisdn} cat={cat} />

                  }
                  <RandomVideos selectedSubcategory={selectedSubcategory} ani={msisdn} portal={beautyParam} cat={cat} />
                  <WatchlistVideos ani={msisdn} portal={beautyParam} cat={cat} />
                  <nav className="bg-black sticky-footer border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex w-full mx-auto" id="navbar-default">
            <ul className="font-medium flex mx-auto gap-[100px] md:gap-[200px] p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="text-white">
                <Link>
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
                          to={`/video/${video.videoid}/${beautyParam}/${msisdn}/${cat}`}
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
              }
            </>
            
          
          </div>
          
      }
    </>

  );
};

export default SingleCategoryVideosPage;
