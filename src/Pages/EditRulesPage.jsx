import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import KingsCupRules from './Games/KingsCup/KingsCupRules.js';
import DiceRollRules from './Games/DiceRoll/DiceRollRules';
import DrinkRouletteRules from './Games/DrinkRoulette/DrinkRouletteRules.js';
import { TiDelete } from 'react-icons/ti';
import { MdKeyboardReturn } from 'react-icons/md';

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
  const [savedRulesets, setSavedRulesets] = useState([]);
  const [activeRulesetTitle, setActiveRulesetTitle] = useState('');
  const { game } = useParams();
  const location = useLocation();
  const rules = rulesModules[game];
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedRules, setEditedRules] = useState(rules);

  useEffect(() => {
    const savedRules =
      JSON.parse(localStorage.getItem(`rulesets-${game}`)) || [];
    setSavedRulesets(savedRules);
  }, [game]);

  const handleDefaultRules = () => {
    setEditedRules(rulesModules[game]);
    localStorage.removeItem(`activeRuleset-${game}`);
    setActiveRulesetTitle('Default');
  };

  const handleSaveCustomRuleset = () => {
    if (customRulesTitle.trim() !== '') {
      const newRuleset = { title: customRulesTitle, rules: editedRules };
      const updatedRulesets = [...savedRulesets, newRuleset];
      localStorage.setItem(`rulesets-${game}`, JSON.stringify(updatedRulesets));
      setSavedRulesets(updatedRulesets);
      setActiveRulesetTitle(customRulesTitle);
      setCustomRulesTitle('');
    } else {
      alert('Please enter a title for your custom ruleset.');
    }
  };

  const handleLoadSavedRuleset = (title) => {
    const loadedRulesets =
      JSON.parse(localStorage.getItem(`rulesets-${game}`)) || [];
    const loadedRuleset = loadedRulesets.find(
      (ruleset) => ruleset.title === title
    );
    if (loadedRuleset) {
      setEditedRules(loadedRuleset.rules);
      setActiveRulesetTitle(title);
    }
  };

  useEffect(() => {
    if (activeRulesetTitle) {
      localStorage.setItem(`activeRuleset-${game}`, activeRulesetTitle);
    }
  }, [activeRulesetTitle, game]);

  useEffect(() => {
    const activeRulesetTitle = localStorage.getItem(`activeRuleset-${game}`);
    if (activeRulesetTitle) {
      setActiveRulesetTitle(activeRulesetTitle);
      handleLoadSavedRuleset(activeRulesetTitle);
    }
  }, [game]);

  useEffect(() => {
    const modalId = `${location.pathname.slice(1)}-rules`;
    const modal = document.getElementById(modalId);
    if (modal && modal.close) {
      modal.close();
    }
  }, [location.pathname]);

  const handleEdit = (key, type, text) => {
    setEditing({ key, type });
    setEditedText(text);
  };

  const handleSubmit = () => {
    if (editing) {
      setEditedRules((prevRules) => {
        const newRules = Object.assign({}, prevRules);
        newRules[editing.key][editing.type] = editedText;
        return newRules;
      });
      setEditing(null);
    }
  };

  const handleDeleteRuleset = (title) => {
    const newSavedRulesets = savedRulesets.filter(
      (ruleset) => ruleset.title !== title
    );
    localStorage.setItem(`rulesets-${game}`, JSON.stringify(newSavedRulesets));
    setSavedRulesets(newSavedRulesets);

    if (activeRulesetTitle === title) {
      handleDefaultRules();
    }
  };

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

        <select
          className='select select-bordered select-primary ml-6'
          value={activeRulesetTitle || ''}
          onChange={(e) => {
            if (e.target.value === 'Default') {
              handleDefaultRules();
            } else {
              handleLoadSavedRuleset(e.target.value);
            }
          }}
        >
          <option disabled value=''>
            Select a saved ruleset
          </option>
          <option value='Default'>Default</option>
          {savedRulesets.map((ruleset) => (
            <option key={ruleset.title} value={ruleset.title}>
              {ruleset.title}
            </option>
          ))}
        </select>
        <button
          className='btn btn-primary ml-6'
          onClick={() =>
            document.getElementById('saved-rulesets-modal').showModal()
          }
        >
          View saved rulesets
        </button>
      </div>
      {/* MODAL */}
      <dialog id='saved-rulesets-modal' className='modal'>
        <div className='modal-box bg-neutral'>
          {/* navbar */}
          <div className='navbar bg-neutral sticky top-0 flex justify-between items-center mb-2'>
            <h3 className='font-bold text-lg text-neutral-content'>
              Saved rulesets for {game}
            </h3>
            <form>
              <button className='btn btn-ghost font-semibold text-lg text-neutral-content'>
                Close
              </button>
            </form>
          </div>
          <ul>
            {savedRulesets.map((ruleset) => (
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
        Object.entries(editedRules).map(([key, rule]) => (
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
        ))}
    </div>
  );
};

export default EditRulesPage;
