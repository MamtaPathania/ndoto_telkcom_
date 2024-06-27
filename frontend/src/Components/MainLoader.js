import React from 'react'
import beauty from '../assets/beauty_logo.png'
import fashion from '../assets/fasshionnew.png'
import faith from '../assets/faith.png'
import luxury from '../assets/luxurynew.png'
import ndoto from '../assets/ndotostream.png'
import topics from '../assets/topics.png'
import sports from '../assets/sports.png'
import comedy from '../assets/loltv.png'
import business from '../assets/bossmoves.png'
import woh from '../assets/woh_logo.png'
import './Loader.css'

const MainLoader = ({service}) => {
  console.log("loader param",service)
  return (
    <div className='custom-loader'>


        {service==='beauty'  ?
      <img src={beauty} className='banner'/>
  :""  }
    {service==='business'  ?
      <img src={business} className='banner'/>
  :""  }
    {service==='comedy'  ?
      <img src={comedy} className='banner'/>
  :""  }

{service==='fashion'  ?
      <img src={fashion} className='banner'/>
  :""  }


{service==='videos'  ?
      <img src={ndoto} className='banner'/>
  :""  }



{service==='faith'  ?
      <img src={faith} className='banner'/>
  :""  }

{service==='luxury'  ?
      <img src={luxury} className='banner'/>
  :""  }

{service==='topics'  ?
      <img src={topics} className='banner'/>
  :""  }

{service==='sports'  ?
      <img src={sports} className='banner'/>
  :""  }
  {service==='woh'  ?
      <img src={woh} className='banner'/>
  :""  }
    </div>
  )
}

export default MainLoader
