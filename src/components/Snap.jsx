import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import initialDeck from './DeckOfCards';
import placeholderCard from '../assets/red.png';

const Snap = () => {
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});
  const [delay, setDelay] = useState(1000); // Delay in milliseconds
  const [loading, setLoading] = useState(false); // Loading state
  const [progress, setProgress] = useState(0); // Progress state
  const intervalRef = useRef(); // Reference to store interval ID

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
      setDrawnCards([drawnCard]);
      setLoading(false);
    }, delay);
  };

  const resetDeck = () => {
    setDeck([...initialDeck]);
    setDrawnCards([]);
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
        className='px-6 py-3 mb-8 text-lg text-white bg-orange-500 rounded hover:bg-orange-600'
      >
        Flip a Card
      </button>
      {/* Loading message */}
      {loading && <p>Flipping card...</p>}
      {/* Progress bar */}
      {loading && (
        <progress value={progress} max={delay} className='w-full h-2 mb-4' />
      )}
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
      {/* Card container */}
      {drawnCards.length > 0 ? (
        <div>
          <img
            src={cardImages[drawnCards[0]]}
            alt={drawnCards[0]}
            className='w-auto h-100 object-contain rounded shadow-lg'
          />
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
  );
};

export default Snap;
