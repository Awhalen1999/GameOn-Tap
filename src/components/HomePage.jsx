// add text to text.js file

import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const games = [
    { name: 'Kings Cup', route: '/KingsCup' },
    { name: 'Ride The Bus', route: '/RideTheBus' },
    { name: 'Trivia', route: '/Trivia' },
    { name: 'Snap', route: '/Snap' },
    // Add more games
  ];

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-indigo-200'>
      <h1 className='text-4xl font-bold mb-4'>
        Welcome to the Party Game Hub!
      </h1>
      <p className='text-2xl mb-4'>Please select a game to play:</p>
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
