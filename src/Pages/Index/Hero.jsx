import React, { useState, useEffect } from 'react';
import heroImage from '../../assets/hero-image.png';
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

  const [isLoading, setIsLoading] = useState(true);

  const handleRandomGame = () => {
    setRandomGame(games[Math.floor(Math.random() * games.length)]);
  };

  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <div
      className='hero min-h-screen bg-base-100 relative'
      style={{
        position: 'relative',
        backgroundImage: 'url(' + heroImage + ')',
      }}
    >
      {isLoading && (
        <span className='loading loading-spinner text-secondary absolute inset-0 flex items-center justify-center'></span>
      )}
      <div className='hero-overlay bg-opacity-25 bg-black'></div>
      <div className='hero-content text-left text-neutral-content w-full flex items-center justify-start'>
        <div className='max-w-lg pl-15 bg-opacity-80 bg-black p-10 rounded-3xl font-space'>
          <h1 className=' font-regular text-white text-4xl mb-1'>Welcome to</h1>
          <h1 className='text-6xl md:text-6xl leading-none font-extrabold text-primary'>
            GameOn Tap
          </h1>
          <p className='text-xl font-medium text-white mt-2 leading-relaxed'>
            GameOn Tap is your ultimate destination for endless fun! Explore a
            collection of popular party games, from classic card games to dice
            and roulette challenges and trivia showdowns. Spice up any gathering
            with laughter, competition, and good times!
          </p>
          <Link
            to='/GamePage'
            className='inline-block font-semibold bg-primary hover:bg-accent mt-8 px-6 py-3 rounded-md text-primary-content border border-transparent hover:border-accent '
          >
            Games
          </Link>
          <Link
            onClick={handleRandomGame}
            to={randomGame}
            className='inline-block font-semibold ml-6 border border-primary hover:border-accent hover:bg-accent mt-8 px-6 py-3 rounded-md text-white hover:text-primary-content '
          >
            Random Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
