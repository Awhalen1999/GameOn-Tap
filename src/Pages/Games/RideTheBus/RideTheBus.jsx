// remove console logs when done
// continue cleaning up input section
// todo: change game rules option

import React, { useState, useEffect } from 'react';
import placeholderCard from '../../../cards/red.png';
import initialDeck from '../DeckOfCards.jsx';
import { FaArrowDown } from 'react-icons/fa';
import StartGameForm from './StartGameForm.jsx';

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

  const startGame = (event) => {
    event.preventDefault();
    setGameStarted(true);
    drawCard();
  };

  const resetGame = () => {
    setGameStarted(false);
    setNumber(1);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Reset game button */}
      <div className='absolute bottom-0 right-0 m-4'>
        <button onClick={resetGame} className='btn btn-success'>
          Reset Game
        </button>
      </div>

      {!gameStarted ? (
        // Game start form
        <StartGameForm
          number={number}
          setNumber={setNumber}
          ruleSet={ruleSet}
          setRuleSet={setRuleSet}
          startGame={startGame}
        />
      ) : (
        // Placeholder cards
        <div className='flex flex-col items-center justify-center flex-grow'>
          <div className='flex justify-center'>
            <div className='flex justify-center items-end'>
              {drawnCards.map((card, index) => (
                <div key={index} className='mx-2 relative'>
                  {index === drawnCards.length - 1 && (
                    <FaArrowDown className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-4xl text-base-content' />
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
            <p className='text-center text-xl font-bold mb-6 text-base-content'>
              You are on card {drawnCards.length} of {number}.
            </p>
            <p className='text-center text-xl font-bold mb-6 text-base-content'>
              {ruleSet === 'higher/lower'
                ? `Will the next card be lower, equal, or higher than ${
                    drawnCards[drawnCards.length - 1]
                  }?`
                : 'Will the next card be red or black?'}
            </p>
            <div className='flex justify-center'>
              {ruleSet === 'higher/lower' ? (
                <>
                  <button
                    onClick={handleLowerClick}
                    className='mx-8 btn btn-lg btn-outline text-white bg-blue-500 hover:bg-blue-600 hover:text-white'
                  >
                    Lower
                  </button>
                  <button
                    onClick={handleEqualClick}
                    className='mx-8 btn btn-lg btn-outline text-white  bg-yellow-500 hover:bg-yellow-600 hover:text-white'
                  >
                    Equal
                  </button>
                  <button
                    onClick={handleHigherClick}
                    className='mx-8 btn btn-lg btn-outline text-white bg-red-500 hover:bg-red-600 hover:text-white'
                  >
                    Higher
                  </button>
                </>
              ) : (
                // Red/Black buttons
                <>
                  <button
                    onClick={handleRedClick}
                    className='mx-8 btn btn-lg btn-outline text-white bg-red-500 hover:bg-red-600 hover:text-white'
                  >
                    Red
                  </button>
                  <button
                    onClick={handleBlackClick}
                    className='mx-8 btn btn-lg btn-outline text-white bg-black hover:bg-gray-900 hover:text-white'
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
  );
};

export default RideTheBus;
