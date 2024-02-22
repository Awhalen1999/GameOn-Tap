import React from 'react';
import './Nav.css';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Nav = () => {
  return (
    <header>
      <nav className=' fixed w-full z-20 top-0 left-0 border-b border-gray-900'>
        <ul className='navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
          <a className='logo' href='#'>
            <h3 className='font-bold text-2xl text-white'>GameOn Tap</h3>
          </a>
          <input type='checkbox' id='check' />

          <span className='menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg [&>li>a]:text-white'>
            <li>
              <a href='#'>Games</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Login</a>
            </li>
            <li>
              <button className='bg-gray-900 text-lg text-white rounded p-2 hover:bg-gray-600 transition duration-200'>
                <MdOutlineDarkMode />
              </button>
            </li>
            <li>
              <button className='bg-gray-900 text-lg text-white rounded p-2 hover:bg-gray-600 transition duration-200'>
                <MdOutlineLightMode />
              </button>
            </li>
            <label htmlFor='check' className='close-menu'>
              X
            </label>
          </span>
          <label htmlFor='check' className='open-menu'>
            <HiOutlineMenuAlt3 />
          </label>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
