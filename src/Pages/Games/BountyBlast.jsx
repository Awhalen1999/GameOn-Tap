import React, { useState, useEffect } from 'react';
import treasureChest from '../../assets/treasure-chest.png';
import bomb from '../../assets/bomb.png';
import treasure from '../../assets/treasure.png';
import empty from '../../assets/empty.png';
import { getActiveRuleset, getRuleset } from '../../utils/api';
import RulesetDisplay from '../../components/RulesetDisplay';
import { FaWrench, FaMinus, FaPlus } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import defaultRulesets from '../../components/defaultRulesets';

const BountyBlast = () => {
  const [bombs, setBombs] = useState(3);
  const [treasures, setTreasures] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [activeRuleset, setActiveRuleset] = useState(null);
  const gameId = 'BountyBlast';
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
      let ruleKey;
      if (newBoard[index].type === 'bomb') {
        newBoard[index].img = bomb;
        ruleKey = '3';
      } else if (newBoard[index].type === 'treasure') {
        newBoard[index].img = treasure;
        ruleKey = '2';
      } else {
        newBoard[index].img = empty;
        ruleKey = '1';
      }

      const rule = activeRuleset.rules[ruleKey];
      if (rule) {
        setMessage(rule.description);
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
      <div className='flex justify-end'>
        <button
          className='btn btn-ghost mr-4 font-bold mt-1'
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Bounty Blast Rules <FaWrench />
        </button>
      </div>
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box border border-secondary'>
          <RulesetDisplay rules={activeRuleset?.rules} gameId='BountyBlast' />
        </div>
      </dialog>
      {!gameStarted && (
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-4xl font-bold m-6 text-base-content'>
            Bounty Blast
          </h2>
          <h3 className='text-2xl mb-6 text-base-content'>Game Setup</h3>

          {/* Number of Bombs Input */}
          <div className='mb-4 w-full max-w-xs'>
            <label className='block text-lg text-base-content mb-2'>
              Number of Bombs
            </label>
            <div className='bg-neutral rounded-lg border border-primary'>
              <div className='w-full flex justify-between items-center gap-x-5'>
                <input
                  className='input bg-neutral w-full'
                  type='number'
                  value={bombs}
                  onChange={(e) => {
                    const newBombs = parseInt(e.target.value);
                    if (newBombs + treasures <= 24) {
                      setBombs(newBombs);
                    }
                  }}
                />
                <div className='flex justify-end items-center gap-x-1.5 m-2'>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() => setBombs(bombs > 1 ? bombs - 1 : 1)}
                  >
                    <FaMinus />
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() =>
                      setBombs(bombs + treasures < 24 ? bombs + 1 : bombs)
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Number of Treasures Input */}
          <div className='mb-4 w-full max-w-xs'>
            <label className='block text-lg text-base-content mb-2'>
              Number of Treasures
            </label>
            <div className='bg-neutral rounded-lg border border-primary'>
              <div className='w-full flex justify-between items-center gap-x-5'>
                <input
                  className='input bg-neutral w-full'
                  type='number'
                  value={treasures}
                  onChange={(e) => {
                    const newTreasures = parseInt(e.target.value);
                    if (newTreasures + bombs <= 24) {
                      setTreasures(newTreasures);
                    }
                  }}
                />
                <div className='flex justify-end items-center gap-x-1.5 m-2'>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() =>
                      setTreasures(treasures > 1 ? treasures - 1 : 1)
                    }
                  >
                    <FaMinus />
                  </button>
                  <button
                    type='button'
                    className='btn btn-sm btn-primary'
                    onClick={() =>
                      setTreasures(
                        treasures + bombs < 24 ? treasures + 1 : treasures
                      )
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
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
              <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8'>
                {board.map((chest, index) => (
                  <div
                    key={index}
                    className={`card ${
                      chest.opened ? '' : ''
                    } flex justify-center items-center`}
                    onClick={() => handleChestClick(index)}
                  >
                    <img
                      src={chest.img}
                      alt={chest.type}
                      className='card-img w-24 sm:w-32 md:w-42 lg:w-44'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {message && (
            <div className='mt-4 mb-4 p-4 rounded bg-neutral text-neutral-content border border-secondary text-center text-lg font-semibold max-w-[70vw]'>
              {message}
            </div>
          )}
          <div className='flex justify-between w-full p-4'>
            <button
              onClick={() => {
                setGameStarted(false);
                setMessage('');
              }}
              className='btn btn-primary'
            >
              Return to Game Start
            </button>
            <button onClick={restartRound} className='btn btn-primary'>
              Restart Round
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BountyBlast;
