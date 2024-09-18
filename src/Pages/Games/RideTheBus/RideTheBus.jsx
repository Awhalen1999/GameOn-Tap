import React, { useState, useEffect } from 'react';
import { FaArrowDown, FaInfoCircle } from 'react-icons/fa';
import placeholderCard from '../../../assets/red.png';
import initialDeck from '../../../components/DeckOfCards.jsx';
import RTBStartGameForm from './RTBStartGameForm.jsx';
import { getActiveRuleset, getRuleset } from '../../../utils/api';
import RulesetDisplay from '../../../components/RulesetDisplay';
import { useAuth } from '../../../hooks/useAuth';
import defaultRulesets from '../../../components/defaultRulesets';

const RideTheBus = () => {
  const [number, setNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [deck, setDeck] = useState([...initialDeck]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [cardImages, setCardImages] = useState({});
  const [guessStatus, setGuessStatus] = useState('');
  const [ruleSet, setRuleSet] = useState('higher/lower');
  const [lastNumber, setLastNumber] = useState(1);
  const [bgColor, setBgColor] = useState('base');
  const [activeRuleset, setActiveRuleset] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const gameId = 'RideTheBus';
  const { user } = useAuth();

  useEffect(() => {
    const fetchActiveRuleset = async () => {
      try {
        let activeRuleset;
        if (user) {
          // Logged-in user: fetch active ruleset from backend
          const activeRulesetResponse = await getActiveRuleset(
            user.user_id,
            gameId
          );
          if (activeRulesetResponse.ruleset_id) {
            activeRuleset = await getRuleset(
              user.user_id,
              gameId,
              activeRulesetResponse.ruleset_id
            );
          }
        } else {
          // No user: fetch default ruleset
          console.log('No user logged in, fetching default ruleset');
          activeRuleset = defaultRulesets[gameId];
        }

        if (activeRuleset) {
          setActiveRuleset(activeRuleset);
        } else {
          console.error('No active or default ruleset found.');
        }
      } catch (error) {
        console.error('Error fetching active/default ruleset:', error);
      }
    };

    fetchActiveRuleset();
  }, [user, gameId]);

  useEffect(() => {
    if (guessStatus !== '') {
      const timer = setTimeout(() => setGuessStatus(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [guessStatus]);

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const card of initialDeck) {
        images[card] = (await import(`../../../assets/${card}.png`)).default;
      }
      setCardImages(images);
    };
    loadImages();
  }, []);

  const handleIncorrectGuess = () => {
    setGuessStatus('incorrect');
    setBgColor('error');
    setTimeout(() => setBgColor('base'), 500);
  };

  const drawCard = () => {
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
    if (rank2 < rank1) return 'lower';
    if (rank2 > rank1) return 'higher';
    return 'equal';
  };

  const getCardColor = (card) => {
    const suit = card.slice(-1);
    return suit === 'H' || suit === 'D' ? 'red' : 'black';
  };

  const checkGameEnd = (newDrawnCards) => {
    if (newDrawnCards.length === parseInt(number) + 1) {
      handleWin();
    }
  };

  const handleWin = () => {
    setShowAlert(true);
    resetGame();
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
        handleIncorrectGuess();
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
        handleIncorrectGuess();
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
        handleIncorrectGuess();
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
        handleIncorrectGuess();
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
        handleIncorrectGuess();
      }
    }
  };

  const startGame = (event) => {
    if (event) event.preventDefault();
    setLastNumber(number);
    setGameStarted(true);
    drawCard();
  };

  const resetGame = () => {
    setGameStarted(false);
    setNumber(lastNumber);
  };

  return (
    <div
      className={`flex flex-col h-full font-space transition-colors duration-500 ${
        bgColor === 'error' ? 'bg-error' : 'bg-base'
      }`}
    >
      <div className='absolute bottom-0 right-0 m-4'>
        <button onClick={resetGame} className='btn btn-success'>
          Reset Game
        </button>
      </div>

      {showAlert && !gameStarted && (
        <div
          role='alert'
          className='alert w-[90vw] mx-auto border border-base-content mt-2'
        >
          <FaInfoCircle />
          <span>You won!</span>
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
                setShowAlert(false);
                startGame();
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className='flex justify-end'>
        <button
          className='btn btn-ghost mr-4 font-bold mt-1'
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Ride the Bus Rules
        </button>
      </div>

      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box border border-secondary'>
          <RulesetDisplay rules={activeRuleset?.rules} gameId='RideTheBus' />
        </div>
      </dialog>

      {!gameStarted ? (
        <RTBStartGameForm
          number={number}
          setNumber={setNumber}
          ruleSet={ruleSet}
          setRuleSet={setRuleSet}
          startGame={startGame}
          hideAlert={() => setShowAlert(false)}
        />
      ) : (
        <div className='flex flex-col items-center justify-center flex-grow'>
          <div className='flex justify-center items-center mx-auto w-full gap-2 sm:gap-4 lg:gap-6'>
            {drawnCards.slice(-2).map((card, index) => (
              <div key={index} className='relative'>
                {(index === 1 || drawnCards.length === 1) && (
                  <FaArrowDown className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-3xl sm:text-4xl text-base-content' />
                )}
                <img
                  src={cardImages[card] || placeholderCard}
                  alt={card}
                  className='h-40 sm:h-48 md:h-56 lg:h-64'
                />
              </div>
            ))}

            {[...Array(parseInt(number) - drawnCards.length)].map(
              (_, index) => (
                <div key={index + drawnCards.length} className='relative'>
                  {index === 0 && (
                    <img
                      src={placeholderCard}
                      alt='placeholder card'
                      className='h-40 sm:h-48 md:h-56 lg:h-64'
                    />
                  )}
                </div>
              )
            )}
          </div>

          <div className='mt-8 sm:mt-10 lg:mt-12 flex flex-col items-center justify-center'>
            <p className='text-center text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-base-content'>
              You are on card {drawnCards.length} of {number}.
            </p>
            <p className='text-center text-base sm:text-lg lg:text-xl font-bold mb-4 sm:mb-6 text-base-content'>
              {ruleSet === 'higher/lower'
                ? `Will the next card be lower, equal, or higher than ${drawnCards[
                    drawnCards.length - 1
                  ].slice(0, -1)}?`
                : 'Will the next card be red or black?'}
            </p>
            <div className='flex justify-center gap-4 sm:gap-6'>
              {ruleSet === 'higher/lower' ? (
                <>
                  <button
                    onClick={handleLowerClick}
                    className='px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mx-2 sm:mx-4 btn btn-lg btn-outline text-white bg-blue-500 hover:bg-blue-600 hover:text-white'
                  >
                    Lower
                  </button>
                  <button
                    onClick={handleEqualClick}
                    className='px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mx-2 sm:mx-4 btn btn-lg btn-outline text-white bg-yellow-500 hover:bg-yellow-600 hover:text-white'
                  >
                    Equal
                  </button>
                  <button
                    onClick={handleHigherClick}
                    className='px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mx-2 sm:mx-4 btn btn-lg btn-outline text-white bg-red-500 hover:bg-red-600 hover:text-white'
                  >
                    Higher
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleRedClick}
                    className='px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mx-2 sm:mx-4 btn btn-lg btn-outline text-white bg-red-500 hover:bg-red-600 hover:text-white'
                  >
                    Red
                  </button>
                  <button
                    onClick={handleBlackClick}
                    className='px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 mx-2 sm:mx-4 btn btn-lg btn-outline text-white bg-black hover:bg-gray-900 hover:text-white'
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
