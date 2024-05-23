import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Layout from './utils/Layout';
import Index from './pages/Index/IndexPage';
import ErrorPage from './error-page';
import KingsCup from './pages/Games/KingsCup';
import RideTheBus from './pages/Games/RideTheBus/RideTheBus';
import Snap from './pages/Games/Snap';
import Trivia from './pages/Games/Trivia/Trivia';
import PromptDash from './pages/Games/PromptDash/PromptDash';
import DiceRoll from './pages/Games/DiceRoll';
import DrinkRoulette from './pages/Games/DrinkRoulette/DrinkRoulette';
import AIbartender from './pages/Games/AIBartender/AIBartender';
import BountyBlast from './pages/Games/BountyBlast';
import EditRulesPage from './pages/EditRulesPage';
import GamePage from './pages/GamePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import { UserProvider } from './utils/UserContext';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Index /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'signup', element: <SignupPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'GamePage', element: <GamePage /> },
        { path: 'games/KingsCup', element: <KingsCup /> },
        { path: 'games/RideTheBus', element: <RideTheBus /> },
        { path: 'games/Snap', element: <Snap /> },
        { path: 'games/Trivia', element: <Trivia /> },
        { path: 'games/PromptDash', element: <PromptDash /> },
        { path: 'games/DiceRoll', element: <DiceRoll /> },
        { path: 'games/DrinkRoulette', element: <DrinkRoulette /> },
        { path: 'games/AIBartender', element: <AIbartender /> },
        { path: 'games/BountyBlast', element: <BountyBlast /> },
        { path: 'EditRules/:game', element: <EditRulesPage /> },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  {
    basename: '/GameOn-Tap',
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
