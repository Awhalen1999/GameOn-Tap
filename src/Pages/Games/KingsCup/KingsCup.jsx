import React, { useState, useEffect, useContext } from 'react';
import placeholderCard from '../../../assets/red.png';
import initialDeck from '../DeckOfCards.jsx';
import { FaInfoCircle } from 'react-icons/fa';
import { getActiveRuleset } from '../../../utils/api.js';
import { UserContext } from '../../../utils/UserContext.jsx';

const KingsCup = () => {
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});
  const [hideRules, setHideRules] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const remainingKings = deck.filter((card) => card.includes('K')).length;
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const gameId = 'KingsCup';
  const [activeRuleset, setActiveRuleset] = useState(null);
  const [currentRule, setCurrentRule] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const loadImages = async () => {
      let images = {};
      for (let card of initialDeck) {
        images[card] = (await import(`../../../assets/${card}.png`)).default;
      }
      setCardImages(images);
    };
    loadImages();

    // Fetch the active ruleset for the user and game
    getActiveRuleset(userId, gameId)
      .then((ruleset) => {
        setActiveRuleset(ruleset);
      })
      .catch((error) => {
        console.error('Error fetching active ruleset:', error);
      });
  }, [userId, gameId]);

  // Draw a card from the deck
  const drawCard = () => {
    if (deck.length === 0) {
      setShowAlert(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];

    // Extract the rank of the card
    const cardRank = drawnCard.slice(0, -1);

    // Get the rule for the drawn card
    let rule = activeRuleset?.rules[cardRank];

    // Check for special rules
    if (drawnCard === 'AS') {
      rule = activeRuleset?.rules['AS'];
    } else if (drawnCard.includes('K') && remainingKings === 1) {
      rule = activeRuleset?.rules['LastK'];
    }

    setCurrentRule(rule);

    setDeck((prevDeck) => prevDeck.filter((card) => card !== drawnCard));
    setDrawnCards([drawnCard]);
  };

  // Reset the deck
  const resetDeck = () => {
    setDeck([...initialDeck]);
    setDrawnCards([]);
    setCurrentRule({ title: '', description: '' });
  };

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
      <div
        className={`flex flex-col ${
          hideRules ? 'md:items-center' : ''
        } justify-center`}
      >
        {/* Grid container for the card and the rules */}
        <div
          className={`flex flex-col md:flex-row justify-center items-center gap-8 ${
            hideRules ? 'md:justify-center' : ''
          }`}
        >
          <div>
            {/* Card container */}
            {drawnCards.length > 0 && (
              <h2 className='mb-2 text-2xl font-bold text-base-content text-center'>
                Drawn Card
              </h2>
            )}
            {drawnCards.length > 0 ? (
              <div className='mb-4 md:mb-0'>
                <img
                  src={cardImages[drawnCards[0]]}
                  alt={drawnCards[0]}
                  className='w-auto h-100 object-contain shadow-lg'
                />
              </div>
            ) : (
              <div className='mb-4 md:mb-0 md:mr-4'>
                <img
                  src={placeholderCard}
                  alt='Placeholder'
                  className='w-auto h-100 object-contain shadow-lg'
                />
              </div>
            )}
          </div>
          {/* Rule container */}
          {!hideRules && drawnCards.length > 0 && (
            <div className='w-64 h-auto p-4 bg-neutral rounded shadow-lg border border-secondary'>
              <h3 className='text-xl font-bold text-neutral-content text-center'>
                {currentRule.title} {/* Display the rule title */}
              </h3>
              <div className='divider'></div>
              <p className='mt-2 text-neutral-content text-lg'>
                {currentRule.description} {/* Display the rule description */}
              </p>
            </div>
          )}
        </div>
        {/* Hide Rules checkbox */}
        <div className='form-control fixed bottom-16 right-4'>
          <label className='label cursor-pointer'>
            <span className='label-text mr-2'>Hide Rules</span>
            <input
              type='checkbox'
              checked={hideRules}
              onChange={() => setHideRules(!hideRules)}
              className='checkbox checkbox-primary'
            />
          </label>
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
