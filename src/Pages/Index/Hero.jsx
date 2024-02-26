import React from 'react';
import heroImage from '../../assets/hero-image.png';

const Hero = () => {
  return (
    <div className='hero bg-base-200 '>
      <div className='bg-black'>
        <img src={heroImage} alt='Hero' className='mx-auto' />
      </div>
      <div className=' hero-content w-full h-full flex items-center justify-start'>
        <div className='w-2/5'>
          <h1 className='tracking-tight font-light text-gray-300 text-4xl '>
            Welcome to
          </h1>
          <h1 className='text-6xl md:text-6xl tracking-tight leading-none font-extrabold text-yellow-500'>
            GameOn Tap
          </h1>
          <p className='text-lg text-gray-300 mt-2'>
            GameOn Tap is your ultimate destination for endless fun! Explore a
            collection of popular party games, from classic card games to dice
            and roulette challenges and trivia showdowns. Spice up any gathering
            with laughter, competition, and good times!
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
  );
};

export default Hero;
