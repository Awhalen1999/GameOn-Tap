import React from 'react';
import AltNav from '../AltNav';
import { Link } from 'react-router-dom';
import kingsCupCover from '../../../assets/kings-cup-cover.png';
import rideTheBusCover from '../../../assets/ride-the-bus-cover.png';
import snapCover from '../../../assets/snap-cover.png';
import triviaCover from '../../../assets/trivia-cover.png';
import promptDashCover from '../../../assets/prompt-dash-cover.png';
import diceRollCover from '../../../assets/dice-roll-cover.png';
import drinkRouletteCover from '../../../assets/drink-roulette-cover.png';
import aiBartenderCover from '../../../assets/ai-bartender-cover.png';
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
      name: 'AI Bartender',
      route: '/games/AIBartender',
      image: aiBartenderCover,
      description: gameDescription['AI Bartender'],
    },
  ];

  return (
    <div>
      <AltNav />
      <div className='w-screen h-auto bg-base-100'>
        <div className='max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
          <div className='w-full h-10 flex items-center justify-start'>
            <h1 className='font-bold text-2xl text-text'>Games</h1>
          </div>
          <div className='mt-10 grid grid-cols-3 gap-4'>
            {games.map((game, index) => (
              <div key={index} className='mb-2'>
                <Link
                  to={game.route}
                  className='px-6 py-3 bg-transparent rounded hover:scale-105 mx-auto flex flex-col items-center'
                >
                  <div className='text-text p-1.5 font-bold text-lg bg-primary rounded-t hover:bg-accent w-full text-center'>
                    {game.name}
                  </div>
                  <img
                    src={game.image}
                    alt={game.name}
                    className='w-full h-48 object-cover'
                  />
                  <div className='text-text bg-secondary rounded-b hover:bg-accent w-full text-center h-auto p-4'>
                    {game.description}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
