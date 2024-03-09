import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import KingsCupRules from './Games/KingsCup/KingsCupRules.js';
import DiceRollRules from './Games/DiceRoll/DiceRollRules';
import DrinkRouletteRules from './Games/DrinkRoulette/DrinkRouletteRules.js';

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

  const handleSaveCustomRuleset = () => {
    if (customRulesTitle.trim() !== '') {
      const newRuleset = { title: customRulesTitle, rules: editedRules };
      const updatedRulesets = [...savedRulesets, newRuleset];
      localStorage.setItem(`rulesets-${game}`, JSON.stringify(updatedRulesets));
      setSavedRulesets(updatedRulesets);
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

  return (
    <div className='p-6 bg-base-100 min-h-screen font-space'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-primary'>
          Edit Rules for {game}
        </h1>
        <div className='flex justify-end'>
          <Link to={`/games/${game}`} className='btn btn-primary mr-4'>
            Return to {game}
          </Link>
          <button
            onClick={() => window.location.reload()}
            className='btn btn-primary'
          >
            Default rules
          </button>
        </div>
      </div>
      <div>
        <input
          type='text'
          className='input input-bordered'
          value={customRulesTitle}
          onChange={(e) => setCustomRulesTitle(e.target.value)}
          placeholder='Enter a title for your custom ruleset'
        />

        <button
          className='btn btn-primary ml-4'
          onClick={handleSaveCustomRuleset}
        >
          Save custom ruleset
        </button>

        <select
          className='select select-bordered ml-4'
          value={activeRulesetTitle}
          onChange={(e) => handleLoadSavedRuleset(e.target.value)}
        >
          <option disabled>Select a saved ruleset</option>
          {savedRulesets.map((ruleset) => (
            <option key={ruleset.title} value={ruleset.title}>
              {ruleset.title}
            </option>
          ))}
        </select>
      </div>
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
