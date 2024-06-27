import React from 'react'
import ndoto from '../assets/ndotostream.png'
import './Ndoto.css'
const NdotoFooter = () => {
  return (
    <div className='bg-black mt-10'>
      <div className='flex  justify-center'>

      <img src={ndoto} className="h-10 w-[200px] mr-3 " alt="Ndoto Logo" />
      </div>
      <div className='flex justify-center'>

      <p className='text-white font-family mt-5 text-center'>2023 © NDOTO</p>
      </div>


    </div>
  )
}

export default NdotoFooter
