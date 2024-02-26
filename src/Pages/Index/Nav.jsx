// todo: update look in css for media q menu
// todo: close button for burger menu
// todo: change hero to more retro look
// todo: add local storage to save theme

import './Nav.css';
import react, { useState } from 'react';

const Nav = () => {
  const [selectedTheme, setSelectedTheme] = useState('mydark');

  return (
    <div className='navbar bg-base-100 border-b border-secondary'>
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
            className='menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <div className='dropdown relative'>
                <div tabIndex={0} role='button'>
                  Parent
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
                <ul
                  tabIndex={0}
                  className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 absolute top-full left-[calc(-16px)] mt-1'
                >
                  <li>
                    <a
                      className='btn btn-sm btn-block btn-ghost justify-start'
                      onClick={() => setSelectedMenu('submenu1')}
                    >
                      Submenu 1
                    </a>
                  </li>
                  <li>
                    <a
                      className='btn btn-sm btn-block btn-ghost justify-start'
                      onClick={() => setSelectedMenu('submenu2')}
                    >
                      Submenu 2
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <a className='btn btn-ghost text-xl'>GameOn Tap</a>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <a>Item 1</a>
          </li>

          <li>
            <a>Item 2</a>
          </li>
          <li>
            <div className='dropdown relative'>
              <div tabIndex={0} role='button'>
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
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 absolute top-full left-[calc(-16px)] mt-1'
              >
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Dark'
                    value='mydark'
                    checked={selectedTheme === 'mydark'}
                    onChange={() => setSelectedTheme('mydark')}
                  />
                </li>
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Light'
                    value='mylight'
                    checked={selectedTheme === 'mylight'}
                    onChange={() => setSelectedTheme('mylight')}
                  />
                </li>
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Retro'
                    value='retro'
                    checked={selectedTheme === 'retro'}
                    onChange={() => setSelectedTheme('retro')}
                  />
                </li>
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Cyberpunk'
                    value='cyberpunk'
                    checked={selectedTheme === 'cyberpunk'}
                    onChange={() => setSelectedTheme('cyberpunk')}
                  />
                </li>
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Coffee'
                    value='coffee'
                    checked={selectedTheme === 'coffee'}
                    onChange={() => setSelectedTheme('coffee')}
                  />
                </li>
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Aqua'
                    value='aqua'
                    checked={selectedTheme === 'aqua'}
                    onChange={() => setSelectedTheme('aqua')}
                  />
                </li>
                <li>
                  <input
                    type='radio'
                    name='theme-dropdown'
                    className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
                    aria-label='Synthwave'
                    value='synthwave'
                    checked={selectedTheme === 'synthwave'}
                    onChange={() => setSelectedTheme('synthwave')}
                  />
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        <a className='btn btn-outline btn-secondary'>Login</a>
      </div>
    </div>
  );
};

export default Nav;
