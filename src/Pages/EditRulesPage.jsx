import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { getRulesets, getActiveRuleset, setActiveRuleset } from '../utils/api';

const EditRulesPage = () => {
  const { user } = useContext(UserContext);
  const { game } = useParams();
  const [rulesets, setRulesets] = useState([]);
  const [activeRuleset, setActiveRulesetState] = useState(null);
  const [selectedRuleset, setSelectedRuleset] = useState('');

  useEffect(() => {
    getRulesets(user.id, game).then(setRulesets).catch(console.error);
  }, [user.id, game]);

  useEffect(() => {
    getActiveRuleset(user.id, game)
      .then((activeRuleset) => {
        setActiveRulesetState(activeRuleset);
        setSelectedRuleset(activeRuleset.id);
      })
      .catch(console.error);
  }, [user.id, game]);

  const handleSelectChange = async (event) => {
    const rulesetId = event.target.value;
    setSelectedRuleset(rulesetId);
    await setActiveRuleset(user.id, game, rulesetId);
    getActiveRuleset(user.id, game)
      .then(setActiveRulesetState)
      .catch(console.error);
  };

  return (
    <div className='h-full bg-base-100 p-8'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold text-primary'>
          Edit Rules for {game}
        </h1>
        <Link to={`/games/${game}`} className='btn btn-error'>
          Return to {game}
        </Link>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs mr-4'
        />
        <button className='btn btn-primary mr-4'>Submit</button>
        <div className='w-full max-w-xs'>
          <select
            className='select select-bordered w-full'
            value={selectedRuleset}
            onChange={handleSelectChange}
          >
            {rulesets.map((ruleset) => (
              <option key={ruleset.id} value={ruleset.id}>
                {ruleset.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {activeRuleset && (
        <div className='mt-4'>
          <h2 className='text-xl font-bold text-primary mb-4'>
            {activeRuleset.name}
          </h2>
          {Object.values(activeRuleset.rules).map((rule, index) => (
            <div key={index} className='mb-4'>
              <h3 className='text-xl font-semibold mb-1'>{rule.result}</h3>
              <div>
                <h4 className=' bg-neutral rounded mb-2 py-2 px-4  text-lg'>
                  {rule.title}
                </h4>
                <p className=' bg-neutral rounded mb-2 py-2 px-4 text-lg'>
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditRulesPage;
