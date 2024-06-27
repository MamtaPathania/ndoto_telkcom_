import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ndoto from '../assets/ndoto.jpg';
import Loader from './Loader';
import {BsFillPlayFill,BsInfoLg} from 'react-icons/bs'
import './Login.css';

const CustomSlide = ({ img }) => {
  return (
    <div className="p-4">
    {/* You can customize the content of each slide here */}
    <img
      src={img.imgurl}
      alt={'banners'}
      className="w-full h-[250px] md:h-[250px] object-fit rounded-lg shadow-lg"
    />
    {/* Centered button container */}
    <div className="mt-[-8px] text-center " style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(20px)' }}>
      <button className="bg-white  text-black px-4 py-2 mx-2 rounded-md">
        <div className='flex'>
        <BsFillPlayFill className='mt-1'/> Play 
        </div>
    
      </button>
      <button className="bg-white text-black px-4 py-2 rounded-md">
      <div className='flex'>
        <BsInfoLg className='mt-1'/> Info 
        </div>
      </button>
    </div>
  </div>
  );
};

const DataCarousel = ({ banner }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bannerArray = Object.values(banner);
    setData(bannerArray);
    setLoading(false);
  }, [banner]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <Loader />
        
      ) : (
        <div className="container w-full mx-auto slider-main">
          <Slider {...settings}>
            {data.map((img, index) => {
              return <CustomSlide key={index} img={img} />;
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default DataCarousel;

















// import React, { useState ,useEffect} from 'react'
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import  ndoto from '../assets/ndoto.jpg'
// import Loader from './Loader';
// import './Login.css';

// const DataCarousel = ({banner}) => {

// const [data,setData]=useState([])
// const [loading ,setLoading]=useState(true)

// useEffect(() => {
//       const bannerArray = Object.values(banner);

//     setData(bannerArray);
//    setLoading(false)
//   }, [banner]);


//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 800,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         responsive: [
//           {
//             breakpoint: 1024,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//             },
//           },
//         ],
//       };
//   return (
//     <div>
//       {loading ? <Loader/>:
//         <div className="container w-full mx-auto slider-main">

//         <Slider {...settings}>
//             {data.map((img, index) => {
          
//               return (
//                 <div key={index} className="p-4">
//                   {/* Provide a link on the last index */}
//                   {index === data.length - 1 ? (
//                     <a href="https://ndototrivia-za.netlify.app/
//                     " target="_blank" rel="noreferrer">
//                       <img
//                         src={img.imgurl}
//                         alt={'banners'}
//                         className="w-full h-[250px] md:h-[250px] object-fit rounded-lg shadow-lg"
//                       />
//                     </a>
//                   ) : (
//                     <img
//                       src={img.imgurl}
//                       alt={'banners'}
//                       className="w-full h-[250px] md:h-[250px] object-fit rounded-lg shadow-lg"
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </Slider>
//   </div>}
    
//     </div>
//   )
// }

// export default DataCarousel

