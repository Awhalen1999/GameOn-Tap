import React from 'react';
import heroImage from '../../assets/hero-image4.png';

const Hero = () => {
  return (
    <div className='w-screen flex flex-row justify-center items-start relative p-40'>
      <img src={heroImage} alt='Hero' className='w-3/4 h-auto rounded' />
      <h2 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl'>
        Welcome to GameOn Tap
      </h2>
    </div>
  );
};

export default Hero;
