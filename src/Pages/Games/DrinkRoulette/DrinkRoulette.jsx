// todo: Reword rule descriptions
// todo: ease spin at end
// todo: add slider for spin time
// rule edit not working because text is coming from drink roulette not from rules

import React, { useState } from 'react';
import './DrinkRoulette.css';
import { TiArrowDownThick } from 'react-icons/ti';
import { DrinkRouletteRules } from './DrinkRouletteRules';

const DrinkRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('');
  const [description, setDescription] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const itemNames = Object.keys(DrinkRouletteRules);

  const startRotation = () => {
    setIsSpinning(true);
    const totalDegrees = rotation + Math.floor(Math.random() * 3600) + 3600;
    setRotation(totalDegrees);
    setTimeout(() => {
      const resultIndex = 13 - Math.ceil((totalDegrees % 360) / 30);
      const resultKey = itemNames[resultIndex - 1];
      const resultRule = DrinkRouletteRules[resultKey];
      setResult(resultRule.title);
      setDescription(resultRule.description);
      setIsSpinning(false);
      setHasSpun(true);
    }, 3500);
  };

  return (
    <div>
      <div className='arrow'>
        <TiArrowDownThick size={38} />
      </div>
      <ul className='circle' style={{ transform: `rotate(${rotation}deg)` }}>
        {itemNames.map((itemName) => (
          <li className='item' key={itemName}>
            <div className='text text-black'>
              {DrinkRouletteRules[itemName].title}
            </div>
          </li>
        ))}
      </ul>
      <button
        className='spin-button'
        onClick={startRotation}
        disabled={isSpinning}
      >
        SPIN
      </button>
      {hasSpun && (
        <div className='result-container'>
          <h2>{result}</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default DrinkRoulette;
