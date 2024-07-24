import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import kingsCupCover from '../../assets/kings-cup-cover.png';
import rideTheBusCover from '../../assets/ride-the-bus-cover.png';
import snapCover from '../../assets/snap-cover.png';
import triviaCover from '../../assets/trivia-cover.png';
import promptDashCover from '../../assets/prompt-dash-cover.png';
import diceRollCover from '../../assets/dice-roll-cover.png';
import drinkRouletteCover from '../../assets/drink-roulette-cover.png';
import bountyBlastCover from '../../assets/bounty-blast-cover.png';
import aiBartenderCover from '../../assets/ai-bartender-cover.png';
import ImageLoader from '../../components/ImageLoader';

const GameList = () => {
  const allGames = [
    {
      name: 'Kings Cup',
      route: '/games/KingsCup',
      image: kingsCupCover,
    },
    {
      name: 'Drink Roulette',
      route: '/games/DrinkRoulette',
      image: drinkRouletteCover,
    },
    {
      name: 'Bounty Blast',
      route: '/games/BountyBlast',
      image: bountyBlastCover,
    },
    {
      name: 'Ride The Bus',
      route: '/games/RideTheBus',
      image: rideTheBusCover,
    },
    {
      name: 'Snap',
      route: '/games/Snap',
      image: snapCover,
    },
    {
      name: 'Trivia',
      route: '/games/Trivia',
      image: triviaCover,
    },
    {
      name: 'Prompt Dash',
      route: '/games/PromptDash',
      image: promptDashCover,
    },
    {
      name: 'Dice Roll',
      route: '/games/DiceRoll',
      image: diceRollCover,
    },
    {
      name: 'AI Bartender',
      route: '/games/AIBartender',
      image: aiBartenderCover,
    },
  ];

  const [games, setGames] = useState([]);

  useEffect(() => {
    const today = new Date().getDay();
    const selectedGames = [
      allGames[today % allGames.length],
      allGames[(today + 1) % allGames.length],
      allGames[(today + 2) % allGames.length],
    ];
    setGames(selectedGames);
  }, []);

  return (
    <div className='w-full h-auto bg-base-100 font-space'>
      <div className='max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8'>
        <div className='w-full h-10 flex items-center justify-start'>
          <h1 className='font-bold text-4xl text-base-content'>Featured</h1>
        </div>
        <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
          {games.map((game, index) => (
            <div
              key={index}
              className='border-2 border-secondary rounded-xl transform hover:scale-105 relative z-10'
            >
              <Link
                to={game.route}
                className='text-xl bg-transparent flex flex-col items-center'
              >
                <ImageLoader
                  src={game.image}
                  alt={game.name}
                  className='w-full h-auto object-cover rounded-t-lg'
                />
                <div className='text-primary-content font-bold bg-primary rounded-b-lg hover:bg-accent w-full text-center'>
                  {game.name}
                </div>
              </Link>
            </div>
          ))}
          <div className='mb-2 flex items-center justify-center'>
            <Link
              to='/GamePage'
              className='w-full flex justify-center items-center'
            >
              <button className='btn btn-ghost text-2xl p-5 flex items-center justify-center flex-col text-base-content'>
                Full Game List
                <FaAngleDoubleRight className='flex-shrink-0 ml-2' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameList;
