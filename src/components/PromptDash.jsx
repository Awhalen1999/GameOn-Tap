import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import promptList from './PromptList';

const PromptDash = () => {
  const [prompt, setPrompt] = useState('');
  const [remainingPrompts, setRemainingPrompts] = useState([...promptList]);

  const drawPrompt = () => {
    if (remainingPrompts.length === 0) {
      alert('No more prompts left!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingPrompts.length);
    const drawnPrompt = remainingPrompts[randomIndex];
    setPrompt(drawnPrompt);

    const newRemainingPrompts = remainingPrompts.filter(
      (prompt) => prompt !== drawnPrompt
    );
    setRemainingPrompts(newRemainingPrompts);
  };

  const resetPrompts = () => {
    setRemainingPrompts([...promptList]);
    setPrompt('');
  };

  return (
    <div>
      <button
        onClick={drawPrompt}
        className='mx-auto block bg-blue-500 text-white px-8 py-4 rounded hover:bg-blue-600 mt-20'
      >
        Draw Prompt
      </button>
      {prompt && <p className='text-center my-4'>{prompt}</p>}
      <button
        onClick={resetPrompts}
        className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 absolute top-0 right-0 m-4'
      >
        Reset Prompts
      </button>
      <Link
        to='/'
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 absolute top-0 left-0 m-4'
      >
        Return to Home
      </Link>
    </div>
  );
};

export default PromptDash;
