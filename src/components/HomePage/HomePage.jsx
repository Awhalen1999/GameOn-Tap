// todo: add text to text.js file

import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Hero from './Hero';

const HomePage = () => {
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
    <div className='bg-black w-screen h-screen'>
      <Nav />
      <Hero />
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
  );
};

export default HomePage;