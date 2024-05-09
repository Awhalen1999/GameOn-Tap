import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { getRulesets, getActiveRuleset, setActiveRuleset } from '../utils/api';
import { MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

const EditRulesPage = () => {
  const { user } = useContext(UserContext);
  const { game } = useParams();
  const [rulesets, setRulesets] = useState([]);
  const [activeRuleset, setActiveRulesetState] = useState(null);
  const [selectedRuleset, setSelectedRuleset] = useState('');
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');

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

  const handleEdit = (ruleKey, type, text) => {
    setEditing({ key: ruleKey, type: type });
    setEditedText(text);
  };

  const handleSubmit = () => {
    if (editing) {
      setActiveRulesetState((prevRuleset) => {
        const newRules = { ...prevRuleset.rules };
        if (!newRules[editing.key]) {
          newRules[editing.key] = {};
        }
        newRules[editing.key][editing.type] = editedText;
        return { ...prevRuleset, rules: newRules };
      });

      // Reset editing and editedText
      setEditing(null);
      setEditedText('');
    }
  };

  return (
    <div className='h-full bg-base-100 p-8'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-primary'>
          Edit Rules for {game}
        </h1>
        <Link to={`/games/${game}`} className='btn btn-error'>
          Return to {game}
        </Link>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center w-96 mr-4'>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
          />
          <button className='btn btn-primary ml-4'>Submit</button>
        </div>
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
        <div className='mt-10'>
          <h2 className='text-xl font-bold text-primary'>
            {activeRuleset.name}
          </h2>
          {Object.entries(activeRuleset.rules).map(([ruleKey, rule], index) => (
            <div key={index} className='mb-4'>
              <h3 className='text-xl font-semibold mb-2 mt-6'>{rule.result}</h3>
              <div className='flex justify-between items-center bg-neutral py-2 px-4 rounded-lg'>
                {editing?.key === ruleKey && editing?.type === 'title' ? (
                  <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoFocus
                    className='w-full h-10 rounded-lg p-2 bg-secondary text-text'
                  />
                ) : (
                  <div className='font-semibold text-accent'>{rule.title}</div>
                )}
                {editing?.key === ruleKey && editing?.type === 'title' ? (
                  <button
                    className='btn btn-primary ml-4'
                    onClick={handleSubmit}
                  >
                    <FaCheck size={22} />
                  </button>
                ) : (
                  <button
                    className='btn btn-primary ml-4'
                    onClick={() => handleEdit(ruleKey, 'title', rule.title)}
                  >
                    <MdEdit size={22} />
                  </button>
                )}
              </div>
              <div className='flex justify-between items-center bg-neutral py-2 px-4 rounded-lg mt-4'>
                {editing?.key === ruleKey && editing?.type === 'description' ? (
                  <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoFocus
                    className='w-full h-10 rounded-lg p-2 bg-secondary text-text'
                  />
                ) : (
                  <div className='font-semibold text-accent'>
                    {rule.description}
                  </div>
                )}
                {editing?.key === ruleKey && editing?.type === 'description' ? (
                  <button
                    className='btn btn-primary ml-4'
                    onClick={handleSubmit}
                  >
                    <FaCheck size={22} />
                  </button>
                ) : (
                  <button
                    className='btn btn-primary ml-4'
                    onClick={() =>
                      handleEdit(ruleKey, 'description', rule.description)
                    }
                  >
                    <MdEdit size={22} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditRulesPage;
