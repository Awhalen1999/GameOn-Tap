import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import placeholderCard from './assets/red.png';
import initialDeck from './DeckOfCards.jsx';

const RideTheBus = () => {
  const [number, setNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});

  // Load card images
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

  // Draw card function
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

  // Function to compare the ranks of two cards
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
    if (rank1 < rank2) {
      return 'lower';
    } else if (rank1 > rank2) {
      return 'higher';
    } else {
      return 'equal';
    }
  };

  // Button click handlers
  const handleLowerClick = () => {
    const newCard = drawCard();
    if (newCard && drawnCards.length > 0) {
      const result = compareCards(drawnCards[drawnCards.length - 1], newCard);
      if (result !== 'lower') {
        setDrawnCards([...drawnCards, newCard]);
      } else {
        // Handle incorrect guess...
      }
    }
  };

  const handleEqualClick = () => {
    const newCard = drawCard();
    if (newCard && drawnCards.length > 0) {
      const result = compareCards(drawnCards[drawnCards.length - 1], newCard);
      if (result !== 'equal') {
        setDrawnCards([...drawnCards, newCard]);
      } else {
        // Handle incorrect guess...
      }
    }
  };

  const handleHigherClick = () => {
    const newCard = drawCard();
    if (newCard && drawnCards.length > 0) {
      const result = compareCards(drawnCards[drawnCards.length - 1], newCard);
      if (result !== 'higher') {
        setDrawnCards([...drawnCards, newCard]);
      } else {
        // Handle incorrect guess...
      }
    }
  };

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  //   temp
  const handleSubmit = (event) => {
    event.preventDefault();
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setNumber(1);
  };

  // html

  return (
    <div className='flex flex-col h-screen'>
      <div className='m-4 flex justify-between'>
        {/* Link to home page button */}
        <Link
          to='/'
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
        >
          Return to Home
        </Link>

        {/* Reset game button */}
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
            drawCard(); // Draw the first card when the game starts
          }}
          className='flex flex-col items-center justify-center flex-grow'
        >
          <label className='mb-4 text-lg'>
            Choose a number between 1 and 7:
            <input
              type='number'
              min='1'
              max='7'
              value={number}
              onChange={handleChange}
              className='ml-2 border-2 border-gray-300 rounded-md p-1'
            />
          </label>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Start Game
          </button>
        </form>
      ) : (
        // Placeholder cards
        <div className='flex flex-col items-center justify-center flex-grow'>
          <div className='flex justify-center'>
            {drawnCards.map((card, index) => (
              <img
                key={index}
                src={cardImages[card] || placeholderCard}
                alt='card'
                className='mx-2 w-36 h-auto object-contain rounded shadow-lg'
              />
            ))}
            {[...Array(parseInt(number) - drawnCards.length)].map(
              (_, index) => (
                <img
                  key={index + drawnCards.length}
                  src={placeholderCard}
                  alt='placeholder card'
                  className='mx-2 w-36 h-auto object-contain rounded shadow-lg'
                />
              )
            )}
          </div>
          <div className='mt-12 flex flex-col items-center justify-center'>
            <p className='text-center text-xl font-bold mb-6'>
              Will the next card be lower, equal, or higher than{' '}
              {drawnCards[drawnCards.length - 1]}?
            </p>
            <div className='flex justify-center'>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideTheBus;
