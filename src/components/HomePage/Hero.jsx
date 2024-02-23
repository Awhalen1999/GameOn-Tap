import React from 'react';
import heroImage from '../../assets/hero-image6.png';

const Hero = () => {
  return (
    <div className='w-screen h-4/6 bg-cover bg-center'>
      <div className='w-full h-full relative'>
        <img
          src={heroImage}
          alt='Hero'
          className='w-full h-full object-cover'
        />
        <div
          className='absolute inset-0 bg-black bg-opacity-40'
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0, 0, 0, 0.80), transparent)',
          }}
        >
          <div className='w-1/2 h-full flex items-center justify-center'>
            <div className='w-3/5'>
              <h1 className='tracking-tight font-light text-gray-300 text-4xl '>
                Welcome to
              </h1>
              <h1 className='text-6xl md:text-6xl tracking-tight leading-none font-extrabold text-yellow-500'>
                GameOn Tap
              </h1>
              <p className='text-lg text-gray-300 mt-2'>
                GameOn Tap is your ultimate destination for endless fun! Explore
                a collection of popular party games, from classic card games to
                dice and roulette challenges and trivia showdowns. Spice up any
                gathering with laughter, competition, and good times!
              </p>
              <a
                href='#'
                className='inline-block bg-yellow-500 hover:bg-yellow-600 mt-8 px-6 py-3 rounded-md text-black border border-transparent'
              >
                Get Started
              </a>
              <a
                href='#'
                className='inline-block ml-6 border border-yellow-500 hover:border-yellow-600 hover:bg-yellow-600 mt-8 px-6 py-3 rounded-md text-white'
              >
                Random Game
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
