import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholderCard from '../assets/red.png';
import rules from './KingsCupRules.js';
import initialDeck from './DeckOfCards.jsx';

const KingsCup = () => {
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      let images = {};
      for (let card of initialDeck) {
        images[card] = (await import(`../assets/${card}.png`)).default;
      }
      setCardImages(images);
    };
    loadImages();
  }, []);

  const drawCard = () => {
    if (deck.length === 0) {
      alert('No more cards in the deck!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];
    setDeck((prevDeck) => prevDeck.filter((card) => card !== drawnCard));
    setDrawnCards([drawnCard]);
  };

  const resetDeck = () => {
    setDeck([...initialDeck]);
    setDrawnCards([]);
  };

  const remainingKings = deck.filter((card) => card.includes('K')).length;

  return (
    // Main container
    <div className='flex flex-col items-center justify-center h-screen bg-indigo-200'>
      {/* Draw Card button */}
      <button
        onClick={drawCard}
        className='px-4 py-2 mb-4 text-white bg-orange-500 rounded hover:bg-orange-600'
      >
        Draw a Card
      </button>
      {/* Reset Deck button */}
      <button
        onClick={resetDeck}
        className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 absolute top-0 right-0 m-4'
      >
        Reset Deck
      </button>
      {/* Link to home page button */}
      <Link
        to='/'
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 absolute top-0 left-0 m-4'
      >
        Return to Home
      </Link>
      {/* Drawn Card title */}
      {drawnCards.length > 0 && (
        <h2 className='mb-4 text-2xl font-bold text-gray-700'>Drawn Card:</h2>
      )}
      {/* Remaining Kings counter */}
      <h3 className='mb-4 text-xl font-bold text-gray-600 absolute top-0 m-4'>
        Remaining Kings:{' '}
        <span className={remainingKings === 1 ? 'text-red-500' : ''}>
          {remainingKings}
        </span>
      </h3>
      {/* Grid container for the card and the rules */}
      <div className='grid grid-cols-3 gap-4 items-center justify-items-center'>
        {/* Card container */}
        {drawnCards.length > 0 ? (
          <div className='col-start-2'>
            <img
              src={cardImages[drawnCards[0]]}
              alt={drawnCards[0]}
              className='w-auto h-100 object-contain rounded shadow-lg'
            />
          </div>
        ) : (
          <div className='col-start-2'>
            <img
              src={placeholderCard}
              alt='Placeholder'
              className='w-auto h-100 object-contain rounded shadow-lg'
            />
          </div>
        )}
        {/* Rule container */}
        {drawnCards.length > 0 && (
          <div className='w-64 h-auto p-4 bg-white rounded shadow-lg ml-4 col-start-3'>
            <h3 className='text-lg font-bold text-gray-700'>
              {drawnCards[0] === 'AS'
                ? rules['AS'].title
                : rules[drawnCards[0].slice(0, -1)].title}
            </h3>
            <p className='mt-2 text-gray-600'>
              {drawnCards[0] === 'AS'
                ? rules['AS'].description
                : rules[drawnCards[0].slice(0, -1)].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KingsCup;
