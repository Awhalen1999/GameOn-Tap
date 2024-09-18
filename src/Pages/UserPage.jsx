import React, { useState, useEffect } from 'react';
import { getRulesets, getActiveRuleset, getRuleset } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaCaretDown } from 'react-icons/fa';

const UserPage = () => {
  const [gameId, setGameId] = useState('');
  const [rulesets, setRulesets] = useState([]);
  const [activeRuleset, setActiveRuleset] = useState(null);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const gameIds = ['KingsCup', 'DiceRoll', 'BountyBlast'];

  const handleSelectChange = (event) => {
    setGameId(event.target.value);
  };

  const handleLogout = () => {
    logout();
  };

  const fetchRulesets = async () => {
    if (gameId && user) {
      setActiveRuleset(null);
      const rulesets = await getRulesets(user.user_id, gameId);
      setRulesets(rulesets);
    }
  };

  const fetchActiveRuleset = async () => {
    if (gameId && user) {
      setRulesets([]);
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
        setActiveRuleset(activeRuleset);
      }
    }
  };

  if (loading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <span className='loading loading-spinner text-secondary loading-lg'></span>
      </div>
    );
  }

  return (
    <div className='h-full p-6'>
      <div className='mb-4'>
        <p className='mb-1 font-bold text-2xl'>{user?.username}'s account</p>
        <p className='text-sm text-neutral-content'>{user?.email}</p>
        <p className='mb-4 text-sm text-neutral-content'>
          User ID: {user?.user_id}
        </p>
        <Link
          to='/'
          className='btn btn-error mb-4 rounded-xl py-1 px-6'
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
      <p className='text-3xl font-bold mb-2'>Manage Rulesets</p>
      <p className='mb-6 text-sm text-neutral-content'>
        Fetch all saved rulesets or active ruleset for a game
      </p>
      <p className='mb-2 text-sm '>select a game</p>
      <div className='w-full max-w-xs'>
        <select
          className='select select-bordered w-full'
          value={gameId}
          onChange={handleSelectChange}
        >
          <option disabled value=''>
            Select a game
          </option>
          {gameIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <div className='flex flex-col sm:flex-row mt-4'>
          <button
            className='btn btn-primary text-center mt-2 sm:mt-0'
            onClick={fetchRulesets}
          >
            Fetch All Rulesets
          </button>
          <button
            className='btn btn-primary text-center sm:ml-4 mt-2 sm:mt-0'
            onClick={fetchActiveRuleset}
          >
            Fetch Active Ruleset
          </button>
        </div>
      </div>
      <div className='mt-8 pb-2'>
        {[...rulesets, activeRuleset].map(
          (ruleset) =>
            ruleset && (
              <div
                className='collapse bg-base-300 border border-base-content mb-2'
                key={ruleset.ruleset_id}
              >
                <input type='checkbox' />
                <div className='collapse-title text-xl font-medium flex justify-between items-center'>
                  <span>{ruleset.name}</span>
                  <FaCaretDown size={24} />
                </div>
                <div className='collapse-content'>
                  {Object.values(ruleset.rules).map((rule, index) => (
                    <div
                      key={`${ruleset.ruleset_id}-${index}`}
                      className='mb-4'
                    >
                      <h3 className='text-xl font-semibold mb-1'>
                        {rule.result}
                      </h3>
                      <h4>{rule.title}</h4>
                      <p>{rule.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserPage;
