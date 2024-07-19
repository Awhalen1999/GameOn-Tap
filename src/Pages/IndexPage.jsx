import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.png';
import kingsCupCover from '../assets/kings-cup-cover.png';
import rideTheBusCover from '../assets/ride-the-bus-cover.png';
import snapCover from '../assets/snap-cover.png';
import triviaCover from '../assets/trivia-cover.png';
import promptDashCover from '../assets/prompt-dash-cover.png';
import diceRollCover from '../assets/dice-roll-cover.png';
import drinkRouletteCover from '../assets/drink-roulette-cover.png';
import bountyBlastCover from '../assets/bounty-blast-cover.png';
import aiBartenderCover from '../assets/ai-bartender-cover.png';
import logo from '../assets/logo-1.png';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { FaAnglesRight } from 'react-icons/fa6';

const IndexPage = () => {
  const games = [
    { name: 'Kings Cup', route: '/games/KingsCup', image: kingsCupCover },
    {
      name: 'Drink Roulette',
      route: '/games/DrinkRoulette',
      image: drinkRouletteCover,
    },
    {
      name: 'Bounty Blast',
      route: '/games/BountyBlast',
      image: bountyBlastCover,
    },
    {
      name: 'Ride The Bus',
      route: '/games/RideTheBus',
      image: rideTheBusCover,
    },
    { name: 'Snap', route: '/games/Snap', image: snapCover },
    { name: 'Trivia', route: '/games/Trivia', image: triviaCover },
    { name: 'Prompt Dash', route: '/games/PromptDash', image: promptDashCover },
    { name: 'Dice Roll', route: '/games/DiceRoll', image: diceRollCover },
    {
      name: 'AI Bartender',
      route: '/games/AIBartender',
      image: aiBartenderCover,
    },
  ];

  const [randomGame, setRandomGame] = useState(
    games[Math.floor(Math.random() * games.length)].route
  );
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    const today = new Date().getDay();
    setFeaturedGames([
      games[today % games.length],
      games[(today + 1) % games.length],
      games[(today + 2) % games.length],
    ]);
  }, []);

  const handleRandomGame = () => {
    setRandomGame(games[Math.floor(Math.random() * games.length)].route);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className='hero min-h-screen bg-base-100'
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className='hero-overlay bg-opacity-25 bg-black'></div>
        <div className='hero-content text-left text-neutral-content w-full flex items-center justify-start'>
          <div className='max-w-lg pl-15 bg-opacity-80 bg-black p-10 rounded-3xl font-space'>
            <h1 className='font-regular text-white text-4xl mb-1'>
              Welcome to
            </h1>
            <h1 className='text-6xl md:text-6xl leading-none font-extrabold text-primary'>
              GameOn Tap
            </h1>
            <p className='text-xl font-medium text-white mt-2 leading-relaxed'>
              GameOn Tap is your ultimate destination for endless fun! Explore a
              collection of popular party games, from classic card games to dice
              and roulette challenges and trivia showdowns. Spice up any
              gathering with laughter, competition, and good times!
            </p>
            <Link
              to='/GamePage'
              className='inline-block font-semibold bg-primary hover:bg-accent mt-8 px-6 py-3 rounded-md text-primary-content border border-transparent hover:border-accent'
            >
              Games
            </Link>
            <Link
              onClick={handleRandomGame}
              to={randomGame}
              className='inline-block font-semibold ml-6 border border-primary hover:border-accent hover:bg-accent mt-8 px-6 py-3 rounded-md text-white hover:text-primary-content'
            >
              Random Game
            </Link>
          </div>
        </div>
      </div>

      {/* GameList Section */}
      <div className='w-screen h-auto bg-base-100 font-space'>
        <div className='max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
          <div className='w-full h-10 flex items-center justify-start'>
            <h1 className='font-bold text-4xl text-base-content'>Featured</h1>
          </div>
          <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
            {featuredGames.map((game, index) => (
              <div
                key={index}
                className='border-2 border-secondary rounded-xl transform hover:scale-105 relative z-10'
              >
                <Link
                  to={game.route}
                  className='text-xl bg-transparent flex flex-col items-center'
                >
                  <img
                    src={game.image}
                    alt={game.name}
                    className='w-full h-auto object-cover rounded-t-lg'
                  />
                  <div className='text-primary-content font-bold bg-primary rounded-b-lg hover:bg-accent w-full text-center'>
                    {game.name}
                  </div>
                </Link>
              </div>
            ))}
            <div className='mb-2 flex items-center justify-center'>
              <Link
                to='/GamePage'
                className='w-full flex justify-center items-center'
              >
                <button className='btn btn-ghost text-2xl p-5 flex items-center justify-center flex-col text-base-content'>
                  Full Game List
                  <FaAnglesRight className='flex-shrink-0 ml-2' />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className='footer items-center p-4 bg-neutral text-neutral-content font-space'>
        <aside className='items-center grid-flow-col'>
          <img
            src={logo}
            width='26'
            height='26'
            alt='Logo'
            className='fill-current mx-2'
          />
          <p className='text-neutral-content font-medium'>
            Copyright © 2024 - All right reserved
          </p>
        </aside>
        <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end mr-2'>
          <p className='text-neutral-content font-medium'>Contact Me:</p>
          <a
            href='https://www.linkedin.com/in/alex-whalen-0496b227b/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-neutral-content'
            alt='LinkedIn'
          >
            <FaLinkedin size={24} className='fill-current' />
          </a>
          <a
            href='https://github.com/Awhalen1999'
            target='_blank'
            rel='noopener noreferrer'
            className='text-neutral-content'
            alt='GitHub'
          >
            <SiGithub size={24} className='fill-current' />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default IndexPage;
