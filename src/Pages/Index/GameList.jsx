import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import kingsCupCover from '../../assets/kings-cup-cover.png';
import rideTheBusCover from '../../assets/ride-the-bus-cover.png';
import snapCover from '../../assets/snap-cover.png';
import triviaCover from '../../assets/trivia-cover.png';
import promptDashCover from '../../assets/prompt-dash-cover.png';
import diceRollCover from '../../assets/dice-roll-cover.png';
import drinkRouletteCover from '../../assets/drink-roulette-cover.png';
import aiBartenderCover from '../../assets/ai-bartender-cover.png';

const GameList = () => {
  const games = [
    {
      name: 'Kings Cup',
      route: '/games/KingsCup',
      image: kingsCupCover,
    },
    {
      name: 'Drink Roulette',
      route: '/games/DrinkRoulette',
      image: drinkRouletteCover,
    },
    {
      name: 'AI Bartender',
      route: '/games/AIBartender',
      image: aiBartenderCover,
    },
  ];

  return (
    <div className='w-screen h-auto bg-base-100'>
      <div className='max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
        <div className='w-full h-10 flex items-center justify-start'>
          <h1 className='font-bold text-4xl text-text'>Featured</h1>
        </div>
        <div className='mt-10 grid grid-cols-4 gap-4'>
          {games.map((game, index) => (
            <div key={index} className='mb-2'>
              <Link
                to={game.route}
                className='px-4 py-2 text-xl bg-transparent rounded hover:scale-105 mx-auto flex flex-col items-center'
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className='w-full h-48 object-cover mb-2 rounded'
                />
                <div className='text-base-100 font-bold bg-primary rounded hover:bg-accent w-full text-center'>
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
              <button className='btn btn-ghost text-2xl p-5 flex items-center justify-center flex-col'>
                Full Game List
                <FaArrowRightLong className='flex-shrink-0 ml-2' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameList;