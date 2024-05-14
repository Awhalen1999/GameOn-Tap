import React from 'react';
import { LuPartyPopper } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';

const Alert = ({ visible, setVisible, title, message }) => {
  if (!visible) return null;

  return (
    <div className='flex items-center h-16 border border-primary pr-4 w-full max-w-md  rounded-lg mx-auto'>
      <div className='flex items-center justify-center bg-primary w-12 h-full rounded-l text-primary-content'>
        <LuPartyPopper size={24} />
      </div>
      <div className='px-6'>
        <h5 className='font-semibold'>{title}</h5>
        <p className='text-sm'>{message}</p>
      </div>
      <button className='ml-auto' onClick={() => setVisible(false)}>
        <IoCloseSharp size={24} />
      </button>
    </div>
  );
};

export default Alert;
