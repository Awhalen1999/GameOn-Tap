import React from 'react';
import logo from '../../assets/logo-1.png';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className='footer items-center p-4 bg-neutral text-neutral-content'>
      <aside className='items-center grid-flow-col'>
        <img
          src={logo}
          width='26'
          height='26'
          alt='Logo'
          className='fill-current mx-2'
        />
        <p className='text-neutral-content font-medium'>
          Copyright © 2024 - All right reserved
        </p>
      </aside>
      <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end mr-2'>
        <p className='text-neutral-content font-medium'>Contact Me:</p>
        <a
          href='https://www.linkedin.com/in/alex-whalen-0496b227b/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-neutral-content'
          alt='LinkedIn'
        >
          <FaLinkedin size={24} className='fill-current' />
        </a>
        <a
          href='https://github.com/Awhalen1999'
          target='_blank'
          rel='noopener noreferrer'
          className='text-neutral-content'
          alt='GitHub'
        >
          <SiGithub size={24} className='fill-current' />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
