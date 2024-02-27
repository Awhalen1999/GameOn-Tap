// GameNav.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GameNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let buttons;

  switch (location.pathname) {
    case '/games/KingsCup':
      buttons = ['Kings Cup Button 1', 'Kings Cup Button 2'];
      break;
    case '/games/RideTheBus':
      buttons = ['Ride The Bus Button 1', 'Ride The Bus Button 2'];
      break;
    case '/games/Snap':
      buttons = ['Snap Button 1', 'Snap Button 2'];
      break;
    case '/games/Trivia':
      buttons = ['Trivia Button 1', 'Trivia Button 2'];
      break;
    case '/games/PromptDash':
      buttons = ['Prompt Dash Button 1', 'Prompt Dash Button 2'];
      break;
    case '/games/DiceRoll':
      buttons = ['Dice Roll Button 1', 'Dice Roll Button 2'];
      break;
    case '/games/DrinkRoulette':
      buttons = ['Drink Roulette Button 1', 'Drink Roulette Button 2'];
      break;
    case '/games/AIBartender':
      buttons = ['AI Bartender Button 1', 'AI Bartender Button 2'];
      break;
    default:
      buttons = ['Default Button'];
  }

  // Add the home button to all pages
  buttons.push('Home');

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
                <a>{button}</a>
              </li>
            ))}
          </ul>
        </div>
        <button className='btn btn-ghost text-xl' onClick={() => navigate('/')}>
          daisyUI
        </button>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          {buttons.map((button, index) => (
            <li key={index}>
              <a>{button}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className='navbar-end'>
        <button className='btn'>Button</button>
      </div>
    </div>
  );
};

export default GameNav;
