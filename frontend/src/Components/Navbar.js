import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose, AiOutlineMenu, AiFillCaretDown, AiOutlineSearch, AiFillTag } from 'react-icons/ai';
import logo1 from '../assets/logo.png'
import ndoto from '../assets/ndotostream.png'
import { Link, useParams } from 'react-router-dom';
import beauty from '../assets/beauty_logo.png'
import fashion from '../assets/fasshionnew.png'
import faith from '../assets/faith.png'
import luxury from '../assets/luxurynew.png'
import business from '../assets/bossmoves.png'
import lol from '../assets/loltv.png'
import sports from '../assets/sports.png'
import woh from '../assets/woh_logo.png'
import './Login.css'
import { baseUrl } from '../data/data';

const Navbar = ({beautyParam,ani}) => {
  console.log("navbeayuty",beautyParam, ani)
  const [nav, setNav] = useState(false);
const params=useParams() 
// console.log("navbar",params) 
const cat=params.cat
const [logo,setLogo]=useState([])

const fetchLogo = async () => {

  try {
    const response = await axios.get(`/api/logos/${beautyParam}`);
    setLogo(response.data);
    
  
  } catch (error) {
    console.error('Error fetching banners:', error);
  }
};

useEffect(()=>{
fetchLogo()
},[cat])
  
  return (
    <div className=' sticky-navbar'>
       <div className='max-w-[1640px]  bg-[#0a0b0c] mx-auto flex justify-between item-center p-3'>


        <div className='h-[50px] w-full  flex  container justify-center  gap-10   '> 
  

     {beautyParam==='videos' &&
        <img src={ndoto}    alt="logo" className=' w-[260px] object-cover'/>
     
     }
    
      {cat==='7' ?
      <Link  to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
        <img src={beauty}    alt="logo" className=' w-[150px] object-cover'/>
      </Link>
      :""}


      {cat==='14' ?
      <Link  to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
        <img src={business}    alt="logo" className=' w-[150px] object-cover'/>
      </Link>
      :""}

{cat==='6' ?
<Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
<img src={faith}   alt="logo" className='w-[150px] object-cover '/>
</Link>
      :""}


{cat==='9' ?
<Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
<img src={luxury}   alt="logo" className='w-[150px] object-cover '/></Link>

      :""}
       

{cat==='13' ?
<Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
<img src={lol}   alt="logo" className='w-[150px] object-cover '/></Link>
      :""}

       


{cat==='15' ?
<Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
<img src={sports}   alt="logo" className=' w-[150px] object-cover '/>
</Link>
      :""}
      
{cat==='16' ?
<Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
<img src={woh}   alt="logo" className=' w-[150px] object-cover '/>
</Link>
      :""}

{cat==='17' ?
<Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}>
<img src={fashion
        }   alt="logo" className=' w-[150px] object-cover '/>
</Link>
      
      :""}




        {/* <Link to={(`/redirect/${beautyParam}?msisdn=${ani}&result=active`)}  className='hidden md:block text-white font-medium cursor-pointer text-2xl mt-2' style={{ fontFamily: "'Saira Semi Condensed', sans-serif" }}>Home</Link> */}
        {/* <div className=' border shadow-md rounded-full flex items-center px-2  bg-[#0A0B0C]  w-[200px] sm:w-[400px]  lg:w-[500px]'>
                  <AiOutlineSearch size={20} />
                  <input type='text' placeholder='Search' className='bg-transparent  text-gray-300 px-2 focus:outline-none w-full' />
          
        </div> */}


</div>
        </div>

        {
          nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'>
          </div> : ""
        }

      </div>

  )
}

export default Navbar
