import React from 'react';
import { Link } from 'react-router-dom';
import kingsCupCover from '../../assets/kings-cup-cover.png';
import rideTheBusCover from '../../assets/ride-the-bus-cover.png';
import snapCover from '../../assets/snap-cover.png';
import triviaCover from '../../assets/trivia-cover.png';
import promptDashCover from '../../assets/prompt-dash-cover.png';
import diceRollCover from '../../assets/dice-roll-cover.png';
import drinkRouletteCover from '../../assets/drink-roulette-cover.png';
import bountyBlastCover from '../../assets/bounty-blast-cover.png';
import aiBartenderCover from '../../assets/ai-bartender-cover.png';
import gameDescription from './GameDescription';

const GamePage = () => {
  const games = [
    {
      name: 'Kings Cup',
      route: '/games/KingsCup',
      image: kingsCupCover,
      description: gameDescription['Kings Cup'],
    },
    {
      name: 'Ride The Bus',
      route: '/games/RideTheBus',
      image: rideTheBusCover,
      description: gameDescription['Ride The Bus'],
    },
    {
      name: 'Snap',
      route: '/games/Snap',
      image: snapCover,
      description: gameDescription['Snap'],
    },
    {
      name: 'Trivia',
      route: '/games/Trivia',
      image: triviaCover,
      description: gameDescription['Trivia'],
    },
    {
      name: 'Prompt Dash',
      route: '/games/PromptDash',
      image: promptDashCover,
      description: gameDescription['Prompt Dash'],
    },
    {
      name: 'Dice Roll',
      route: '/games/DiceRoll',
      image: diceRollCover,
      description: gameDescription['Dice Roll'],
    },
    {
      name: 'Drink Roulette',
      route: '/games/DrinkRoulette',
      image: drinkRouletteCover,
      description: gameDescription['Drink Roulette'],
    },
    {
      name: 'Bounty Blast',
      route: '/games/BountyBlast',
      image: bountyBlastCover,
      description: gameDescription['Bounty Blast'],
    },
    {
      name: 'AI Bartender',
      route: '/games/AIBartender',
      image: aiBartenderCover,
      description: gameDescription['AI Bartender'],
    },
  ];

  return (
    <div className='font-space'>
      {/* HERO */}
      <div className='diff aspect-[32/9]'>
        <div className='diff-item-1'>
          <div className='bg-primary text-primary-content flex justify-center items-center'>
            <div className='flex flex-col items-start w-[40vw] ml-[15vw]'>
              <div>
                <h1 className='text-9xl font-black'>Game</h1>
              </div>
              <div>
                <p className='text-xl font-medium mb-2'>
                  Kick back and enjoy some game time with friends! Our selection
                  of party games guarantees a good laugh and a great time, every
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='diff-item-2'>
          <div className='bg-base-200 text-base-content flex justify-center items-center'>
            <div className='flex flex-col items-start w-[40vw] ml-[15vw]'>
              <div>
                <h1 className='text-9xl font-black mb-2'>On Tap</h1>
              </div>
              <div>
                <p className='text-xl font-medium'>
                  No need to stress about planning the perfect hangout, just
                  jump into GameOn Tap! Grab a drink, invite your buddies, and
                  let the games do the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='diff-resizer'></div>
      </div>
      {/* GAME LIST */}
      <div className='max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto mb-10'>
        <div className='w-full h-10 flex items-center justify-start py-20'>
          <h1 className='font-bold text-5xl text-base-content'>Games</h1>
        </div>
        <div className=' grid grid-cols-3 gap-4'>
          {games.map((game, index) => (
            <div key={index} className='mb-2'>
              <Link
                to={game.route}
                className='px-6 py-3 bg-transparent rounded hover:scale-105 mx-auto flex flex-col items-center'
              >
                <div className='text-primary-content p-1.5 font-bold text-lg bg-primary rounded-t hover:bg-accent hover:text-accent-content w-full text-center'>
                  {game.name}
                </div>
                <img
                  src={game.image}
                  alt={game.name}
                  className='w-full h-48 object-cover'
                />
                <div className='text-neutral-content bg-neutral rounded-b hover:bg-accent hover:text-accent-content w-full text-center h-auto p-4'>
                  {game.description}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
