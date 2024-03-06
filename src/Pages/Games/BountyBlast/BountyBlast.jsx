import React, { useState, useEffect } from 'react';
import treasureChest from '../../../assets/treasure-chest.png';
import bomb from '../../../assets/bomb.png';
import treasure from '../../../assets/treasure.png';

const BountyBlast = () => {
  const [bombs, setBombs] = useState(4);
  const [treasures, setTreasures] = useState(6);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (gameStarted) {
      generateBoard();
    }
  }, [gameStarted]);

  // Function to generate the game board
  const generateBoard = () => {
    let newBoard = [];
    // Create 24 empty chests
    for (let i = 0; i < 24; i++) {
      newBoard.push({ type: 'empty', opened: false, img: treasureChest });
    }
    // Place bombs randomly
    for (let i = 0; i < bombs; i++) {
      let randomIndex = Math.floor(Math.random() * 24);
      while (newBoard[randomIndex].type !== 'empty') {
        randomIndex = Math.floor(Math.random() * 24);
      }
      newBoard[randomIndex] = { type: 'bomb', opened: false, img: bomb };
    }
    // Place treasures randomly
    for (let i = 0; i < treasures; i++) {
      let randomIndex = Math.floor(Math.random() * 24);
      while (newBoard[randomIndex].type !== 'empty') {
        randomIndex = Math.floor(Math.random() * 24);
      }
      newBoard[randomIndex] = {
        type: 'treasure',
        opened: false,
        img: treasure,
      };
    }
    setBoard(newBoard);
  };

  const handleChestClick = (index) => {
    if (!board[index].opened && !gameOver) {
      let newBoard = [...board];
      newBoard[index].opened = true;
      setBoard(newBoard);
      if (newBoard[index].type === 'bomb') {
        // Handle bomb clicked
        setMessage('Oh no! You found a bomb! Drink up!');
        setGameOver(true);
      } else if (newBoard[index].type === 'treasure') {
        // Handle treasure clicked
        setMessage('Congratulations! You found treasure!');
      }
    }
  };

  return (
    <div className='h-full border bg-base-100 font-space'>
      {!gameStarted && (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-4xl font-bold mb-4'>Bounty Blast</h2>
          <h3 className='text-2xl mb-4'>Game Setup</h3>
          <div className='space-y-4'>
            <label className='flex flex-col'>
              Number of Bombs:
              <input
                type='number'
                value={bombs}
                onChange={(e) => setBombs(parseInt(e.target.value))}
                className='input input-bordered'
              />
            </label>
            <label className='flex flex-col'>
              Number of Treasures:
              <input
                type='number'
                value={treasures}
                onChange={(e) => setTreasures(parseInt(e.target.value))}
                className='input input-bordered'
              />
            </label>
          </div>
          <button
            onClick={() => setGameStarted(true)}
            className='btn btn-primary mt-4'
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
                    } flex justify-center items-center border`}
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
          <div className='mt-auto mb-10 p-4 rounded bg-neutral text-neutral-content border border-secondary text-center text-lg font-semibold'>
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default BountyBlast;
