import React, { useState, useEffect } from 'react';
import placeholderCard from '../../../cards/red.png';
import KingsCupRules from './KingsCupRules.js';
import initialDeck from '../DeckOfCards.jsx';
import { FaInfoCircle } from 'react-icons/fa';
import useActiveRuleset from '../../UseActiveRuleset.js';

const KingsCup = (props) => {
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});
  const [rules, setRules] = useState({});
  const activeRuleset = useActiveRuleset('KingsCup');

  useEffect(() => {
    const loadImages = async () => {
      let images = {};
      for (let card of initialDeck) {
        images[card] = (await import(`../../../cards/${card}.png`)).default;
      }
      setCardImages(images);
    };
    loadImages();

    if (activeRuleset) {
      setRules(activeRuleset.rules);
    } else {
      setRules(KingsCupRules);
    }
  }, [activeRuleset]);

  const [showAlert, setShowAlert] = useState(false);

  const drawCard = () => {
    if (deck.length === 0) {
      setShowAlert(true);
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

  console.log('drawnCards:', drawnCards);

  return (
    <div className='bg-base-100 h-full font-space'>
      {/* alert */}
      {showAlert && (
        <div
          role='alert'
          className='alert w-[90vw] mx-auto border border-base-content mt-2'
        >
          <FaInfoCircle />
          <span className='text-lg'>No more cards in the deck!</span>
          <div>
            <button
              className='btn btn-ghost'
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
            <button
              className='btn btn-ghost ml-2'
              onClick={() => {
                resetDeck();
                setShowAlert(false);
              }}
            >
              Reset Deck
            </button>
          </div>
        </div>
      )}
      {/* Remaining Kings counter */}
      <div className='flex justify-center'>
        <h3 className='text-xl font-bold text-base-content m-4 mb-4'>
          Remaining Kings:{' '}
          <span className={remainingKings === 1 ? 'text-error' : ''}>
            {remainingKings}
          </span>
        </h3>
      </div>
      {/* Draw Card button */}
      <div className='flex justify-center'>
        <button onClick={drawCard} className='btn btn-primary btn-lg mb-14'>
          Draw a Card
        </button>
      </div>
      {/* Drawn Card title */}
      <div className='flex flex-col items-center justify-center'>
        {drawnCards.length > 0 && (
          <h2 className='mb-2 text-2xl font-bold text-base-content'>
            Drawn Card:
          </h2>
        )}
        {/* Grid container for the card and the rules */}
        <div className='flex justify-center'>
          <div>
            {/* Card container */}
            {drawnCards.length > 0 ? (
              <div className='col-start-2'>
                <img
                  src={cardImages[drawnCards[0]]}
                  alt={drawnCards[0]}
                  className='w-auto h-100 object-contain shadow-lg'
                />
              </div>
            ) : (
              <div className='col-start-2'>
                <img
                  src={placeholderCard}
                  alt='Placeholder'
                  className='w-auto h-100 object-contain shadow-lg'
                />
              </div>
            )}
          </div>
          {/* Rule container */}
          {drawnCards.length > 0 && (
            <div className='absolute right-[16vw]'>
              <div className='w-64 h-auto p-4 bg-neutral rounded shadow-lg ml-auto col-start-3 border border-secondary mr-10'>
                <h3 className='text-xl font-bold text-neutral-content text-center'>
                  {drawnCards[0] === 'AS'
                    ? (console.log('AS title:', activeRuleset['AS'].title),
                      activeRuleset['AS'].title)
                    : drawnCards[0].includes('K') && remainingKings === 0
                    ? 'Last King'
                    : activeRuleset && activeRuleset[drawnCards[0].slice(0, -1)]
                    ? (console.log(
                        'title:',
                        activeRuleset[drawnCards[0].slice(0, -1)].title
                      ),
                      activeRuleset[drawnCards[0].slice(0, -1)].title)
                    : ''}
                </h3>
                <div className='divider'></div>
                <p className='mt-2 text-neutral-content text-lg'>
                  {drawnCards[0] === 'AS'
                    ? (console.log(
                        'AS description:',
                        activeRuleset['AS'].description
                      ),
                      activeRuleset['AS'].description)
                    : drawnCards[0].includes('K') && remainingKings === 0
                    ? 'The person who draws the last King must drink the entire King’s Cup.'
                    : activeRuleset && activeRuleset[drawnCards[0].slice(0, -1)]
                    ? (console.log(
                        'description:',
                        activeRuleset[drawnCards[0].slice(0, -1)].description
                      ),
                      activeRuleset[drawnCards[0].slice(0, -1)].description)
                    : ''}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Reset Deck button */}
        <button
          onClick={resetDeck}
          className='btn btn-success fixed bottom-0 right-0 m-4'
        >
          Reset Deck
        </button>
      </div>
    </div>
  );
};

export default KingsCup;
