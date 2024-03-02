// remove console logs when done
// continue cleaning up input section
// todo: change game rules option

import React, { useState, useEffect } from 'react';
import placeholderCard from '../../../cards/red.png';
import initialDeck from '../DeckOfCards.jsx';
import { FaArrowDown } from 'react-icons/fa';

const RideTheBus = () => {
  const [number, setNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});
  const [guessStatus, setGuessStatus] = useState('');
  const [ruleSet, setRuleSet] = useState('higher/lower');

  useEffect(() => {
    if (guessStatus !== '') {
      const timer = setTimeout(() => {
        setGuessStatus('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [guessStatus]);

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

  const drawCard = () => {
    console.log('deck:', deck);
    if (deck.length === 0) {
      setDeck([...initialDeck]);
      return;
    }
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];
    setDeck((prevDeck) => prevDeck.filter((card) => card !== drawnCard));
    setDrawnCards([drawnCard]);
    return drawnCard;
  };

  const getColorClass = (number) => {
    if (number >= 1 && number <= 4) {
      return 'text-blue-600';
    } else if (number >= 5 && number <= 6) {
      return 'text-yellow-600';
    } else if (number >= 7 && number <= 8) {
      return 'text-red-600';
    } else {
      return 'text-black';
    }
  };

  const compareCards = (card1, card2) => {
    const ranks = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];
    const rank1 = ranks.indexOf(card1.slice(0, -1));
    const rank2 = ranks.indexOf(card2.slice(0, -1));
    if (rank2 < rank1) {
      return 'lower';
    } else if (rank2 > rank1) {
      return 'higher';
    } else {
      return 'equal';
    }
  };

  const getCardColor = (card) => {
    const suit = card.slice(-1);
    if (suit === 'H' || suit === 'D') {
      return 'red';
    } else if (suit === 'S' || suit === 'C') {
      return 'black';
    }
  };

  const checkGameEnd = (newDrawnCards) => {
    if (newDrawnCards.length === parseInt(number) + 1) {
      handleWin();
    }
  };

  const handleWin = () => {
    alert('You won!');
    resetGame();
  };

  const handleRuleSetChange = (event) => {
    setRuleSet(event.target.value);
  };

  const handleLowerClick = () => {
    const newCard = drawCard();
    if (newCard && drawnCards.length > 0) {
      const result = compareCards(drawnCards[drawnCards.length - 1], newCard);
      if (result === 'lower') {
        const newDrawnCards = [...drawnCards, newCard];
        setDrawnCards(newDrawnCards);
        setGuessStatus('correct');
        checkGameEnd(newDrawnCards);
      } else {
        setGuessStatus('incorrect');
      }
    }
  };

  const handleEqualClick = () => {
    const newCard = drawCard();
    if (newCard && drawnCards.length > 0) {
      const result = compareCards(drawnCards[drawnCards.length - 1], newCard);
      if (result === 'equal') {
        const newDrawnCards = [...drawnCards, newCard];
        setDrawnCards(newDrawnCards);
        setGuessStatus('correct');
        checkGameEnd(newDrawnCards);
      } else {
        setGuessStatus('incorrect');
      }
    }
  };

  const handleHigherClick = () => {
    const newCard = drawCard();
    if (newCard && drawnCards.length > 0) {
      const result = compareCards(drawnCards[drawnCards.length - 1], newCard);
      if (result === 'higher') {
        const newDrawnCards = [...drawnCards, newCard];
        setDrawnCards(newDrawnCards);
        setGuessStatus('correct');
        checkGameEnd(newDrawnCards);
      } else {
        setGuessStatus('incorrect');
      }
    }
  };
  const handleRedClick = () => {
    const newCard = drawCard();
    if (newCard) {
      const color = getCardColor(newCard);
      if (color === 'red') {
        const newDrawnCards = [...drawnCards, newCard];
        setDrawnCards(newDrawnCards);
        setGuessStatus('correct');
        checkGameEnd(newDrawnCards);
      } else {
        setGuessStatus('incorrect');
      }
    }
  };

  const handleBlackClick = () => {
    const newCard = drawCard();
    if (newCard) {
      const color = getCardColor(newCard);
      if (color === 'black') {
        const newDrawnCards = [...drawnCards, newCard];
        setDrawnCards(newDrawnCards);
        setGuessStatus('correct');
        checkGameEnd(newDrawnCards);
      } else {
        setGuessStatus('incorrect');
      }
    }
  };

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const resetGame = () => {
    setGameStarted(false);
    setNumber(1);
  };

  return (
    <div
      className={`game-container transition-colors duration-500 ease-out ${
        guessStatus === 'correct'
          ? 'bg-green-200'
          : guessStatus === 'incorrect'
          ? 'bg-red-200'
          : ''
      }`}
    >
      <div className='flex flex-col'>
        {/* Reset game button */}
        <div className='absolute bottom-0 right-0 m-4'>
          <button
            onClick={resetGame}
            className='px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600'
          >
            Reset Game
          </button>
        </div>

        {!gameStarted ? (
          // Game start form
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setGameStarted(true);
              drawCard();
            }}
            className='flex flex-col items-center justify-center flex-grow'
          >
            <label className='mb-4 text-2xl font-extrabold flex items-center'>
              Choose a number between 1 and 8:
              <div className='flex items-center ml-4'>
                <button
                  type='button'
                  onClick={() => setNumber((prev) => Math.max(prev - 1, 1))}
                  className='bg-gray-200 p-2 rounded-l-md'
                >
                  -
                </button>
                <input
                  type='number'
                  min='1'
                  max='8'
                  value={number}
                  onChange={handleChange}
                  className={`mx-0 w-12 text-center text-xl font-bold ${getColorClass(
                    number
                  )}`}
                />
                <button
                  type='button'
                  onClick={() => setNumber((prev) => Math.min(prev + 1, 8))}
                  className='bg-gray-200 p-2 rounded-r-md'
                >
                  +
                </button>
              </div>
            </label>
            <div className='mb-4'>
              <label>
                <input
                  type='radio'
                  value='higher/lower'
                  checked={ruleSet === 'higher/lower'}
                  onChange={handleRuleSetChange}
                />
                Higher/Lower
              </label>
              <label>
                <input
                  type='radio'
                  value='red/black'
                  checked={ruleSet === 'red/black'}
                  onChange={handleRuleSetChange}
                />
                Red/Black
              </label>
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl'
            >
              Start Game
            </button>
          </form>
        ) : (
          // Placeholder cards
          <div className='flex flex-col items-center justify-center flex-grow'>
            <div className='flex justify-center'>
              <div className='flex justify-center items-end'>
                {drawnCards.map((card, index) => (
                  <div key={index} className='mx-2 relative'>
                    {index === drawnCards.length - 1 && (
                      <FaArrowDown className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-4xl' />
                    )}
                    <img
                      src={cardImages[card] || placeholderCard}
                      alt={card}
                      className='h-64'
                    />
                  </div>
                ))}

                {[...Array(parseInt(number) - drawnCards.length)].map(
                  (_, index) => (
                    <div
                      key={index + drawnCards.length}
                      className='mx-2 relative'
                    >
                      <img
                        src={placeholderCard}
                        alt='placeholder card'
                        className='h-64'
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className='mt-12 flex flex-col items-center justify-center'>
              <p className='text-center text-xl font-bold mb-6'>
                You are on card {drawnCards.length} of {number}.
              </p>
              <p className='text-center text-xl font-bold mb-6'>
                Will the next card be lower, equal, or higher than{' '}
                {drawnCards[drawnCards.length - 1]}?
              </p>
              <div className='flex justify-center'>
                {ruleSet === 'higher/lower' ? (
                  <>
                    <button
                      onClick={handleLowerClick}
                      className='mx-8 px-6 py-3 text-lg text-white bg-blue-500 rounded transform hover:scale-105 transition-transform duration-200 hover:bg-blue-600'
                    >
                      Lower
                    </button>
                    <button
                      onClick={handleEqualClick}
                      className='mx-8 px-6 py-3 text-lg text-white bg-yellow-400 rounded transform hover:scale-105 transition-transform duration-200 hover:bg-yellow-500 '
                    >
                      Equal
                    </button>
                    <button
                      onClick={handleHigherClick}
                      className='mx-8 px-6 py-3 text-lg text-white bg-red-500 rounded transform hover:scale-105 transition-transform duration-200 hover:bg-red-600'
                    >
                      Higher
                    </button>
                  </>
                ) : (
                  // Red/Black buttons
                  <>
                    <button
                      onClick={handleRedClick}
                      className='mx-8 px-6 py-3 text-lg text-white bg-red-500 rounded transform hover:scale-105 transition-transform duration-200 hover:bg-red-600'
                    >
                      Red
                    </button>
                    <button
                      onClick={handleBlackClick}
                      className='mx-8 px-6 py-3 text-lg text-white bg-black rounded transform hover:scale-105 transition-transform duration-200 hover:bg-gray-800'
                    >
                      Black
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideTheBus;
