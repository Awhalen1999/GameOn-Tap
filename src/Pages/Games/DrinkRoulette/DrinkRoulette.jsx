import React, { useState, useEffect } from 'react';
import './DrinkRoulette.css';
import { TiArrowDownThick } from 'react-icons/ti';
import { getActiveRuleset, getRuleset } from '../../../utils/api';
import RulesetDisplay from '../../../components/RulesetDisplay';
import { FaWrench } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';

const DrinkRoulette = () => {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState('');
  const [description, setDescription] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [rules, setRules] = useState({});
  const gameId = 'DrinkRoulette';
  const { user } = useAuth();

  useEffect(() => {
    const fetchActiveRuleset = async () => {
      if (gameId && user) {
        const activeRulesetResponse = await getActiveRuleset(
          user.user_id,
          gameId
        );

        if (activeRulesetResponse.ruleset_id) {
          const activeRuleset = await getRuleset(
            user.user_id,
            gameId,
            activeRulesetResponse.ruleset_id
          );
          setRules(activeRuleset.rules);
        }
      }
    };

    fetchActiveRuleset();
  }, [user, gameId]);

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
      <div className='flex justify-end'>
        <button
          className='btn btn-ghost mr-4 font-bold mt-1'
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Drink Roulette Rules <FaWrench />
        </button>
      </div>
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <RulesetDisplay rules={rules} gameId='DrinkRoulette' />
        </div>
      </dialog>
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
