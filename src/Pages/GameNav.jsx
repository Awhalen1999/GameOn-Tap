// Potentially add a "My Bar" to save alcohol if you have account as well as ability to save drink recipes

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeOptions from './ThemeOptions';
import { FaWrench } from 'react-icons/fa';
import KingsCupRules from './Games/KingsCup/KingsCupRules.js';
import RideTheBusRules from './Games/RideTheBus/RideTheBusRules.js';
import SnapRules from './Games/Snap/SnapRules.js';
import TriviaRules from './Games/Trivia/TriviaRules.js';
import PromptDashRules from './Games/PromptDash/PromptDashRules.js';
import DiceRollRules from './Games/DiceRoll/DiceRollRules';
import DrinkRouletteRules from './Games/DrinkRoulette/DrinkRouletteRules.js';

const GameNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'default'
  );
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', selectedTheme);
  }, [selectedTheme]);

  const gameRules = {
    '/games/KingsCup': KingsCupRules,
    '/games/RideTheBus': RideTheBusRules,
    '/games/Snap': SnapRules,
    '/games/Trivia': TriviaRules,
    '/games/PromptDash': PromptDashRules,
    '/games/DiceRoll': DiceRollRules,
    '/games/DrinkRoulette': DrinkRouletteRules,
  };

  const gameTitles = {
    '/games/KingsCup': 'Kings Cup Rules',
    '/games/RideTheBus': 'Ride The Bus Rules',
    '/games/Snap': 'Snap Rules',
    '/games/Trivia': 'Trivia Rules',
    '/games/PromptDash': 'Prompt Dash Rules',
    '/games/DiceRoll': 'Dice Roll Rules',
    '/games/DrinkRoulette': 'Drink Roulette Rules',
  };

  const gamesWithIcon = new Set([
    '/games/KingsCup',
    '/games/DiceRoll',
    '/games/DrinkRoulette',
  ]);

  const openModal = () => {
    const modalId = `${location.pathname.slice(1)}-rules`;
    document.getElementById(modalId).showModal();
  };

  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <button className='btn btn-ghost' onClick={openModal}>
                {gameTitles[location.pathname]}
                {gamesWithIcon.has(location.pathname) && (
                  <FaWrench className='ml-2' size={18} />
                )}
              </button>
            </li>
            <li>
              <div
                className='dropdown relative btn btn-ghost flex items-center'
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              >
                <button tabIndex={0} role='button' className='text-center'>
                  Theme
                  <svg
                    width='18px'
                    height='18px'
                    className='h-3 w-3 ml-1 fill-current inline-block'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 2048 2048'
                  >
                    <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                  </svg>
                </button>
                {isThemeDropdownOpen && (
                  <ThemeOptions
                    selectedTheme={selectedTheme}
                    setSelectedTheme={setSelectedTheme}
                  />
                )}
              </div>
            </li>
          </ul>
        </div>
        <button className='btn btn-ghost text-xl' onClick={() => navigate('/')}>
          GameOn Tap
        </button>
      </div>
      {/* Desktop menu */}
      <div className='navbar-end'>
        <div className='navbar-center hidden lg:flex items-center'>
          <div className='dropdown relative '>
            <button tabIndex={0} role='button' className='btn btn-ghost mr-2'>
              Theme
              <svg
                width='18px'
                height='18px'
                className='h-3 w-3 ml-1 fill-current inline-block'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 2048 2048'
              >
                <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
              </svg>
            </button>
            <ThemeOptions
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
            />
          </div>
          <button className='btn btn-ghost mr-2' onClick={openModal}>
            {gameTitles[location.pathname]}
            {gamesWithIcon.has(location.pathname) && (
              <FaWrench className='ml-2' size={18} />
            )}
          </button>
        </div>
        <a className='btn btn-outline btn-text'>Login</a>
      </div>
      <dialog
        id={`${location.pathname.slice(1)}-rules`}
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>{gameTitles[location.pathname]}</h3>
          <p className='py-4'>
            {Object.values(gameRules[location.pathname]).map((rule, index) => (
              <>
                <strong>{rule.title}</strong>: {rule.description}
                <br />
                <br />
              </>
            ))}
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default GameNav;
