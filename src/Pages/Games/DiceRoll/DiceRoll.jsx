// todo: add the roll number inside the rules box
// todo: add rolling animation

import React, { useState } from 'react';
import {
  FaDiceD6,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DiceRollRules from './DiceRollRules';

function DiceRoll() {
  const [dice1, setDice1] = useState(null);
  const [dice2, setDice2] = useState(null);
  const [total, setTotal] = useState(null);

  const diceIcons = [
    null,
    <FaDiceOne />,
    <FaDiceTwo />,
    <FaDiceThree />,
    <FaDiceFour />,
    <FaDiceFive />,
    <FaDiceSix />,
  ];

  const rollDice = () => {
    const randomNumber1 = Math.floor(Math.random() * 6) + 1;
    const randomNumber2 = Math.floor(Math.random() * 6) + 1;

    setDice1(randomNumber1);
    setDice2(randomNumber2);
    setTotal(randomNumber1 + randomNumber2);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* dice */}
      <div className='flex justify-center mb-8'>
        {dice1 !== null ? (
          React.cloneElement(diceIcons[dice1], { size: 96 })
        ) : (
          <FaDiceD6 size={96} />
        )}
        {dice2 !== null ? (
          React.cloneElement(diceIcons[dice2], { size: 96 })
        ) : (
          <FaDiceD6 size={96} />
        )}
      </div>
      {/* dice roll button */}
      <button
        onClick={rollDice}
        className='mb-8 py-2 px-4 bg-blue-500 text-white rounded'
      >
        Roll Dice
      </button>
      {/* dice roll rules */}
      <div>
        {total !== null ? (
          <div className='bg-blue-200 rounded text-center p-4'>
            <h3 className='text-lg font-bold text-gray-700'>
              {DiceRollRules[total].title}
            </h3>
            <p className='mt-2 text-gray-600'>
              {DiceRollRules[total].description}
            </p>
          </div>
        ) : (
          <p>Click to roll the dice.</p>
        )}
      </div>
    </div>
  );
}

export default DiceRoll;
