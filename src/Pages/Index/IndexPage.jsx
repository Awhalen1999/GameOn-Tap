import React from 'react';
import Nav from '../MainNav';
import Hero from './Hero';
import GameList from './GameList';

const IndexPage = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <GameList />
    </div>
  );
};

export default IndexPage;
