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
    <div className='h-full bg-base-100 font-space'>
      <div className='flex flex-col items-center mt-10'>
        {/* Delay slider */}
        <div className='mb-4 text-center'>
          <label htmlFor='delay' className='text-lg font-bold mb-2'>
            Delay (ms):
          </label>
          <input
            type='range'
            id='delay'
            min='0'
            max='3000'
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className='range range-primary'
          />
        </div>
        {/* Draw Card button */}
        <button
          onClick={drawPrompt}
          disabled={loading && delay > 175}
          className={`  text-white px-8 py-4 rounded ${
            loading && delay > 175
              ? 'animate-pulse bg-red-500 hover:bg-red-600 cursor-not-allowed'
              : 'bg-primary hover:bg-accent'
          }`}
        >
          Draw Prompt
        </button>
      </div>
      <div className='flex flex-col items-center justify-center mt-20'>
        {prompt && (
          <div className='w-4/5 sm:w-3/5 lg:w-2/5 h-auto bg-neutral rounded p-8 flex items-center justify-center border border-secondary text-neutral-content'>
            <p className='text-center text-xl text-bold'>{prompt}</p>
          </div>
        )}
      </div>
      <button
        onClick={resetPrompts}
        className='btn btn-success absolute bottom-0 right-0 m-2'
      >
        Reset Prompts
      </button>
    </div>
  );
};

export default PromptDash;
