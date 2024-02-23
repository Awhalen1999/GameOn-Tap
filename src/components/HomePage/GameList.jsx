import React from 'react';
import { Link } from 'react-router-dom';

const GameList = () => {
  const games = [
    { name: 'Kings Cup', route: '/KingsCup' },
    { name: 'Ride The Bus', route: '/RideTheBus' },
    { name: 'Snap', route: '/Snap' },
    { name: 'Trivia', route: '/Trivia' },
    { name: 'Prompt Dash', route: '/PromptDash' },
    { name: 'Dice Roll', route: '/DiceRoll' },
    { name: 'Drink Roulette', route: '/DrinkRoulette' },
    { name: 'AI Bartender', route: '/AIBartender' },
  ];

  return (
    <div className='w-screen h-auto bg-black'>
      <div className='max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
        <div className='w-full h-10 flex items-center justify-start'>
          <h1 className='font-bold text-2xl text-white font-main'>
            Featured Games
          </h1>
        </div>
        <div className='mt-10'>
          <ul>
            {games.map((game, index) => (
              <li key={index} className='mb-2'>
                <Link
                  to={game.route}
                  className='px-4 py-2 text-xl text-white bg-yellow-500 rounded hover:bg-yellow-600 hover:scale-105 mx-auto flex justify-center'
                >
                  {game.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameList;
