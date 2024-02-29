import React from 'react';
import heroImage from '../../assets/hero-image-g.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: 'url(' + heroImage + ')',
      }}
    >
      <div className='hero-overlay bg-opacity-75'></div>
      <div className='hero-content text-left text-neutral-content w-full flex items-center justify-start'>
        <div className='max-w-lg pl-15'>
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
          <Link
            to='/GamePage'
            className='inline-block bg-primary hover:bg-accent mt-8 px-6 py-3 rounded-md text-base-100 border border-transparent hover:border-accent'
          >
            Games
          </Link>
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
