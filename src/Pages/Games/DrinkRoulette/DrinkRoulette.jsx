// todo: Reword rule descriptions
// todo: ease spin at end
// todo: add slider for spin time

import React, { useState, useEffect, useContext } from 'react';
import './DrinkRoulette.css';
import { TiArrowDownThick } from 'react-icons/ti';
import { getActiveRuleset } from '../../../utils/api';
import { UserContext } from '../../../utils/UserContext';

const DrinkRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('');
  const [description, setDescription] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [rules, setRules] = useState({});
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const gameId = 'DrinkRoulette';

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

  const itemNames = rules ? Object.keys(rules) : [];

  const startRotation = () => {
    setIsSpinning(true);
    const totalDegrees = rotation + Math.floor(Math.random() * 3600) + 3600;
    setRotation(totalDegrees);
    setTimeout(() => {
      const resultIndex = 13 - Math.ceil((totalDegrees % 360) / 30);
      const resultKey = itemNames[resultIndex - 1];
      const resultRule = rules[resultKey];
      if (resultRule) {
        setResult(resultRule.title);
        setDescription(resultRule.description);
      }
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
              <div className='text text-black'>{rules[itemName].title}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center'>
        <button onClick={startRotation} className='btn btn-primary btn-lg mt-6'>
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
