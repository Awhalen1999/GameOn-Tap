// GameNav.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GameNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let buttons;

  switch (location.pathname) {
    case '/games/KingsCup':
      buttons = ['Kings Cup Button 1', 'Kings Cup Button 2'];
      break;
    case '/games/RideTheBus':
      buttons = ['Ride The Bus Button 1', 'Ride The Bus Button 2'];
      break;
    case '/games/Snap':
      buttons = ['Snap Button 1', 'Snap Button 2'];
      break;
    case '/games/Trivia':
      buttons = ['Trivia Button 1', 'Trivia Button 2'];
      break;
    case '/games/PromptDash':
      buttons = ['Prompt Dash Button 1', 'Prompt Dash Button 2'];
      break;
    case '/games/DiceRoll':
      buttons = ['Dice Roll Button 1', 'Dice Roll Button 2'];
      break;
    case '/games/DrinkRoulette':
      buttons = ['Drink Roulette Button 1', 'Drink Roulette Button 2'];
      break;
    case '/games/AIBartender':
      buttons = ['AI Bartender Button 1', 'AI Bartender Button 2'];
      break;
    default:
      buttons = ['Default Button'];
  }

  // Add the home button to all pages
  buttons.push('Home');

  return (
    <nav>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => {
            if (button === 'Home') {
              navigate('/');
            }
            // Add navigation for other buttons if needed...
          }}
        >
          {button}
        </button>
      ))}
    </nav>
  );
};

export default GameNav;
