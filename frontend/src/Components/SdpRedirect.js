

import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from './Loading'
// import { baseUrl } from '../data/data';
import MainLoader from './MainLoader';
import Cookies from 'js-cookie'
import { baseUrl } from '../data/data';
const SdpRedirect = () => {
    const [loading, setLoading] = useState(true);
    const [initialloading,setInitialLoading]=useState(true)
    const [q] = useSearchParams();
    const navigate = useNavigate();
    // const subdomain = 'beauty'; 
    const subdomain = window.location.hostname.split('.')[0];


    useEffect(() => {
        setTimeout(() => {
          setInitialLoading(false);
        }, 5000);
      }, []);
    
    // const svc_id=55
    let msisdn = q.get("msisdn");
    // let svc_id=q.get("svc_id")
  let ext_ref = q.get("ext_ref");

    let subscription_id = q.get("subscription_id");

    console.log("redirect data", msisdn, subscription_id);

    axios.get(`/check-sub?msisdn=${msisdn}&subscription_id=${subscription_id}&svc_name=${subdomain}`)
        .then(resp => {
            const data = resp.data;
            console.log("check-data =>", data);
            setLoading(false);
            //   Cookies.setItem(msisdn,'msisdn')
            if (data.statusId =='1') { 
                // Cookies.setItem(msisdn,'msisdn')
                Cookies.set('msisdn',msisdn)

                navigate(`/redirect/${subdomain}?msisdn=${msisdn}&result=Active`);
            } 

            if (data.statusId == '0'){
                navigate('/')
                // window.location.replace(`https://sdp-s-vas-payment.telkom.co.za/${svc_id}?msisdn=${msisdn}&subscription_id=${subscription_id}&ext_ref=${ext_ref}`)
            }

           
        })
        .catch(e => {
            setLoading(false);
            navigate("/");
        });

        console.log("loading",loading)
    if (initialloading) return ( <div className='bg-black h-screen'><MainLoader service={subdomain}/></div>)
    return null;
};

export default SdpRedirect;


// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import Loading from './Loading';
// import { baseUrl } from '../data/data';
// import MainLoader from './MainLoader';
// import Cookies from 'js-cookie';

// const SdpRedirect = () => {
//     const [loading, setLoading] = useState(true);
//     const [initialLoading, setInitialLoading] = useState(true);
//     const [q] = useSearchParams();
//     const navigate = useNavigate();
//     const subdomain = 'beauty';
//        // const subdomain = window.location.hostname.split('.')[0];


//     useEffect(() => {
//         setTimeout(() => {
//             setInitialLoading(false);
//         }, 5000);
//     }, []);

//     let msisdn = q.get("msisdn");
//     let ext_ref = q.get("ext_ref");
//     let subscription_id = q.get("subscription_id");
//     let doiredirect = q.get("doiredirect");

//     console.log("redirect data", msisdn, subscription_id, doiredirect);

//     axios.get(`${baseUrl}/check-sub?msisdn=${msisdn}&subscription_id=${subscription_id}`)
//         .then(resp => {
//             const data = resp.data;
//             console.log("check-data =>", data);
//             setLoading(false);

//             if (data.statusId == '1') {
//                 Cookies.set(msisdn, 'msisdn');
//                 navigate(`/redirect/${subdomain}?msisdn=${msisdn}&result=Active`);
//             }

//             if (data.statusId == '0') {
//                 navigate('/');
//             }
//         })
//         .catch(e => {
//             setLoading(false);
//             navigate("/");
//         });

//     console.log("loading", loading);
//     if (initialLoading) return (<div className='bg-black h-screen'><MainLoader service={subdomain} /></div>);
//     return null;
// };

// export default SdpRedirect;
