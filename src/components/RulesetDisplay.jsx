import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RulesetDisplay = ({ rules, gameId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const gamesWithIcon = new Set([
    'KingsCup',
    'DiceRoll',
    'DrinkRoulette',
    'BountyBlast',
  ]);

  const handleEditRules = () => {
    if (user) {
      // If the user is authenticated, navigate to Edit Rules
      navigate(`/EditRules/${gameId}`);
      const modal = document.getElementById('my_modal_3');
      if (modal) {
        modal.close();
      }
    } else {
      // If not authenticated, navigate to login page
      navigate('/login');
    }
  };

  return (
    <div className='overflow-auto pr-2'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='font-bold text-lg'>Active Ruleset</h3>
        {gamesWithIcon.has(gameId) && (
          <button className='btn btn-ghost mr-4' onClick={handleEditRules}>
            Edit Rules <FaWrench />
          </button>
        )}
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost'>
            <IoCloseSharp size={24} />
          </button>
        </form>
      </div>
      {rules && (
        <div>
          {Object.entries(rules).map(([ruleKey, rule], index, array) => (
            <div
              key={index}
              className={`mb-4 p-2 ${
                index !== array.length - 1 ? 'border-b border-gray-400' : ''
              }`}
            >
              <h3 className='font-bold text-lg mb-2'>{rule.result}</h3>
              <p className='font-semibold text-base'>{rule.title}</p>
              <p className='text-sm'>{rule.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RulesetDisplay;
