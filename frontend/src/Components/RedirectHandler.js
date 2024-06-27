import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const startIndex = url.indexOf("https://") + "https://".length;
    const endIndex = url.indexOf(".ndotomobile.com");
    
    if (startIndex >= 0 && endIndex >= 0) {
      const beautyWord = url.substring(startIndex, endIndex);
      const urlParams = new URLSearchParams(window.location.search);
      const msisdn = urlParams.get("msisdn");

      navigate(`/redirect/${beautyWord}?msisdn=${msisdn}&result=Active`);
    }
  }, [navigate]);
  return (
    <div>
 
    </div>
  );
};

export default RedirectHandler;

// http://5.189.169.12:5090/redirectTo?service=NVOD&msisdn=9805702978&result=Active





















// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {
//   setPhoneNumber,
//   setIsActive,
// } from '../slices/authSlice'; // Update the path

// const RedirectHandler = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const ani = params.get('msisdn');
//     const active = params.get('result');

//     dispatch(setPhoneNumber(ani));
//     dispatch(setIsActive(active));
//     const routeUrl = `/category/redirect?mssisdn=${ani}&result=/${active}`;
//     navigate(routeUrl);
//   }, [location.search, navigate, dispatch]);

//   return <div>Redirecting...</div>;
// };

// export default RedirectHandler;
