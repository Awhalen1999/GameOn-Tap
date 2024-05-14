import React from 'react';
import { LuPartyPopper } from 'react-icons/lu';

const Alert = ({ visible, setVisible, title, message }) => {
  if (!visible) return null;

  return (
    <div className='flex items-center h-16 border border-primary pr-4 w-full max-w-md shadow-lg'>
      <div className='flex items-center justify-center bg-primary w-12 h-full'>
        <LuPartyPopper />
      </div>
      <div className='px-6'>
        <h5 className='font-semibold'>{title}</h5>
        <p className='text-sm'>{message}</p>
      </div>
      <button className='ml-auto' onClick={() => setVisible(false)}>
        <svg
          className='w-4 h-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
