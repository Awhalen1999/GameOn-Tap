import React, { useState, useEffect } from 'react';
import placeholderImage from './assets/red.png';

const DeckOfCards = () => {
  const initialDeck = [
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    '10H',
    'JH',
    'QH',
    'KH',
    'AH',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    '10D',
    'JD',
    'QD',
    'KD',
    'AD',
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    '10C',
    'JC',
    'QC',
    'KC',
    'AC',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    '10S',
    'JS',
    'QS',
    'KS',
    'AS',
  ];

  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      let images = {};
      for (let card of initialDeck) {
        images[card] = (await import(`./assets/${card}.png`)).default;
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <button
        onClick={drawCard}
        className='px-4 py-2 mb-4 text-white bg-orange-500 rounded hover:bg-orange-600'
      >
        Draw a Card
      </button>
      <button
        onClick={resetDeck}
        className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 absolute top-0 left-0 m-4'
      >
        Reset Deck
      </button>
      <div>
        {drawnCards.length > 0 && (
          <h2 className='mb-4 text-2xl font-bold text-gray-700'>Drawn Card:</h2>
        )}
        <h3 className='mb-4 text-xl font-bold text-gray-600 absolute top-0 m-4'>
          Remaining Kings:{' '}
          <span className={remainingKings === 1 ? 'text-red-500' : ''}>
            {remainingKings}
          </span>
        </h3>
        {drawnCards.length > 0 ? (
          <div>
            <img
              src={cardImages[drawnCards[0]]}
              alt={drawnCards[0]}
              className='w-full h-full object-cover rounded shadow-lg'
            />
          </div>
        ) : (
          <div>
            <img
              src={placeholderImage}
              alt='Placeholder'
              className='w-full h-full object-cover rounded shadow-lg'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckOfCards;
