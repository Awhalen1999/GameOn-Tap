import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const RTBStartGameForm = ({
  number,
  setNumber,
  ruleSet,
  setRuleSet,
  startGame,
  hideAlert,
}) => {
  const getColorClass = (num) => {
    if (num < 5) return 'text-base-content';
    if (num <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleChange = ({ target: { value } }) =>
    setNumber(Math.min(parseInt(value), 8));

  return (
    <form
      onSubmit={startGame}
      className='flex flex-col items-center justify-center flex-grow'
    >
      <div className='mb-4 space-y-4'>
        {['higher/lower', 'red/black'].map((value) => (
          <label key={value} className='flex items-center space-x-2 text-lg'>
            <input
              className='radio radio-primary'
              type='radio'
              value={value}
              checked={ruleSet === value}
              onChange={({ target: { value } }) => setRuleSet(value)}
            />
            <span className='text-xl font-bold'>
              {value.split('/')[0]} / {value.split('/')[1]}
            </span>
          </label>
        ))}
      </div>
      <div className='w-full flex flex-col sm:flex-row justify-center items-center'>
        <label className='text-xl font-medium text-base-content mb-4 sm:mb-0 px-2'>
          Choose a number of cards to draw (1-8)
        </label>
        <div className='relative flex items-center'>
          <button
            type='button'
            onClick={() => setNumber((prev) => Math.max(prev - 1, 1))}
            className='btn btn-ghost btn-outline'
          >
            <FaMinus />
          </button>
          <input
            type='number'
            id='counter-input'
            value={number}
            onChange={handleChange}
            className={`bg-transparent text-xl font-bold max-w-[2.5rem] text-center mx-2 ${getColorClass(
              number
            )}`}
            required
          />
          <button
            type='button'
            onClick={() => setNumber((prev) => Math.min(prev + 1, 8))}
            className='btn btn-ghost btn-outline'
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary btn-lg mt-4'
        onClick={hideAlert}
      >
        Start Game
      </button>
    </form>
  );
};

export default RTBStartGameForm;
