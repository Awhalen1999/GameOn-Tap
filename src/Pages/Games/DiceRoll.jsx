import React, { useState, useEffect, useContext } from 'react';
import {
  FaDiceD6,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
  FaWrench,
} from 'react-icons/fa';
import { getActiveRuleset } from '../../utils/api';
import { UserContext } from '../../utils/UserContext';
import RulesetDisplay from '../../components/RulesetDisplay';

function DiceRoll() {
  const [dice, setDice] = useState([null, null]);
  const [gameState, setGameState] = useState({ rules: {}, total: null });
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const gameId = 'DiceRoll';

  useEffect(() => {
    if (userId) {
      getActiveRuleset(userId, gameId)
        .then((ruleset) => {
          setGameState((prevState) => ({ ...prevState, rules: ruleset.rules }));
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
    const rollTotal = randomNumber1 + randomNumber2;

    setDice([randomNumber1, randomNumber2]);
    setGameState((prevState) => ({ ...prevState, total: rollTotal }));
  };

  return (
    <div className='h-full font-space'>
      <div className='flex justify-end'>
        <button
          className='btn btn-ghost mr-4 font-bold'
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Dice Roll Rules <FaWrench />
        </button>
      </div>
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <RulesetDisplay rules={gameState.rules} gameId='DiceRoll' />
        </div>
      </dialog>
      {/* dice */}
      <div className='flex justify-center mt-20'>
        {dice.map((die, index) =>
          die !== null ? (
            React.cloneElement(diceIcons[die], { size: 96, key: index })
          ) : (
            <FaDiceD6 size={96} key={index} />
          )
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
        {gameState.total !== null ? (
          <div className='bg-neutral border border-secondary w-[40vw] rounded text-center p-4'>
            <h3 className='text-xl font-bold text-neutral-content'>
              {gameState.rules[gameState.total]?.title}
            </h3>
            <p className='mt-2 text-neutral-content text-lg font-medium'>
              {gameState.rules[gameState.total]?.description}
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
