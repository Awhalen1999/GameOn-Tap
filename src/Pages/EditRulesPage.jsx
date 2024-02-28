import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    const modalId = `${location.pathname.slice(1)}-rules`;
    const modal = document.getElementById(modalId);
    if (modal && modal.close) {
      modal.close();
    }
  }, [location.pathname]);

  return (
    <div className='p-6 bg-base-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Edit Rules for {game}</h1>
      {rules &&
        Object.values(rules).map((rule, index) => (
          <div key={index} className='mb-2 p-4 bg-neutral rounded shadow'>
            <strong className='font-semibold'>{rule.title}</strong>:{' '}
            {rule.description}
          </div>
        ))}
    </div>
  );
};

export default EditRulesPage;
