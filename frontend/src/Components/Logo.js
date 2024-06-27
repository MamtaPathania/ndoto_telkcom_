import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../data/data';

const Logo = ({service}) => {

   
    const [logo,setLogo]=useState([])
  const fetchLogo = async () => {

    if(service==='bossmoves'){
      service='business'
    }
    try {
      const response = await axios.get(`/api/logos/${service}`);
      
      const logoArray = Object.values(response.data);
      setLogo(logoArray);

    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };


  useEffect(()=>{

    fetchLogo()
  },[service])


  return (
    <div>
       <div className=' main-logo w-[120px] mt-5 h-[50px]'>

{
logo.length > 0 && 
<img src={logo[0].logourl} alt="logo" className='object-cover ' />

}
    
    </div>
    </div>
  )
}

export default Logo
