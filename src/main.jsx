import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import Layout from './Pages/Layout';
import Index from './Pages/Index/IndexPage';
import ErrorPage from './error-page';
import KingsCup from './Pages/Games/KingsCup/KingsCup';
import RideTheBus from './Pages/Games/RideTheBus/RideTheBus';
import Snap from './Pages/Games/Snap/Snap';
import Trivia from './Pages/Games/Trivia/Trivia';
import PromptDash from './Pages/Games/PromptDash/PromptDash';
import DiceRoll from './Pages/Games/DiceRoll/DiceRoll';
import DrinkRoulette from './Pages/Games/DrinkRoulette/DrinkRoulette';
import AIbartender from './Pages/Games/AIBartender/AIBartender';
import BountyBlast from './Pages/Games/BountyBlast/BountyBlast';
import EditRulesPage from './Pages/EditRulesPage';
import GamePage from './Pages/GamePage/GamePage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import UserPage from './Pages/UserPage';
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
