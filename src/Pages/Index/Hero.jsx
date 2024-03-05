import React, { useState } from 'react';
import heroImage from '../../assets/hero-image-g.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const games = [
    'games/KingsCup',
    'games/RideTheBus',
    'games/Snap',
    'games/Trivia',
    'games/PromptDash',
    'games/DiceRoll',
    'games/DrinkRoulette',
  ];

  const [randomGame, setRandomGame] = useState(
    games[Math.floor(Math.random() * games.length)]
  );

  const handleRandomGame = () => {
    setRandomGame(games[Math.floor(Math.random() * games.length)]);
  };

  return (
    <div
      className='hero min-h-screen bg-base-100'
      style={{
        backgroundImage: 'url(' + heroImage + ')',
      }}
    >
      <div className='hero-overlay bg-opacity-25 bg-black'></div>
      <div className='hero-content text-left text-neutral-content w-full flex items-center justify-start'>
        <div className='max-w-lg pl-15 bg-opacity-80 bg-black p-10 rounded-3xl'>
          <h1 className='tracking-tight font-regular text-white text-4xl '>
            Welcome to
          </h1>
          <h1 className='text-6xl md:text-6xl tracking-tight leading-none font-extrabold text-primary'>
            GameOn Tap
          </h1>
          <p className='text-lg font-medium text-white mt-2 font-micro'>
            GameOn Tap is your ultimate destination for endless fun! Explore a
            collection of popular party games, from classic card games to dice
            and roulette challenges and trivia showdowns. Spice up any gathering
            with laughter, competition, and good times!
          </p>
          <Link
            to='/GamePage'
            className='inline-block font-medium bg-primary hover:bg-accent mt-8 px-6 py-3 rounded-md text-primary-content border border-transparent hover:border-accent'
          >
            Games
          </Link>
          <Link
            onClick={handleRandomGame}
            to={randomGame}
            className='inline-block font-medium ml-6 border border-primary hover:border-accent hover:bg-accent mt-8 px-6 py-3 rounded-md text-white hover:text-primary-content'
          >
            Random Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
