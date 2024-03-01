import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeOptions from '../ThemeOptions';

const Nav = () => {
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'mydark'
  );
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', selectedTheme);
  }, [selectedTheme]);

  return (
    <div className='navbar bg-base-100 border-b border-secondary'>
      {/* left */}
      <div className='navbar-start'>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost lg:hidden text-base-content'
          >
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
            className='menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52 text-base-content font-semibold'
          >
            <li>
              <Link to='/GamePage'>Games</Link>
            </li>
            <li>
              <div
                className='dropdown relative'
                tabIndex={0}
                role='button'
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              >
                <div className='text-base-content'>
                  Theme
                  <svg
                    width='18px'
                    height='18px'
                    className='h-3 w-3 ml-2 fill-current inline-block'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 2048 2048'
                  >
                    <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                  </svg>
                </div>
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
        <div className='navbar bg-base-100'>
          <span className='font-bold text-xl text-base-content'>
            GameOn Tap
          </span>
        </div>
      </div>
      {/* center */}
      <div className='navbar-center hidden lg:flex'></div>
      {/* right */}
      <div className='navbar-end'>
        <ul className='menu menu-horizontal px-1 text-base-content font-semibold hidden lg:flex'>
          <li>
            <Link to='/GamePage' className='btn btn-ghost ml-2'>
              Games
            </Link>
          </li>
          <li>
            <div className='dropdown relative btn btn-ghost flex items-center justify-center ml-2'>
              <div tabIndex={0} role='button' className='text-base-content'>
                Theme
                <svg
                  width='18px'
                  height='18px'
                  className='h-3 w-3 ml-2 fill-current inline-block'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 2048 2048'
                >
                  <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
                </svg>
              </div>
              <ThemeOptions
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            </div>
          </li>
        </ul>
        <li className='menu menu-horizontal px-1 text-base-content font-semibold'>
          <a className=' btn-outline btn ml-2'>Login</a>
        </li>
      </div>
    </div>
  );
};

export default Nav;
