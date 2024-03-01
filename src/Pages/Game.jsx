import React from 'react';
import { Outlet } from 'react-router-dom';
import GameNav from './GameNav';

const Game = () => {
  return (
    <div className='h-screen'>
      <GameNav />
      <Outlet />
    </div>
  );
};

export default Game;
