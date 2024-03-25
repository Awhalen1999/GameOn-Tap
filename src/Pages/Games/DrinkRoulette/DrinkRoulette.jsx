// todo: Reword rule descriptions
// todo: ease spin at end
// todo: add slider for spin time

import React, { useState } from 'react';
import './DrinkRoulette.css';
import { TiArrowDownThick } from 'react-icons/ti';
import { DrinkRouletteRules } from './DrinkRouletteRules';
import useActiveRuleset from '../../UseActiveRuleset.js';

const DrinkRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('');
  const [description, setDescription] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const activeRuleset = useActiveRuleset('DrinkRoulette', DrinkRouletteRules);

  const itemNames = activeRuleset ? Object.keys(activeRuleset) : [];

  const startRotation = () => {
    setIsSpinning(true);
    const totalDegrees = rotation + Math.floor(Math.random() * 3600) + 3600;
    setRotation(totalDegrees);
    setTimeout(() => {
      const resultIndex = 13 - Math.ceil((totalDegrees % 360) / 30);
      const resultKey = itemNames[resultIndex - 1];
      const resultRule = activeRuleset[resultKey];
      setResult(resultRule.title);
      setDescription(resultRule.description);
      setIsSpinning(false);
      setHasSpun(true);
    }, 3500);
  };

  return (
    <div className='h-full bg-base-100 font-space'>
      <div className='flex justify-center'>
        <div className='z-10'>
          <TiArrowDownThick size={38} />
        </div>
      </div>
      <div className='flex justify-start'>
        <ul className='circle' style={{ transform: `rotate(${rotation}deg)` }}>
          {itemNames.map((itemName) => (
            <li className='item' key={itemName}>
              <div className='text text-black'>
                {activeRuleset[itemName].title}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={startRotation}
          disabled={isSpinning}
          className={`px-6 py-3 text-lg text-white rounded ${
            isSpinning
              ? 'animate-pulse bg-red-500 hover:bg-red-600 cursor-not-allowed'
              : 'bg-primary hover:bg-accent'
          }`}
        >
          SPIN
        </button>
      </div>
      {hasSpun && (
        <div className='bg-neutral p-5 mt-5 w-4/5 mx-auto text-center rounded-lg border border-secondary'>
          <h2 className='text-neutral-content text-2xl font-bold'>{result}</h2>
          <p className='text-neutral-content text-lg'>{description}</p>
        </div>
      )}
    </div>
  );
};

export default DrinkRoulette;
