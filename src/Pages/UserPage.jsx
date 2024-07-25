import React, { useState, useEffect } from 'react';
import { getRulesets, getActiveRuleset, getRuleset } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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

  const gameIds = ['KingsCup', 'DiceRoll', 'DrinkRoulette', 'BountyBlast'];

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
    <div className='h-full  p-8'>
      <Link to='/' className='btn btn-error mb-4' onClick={handleLogout}>
        Logout
      </Link>
      <div className='mb-4'>
        <p className='mb-2'>
          <span className='font-bold'>ID:</span> {user?.user_id}
        </p>
        <p className='mb-2'>
          <span className='font-bold'>Username:</span> {user?.username}
        </p>
        <p className='mb-2'>
          <span className='font-bold'>Email:</span> {user?.email}
        </p>
      </div>
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
        <div className='mt-4 flex'>
          <button className='btn btn-primary' onClick={fetchRulesets}>
            Fetch
          </button>
          <button className='btn btn-primary ml-4' onClick={fetchActiveRuleset}>
            Fetch Active Ruleset
          </button>
        </div>
      </div>
      <div className='mt-8'>
        {[...rulesets, activeRuleset].map(
          (ruleset) =>
            ruleset && (
              <div
                key={ruleset.ruleset_id}
                className='mb-4 p-4 bg-base-100 rounded shadow'
              >
                <div className='flex items-center mb-4'>
                  <h2 className='font-bold text-lg mr-4 text-primary'>
                    {ruleset.name}
                  </h2>
                  <p className='text-gray-500'>ID: {ruleset.ruleset_id}</p>
                </div>
                {Object.values(ruleset.rules).map((rule, index) => (
                  <div key={`${ruleset.ruleset_id}-${index}`} className='mb-4'>
                    <h3 className='text-xl font-semibold mb-1'>
                      {rule.result}
                    </h3>
                    <h4>{rule.title}</h4>
                    <p>{rule.description}</p>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserPage;
