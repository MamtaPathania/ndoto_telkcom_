import React, { useState } from 'react';

const MAX_WORDS = 100;

const Truncate = ({ description }) => {
  const [showFull, setShowFull] = useState(false);

  // Split the description into an array of words
  const wordsArray = description.split(' ');

  // Get the first 100 words or less
  const truncatedWords = wordsArray.slice(0, MAX_WORDS);

  // Check if there are more words in the original description
  const showEllipsis = wordsArray.length > MAX_WORDS;

  // Combine words with spaces
  const truncatedDescription = truncatedWords.join(' ');

  return (
    <div>
      <p>
        {showFull ? description : truncatedDescription}
        {showEllipsis && (
          <button onClick={() => setShowFull(!showFull)}>
            {showFull ? 'Less' : 'More'}
          </button>
        )}
      </p>
    </div>
  );
};

export default Truncate;
