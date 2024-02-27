// todo: change page heights form the card element
// todo: add start game element (set the delay to 0 automatically for this to work)
// todo: auto refresh deck button <-

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import initialDeck from '../DeckOfCards';
import placeholderCard from '../../cards/red.png';

const Snap = () => {
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [previousCardRank, setPreviousCardRank] = useState(null);
  const [cardImages, setCardImages] = useState({});
  const [delay, setDelay] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();
  const [previousCard, setPreviousCard] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      let images = {};
      for (let card of initialDeck) {
        images[card] = (await import(`../../cards/${card}.png`)).default;
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
    setLoading(true);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100);
    }, 100);
    setTimeout(() => {
      clearInterval(intervalRef.current);
      const randomIndex = Math.floor(Math.random() * deck.length);
      const drawnCard = deck[randomIndex];
      setDeck((prevDeck) => prevDeck.filter((card) => card !== drawnCard));
      setPreviousCardRank(drawnCards[0] && drawnCards[0].slice(0, -1));
      setPreviousCard(drawnCards[0]);
      setDrawnCards([drawnCard]);
      setLoading(false);
    }, delay);
  };

  const resetDeck = () => {
    setDeck([...initialDeck]);
    setDrawnCards([]);
    setPreviousCardRank(null);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-indigo-200'>
      {/* Delay slider */}
      <div className='mb-4'>
        <label htmlFor='delay' className='mr-2'>
          Delay (ms):
        </label>
        <input
          type='range'
          id='delay'
          min='0'
          max='5000'
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
      </div>
      {/* Draw Card button */}
      <button
        onClick={drawCard}
        disabled={loading && delay > 175}
        className={`px-6 py-3 mb-8 text-lg text-white rounded ${
          loading && delay > 175
            ? 'animate-pulse bg-red-500 hover:bg-red-600 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        Flip a Card
      </button>
      {/* Reset Deck button */}
      <button
        onClick={resetDeck}
        className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 absolute bottom-0 right-0 m-4'
      >
        Reset Deck
      </button>
      {/* Card container */}
      <div className='items-center '>
        {drawnCards.length > 0 ? (
          <div className='text-center'>
            <div className='relative flex items-center justify-center'>
              {previousCard && (
                <img
                  src={cardImages[previousCard]}
                  alt={previousCard}
                  className='w-10/12 h-10/12 object-contain rounded shadow-lg absolute top-24 z-10 filter brightness-75'
                />
              )}
              <img
                src={cardImages[drawnCards[0]]}
                alt={drawnCards[0]}
                className='w-auto h-100 object-contain rounded shadow-lg z-20'
              />
            </div>
            {/* Display "SNAP!" if the new card is the same as the previous card */}
            {drawnCards[0].slice(0, -1) === previousCardRank && (
              <p className='text-4xl mt-10'>SNAP!</p>
            )}
          </div>
        ) : (
          <div>
            <img
              src={placeholderCard}
              alt='Placeholder'
              className='w-auto h-100 object-contain rounded shadow-lg'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Snap;
