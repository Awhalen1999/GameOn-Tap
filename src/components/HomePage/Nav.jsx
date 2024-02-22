//todo: update look in css for media q menu

import React from 'react';
import './Nav.css';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Nav = () => {
  return (
    <header>
      <nav className='font-main fixed w-full z-20 top-0 left-0 border-b'>
        <ul className=' max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
          <a className='logo' href='#'>
            <h3 className='font-bold text-2xl text-white'>GameOn Tap</h3>
          </a>
          <input type='checkbox' id='check' />

          <span className='menu flex items-center [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg [&>li>a]:text-white'>
            <li>
              <a
                href='#'
                className='p-2 hover:bg-white hover:text-black rounded'
              >
                Games
              </a>
            </li>
            <li>
              <a
                href='#'
                className='p-2 hover:bg-white hover:text-black rounded'
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
              <button className='bg-gray-900 text-xl text-white rounded p-2 hover:bg-white hover:text-black transition duration-200'>
                <MdOutlineDarkMode />
              </button>
            </li>
            <li>
              <button className='bg-gray-900 text-xl text-white rounded p-2 hover:bg-white hover:text-black transition duration-200'>
                <MdOutlineLightMode />
              </button>
            </li>
          </span>
          <label htmlFor='check' className='open-menu text-lg text-white'>
            <HiOutlineMenuAlt3 />
          </label>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
