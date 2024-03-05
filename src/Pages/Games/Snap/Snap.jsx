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
  const [ruleSet, setRuleSet] = useState('suit');
  const [autoReset, setAutoReset] = useState(true);
  const [showSnap, setShowSnap] = useState(true);

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
    <div className='flex flex-col bg-base-100 h-full font-space'>
      {/* Delay slider and Draw Card button */}
      <div className='flex flex-col items-center mt-10'>
        {/* Delay slider */}
        <div className='mb-4 text-center'>
          <label htmlFor='delay' className='text-lg font-bold mb-2'>
            Delay (ms):
          </label>
          <input
            type='range'
            id='delay'
            min='0'
            max='3000'
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className='range range-primary'
          />
        </div>
        {/* Draw Card button */}
        <button
          onClick={drawCard}
          disabled={loading && delay > 175}
          className={`px-6 py-3 mb-8 text-lg text-white rounded ${
            loading && delay > 175
              ? 'animate-pulse bg-red-500 hover:bg-red-600 cursor-not-allowed'
              : 'bg-primary hover:bg-accent'
          }`}
        >
          Flip a Card
        </button>
      </div>
      {/* Radio buttons */}
      <div className='flex flex-col justify-center space-y-4 ml-4 absolute left-0 top-0 bottom-0'>
        <label className='flex items-center space-x-2 text-lg'>
          <input
            className='radio radio-primary'
            type='radio'
            value='suit'
            checked={ruleSet === 'suit'}
            onChange={(e) => setRuleSet(e.target.value)}
          />
          <span className='text-xl font-bold'>Suit</span>
        </label>
        <label className='flex items-center space-x-2 text-lg'>
          <input
            className='radio radio-primary'
            type='radio'
            value='value'
            checked={ruleSet === 'value'}
            onChange={(e) => setRuleSet(e.target.value)}
          />
          <span className='text-xl font-bold'>Value</span>
        </label>
      </div>
      {/* Card container */}
      <div className='flex flex-col items-center mt-10'>
        <div className='items-center '>
          {drawnCards.length > 0 ? (
            <div className='text-center'>
              <div className='relative flex items-center justify-center'>
                {previousCard && (
                  <img
                    src={cardImages[previousCard]}
                    alt={previousCard}
                    className='w-10/12 h-10/12 object-contain rounded shadow-lg absolute right-24 z-10 filter brightness-75'
                  />
                )}
                <img
                  src={cardImages[drawnCards[0]]}
                  alt={drawnCards[0]}
                  className='w-auto h-100 object-contain rounded shadow-lg z-20'
                />
              </div>
              {/* Display "SNAP!" if the new card is the same as the previous card */}
              {showSnap &&
              ((ruleSet === 'value' &&
                drawnCards[0].slice(0, -1) === previousCardRank) ||
                (ruleSet === 'suit' &&
                  previousCard &&
                  drawnCards[0].slice(-1) === previousCard.slice(-1))) ? (
                <p className='text-4xl font-bold mt-10 text-base-content'>
                  SNAP!
                </p>
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
      {/* Snap show */}
      <div className='absolute bottom-16 right-0 m-4 flex items-center'>
        <input
          type='checkbox'
          id='showSnap'
          checked={showSnap}
          onChange={(e) => setShowSnap(e.target.checked)}
          className='checkbox checkbox-primary'
        />
        <label htmlFor='showSnap' className='ml-2 text-lg font-bold'>
          Show "SNAP!" text
        </label>
      </div>
      {/* Reset Deck button */}
      <div className='absolute bottom-0 right-0 m-4 flex items-center'>
        <div className='tooltip' data-tip='Auto-reset deck'>
          <button
            onClick={() => setAutoReset(!autoReset)}
            className={`btn mr-2 ${
              autoReset
                ? 'btn-primary'
                : 'btn bg-gray-300 hover:bg-gray-400 text-black'
            }`}
          >
            <GrPowerReset size={24} />
          </button>
        </div>
        <button
          onClick={resetDeck}
          className={`btn ml-4 ${
            autoReset
              ? 'btn bg-gray-300 hover:bg-gray-400 text-black'
              : 'btn-primary'
          }`}
        >
          Reset Deck
        </button>
      </div>
    </div>
  );
};

export default Snap;
