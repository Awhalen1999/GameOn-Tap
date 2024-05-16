// todo: add the roll number inside the rules box
// todo: add rolling animation

import React, { useState, useEffect, useContext } from 'react';
import {
  FaDiceD6,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from 'react-icons/fa';
import { getActiveRuleset } from '../../../utils/api';
import { UserContext } from '../../../utils/UserContext';

function DiceRoll() {
  const [dice1, setDice1] = useState(null);
  const [dice2, setDice2] = useState(null);
  const [total, setTotal] = useState(null);
  const [rules, setRules] = useState({});
  const { user } = useContext(UserContext); // Access user data from UserContext
  const userId = user?.id;
  const gameId = 'DiceRoll';

  useEffect(() => {
    if (userId) {
      getActiveRuleset(userId, gameId)
        .then((ruleset) => {
          setRules(ruleset.rules);
        })
        .catch((error) => {
          console.error('Error fetching active ruleset:', error);
        });
    }
  }, [userId]);

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
    const rollTotal = randomNumber1 + randomNumber2;
    setTotal(rollTotal);
  };

  return (
    <div className='h-full font-space'>
      {/* dice */}
      <div className='flex justify-center mt-20'>
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
      <div className='flex justify-center'>
        <button onClick={rollDice} className='btn btn-primary btn-lg mt-10'>
          Roll Dice
        </button>
      </div>
      {/* dice roll rules */}
      <div className='flex justify-center mt-10'>
        {total !== null ? (
          <div className='bg-neutral border border-secondary w-[40vw] rounded text-center p-4'>
            <h3 className='text-xl font-bold text-neutral-content'>
              {rules[total]?.title}
            </h3>
            <p className='mt-2 text-neutral-content text-lg font-medium'>
              {rules[total]?.description}
            </p>
          </div>
        ) : (
          <p className='text-base-content text-xl font-bold'>
            Click to roll the dice
          </p>
        )}
      </div>
    </div>
  );
}

export default DiceRoll;
