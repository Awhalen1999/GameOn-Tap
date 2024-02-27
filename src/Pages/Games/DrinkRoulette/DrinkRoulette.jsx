// todo: Reword rule descriptions
// todo: ease spin at end
// todo: add slider for spin time

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DrinkRoulette.css';
import { TiArrowDownThick } from 'react-icons/ti';
import { DrinkRouletteRules } from './DrinkRouletteRules';

const DrinkRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('');
  const [description, setDescription] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const itemNames = [
    'Straight Shot',
    'Choice',
    'Water Break',
    'Mystery',
    'Mix It Up',
    'Target',
    'Middle',
    'Bartender',
    'Add or Take',
    'Generosity',
    'Right Hand',
    'Spinner Drinks',
  ];

  const startRotation = () => {
    setIsSpinning(true);
    const totalDegrees = rotation + Math.floor(Math.random() * 3600) + 3600;
    setRotation(totalDegrees);
    setTimeout(() => {
      const resultIndex = 13 - Math.ceil((totalDegrees % 360) / 30);
      const resultName = itemNames[resultIndex - 1];
      setResult(resultName);
      setDescription(DrinkRouletteRules[resultName].description);
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
        <li className='item'>
          <div className='text'>Straight Shot</div>
        </li>
        <li className='item'>
          <div className='text'>Choice</div>
        </li>
        <li className='item'>
          <div className='text'>Water Break</div>
        </li>
        <li className='item'>
          <div className='text'>Mystery</div>
        </li>
        <li className='item'>
          <div className='text'>Mix It Up</div>
        </li>
        <li className='item'>
          <div className='text'>Target</div>
        </li>
        <li className='item'>
          <div className='text'>Middle</div>
        </li>
        <li className='item'>
          <div className='text'>Bartender</div>
        </li>
        <li className='item'>
          <div className='text'>Add or Take</div>
        </li>
        <li className='item'>
          <div className='text'>Generosity</div>
        </li>
        <li className='item'>
          <div className='text'>Right Hand</div>
        </li>
        <li className='item'>
          <div className='text'>Spinner Drinks</div>
        </li>
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
