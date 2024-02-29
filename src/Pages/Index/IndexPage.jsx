import React from 'react';
import Nav from './Nav';
import Hero from './Hero';
import GameList from './GameList';
import Footer from './Footer';

const IndexPage = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <GameList />
      <Footer />
    </div>
  );
};

export default IndexPage;
