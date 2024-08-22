import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const Nav = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'myDark');
  const location = useLocation();
  const { user, loading } = useAuth();

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? 'myLight' : 'myDark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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

  return (
    <div className='navbar bg-base-100 h-20 font-space border-b border-secondary'>
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
            className='menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52 text-base-content font-semibold border-2 border-neutral'
          >
            <li>
              <Link to='/GamePage' className='btn btn-ghost'>
                Games
              </Link>
            </li>
            <div className='divider divider-neutral my-1'></div>
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
          <Link to='/' className='btn btn-ghost text-3xl font-pixel'>
            GameOn Tap
          </Link>
        </div>
      </div>
      <div className='navbar-center hidden lg:flex text-2xl font-bold text-primary'>
        {location.pathname.includes('games') && gameTitles[location.pathname]}
      </div>
      {/* right */}
      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1 text-base-content font-semibold hidden lg:flex'>
          <li>
            <Link to='/GamePage' className='btn btn-ghost'>
              Games
            </Link>
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
        <li className='menu menu-horizontal px-1 text-base-content font-semibold'>
          {/* {loading ? (
            <div>
              <FaUserCircle className='text-3xl' />
            </div>
          ) : user ? (
            <Link to='/user' className='btn-ghost btn'>
              <FaUserCircle className='text-3xl' />
            </Link>
          ) : ( */}
          <Link to='/login' className='btn-outline btn'>
            Login
          </Link>
          {/* )} */}
        </li>
      </div>
    </div>
  );
};

export default Nav;
