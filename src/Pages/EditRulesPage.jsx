import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import KingsCupRules from './Games/KingsCup/KingsCupRules.js';
import DiceRollRules from './Games/DiceRoll/DiceRollRules';
import DrinkRouletteRules from './Games/DrinkRoulette/DrinkRouletteRules.js';
import { TiDelete } from 'react-icons/ti';
import { MdKeyboardReturn } from 'react-icons/md';
import {
  getRulesets,
  saveRuleset,
  deleteRuleset,
  getActiveRuleset,
  setActiveRuleset,
  getActiveRulesetTitle,
  setDefaultRuleset,
} from '../utils/api';

const rulesModules = {
  KingsCup: KingsCupRules,
  DiceRoll: DiceRollRules,
  DrinkRoulette: DrinkRouletteRules,
};

const RuleEdit = ({
  editing,
  editedText,
  setEditedText,
  handleSubmit,
  handleEdit,
  rule,
  ruleKey,
  type,
}) => (
  <div className='flex justify-between items-center bg-neutral p-4 rounded-lg'>
    {editing?.key === ruleKey && editing?.type === type ? (
      <input
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        autoFocus
        className='w-full h-10 rounded-lg p-2 bg-secondary text-text'
      />
    ) : (
      <div className='font-semibold text-accent'>{rule[type]}</div>
    )}
    {editing?.key === ruleKey && editing?.type === type ? (
      <button className='btn btn-primary ml-4' onClick={handleSubmit}>
        Submit
      </button>
    ) : (
      <button
        className='btn btn-primary ml-4'
        onClick={() => handleEdit(ruleKey, type, rule[type])}
      >
        Edit
      </button>
    )}
  </div>
);

const EditRulesPage = () => {
  const [customRulesTitle, setCustomRulesTitle] = useState('');
  const [savedRulesets, setSavedRulesets] = useState({});
  const [activeRulesetTitle, setActiveRulesetTitle] = useState('');
  const { game } = useParams();
  const location = useLocation();
  const rules = rulesModules[game];
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedRules, setEditedRules] = useState(rules);

  //this sets the default ruleset for the game (this works)
  const handleDefaultRules = () => {
    setEditedRules(rulesModules[game]);
    setDefaultRuleset(game);
    setActiveRulesetTitle('Default');
  };

  // Save custom ruleset function
  const handleSaveCustomRuleset = async () => {
    if (customRulesTitle.trim() !== '') {
      try {
        await saveRuleset(game, customRulesTitle, editedRules);
        const updatedRulesets = await getRulesets(game);
        setSavedRulesets(updatedRulesets || {});
        setActiveRulesetTitle(customRulesTitle);
        await handleLoadSavedRuleset(customRulesTitle);
        setCustomRulesTitle('');
      } catch (error) {
        console.error('Failed to save ruleset:', error);
      }
    } else {
      alert('Please enter a title for your custom ruleset.');
    }
  };

  // Delete ruleset function
  const handleDeleteRuleset = async (title) => {
    try {
      await deleteRuleset(game, title);
      const updatedSavedRulesets = await getRulesets(game);
      setSavedRulesets(updatedSavedRulesets || {});

      if (activeRulesetTitle === title) {
        handleDefaultRules();
      }
    } catch (error) {
      console.error('Failed to delete ruleset:', error);
    }
  };

  //this reflects the changes to the ruleset in the ui once the user clicks submit (this works)
  const handleSubmit = () => {
    if (editing) {
      setEditedRules((prevRules) => {
        let newRules;
        if (activeRulesetTitle === 'default') {
          newRules = JSON.parse(JSON.stringify(rulesModules[game]));
        } else {
          newRules = JSON.parse(JSON.stringify(prevRules));
        }
        newRules[editing.key][editing.type] = editedText;
        return newRules;
      });
      setEditing(null);
    }
  };

  const handleEdit = (key, type, text) => {
    setEditing({ key, type });
    setEditedText(text);
  };

  //this loads the saved rulesets for the game (this works)
  useEffect(() => {
    const loadSavedRulesets = async () => {
      try {
        const rulesets = await getRulesets(game);
        setSavedRulesets(rulesets);
      } catch (error) {
        console.error('Failed to load rulesets:', error);
      }
    };
    loadSavedRulesets();
  }, [game]);

  useEffect(() => {
    const loadActiveRuleset = async () => {
      const activeRulesetTitle = await getActiveRulesetTitle(game);
      if (activeRulesetTitle) {
        const activeRuleset = await getRulesets(game, activeRulesetTitle);
        if (activeRuleset) {
          setEditedRules(activeRuleset.rules);
          setActiveRulesetTitle(activeRulesetTitle);
        }
      }
    };
    loadActiveRuleset();
  }, [game]);

  useEffect(() => {
    const loadActiveRulesetTitle = async () => {
      const activeRulesetTitle = await getActiveRulesetTitle(game);
      setActiveRulesetTitle(activeRulesetTitle);
    };
    loadActiveRulesetTitle();
  }, [game, activeRulesetTitle]);

  const handleLoadSavedRuleset = async (selectedRulesetTitle) => {
    try {
      await setActiveRuleset(game, selectedRulesetTitle);
      const activeRuleset = await getActiveRuleset(game);
      if (activeRuleset) {
        setEditedRules(activeRuleset.rules);
        setActiveRulesetTitle(activeRuleset.title);
      } else {
        console.error('Failed to get active ruleset:', activeRuleset);
      }
    } catch (error) {
      console.error('Failed to set active ruleset:', error);
    }
  };

  //this is the main return for the component

  return (
    <div className='p-6 bg-base-100 min-h-screen font-space'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-primary'>
          Edit Rules for {game}
        </h1>
        <div className='flex justify-end'>
          <Link to={`/games/${game}`} className='btn btn-primary mr-4'>
            <MdKeyboardReturn size={32} /> Return to {game}
          </Link>
          <button onClick={handleDefaultRules} className='btn btn-error'>
            Default rules
          </button>
        </div>
      </div>
      <div className='mb-4'>
        <input
          type='text'
          className='input input-bordered input-primary w-1/4'
          value={customRulesTitle}
          onChange={(e) => setCustomRulesTitle(e.target.value)}
          placeholder='Enter a title for your custom ruleset'
        />

        <button
          className='btn btn-primary ml-1'
          onClick={handleSaveCustomRuleset}
        >
          Save custom ruleset
        </button>

        {/* ruleset selector */}

        <select
          className='select select-bordered select-primary ml-6'
          value={activeRulesetTitle || ''}
          onChange={(e) => {
            const selectedRulesetTitle = e.target.value;
            if (selectedRulesetTitle === 'Default') {
              handleDefaultRules();
            } else {
              handleLoadSavedRuleset(selectedRulesetTitle);
            }
          }}
        >
          <option value='Default'>Default</option>
          {Object.values(savedRulesets).map((ruleset) => (
            <option key={ruleset.title} value={ruleset.title}>
              {ruleset.title}
            </option>
          ))}
        </select>

        {/* end of ruleset selector */}

        <button
          className='btn btn-primary ml-6'
          onClick={() =>
            document.getElementById('saved-rulesets-modal').showModal()
          }
        >
          View saved rulesets
        </button>
      </div>
      {/* saved ruleset list MODAL */}
      <dialog id='saved-rulesets-modal' className='modal'>
        <div className='modal-box bg-neutral'>
          {/* navbar */}
          <div className='navbar bg-neutral sticky top-0 flex justify-between items-center mb-2'>
            <h3 className='font-bold text-lg text-neutral-content'>
              Saved rulesets for {game}
            </h3>
            <button
              className='btn btn-ghost font-semibold text-lg text-neutral-content'
              onClick={() =>
                document.getElementById('saved-rulesets-modal').close()
              }
            >
              Close
            </button>
          </div>
          <ul>
            {Object.values(savedRulesets).map((ruleset) => (
              <li
                className=' flex justify-between items-center px-4 py-2 rounded-lg mb-2 bg-base-100'
                key={ruleset.title}
              >
                {ruleset.title}
                <button
                  className='btn btn-primary ml-4'
                  onClick={() => handleDeleteRuleset(ruleset.title)}
                >
                  <TiDelete size={28} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
      {/* end of modal */}
      {editedRules &&
        Object.entries(editedRules).map(([key, rule]) => {
          if (!rule) {
            console.error(`Rule with key ${key} is undefined`);
            return null;
          }

          return (
            <div key={key} className='mb-8'>
              <div className='mb-1'>
                <div className='text-xl font-bold mb-2 text-base-content'>
                  {rule.result}
                </div>
                <RuleEdit
                  editing={editing}
                  editedText={editedText}
                  setEditedText={setEditedText}
                  handleSubmit={handleSubmit}
                  handleEdit={handleEdit}
                  rule={rule}
                  ruleKey={key}
                  type='title'
                />
              </div>
              <RuleEdit
                editing={editing}
                editedText={editedText}
                setEditedText={setEditedText}
                handleSubmit={handleSubmit}
                handleEdit={handleEdit}
                rule={rule}
                ruleKey={key}
                type='description'
              />
            </div>
          );
        })}
    </div>
  );
};

export default EditRulesPage;
