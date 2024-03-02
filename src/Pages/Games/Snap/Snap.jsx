// todo: change page heights form the card elements

import React, { useState, useEffect, useRef } from 'react';
import initialDeck from '../DeckOfCards';
import placeholderCard from '../../../cards/red.png';
import { GrPowerReset } from 'react-icons/gr';

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
  const [ruleSet, setRuleSet] = useState('value');
  const [autoReset, setAutoReset] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      let images = {};
      for (let card of initialDeck) {
        images[card] = (await import(`../../../cards/${card}.png`)).default;
      }
      setCardImages(images);
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (autoReset && deck.length === initialDeck.length) {
      drawCard();
    }
  }, [deck]);

  const resetDeck = () => {
    return new Promise((resolve) => {
      setDeck([...initialDeck]);
      setDrawnCards([]);
      setPreviousCardRank(null);
      resolve();
    });
  };

  const drawCard = async () => {
    if (deck.length === 0) {
      if (autoReset) {
        await resetDeck();
      } else {
        alert('No more cards in the deck!');
      }
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

  return (
    <div className='flex flex-col items-center justify-center bg-base-100'>
      {/* Delay slider */}
      <div className='mb-4'>
        <label>
          <input
            type='radio'
            value='value'
            checked={ruleSet === 'value'}
            onChange={(e) => setRuleSet(e.target.value)}
          />
          Value
        </label>
        <label>
          <input
            type='radio'
            value='suit'
            checked={ruleSet === 'suit'}
            onChange={(e) => setRuleSet(e.target.value)}
          />
          Suit
        </label>
      </div>
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
      <div className='flex items-center absolute bottom-0 left-0 m-4'>
        <button
          onClick={() => setAutoReset(!autoReset)}
          className={`btn mr-2 text-neutral-content ${
            autoReset
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          <GrPowerReset size={24} />
        </button>
        <button
          onClick={resetDeck}
          className={`btn text-neutral-content rounded ml-4 ${
            autoReset
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Reset Deck
        </button>
      </div>
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
            {(ruleSet === 'value' &&
              drawnCards[0].slice(0, -1) === previousCardRank) ||
            (ruleSet === 'suit' &&
              drawnCards[0].slice(-1) === previousCard.slice(-1)) ? (
              <p className='text-4xl mt-10'>SNAP!</p>
            ) : null}
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
