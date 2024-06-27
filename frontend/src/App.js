import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SubcategoryVideosPage from './SubcategoryVideosPage '
import SingleVideo from './Components/SingleVideo'

import SubCategory from './Components/SubCategory';
import Login from './Components/Login';
import RedirectHandler from './Components/RedirectHandler';

import Terms from './Components/Terms';
import NdotoSingle from './Components/NdotoSingle';
import NdotoAllVideos from './Components/NdotoAllVideos';
import ChannelVideos from './Components/ChannelVideos';
import SdpRedirect from './Components/SdpRedirect';

const App = () => {

  const hostname = window.location.hostname;

  const isBeautySubdomain = hostname === 'beauty.ndotomobile.com';
  const isFaithSubdomain = hostname === 'faith.ndotomobile.com';

  const isComedySubdomain = hostname === 'comedy.ndotomobile.com';
  const isLuxurySubdomain = hostname === 'luxury.ndotomobile.com';
  const isSportsSubdomain = hostname === 'sports.ndotomobile.com';
  const isWohSubdomain = hostname === 'woh.ndotomobile.com';
  const isBusinessSubdomain = hostname === 'business.ndotomobile.com';
  const isFashionSubdomain = hostname === 'fashion.ndotomobile.com';
  const isVideosSubdomain = hostname === 'videos.ndotomobile.com';



  const queryParams = new URLSearchParams(window.location.search);
  const isRedirected = queryParams.get('redirect') === 'true';


  const renderLoginComponent = () => {
    if (isBeautySubdomain) {
      return <Login isBeautySubdomain={true} />;
    } else if (isFaithSubdomain) {
      return <Login isFaithSubdomain={true} />;
    } else if (isComedySubdomain) {
      return <Login isComedySubdomain={true} />;
    }
    else if (isLuxurySubdomain) {
      return <Login isLuxurySubdomain={true} />;
    } else if (isSportsSubdomain) {
      return <Login isSportsSubdomain={true} />;
    } else if (isWohSubdomain) {
      return <Login isWohSubdomain={true} />;
    }
    else if (isBusinessSubdomain) {
      return <Login isBusinessSubdomain={true} />;
    } else if (isFashionSubdomain) {
      return <Login isFashionSubdomain={true} />;
    } else if (isVideosSubdomain) {
      return <Login isVideosSubdomain={true} />;
    }
    else {
      // Default case, can be modified according to your needs
      return <Login />;
    }
  };
  return (

    <Routes>
      <Route path='/' element={renderLoginComponent()} />
      <Route path={'/doiRedirect.jsp'} element={<SdpRedirect/>}/>

      <Route exact path="/video/:videoId/:beautyparam/:ani/:cat" element={<SingleVideo />} />

      <Route path='/terms/:beautyparam/:ani' element={<Terms />} />
      <Route
        path="/redirecting"
        element={isRedirected ? <RedirectHandler /> : <Login />}
      />
      <Route path='/redirect/:beauty' element={<SubcategoryVideosPage />} />

      <Route path='/subcategories' element={<SubCategory />} />
      <Route path='/ndotosingle/:videoid/:ani' element={<NdotoSingle/>} />
      <Route path='/allvideo/:videoid/:ani' element={<NdotoAllVideos/>}/>
      <Route path='/channel/:id/:ani' element={<ChannelVideos/>}/>

    </Routes>

  );
};

export default App;
