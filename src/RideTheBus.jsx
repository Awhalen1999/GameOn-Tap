import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderCard from './assets/red.png';

const RideTheBus = () => {
  const [number, setNumber] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setNumber('');
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='m-4 flex justify-between'>
        {/* Link to home page button */}
        <Link
          to='/'
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
        >
          Return to Home
        </Link>

        {/* Reset game button */}
        <button
          onClick={resetGame}
          className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600'
        >
          Reset Game
        </button>
      </div>

      {!gameStarted ? (
        // Game start form
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center flex-grow'
        >
          <label className='mb-4 text-lg'>
            Choose a number between 1 and 7:
            <input
              type='number'
              min='1'
              max='7'
              value={number}
              onChange={handleChange}
              className='ml-2 border-2 border-gray-300 rounded-md p-1'
            />
          </label>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Start Game
          </button>
        </form>
      ) : (
        // Placeholder cards
        <div className='flex flex-col items-center justify-center flex-grow'>
          <div className='flex justify-center'>
            {[...Array(parseInt(number))].map((_, index) => (
              <img
                key={index}
                src={placeholderCard}
                alt='placeholder card'
                className='mx-2 w-36 h-auto object-contain rounded shadow-lg'
              />
            ))}
          </div>
          <div className='mt-12'>
            <button className='mx-8 px-6 py-3 text-lg text-white bg-blue-500 rounded transform hover:scale-105 transition-transform duration-200'>
              Lower
            </button>
            <button className='mx-8 px-6 py-3 text-lg text-white bg-green-500 rounded transform hover:scale-105 transition-transform duration-200'>
              Equal
            </button>
            <button className='mx-8 px-6 py-3 text-lg text-white bg-red-500 rounded transform hover:scale-105 transition-transform duration-200'>
              Higher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideTheBus;
