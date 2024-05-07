import React, { useContext } from 'react';
import { UserContext } from '../utils/UserContext';

const UserPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='flex flex-col items-center justify-center h-full bg-base-100'>
      <h1 className='text-4xl font-bold mb-8 text-secondary'>User Page</h1>
      <div className='bg-primary rounded p-8 mb-4 text-primary-content text-lg'>
        <p className='mb-2'>
          <span className='font-bold '>ID:</span> {user.id}
        </p>
        <p className='mb-2 '>
          <span className='font-bold '>Username:</span> {user.username}
        </p>
        <p className='mb-2'>
          <span className='font-bold '>Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserPage;
