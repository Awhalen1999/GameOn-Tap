import React from 'react';
import { Outlet } from 'react-router-dom';
import GameNav from './GameNav';

const Game = () => (
  <div>
    <GameNav />
    <Outlet />
  </div>
);

export default Game;
