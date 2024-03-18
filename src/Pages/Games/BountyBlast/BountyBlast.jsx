import React, { useState, useEffect } from 'react';
import treasureChest from '../../../assets/treasure-chest.png';
import bomb from '../../../assets/bomb.png';
import treasure from '../../../assets/treasure.png';
import empty from '../../../assets/empty.png';
import ImageLoader from '../../ImageLoader';

const BountyBlast = () => {
  const [bombs, setBombs] = useState(3);
  const [treasures, setTreasures] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (gameStarted) {
      generateBoard();
    }
  }, [gameStarted]);

  const restartRound = () => {
    setBoard([]);
    setGameOver(false);
    setMessage('');
    generateBoard();
  };

  const generateBoard = () => {
    let newBoard = [];

    for (let i = 0; i < 24; i++) {
      newBoard.push({ type: 'empty', opened: false, img: treasureChest });
    }

    for (let i = 0; i < bombs; i++) {
      let randomIndex = Math.floor(Math.random() * 24);
      while (newBoard[randomIndex].type !== 'empty') {
        randomIndex = Math.floor(Math.random() * 24);
      }
      newBoard[randomIndex] = {
        type: 'bomb',
        opened: false,
        img: treasureChest,
      };
    }

    for (let i = 0; i < treasures; i++) {
      let randomIndex = Math.floor(Math.random() * 24);
      while (newBoard[randomIndex].type !== 'empty') {
        randomIndex = Math.floor(Math.random() * 24);
      }
      newBoard[randomIndex] = {
        type: 'treasure',
        opened: false,
        img: treasureChest,
      };
    }
    setBoard(newBoard);
  };

  const handleChestClick = (index) => {
    if (!board[index].opened) {
      let newBoard = [...board];
      newBoard[index].opened = true;
      if (newBoard[index].type === 'bomb') {
        newBoard[index].img = bomb;
        setMessage('Oh no! You found a bomb! Drink up!');
      } else if (newBoard[index].type === 'treasure') {
        newBoard[index].img = treasure;
        setMessage(
          'Congratulations! You found treasure! You may assign a drink to another player or be safe from your next bomb!'
        );
      } else {
        newBoard[index].img = empty;
        setMessage('Safe! This chest is empty.');
      }

      setBoard(newBoard);
    }
  };

  const getColorClass = (number) => {
    if (number <= 5) {
      return 'text-base-content';
    } else if (number >= 6 && number <= 8) {
      return 'text-yellow-600';
    } else {
      return 'text-red-600';
    }
  };

  return (
    <div className='h-full bg-base-100 font-space'>
      {!gameStarted && (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-4xl font-bold m-8 text-base-content'>
            Bounty Blast
          </h2>
          <h3 className='text-2xl mb-6 text-base-content'>Game Setup</h3>
          <div className='space-y-4'>
            <label className='flex flex-col text-lg text-base-content'>
              Number of Bombs:
              <input
                type='number'
                value={bombs}
                onChange={(e) => {
                  const newBombs = parseInt(e.target.value);
                  if (newBombs + treasures <= 24) {
                    setBombs(newBombs);
                  }
                }}
                className={`input text-lg  mb-6 mt-2 input-bordered ${getColorClass(
                  bombs
                )}`}
                required
              />
            </label>
            <label className='flex flex-col text-lg text-base-content'>
              Number of Treasures:
              <input
                type='number'
                value={treasures}
                onChange={(e) => {
                  const newTreasures = parseInt(e.target.value);
                  if (newTreasures + bombs <= 24) {
                    setTreasures(newTreasures);
                  }
                }}
                className={`input text-lg mb-6 mt-2 input-bordered ${getColorClass(
                  treasures
                )}`}
                required
              />
            </label>
          </div>
          <button
            onClick={() => setGameStarted(true)}
            className='btn btn-primary btn-lg mt-4'
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && (
        <div className='flex flex-col items-center h-full'>
          <div className='mt-10'>
            <div className='board'>
              <div className='grid grid-cols-6 gap-4'>
                {board.map((chest, index) => (
                  <div
                    key={index}
                    className={`card ${
                      chest.opened ? 'bordered' : ''
                    } flex justify-center items-center`}
                    onClick={() => handleChestClick(index)}
                  >
                    <img
                      src={chest.img}
                      alt={chest.type}
                      className='card-img w-1/2'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {message && (
            <div className='mt-auto mb-10 p-4 rounded bg-neutral text-neutral-content border border-secondary text-center text-lg font-semibold max-w-[70vw]'>
              {message}
            </div>
          )}
          <button
            onClick={() => {
              setGameStarted(false);
              setMessage('');
            }}
            className='btn btn-primary absolute bottom-4 left-4'
          >
            Return to Game Start
          </button>
          <button
            onClick={restartRound}
            className='btn btn-primary absolute bottom-4 right-4'
          >
            Restart Round
          </button>
        </div>
      )}
    </div>
  );
};

export default BountyBlast;
