import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Index from './Pages/Index/IndexPage';
import ErrorPage from './error-page';
import Game from './Pages/Game';
import KingsCup from './Pages/Games/KingsCup/KingsCup';
import RideTheBus from './Pages/Games/RideTheBus/RideTheBus';
import Snap from './Pages/Games/Snap/Snap';
import Trivia from './Pages/Games/Trivia/Trivia';
import PromptDash from './Pages/Games/PromptDash/PromptDash';
import DiceRoll from './Pages/Games/DiceRoll/DiceRoll';
import DrinkRoulette from './Pages/Games/DrinkRoulette/DrinkRoulette';
import AIbartender from './Pages/Games/AIBartender/AIBartender';
import EditRulesPage from './Pages/EditRulesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'games',
    element: <Game />,
    children: [
      { path: 'KingsCup', element: <KingsCup /> },
      { path: 'RideTheBus', element: <RideTheBus /> },
      { path: 'Snap', element: <Snap /> },
      { path: 'Trivia', element: <Trivia /> },
      { path: 'PromptDash', element: <PromptDash /> },
      { path: 'DiceRoll', element: <DiceRoll /> },
      { path: 'DrinkRoulette', element: <DrinkRoulette /> },
      { path: 'AIBartender', element: <AIbartender /> },
      { path: 'EditRules/:game', element: <EditRulesPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
