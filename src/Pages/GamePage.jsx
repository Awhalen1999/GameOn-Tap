import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import kingsCupCover from '../assets/kings-cup-cover.png';
import rideTheBusCover from '../assets/ride-the-bus-cover.png';
import snapCover from '../assets/snap-cover.png';
import triviaCover from '../assets/trivia-cover.png';
import promptDashCover from '../assets/prompt-dash-cover.png';
import diceRollCover from '../assets/dice-roll-cover.png';
import drinkRouletteCover from '../assets/drink-roulette-cover.png';
import bountyBlastCover from '../assets/bounty-blast-cover.png';
import aiBartenderCover from '../assets/ai-bartender-cover.png';
import { MdMenuOpen, MdQuestionMark } from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { TbPlayCard } from 'react-icons/tb';
import { FaDiceFive } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { BiGridAlt } from 'react-icons/bi';
import ImageLoader from '../components/ImageLoader';

const GamePage = () => {
  const games = [
    {
      name: 'Kings Cup',
      route: '/games/KingsCup',
      image: kingsCupCover,
      description:
        'Get ready for a classic with Kings Cup! Each card comes with its own rule, leading to hilarious antics. But watch out for the final king - the one who draws it loses!',
    },
    {
      name: 'Ride The Bus',
      route: '/games/RideTheBus',
      image: rideTheBusCover,
      description: `Customize your ride and brace yourself for a challenging journey! With each card chosen, you're one step closer to victory. But choose wisely to avoid getting stranded on the bus!`,
    },
    {
      name: 'Dice Roll',
      route: '/games/DiceRoll',
      image: diceRollCover,
      description:
        'Roll the dice and let the fun begin in Dice Roll! Each number corresponds to a unique rule or challenge, promising surprises and laughs with every roll.',
    },
    {
      name: 'Snap',
      route: '/games/Snap',
      image: snapCover,
      description: `Keep your reflexes sharp in Snap! Be the first to recognize when the deck snaps with two of the same card drawn consecutively. It's a fast-paced frenzy of slaps and shouts!`,
    },
    {
      name: 'Prompt Dash',
      route: '/games/PromptDash',
      image: promptDashCover,
      description: `Race against the Your friends in Prompt Dash! With each prompt drawn, be quick to complete the prompt before other players. It's a frantic rush of creativity and laughter!`,
    },
    {
      name: 'Bounty Blast',
      route: '/games/BountyBlast',
      image: bountyBlastCover,
      description: `Embark on a treasure hunt in Bounty Blast! Uncover chests to reveal bombs or treasures, but be careful - one wrong move and you'll face the explosive consequences!`,
    },
    {
      name: 'Trivia',
      route: '/games/Trivia',
      image: triviaCover,
      description:
        'Test your knowledge and sip on drinks in Trivia! Answer questions across various categories and see who emerges as the trivia champ among your friends.',
    },
    // {
    //   name: 'Drink Roulette',
    //   route: '/games/DrinkRoulette',
    //   image: drinkRouletteCover,
    //   description: `Take a spin and let fate decide your drinking fate in Drink Roulette! Whether it's a shot or a fun challenge, the roulette wheel adds an exciting twist to your drinking game night.`,
    // },
    {
      name: 'AI Bartender',
      route: '/games/AIBartender',
      image: aiBartenderCover,
      description: `Embark on a treasure hunt in Bounty Blast! Uncover chests to reveal bombs or treasures, but be careful - one wrong move and you'll face the explosive consequences!`,
    },
  ];

  const [filter, setFilter] = useState('All Games');

  const filteredGames = games.filter((game) => {
    if (filter === 'All Games') return true;
    if (filter === '1-2 Player Games') {
      return [
        'Ride The Bus',
        'Snap',
        'Trivia',
        'Bounty Blast',
        'AI Bartender',
      ].includes(game.name);
    }
    if (filter === 'Card Games') {
      return ['Kings Cup', 'Ride The Bus', 'Snap'].includes(game.name);
    }
    if (filter === 'Dice Games') {
      return ['Dice Roll'].includes(game.name);
    }
    if (filter === 'Trivia and Word Games') {
      return ['Trivia', 'Prompt Dash'].includes(game.name);
    }
    if (filter === 'Other Games') {
      return ['Bounty Blast', 'Drink Roulette', 'AI Bartender'].includes(
        game.name
      );
    }
    return true;
  });

  return (
    <div className='font-space flex w-full h-full'>
      <div className='drawer lg:drawer-open'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col items-center justify-center'>
          {/* Page content */}
          <div className=' flex flex-wrap justify-between items-center relative mx-auto mb-10'>
            {/* Hero */}
            <div className='hero bg-primary'>
              <div className='hero-content text-center my-10'>
                <div className='max-w-lg'>
                  <h1 className='text-6xl font-bold text-primary-content'>
                    GameOn Tap
                  </h1>
                  <p className='py-6 font-semibold text-lg text-primary-content'>
                    Get the Party Started in Seconds: Skip the Setup and Dive
                    into Instant Fun with GameOn Tap's Collection of Popular
                    Party and Drinking Games!
                  </p>
                </div>
              </div>
            </div>
            {/* end of hero */}
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 sm:mx-12 sm:gap-6  lg:mx-0 lg:gap-0'>
              {filteredGames.map((game, index) => (
                <div key={index} className='mb-2'>
                  <Link
                    to={game.route}
                    className='px-6 py-3 bg-transparent rounded hover:scale-105 mx-auto flex flex-col items-center'
                  >
                    <div className='text-primary-content p-1.5 font-bold text-lg bg-primary rounded-t hover:bg-accent hover:text-accent-content w-full text-center'>
                      {game.name}
                    </div>
                    <ImageLoader
                      src={game.image}
                      alt={game.name}
                      className='w-full h-auto object-cover'
                    />
                    <div className='text-neutral-content bg-neutral rounded-b hover:bg-accent hover:text-accent-content w-full text-center h-auto p-4'>
                      {game.description}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* end of game list */}
          <label
            htmlFor='my-drawer-2'
            className='btn btn-ghost text-base-content drawer-button lg:hidden absolute top-0 left-0 m-4'
          >
            <MdMenuOpen size={24} />
          </label>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full text-base-content bg-base-100 text-lg'>
            {/* Sidebar items */}
            <li
              className={`mb-2 ${
                filter === 'All Games'
                  ? 'bg-primary text-primary-content rounded-lg'
                  : ''
              }`}
              onClick={() => setFilter('All Games')}
            >
              <a>
                <BiGridAlt />
                <p>All Games</p>
              </a>
            </li>
            <li
              className={`mb-2 ${
                filter === '1-2 Player Games'
                  ? 'bg-primary text-primary-content rounded-lg'
                  : ''
              }`}
              onClick={() => setFilter('1-2 Player Games')}
            >
              <a>
                <FaUserGroup />
                <p>1-2 Player Games</p>
              </a>
            </li>
            <li
              className={`mb-2 ${
                filter === 'Card Games'
                  ? 'bg-primary text-primary-content rounded-lg'
                  : ''
              }`}
              onClick={() => setFilter('Card Games')}
            >
              <a>
                <TbPlayCard />
                <p>Card Games</p>
              </a>
            </li>
            <li
              className={`mb-2 ${
                filter === 'Dice Games'
                  ? 'bg-primary text-primary-content rounded-lg'
                  : ''
              }`}
              onClick={() => setFilter('Dice Games')}
            >
              <a>
                <FaDiceFive />
                <p>Dice Games</p>
              </a>
            </li>
            <li
              className={`mb-2 ${
                filter === 'Trivia and Word Games'
                  ? 'bg-primary text-primary-content rounded-lg'
                  : ''
              }`}
              onClick={() => setFilter('Trivia and Word Games')}
            >
              <a>
                <MdQuestionMark />
                <p>Trivia and Word Games</p>
              </a>
            </li>
            <li
              className={`mb-2 ${
                filter === 'Other Games'
                  ? 'bg-primary text-primary-content rounded-lg'
                  : ''
              }`}
              onClick={() => setFilter('Other Games')}
            >
              <a>
                <IoIosMore />
                <p>Other Games</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
