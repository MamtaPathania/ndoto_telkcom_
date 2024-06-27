import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const Watchlist = ({ video, addToWatchlist, isAdded }) => {
  
  return (
    <div className='mt-4'>
      <div className='flex gap-1'>
        <AiOutlinePlus
          color={isAdded ? 'gray' : '#F6CA42'}
          size={18}
          className='mt-2 cursor-pointer'
          onClick={addToWatchlist}
        />
        <span className='text-white mt-1 cursor-pointer'>
          {isAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
        </span>
      </div>
    </div>
  );
};

export default Watchlist;
