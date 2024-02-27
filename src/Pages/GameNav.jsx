// Potentially add a "My Bar" to save alcohol if you have account as well as ability to save drink recipes

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ThemeOptions from './ThemeOptions';
import { FaWrench } from 'react-icons/fa';

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

  let buttons;

  switch (location.pathname) {
    case '/games/KingsCup':
      buttons = [
        <span className='flex items-center'>
          Kings Cup Rules <FaWrench className='ml-2 text-xl' />
        </span>,
      ];
      break;
    case '/games/RideTheBus':
      buttons = ['Ride The Bus Rules'];
      break;
    case '/games/Snap':
      buttons = [
        <span className='flex items-center'>
          Snap Rules <FaWrench className='ml-2 text-xl' />
        </span>,
      ];
      break;
    case '/games/Trivia':
      buttons = ['Trivia Rules'];
      break;
    case '/games/PromptDash':
      buttons = ['Prompt Dash Rules'];
      break;
    case '/games/DiceRoll':
      buttons = [
        <span className='flex items-center'>
          Dice Roll Rules <FaWrench className='ml-2 text-xl' />
        </span>,
      ];
      break;
    case '/games/DrinkRoulette':
      buttons = [
        <span className='flex items-center'>
          Drink Roulette Rules <FaWrench className='ml-2 text-xl' />
        </span>,
      ];
      break;
    case '/games/AIBartender':
      buttons = [];
      break;
  }

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
            {buttons.map((button, index) => (
              <li key={index}>
                <a btn btn-ghost>
                  {button}
                </a>
              </li>
            ))}
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
      <div className='navbar-end'>
        <div className='navbar-center hidden lg:flex items-center'>
          <ul className='menu menu-horizontal px-1'>
            {buttons.map((button, index) => (
              <li key={index} className='mr-2'>
                <a className='btn btn-ghost'>{button}</a>
              </li>
            ))}
          </ul>
          <div className='dropdown relative mr-2'>
            <button tabIndex={0} role='button' className='btn btn-ghost'>
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
        </div>
        <a className='btn btn-outline btn-text'>Login</a>
      </div>
    </div>
  );
};

export default GameNav;
