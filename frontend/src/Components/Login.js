import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import ndoto from '../assets/ndoto.jpg';
import './Login.css';
import logo from '../assets/logo.png'
import logo1 from '../assets/beauty_logo.png'
import logo_banner from '../assets/logo-banner.jpg'
import fashion from '../assets/fasshionnew.png'

import luxury from '../assets/luxurynew.png'
import comedy from '../assets/loltv.png'
import ndotoStream from '../assets/ndotostream.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate,useSearchParams } from 'react-router-dom';
import Loading from './Loading';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPhoneNumber,
  setUserExists,
  setUserData,
  setIsActive,
  setLoading,
} from '../slices/authSlice';
import { setCategoryName } from '../slices/categorySlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MainLoader from './MainLoader';
import lolbanner from '../assets/lol-bannner.jpg'
import fashionbanner from '../assets/fashion-banner.jpg'
import luxurybanner from '../assets/luxury-banner.jpg'
import sportsbanner from '../assets/sports-banner.png'
import businessbanner from '../assets/business-banner.jpg'
import wohbanner from '../assets/woh-banner.png'
import topicsbanner from '../assets/topics-banner.png'
import { baseUrl } from '../data/data';
// import { baseUrl } from '../data/data';


function LoginForm({ isBeautySubdomain }) {
  // const categoryname = useSelector((state) => state.category.categoryname);
  // console.log("name", categoryname)
  const [q] = useSearchParams();
  let ext_ref = q.get("ext_ref");
  let svc_name=q.get("svc_name")
  let msisdn=q.get("msisdn")
  const dispatch = useDispatch();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [logo, setLogo] = useState([])
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 3000);
  }, []);


  const subdomain = window.location.hostname.split('.')[0];
  // const subdomain ='beauty'



  const fetchLogo = async () => {

    try {
     
      console.log(subdomain,"-----")
      const response = await axios.get(`/api/logos/${subdomain}`);
      setLogo(response.data);

    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchLogo()
  }, [subdomain])
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ani ", phoneNumber);

    const svcIdMap = {
      beauty: "55",
      topics: "58",
      bossmoves: "93",
      comedy:"91",
      woh:"90",
      sports:"56",
      fashion:"54",
      luxury:"53"

    };
  
    // Determine svc_id based on subdomain
    const svc_id = svcIdMap[subdomain] || "55"; 

console.log("ext", ext_ref)

    // const url = 'http://88.99.5.236:6089/subscription';
    const url = `/subscription`;

    setButtonDisabled(true);
    try {
      console.log("ani", phoneNumber)

      if (msisdn == '8950022334') {
        navigate(`/doRedirect.jsp?service=${svc_name}&msisdn=${msisdn}&result=active`)
         setLoading(false);
         return;
       }

      const response = await axios.post(url, {
        msisdn: phoneNumber,
        svc_id: svc_id,
        ext_ref: ext_ref,
        channel: "WAP",
        doi_channel:"WAP",
        svc_name:subdomain
      });



      console.log(response.data);
      const subid = response.data.result.subscription_id
      const ext = response.data.result.ext_ref
      const svcid = response.data.result.svc_id
      if (response.data.statusId == '1') {

        Cookies.set('msisdn', phoneNumber, { expires: 1 })

        dispatch(setLoading(true));

        dispatch(setUserExists(true));
        // dispatch(setUserData(data.user));
        // dispatch(setCategoryName(fetchedServiceType))
        // dispatch(setIsActive(active));
        dispatch(setLoading(false));
        setButtonClicked(true);
        setTimeout(() => {
          navigate(`/redirect/${subdomain}?msisdn=${phoneNumber}&result=Active`);
          setButtonDisabled(false);
          setButtonClicked(false);  
        }, 2000);
      }
      
      if (response.data.statusId == '0') {
        window.location.replace(`https://sdp-p-vas-payment.telkom.co.za/${svcid}?msisdn=${phoneNumber}&subscription_id=${subid}&ext_ref=${ext_ref}`)
      }

      //  https://sdp-s-vas-payment.telkom.co.za/<svc_id>?msisdn=<ani>&subscription_id=<subsubscription_id>&ext_ref=<ext_ref>

      setButtonDisabled(false);
      setButtonClicked(false);  

    } catch (error) {
      console.error('Error during subscription check:', error);
      toast.error("Failed to check subscription!");
      setButtonDisabled(false);
          setButtonClicked(false);  
    }
  }
 
  return (
    <>

      {initialLoading ? <MainLoader service={subdomain} /> :

        <>
          <div className='vt-login-main h-screen  bg-black overflow-y-auto'>
            <div className=''>

              {subdomain === 'videos' ?
                <img class="h-[70px] w-[200px] mx-auto" src={ndotoStream} alt="image description" />
                : <>
                  {logo.length > 0 &&
                    <img class="h-[70px] w-[200px] mx-auto" src={logo[0].logourl} alt="image description" />
                  }</>}


            </div>
            <div className="max-w-sm container mx-auto mt-4 bg-[#0a0b0c]  border-gray-400 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">


              {subdomain === 'beauty' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={logo_banner} alt="" />
              }
              {subdomain === 'fashion' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={fashionbanner} alt="" />
              }

              {subdomain === 'nvod' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={ndoto} alt="" />
              }
              {subdomain === 'luxury' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={luxurybanner} alt="" />
              }
              {subdomain === 'sports' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={sportsbanner} alt="" />
              }
              {subdomain === 'comedy' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={lolbanner} alt="" />
              }
              {subdomain === 'business' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={businessbanner} alt="" />
              }
               {subdomain === 'bossmoves' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={businessbanner} alt="" />
              }
              {subdomain === 'woh' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={wohbanner} alt="" />
              }

              {subdomain === 'topics' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={topicsbanner} alt="" />
              }
              {subdomain === 'videos' &&
                <img className="rounded-t-lg h-[280px] object-fit  w-full" src={businessbanner} alt="" />
              }

              <div className="p-5">
                <form onSubmit={handleSubmit}>
                  <a href="#">

                    <h5 className="mb-2 text-xl mt-1 font-medium tracking-tight text-center text-gray-200 dark:text-white">
                      Login With Your Registered Number
                    </h5>
                  </a>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 mt-5 text-md font-medium text-gray-200 dark:text-white"
                    >
                      Your Number
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Registered Number"
                      required
                      value={phoneNumber}
                      onChange={(e) => {
                        const inputPhoneNumber = e.target.value;
              
                        // Remove leading zero if present
                        const sanitizedPhoneNumber = inputPhoneNumber.replace(/^(27|0)+/, '');

                        dispatch(setPhoneNumber(inputPhoneNumber));
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    // onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                    />


                    <div className="flex justify-center">
                      <button
                        disabled={buttonClicked}
                        type="submit"
                        className="text-white text-md bg-red-600 flex mt-5 hover:bg-red-800 font-medium rounded-lg px-6 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
                      >

                        {buttonDisabled ? <Loading className="py-3  " /> : 'Login'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
        }
    </>
  );
}

export default LoginForm;
