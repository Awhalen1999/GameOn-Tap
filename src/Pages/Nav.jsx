//todo: update active ruleset on change

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { UserContext } from '../utils/UserContext';
import { getActiveRuleset } from '../utils/api';
import { IoCloseSharp } from 'react-icons/io5';
import { FaWrench, FaUserCircle } from 'react-icons/fa';

const Nav = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'myDark');
  const location = useLocation();
  const { user } = useContext(UserContext);
  const gameId = location.pathname.split('/')[2];
  const [activeRuleset, setActiveRuleset] = useState(null);
  const navigate = useNavigate();

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? 'myLight' : 'myDark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    console.log('user:', user);
    console.log('gameId:', gameId);
    if (user && gameId) {
      getActiveRuleset(user.id, gameId)
        .then((ruleset) => {
          console.log('ruleset:', ruleset);
          setActiveRuleset(ruleset);
        })
        .catch(console.error);
    }
  }, [user, gameId]);

  const gamePaths = [
    '/games/KingsCup',
    '/games/RideTheBus',
    '/games/Snap',
    '/games/Trivia',
    '/games/PromptDash',
    '/games/DiceRoll',
    '/games/DrinkRoulette',
    '/games/BountyBlast',
  ];

  const gameTitles = {
    '/games/KingsCup': 'Kings Cup',
    '/games/RideTheBus': 'Ride The Bus',
    '/games/Snap': 'Snap',
    '/games/Trivia': 'Trivia',
    '/games/PromptDash': 'Prompt Dash',
    '/games/DiceRoll': 'Dice Roll',
    '/games/DrinkRoulette': 'Drink Roulette',
    '/games/BountyBlast': 'Bounty Blast',
    '/games/AIBartender': 'AI Bartender',
  };

  const gameTitlesButton = {
    '/games/KingsCup': 'Kings Cup',
    '/games/RideTheBus': 'Ride The Bus',
    '/games/Snap': 'Snap',
    '/games/Trivia': 'Trivia',
    '/games/PromptDash': 'Prompt Dash',
    '/games/DiceRoll': 'Dice Roll',
    '/games/DrinkRoulette': 'Drink Roulette',
    '/games/BountyBlast': 'Bounty Blast',
  };

  const gamesWithIcon = new Set([
    '/games/KingsCup',
    '/games/DiceRoll',
    '/games/DrinkRoulette',
    '/games/BountyBlast',
  ]);

  return (
    <div className='navbar bg-base-100 h-20 font-space'>
      {/* left */}
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden text-base-content'
          >
            <HiOutlineMenuAlt3 className='h-5 w-5 text-current' />
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52 text-base-content font-semibold'
          >
            <li>
              <button
                className='btn btn-ghost'
                onClick={() => navigate('/GamePage')}
              >
                Games
              </button>
            </li>
            <li>
              {gamePaths.includes(location.pathname) && (
                <button
                  className='btn btn-ghost'
                  onClick={() =>
                    document.getElementById('my_modal_3').showModal()
                  }
                >
                  {gameTitlesButton[location.pathname]}
                  {gamesWithIcon.has(location.pathname) && (
                    <FaWrench className='ml-2' size={18} />
                  )}
                </button>
              )}
            </li>
            <li>
              <label className='swap swap-rotate'>
                <input
                  type='checkbox'
                  className='theme-controller'
                  value={theme}
                  onChange={handleThemeChange}
                  checked={theme === 'myLight'}
                />
                <svg
                  className='swap-off fill-current w-8 h-8'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
                </svg>
                <svg
                  className='swap-on fill-current w-8 h-8'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
                </svg>
              </label>
            </li>
          </ul>
        </div>
        {/* center */}
        <div className='navbar bg-base-100'>
          <button
            onClick={() => navigate('/')}
            className='btn btn-ghost text-3xl font-pixel'
          >
            GameOn Tap
          </button>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex text-2xl font-bold text-primary'>
        {location.pathname.includes('games') && gameTitles[location.pathname]}
      </div>
      {/* right */}
      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1 text-base-content font-semibold hidden lg:flex'>
          <li>
            <button
              className='btn btn-ghost'
              onClick={() => navigate('/GamePage')}
            >
              Games
            </button>
          </li>
          {gamePaths.includes(location.pathname) && (
            <button
              className='btn btn-ghost'
              onClick={() => document.getElementById('my_modal_3').showModal()}
            >
              {gameTitlesButton[location.pathname]}
              {gamesWithIcon.has(location.pathname) && (
                <FaWrench className='ml-2' size={18} />
              )}
            </button>
          )}
          <li>
            <label className='swap swap-rotate'>
              <input
                type='checkbox'
                className='theme-controller'
                value={theme}
                onChange={handleThemeChange}
                checked={theme === 'myLight'}
              />
              <svg
                className='swap-off fill-current w-8 h-8'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
              </svg>
              <svg
                className='swap-on fill-current w-8 h-8'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
              </svg>
            </label>
          </li>
        </ul>
        <li className='menu menu-horizontal px-1 text-base-content font-semibold'>
          {user ? (
            <button
              className='btn-ghost btn '
              onClick={() => navigate('/user')}
            >
              <FaUserCircle className='text-3xl' />
            </button>
          ) : (
            <button
              className='btn-outline btn '
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
        </li>
      </div>
      {/* modal */}
      <dialog id='my_modal_3' className='modal p-4 '>
        <div className='modal-box border flex flex-col h-full'>
          {/* modal nav */}
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-bold text-lg'>Active Ruleset</h3>
            {gamesWithIcon.has(location.pathname) && (
              <button
                className='btn btn-ghost mr-4'
                onClick={() => {
                  navigate(
                    `/EditRules${location.pathname.replace('/games', '')}`
                  );
                  document.getElementById('my_modal_3').close();
                }}
              >
                Edit Rules <FaWrench />
              </button>
            )}
            <form method='dialog'>
              <button className='btn btn-circle btn-ghost'>
                <IoCloseSharp size={24} />
              </button>
            </form>
          </div>

          {/* modal content */}
          <div className='overflow-auto pr-2'>
            {activeRuleset && (
              <div>
                <h4 className='font-bold text-xl mb-2'>{activeRuleset.name}</h4>
                {Object.entries(activeRuleset.rules).map(
                  ([ruleKey, rule], index, array) => (
                    <div
                      key={index}
                      className={`mb-4 p-2 ${
                        index !== array.length - 1
                          ? 'border-b border-gray-200'
                          : ''
                      }`}
                    >
                      <h3 className='font-bold text-lg mb-2'>{rule.result}</h3>
                      <p className='font-semibold text-base'>{rule.title}</p>
                      <p className='text-sm'>{rule.description}</p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </dialog>
      {/* modal end*/}
    </div>
  );
};

export default Nav;
