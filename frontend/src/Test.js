import React, { useEffect } from 'react';
import axios from 'axios';
// import { baseUrl } from './data/data';

const Test = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const msisdn = urlParams.get("msisdn");
    const beautyParam = urlParams.get("params");
  const ani='9805702978'
  const service='beauty'
 console.log("mssisdn",msisdn,beautyParam)

//  const fetchdata=async()=>{
//     const data=await fetch(`/test?ani=${ani}&serviceType=${service}`)
//     const res=await data.json();
//      console.log("res",res)

//  }

//  useEffect(()=>{
//     fetchdata()
//  },[])



 const fetchSubscription = async () => {

    try {
      const res = await axios.get(`/subscription/redirect?msisdn=${ani}&service=${service}`);
  
     console.log("testing",res.data)
    
   } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };



  useEffect(() => {
    fetchSubscription();
  }, []);
//     axios.get(apiUrl, { params })
//       .then(response => {
//         // Handle the API response data here
//         console.log(response.data);
//       })
//       .catch(error => {
//         // Handle errors here
//         console.error(error);
//       });
//   }, []);

  return (
    <div>
      {/* Your component's JSX */}
    </div>
  );
};

export default Test;
