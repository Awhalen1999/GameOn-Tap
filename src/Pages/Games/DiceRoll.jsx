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
import { getActiveRuleset, getRuleset } from '../../utils/api';
import { UserContext } from '../../utils/UserContext';
import RulesetDisplay from '../../components/RulesetDisplay';

function DiceRoll() {
  const [dice, setDice] = useState([null, null]);
  const [rolledNumber, setRolledNumber] = useState(null);
  const [activeRuleset, setActiveRuleset] = useState(null);
  const {
    user: { user_id },
  } = useContext(UserContext);
  const gameId = 'DiceRoll';

  useEffect(() => {
    const fetchActiveRuleset = async () => {
      if (gameId) {
        const activeRulesetResponse = await getActiveRuleset(user_id, gameId);

        if (activeRulesetResponse.ruleset_id) {
          const activeRuleset = await getRuleset(
            user_id,
            gameId,
            activeRulesetResponse.ruleset_id
          );
          setActiveRuleset(activeRuleset);
        }
      }
    };

    fetchActiveRuleset();
  }, [user_id, gameId]);

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
    setRolledNumber(rollTotal);
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
          <RulesetDisplay rules={activeRuleset?.rules} gameId='DiceRoll' />
        </div>
      </dialog>
      <div className='flex justify-center mt-20'>
        {dice.map((number, index) =>
          number !== null ? (
            React.cloneElement(diceIcons[number], { size: 96, key: index })
          ) : (
            <FaDiceD6 size={96} key={index} />
          )
        )}
      </div>
      <div className='flex justify-center'>
        <button onClick={rollDice} className='btn btn-primary btn-lg mt-10'>
          Roll Dice
        </button>
      </div>

      <div className='flex justify-center mt-10'>
        {rolledNumber !== null ? (
          <div className='bg-neutral border border-secondary w-[40vw] rounded text-center p-4'>
            <h3 className='text-xl font-bold text-neutral-content'>
              {activeRuleset.rules[rolledNumber]?.title}
            </h3>
            <p className='mt-2 text-neutral-content text-lg font-medium'>
              {activeRuleset.rules[rolledNumber]?.description}
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
