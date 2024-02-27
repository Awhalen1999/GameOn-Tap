import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import promptList from './PromptList';

const PromptDash = () => {
  const [prompt, setPrompt] = useState('');
  const [remainingPrompts, setRemainingPrompts] = useState([...promptList]);
  const [delay, setDelay] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  const drawPrompt = () => {
    if (remainingPrompts.length === 0) {
      alert('No more prompts left!');
      return;
    }

    setLoading(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalRef.current);

      const randomIndex = Math.floor(Math.random() * remainingPrompts.length);
      const drawnPrompt = remainingPrompts[randomIndex];
      setPrompt(drawnPrompt);

      const newRemainingPrompts = remainingPrompts.filter(
        (prompt) => prompt !== drawnPrompt
      );
      setRemainingPrompts(newRemainingPrompts);

      setLoading(false);
    }, delay);
  };

  const resetPrompts = () => {
    setRemainingPrompts([...promptList]);
    setPrompt('');
  };

  return (
    <div>
      {/* Delay slider section */}
      <div className='flex flex-col items-center mb-4 mt-10'>
        <label htmlFor='delay' className='mr-2'>
          Delay (ms):
        </label>
        <input
          type='range'
          id='delay'
          min='0'
          max='5000'
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>

      <div className='flex flex-col items-center justify-center'>
        {/* Draw Prompt button section */}
        <button
          onClick={drawPrompt}
          disabled={loading && delay > 175}
          className={`mx-auto block text-white px-8 py-4 rounded mt-32 ${
            loading && delay > 175
              ? 'animate-pulse bg-red-500 hover:bg-red-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Draw Prompt
        </button>

        {/* Display prompt section */}
        {prompt && (
          <div className='w-1/4 h-auto bg-blue-200 rounded p-4 flex items-center justify-center mt-4'>
            <p className='text-center text-lg'>{prompt}</p>
          </div>
        )}
      </div>

      {/* Reset Prompts button section */}
      <button
        onClick={resetPrompts}
        className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 absolute top-0 right-0 m-4'
      >
        Reset Prompts
      </button>
    </div>
  );
};

export default PromptDash;
