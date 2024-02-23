import React from 'react';
import heroImage from '../../assets/hero-image6.png';

const Hero = () => {
  return (
    <main class='flex flex-col xl:flex-row h-screen'>
      <div class='w-full xl:w-1/2 h-3/4 flex items-center justify-center border'>
        <div class='w-4/6'>
          <h1 class='tracking-tight font-light text-gray-400 text-4xl '>
            Welcome to
          </h1>
          <h1 class='text-6xl md:text-6xl tracking-tight leading-none font-extrabold text-yellow-500'>
            GameOn Tap
          </h1>
          <p class='text-lg text-gray-400 mt-2'>
            GameOn Tap is your ultimate destination for endless fun! Explore a
            collection of popular party games, from classic card games to dice
            and roulette challenges and trivia showdowns. Spice up any gathering
            with laughter, competition, and good times!
          </p>
          <a
            href='#'
            class='inline-block bg-yellow-500 hover:bg-yellow-600 mt-8 px-6 py-3 rounded-md text-black border border-transparent'
          >
            Get Started
          </a>
          <a
            href='#'
            class='inline-block ml-6 border border-yellow-500 hover:border-yellow-600 hover:bg-yellow-600 mt-8 px-6 py-3 rounded-md text-white'
          >
            Random Game
          </a>
        </div>
      </div>
      <div class='xl:w-1/2 h-3/4 border'>
        <img
          class='object-cover w-auto h-full m-auto'
          src={heroImage}
          alt='hero image'
        />
      </div>
    </main>
  );
};

export default Hero;
