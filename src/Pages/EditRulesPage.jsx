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

const EditRulesPage = () => {
  const { game } = useParams();
  const location = useLocation();
  const rules = rulesModules[game];
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedRules, setEditedRules] = useState(rules);

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
    <div className='p-6 bg-base-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Edit Rules for {game}</h1>
        <Link to={`/games/${game}`} className='btn btn-primary'>
          Return to {game}
        </Link>
      </div>
      {editedRules &&
        Object.entries(editedRules).map(([key, rule]) => (
          <div key={key} className='mb-4'>
            <div className='flex justify-between items-center mb-1 bg-neutral p-4 rounded'>
              {editing?.key === key && editing?.type === 'title' ? (
                <input
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus
                />
              ) : (
                <div className='font-semibold'>{rule.title}</div>
              )}
              {editing?.key === key && editing?.type === 'title' ? (
                <button className='btn btn-primary' onClick={handleSubmit}>
                  Submit
                </button>
              ) : (
                <button
                  className='btn btn-primary'
                  onClick={() => handleEdit(key, 'title', rule.title)}
                >
                  Edit
                </button>
              )}
            </div>
            <div className='flex justify-between items-center bg-neutral p-4 rounded'>
              {editing?.key === key && editing?.type === 'description' ? (
                <input
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  autoFocus
                />
              ) : (
                <div>{rule.description}</div>
              )}
              {editing?.key === key && editing?.type === 'description' ? (
                <button className='btn btn-primary' onClick={handleSubmit}>
                  Submit
                </button>
              ) : (
                <button
                  className='btn btn-primary'
                  onClick={() =>
                    handleEdit(key, 'description', rule.description)
                  }
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default EditRulesPage;
