// todo: update look in css for media q menu
// todo: close button for burger menu

import { useState } from 'react';
import './Nav.css';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Nav = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header>
      <nav className='font-main w-full top-0 border-b bg-black'>
        <ul className=' max-w-[90vw] flex flex-wrap justify-between items-center mx-auto py-8'>
          <a className='logo' href='#'>
            <h3 className='font-bold text-2xl text-white'>GameOn Tap</h3>
          </a>
          <input type='checkbox' id='check' />
          <div className='flex items-center space-x-4'>
            <li>
              <a
                href='#'
                className='p-2 hover:bg-white hover:text-black border border-transparent rounded-btn'
              >
                Games
              </a>
            </li>
            <li>
              <a
                href='#'
                className='p-2 hover:bg-white hover:text-black rounded border border-transparent'
              >
                About
              </a>
            </li>
            <li>
              <a
                href='#'
                className='border border-white border-solid p-2 rounded hover:bg-white hover:text-black'
              >
                Login
              </a>
            </li>

            <li>
              <button
                className='bg-gray-900 text-xl text-white rounded p-2 hover:bg-white hover:text-black transition duration-200'
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
              </button>
            </li>
          </div>
          <label htmlFor='check' className='open-menu text-lg text-white'>
            <HiOutlineMenuAlt3 />
          </label>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
