import React, { useState } from 'react';

const GameImage = ({ src, alt, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className='relative'>
      {isLoading && (
        <span className='loading loading-spinner loading-large text-secondary absolute inset-0 flex items-center justify-center'></span>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        {...props}
        className={`w-full h-auto object-cover rounded-t-lg transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default GameImage;
