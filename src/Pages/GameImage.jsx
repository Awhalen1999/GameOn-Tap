import React, { useState } from 'react';

const GameImage = ({ src, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <span className='loading loading-spinner text-secondary absolute inset-0 flex items-center justify-center'></span>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        {...props}
        className={`w-full h-auto object-cover rounded-t-lg ${
          isLoading ? 'hidden' : ''
        }`}
      />
    </>
  );
};

export default GameImage;
