import React from 'react';
import { Link } from 'react-router-dom';
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
      name: 'Ride The Bus',
      route: '/games/RideTheBus',
      image: rideTheBusCover,
    },
    {
      name: 'Snap',
      route: '/games/Snap',
      image: snapCover,
    },
    {
      name: 'Trivia',
      route: '/games/Trivia',
      image: triviaCover,
    },
    {
      name: 'Prompt Dash',
      route: '/games/PromptDash',
      image: promptDashCover,
    },
    {
      name: 'Dice Roll',
      route: '/games/DiceRoll',
      image: diceRollCover,
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
          <h1 className='font-bold text-2xl text-text'>Featured Games</h1>
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
                <div className='text-base-100 bg-primary rounded hover:bg-accent w-full text-center'>
                  {game.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
