import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import ndoto from '../assets/ndotostream.png'
import { FaHome } from 'react-icons/fa'
import { BsFillTagFill } from 'react-icons/bs'
import { MdPerson2 } from 'react-icons/md'
import { AiOutlineClose, AiFillCaretDown, AiOutlineMenu } from 'react-icons/ai'
import './Ndoto.css'
import './Login.css'
import { Link } from 'react-router-dom';
import Loader from './Loader'
import { ImCross } from 'react-icons/im'
import './Ndoto.css'
import { baseUrl } from '../data/data';

const NdotoNavbar = ({ ani }) => {

  

  const [categories, setCategories] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dropdownRef = useRef(null);
  const subCategoryDropdownRef = useRef(null);

  const handleMenuIconClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleDropdownIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const fetchCat = async () => {
    try {
      const response = await axios.get(`/api/categories`);
      setCategories(response.data);
      console.log("category", response.data)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const fetchSubCat = async (categoryName) => {
    try {
      const response = await axios.get(`/api/subcategory/${categoryName}`);
      setSubCat(response.data);
      console.log("subcat", response.data)
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    // Fetch subcategories when a category is clicked
    fetchSubCat(categoryName);
    // Set the selected category to keep the dropdown open
    setSelectedCategory(categoryName);
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       isDropdownOpen &&
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target) &&
  //       (!subCategoryDropdownRef.current || !subCategoryDropdownRef.current.contains(event.target))
  //     ) {
  //       setDropdownOpen(false);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isDropdownOpen]);
  return (
    <div >


      <nav className="bg-black sticky-navbar border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-around mx-auto p-4">
          <a className="flex items-center">
            <Link to={`/redirect/videos?msisdn=${ani}&result=Active`}>
              <img src={ndoto} className="h-10 mr-3" alt="Flowbite Logo" />
            </Link>
          </a>
          <div onClick={handleMenuIconClick} className="md:hidden cursor-pointer ">
            <AiOutlineMenu size={30} color="white" />
          </div>

          {/* ... other code ... */}

          <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="flex justify-between h-[70px] bg-[#832926]">
              <h2 className='text-white mt-5 px-3 font-bold text-lg'>MENU</h2>

              <button className="drawer-close-button" onClick={handleMenuIconClick}>
                <ImCross color="white" size={17} className="cursor-pointer mr-2" />
              </button>
            </div>

            <div className="drawer-content">
              <AiOutlineClose onClick={handleMenuIconClick} color="white" size={30} className="cursor-pointer p-4" />

              <div className="overflow-y-auto">
                <ul className="font-medium  flex flex-col md:p-0 p-2 rounded-lg dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link to={`/redirect/videos?msisdn=${ani}&result=Active`}>
                      <a className="py-2 pl-3 pr-4 font-family flex gap-1 text-sm text-white font-medium border-b-2 border-gray-200  ">
                        <FaHome className="mt-1 hover:bg-[#832926]" color="white" />HOME
                      </a>
                    </Link>
                  </li>

                  <li className="relative font-family">
                    <a
                      href="#"
                      className="py-4 pl-3 pr-4 font-family font-medium text-sm flex gap-1 border-b-2 text-white "
                      onClick={(e) => {
                        e.preventDefault();

                        handleDropdownIconClick();
                      }}
                    >
                      <BsFillTagFill className="mt-1" color="white" />CHANNELS
                      <AiFillCaretDown size={20} className="ml-2" />
                    </a>

                    {/* Categories Dropdown */}
                    {isDropdownOpen && (
                      <div ref={dropdownRef} className="z-10 font-normal  divide-y divide-gray-100 shadow w-50 dark:bg-gray-700 dark:divide-gray-600 mt-2">
                        <ul className="font-medium  flex flex-col p-4 md:p-0 mt-4 bg-[#232323] rounded-lg dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                          {categories.map((category) => (
                            <li key={category.category_name}>
                              <a
                                href="#"
                                className={`py-2 border-b-2 uppercase  border-white font-family text-md flex justify-between gap-1 text-white  ${selectedCategory === category.category_name ? 'active' : ''
                                  }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // Fetch subcategories when a category is clicked
                                  e.stopPropagation();

                                  // Set the selected category to keep the dropdown open
                                  handleCategoryClick(category.category_name);

                                }}
                              >

                                {category.name} <AiFillCaretDown size={12} color='white' className="ml-2" />
                              </a>
                              {selectedCategory === category.category_name && (
                                <ul className="font-medium flex flex-col  md:p-0 mt-2 shadow-lg  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                  {subcat.map((sub) => (
                                    <li key={sub.sub_cat_name}>
                                      <Link to={`/allvideo/${sub.sub_cat_id}/${ani}`}>
                                        <a
                                        // onClick={  setMenuOpen(!isMenuOpen)}
                                          href="#"
                                          className="py-2 border-b-1 capitalize  flex border-b-2 border-gray-200  text-sm  text-gray-300 "
                                        >
                                          {sub.sub_cat_name}
                                        </a>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link to="/">
                      <a href="#" className="py-4 pl-3 pr-4 flex text-sm gap-1 border-b-2 font-medium text-white font-family ">
                        <MdPerson2 className="mt-1 hover:bg-[#832926]" color="white" />Logout
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>



          {/* ...desktop code ... */}





          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <button className='bg-[#832926] p-1 rounded-md px-6' >
                      <Link to={`/redirect/videos?msisdn=${ani}&result=Active`}>
                        <a className="p-1  font-semibold flex gap-1 text-sm font-family text-white rounded">
                          <FaHome className='mt-1' color='white' />HOME
                        </a>
                      </Link>
                    </button>
                  </li>
                  <li className="relative">
                    <button className='bg-[#832926] p-1 rounded-md px-6' onClick={() => setDropdownOpen(!isDropdownOpen)}>
                      <span className="p-1 flex gap-1 text-sm  font-semibold text-white font-family rounded">
                        <BsFillTagFill className='mt-1' color='white' />CHANNELS
                        <AiFillCaretDown size={20} className="ml-2" />
                      </span>
                    </button>

                    {isDropdownOpen && (
                      <div ref={dropdownRef} id="dropdownNavbar" class="z-10 font-normal bg-white divide-y divide-gray-100  shadow w-44 dark:bg-gray-700 font-family dark:divide-gray-600 absolute mt-2">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-400" >
                          {categories.map(category => (
                            <li key={category.category_name}>
                              <a href="#" class="block px-4 py-2 hover:bg-[#832926] hover:text-white  dark:hover:text-white" onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategory(category.category_name);
                                fetchSubCat(category.category_name);
                              }}>
                                {category.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedCategory && (
                      <div ref={subCategoryDropdownRef} onMouseLeave={() => setSelectedCategory(null)} id="subCategoryDropdown" className="z-20 font-normal bg-white divide-y divide-gray-100  shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2 left-44">
                        <ul className="py-2 text-sm text-gray-700 font-family dark:text-gray-400  " >
                          {subcat.map((sub) => (
                            <li key={sub.sub_cat_name} >
                              <a href="#" className="block px-4 py-2 hover:bg-[#832926] hover:text-white dark:hover:bg-gray-600 dark:hover:text-white">
                                <Link to={`/allvideo/${sub.sub_cat_id}/${ani}`}>

                                  {sub.sub_cat_name}
                                </Link>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>


                  <li>
                    <button className='bg-[#832926] p-1  font-semibold rounded-md px-6'>

                      <Link to='/'>
                        <a href="#" className="p-1  flex gap-1 text-sm  font-semibold  text-white font-family rounded">
                          <MdPerson2 className="mt-1" color='white' />LOGOUT
                        </a>
                      </Link>

                    </button>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}

export default NdotoNavbar