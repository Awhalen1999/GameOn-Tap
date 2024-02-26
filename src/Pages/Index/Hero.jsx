import React from 'react';
import heroImage from '../../assets/hero-image-alt.png';

const Hero = () => {
  return (
    <div className='hero bg-base-100 '>
      <div>
        <img src={heroImage} alt='Hero' className='mx-auto' />
      </div>
      <div className=' hero-content w-full h-full flex items-center justify-start'>
        <div className='w-2/5'>
          <h1 className='tracking-tight font-light text-text text-4xl '>
            Welcome to
          </h1>
          <h1 className='text-6xl md:text-6xl tracking-tight leading-none font-extrabold text-primary'>
            GameOn Tap
          </h1>
          <p className='text-lg text-text mt-2'>
            GameOn Tap is your ultimate destination for endless fun! Explore a
            collection of popular party games, from classic card games to dice
            and roulette challenges and trivia showdowns. Spice up any gathering
            with laughter, competition, and good times!
          </p>
          <a
            href='#'
            className='inline-block bg-primary hover:bg-accent mt-8 px-6 py-3 rounded-md text-base-100 border border-transparent hover:border-accent'
          >
            Get Started
          </a>
          <a
            href='#'
            className='inline-block ml-6 border border-primary hover:border-accent hover:bg-accent mt-8 px-6 py-3 rounded-md text-text hover:text-base-100'
          >
            Random Game
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
