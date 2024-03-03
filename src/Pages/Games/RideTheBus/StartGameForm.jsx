import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const StartGameForm = ({
  number,
  setNumber,
  ruleSet,
  setRuleSet,
  startGame,
}) => {
  const getColorClass = (number) => {
    if (number >= 1 && number <= 4) {
      return 'text-blue-600';
    } else if (number >= 5 && number <= 6) {
      return 'text-yellow-600';
    } else if (number >= 7 && number <= 8) {
      return 'text-red-600';
    } else {
      return 'text-black';
    }
  };

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleRuleSetChange = (event) => {
    setRuleSet(event.target.value);
  };

  return (
    <form
      onSubmit={startGame}
      className='flex flex-col items-center justify-center flex-grow'
    >
      <div className='mb-4 space-y-4'>
        <label className='flex items-center space-x-2 text-lg'>
          <input
            className='radio radio-primary'
            type='radio'
            value='higher/lower'
            checked={ruleSet === 'higher/lower'}
            onChange={handleRuleSetChange}
          />
          <span>Higher/Lower</span>
        </label>
        <label className='flex items-center space-x-2 text-lg'>
          <input
            className='radio radio-primary'
            type='radio'
            value='red/black'
            checked={ruleSet === 'red/black'}
            onChange={handleRuleSetChange}
          />
          <span>Red/Black</span>
        </label>
      </div>
      {/* input */}
      <div className='w-full flex justify-center items-center'>
        <label className='text-xl font-medium text-base-content mr-4'>
          Choose a number of cards to draw (1-8)
        </label>
        <div className='relative flex items-center my-5'>
          {/* Minus button */}
          <button
            type='button'
            onClick={() =>
              setNumber((prev) => Math.min(Math.max(prev - 1, 1), 8))
            }
            className='btn btn-ghost btn-outline'
          >
            <FaMinus />
          </button>
          {/* Number input */}
          <input
            type='text'
            id='counter-input'
            value={number}
            onChange={handleChange}
            className={`bg-transparent text-xl font-bold max-w-[2.5rem] text-center mx-2 ${getColorClass(
              number
            )}`}
            required
          />
          {/* Plus button */}
          <button
            type='button'
            onClick={() =>
              setNumber((prev) => Math.min(Math.max(prev + 1, 1), 8))
            }
            className='btn btn-ghost btn-outline'
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <button type='submit' className='btn btn-primary btn-lg'>
        Start Game
      </button>
    </form>
  );
};

export default StartGameForm;
