import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const TriviaGameStartForm = ({
  amount,
  setAmount,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  type,
  setType,
  categories,
  handleStartGame,
}) => {
  return (
    <div className='p-6 bg-base-100 h-full'>
      <h1 className='text-2xl font-bold mb-4 text-base-content'>
        Trivia Game Setup
      </h1>
      <div className='flex flex-col items-center justify-center'>
        <div className='mb-4 w-1/3'>
          {/* Number of questions: */}
          <div className='mb-4'>
            <label className='block text-md font-medium text-base-content'>
              Number of Questions:
            </label>
            <div className=' bg-neutral rounded-lg border border-primary'>
              <div className='w-full flex justify-between items-center gap-x-5'>
                <input
                  className='input bg-neutral w-full'
                  type='number'
                  value={amount}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 50) {
                      setAmount(50);
                    } else {
                      setAmount(value);
                    }
                  }}
                />
                <div className='flex justify-end items-center gap-x-1.5 m-2'>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() => setAmount(amount > 1 ? amount - 1 : 1)}
                  >
                    <FaMinus />
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() => setAmount(amount < 50 ? amount + 1 : 50)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Category */}
          <div className='mb-4'>
            <label className='block text-md font-medium text-base-content'>
              Select Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='select select-primary w-full bg-neutral text-neutral-content'
              >
                <option value=''>Any Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* Difficulty */}
          <div className='mb-4'>
            <label className='block text-md font-medium text-base-content'>
              Select Difficulty:
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className='select select-primary w-full bg-neutral text-neutral-content'
              >
                <option value=''>Any Difficulty</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </label>
          </div>
          {/* Type */}
          <div className='mb-8'>
            <label className='block text-md font-medium text-base-content'>
              Select Type:
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='select select-primary w-full bg-neutral text-neutral-content'
              >
                <option value=''>Any Type</option>
                <option value='multiple'>Multiple Choice</option>
                <option value='boolean'>True/False</option>
              </select>
            </label>
          </div>
          <button
            onClick={handleStartGame}
            className='btn btn-primary w-full text-lg font-bold'
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriviaGameStartForm;
