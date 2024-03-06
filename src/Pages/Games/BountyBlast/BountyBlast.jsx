import React, { useState, useEffect } from 'react';

const BountyBlast = () => {
  const [bombs, setBombs] = useState(4); // Default number of bombs
  const [treasures, setTreasures] = useState(6); // Default number of treasures
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

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
      newBoard.push({ type: 'empty', opened: false });
    }
    // Place bombs randomly
    for (let i = 0; i < bombs; i++) {
      let randomIndex = Math.floor(Math.random() * 24);
      while (newBoard[randomIndex].type !== 'empty') {
        randomIndex = Math.floor(Math.random() * 24);
      }
      newBoard[randomIndex] = { type: 'bomb', opened: false };
    }
    // Place treasures randomly
    for (let i = 0; i < treasures; i++) {
      let randomIndex = Math.floor(Math.random() * 24);
      while (newBoard[randomIndex].type !== 'empty') {
        randomIndex = Math.floor(Math.random() * 24);
      }
      newBoard[randomIndex] = { type: 'treasure', opened: false };
    }
    setBoard(newBoard);
  };

  // Function to handle chest opening
  const handleChestClick = (index) => {
    if (!board[index].opened && !gameOver) {
      let newBoard = [...board];
      newBoard[index].opened = true;
      setBoard(newBoard);
      if (newBoard[index].type === 'bomb') {
        // Handle bomb clicked
        alert('Oh no! You found a bomb! Drink up!');
        setGameOver(true);
      } else if (newBoard[index].type === 'treasure') {
        // Handle treasure clicked
        alert('Congratulations! You found treasure!');
      }
    }
  };

  return (
    <div>
      {!gameStarted && (
        <div>
          <h2>Bounty Blast</h2>
          <h3>Game Setup</h3>
          <label>
            Number of Bombs:
            <input
              type='number'
              value={bombs}
              onChange={(e) => setBombs(parseInt(e.target.value))}
            />
          </label>
          <br />
          <label>
            Number of Treasures:
            <input
              type='number'
              value={treasures}
              onChange={(e) => setTreasures(parseInt(e.target.value))}
            />
          </label>
          <br />
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      )}
      {gameStarted && (
        <div>
          <h2>Bounty Blast</h2>
          <h3>Game Board</h3>
          <div className='board'>
            {board.map((chest, index) => (
              <div
                key={index}
                className={`chest ${chest.opened ? 'opened' : ''}`}
                onClick={() => handleChestClick(index)}
              >
                {chest.opened && (
                  <img
                    src={`./${chest.type}.gif`}
                    alt={chest.type}
                    className='icon'
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BountyBlast;
