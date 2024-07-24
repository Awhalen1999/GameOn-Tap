import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './utils/Layout';
import Index from './Pages/Index/IndexPage';
import ErrorPage from './error-page';
import KingsCup from './Pages/Games/KingsCup';
import RideTheBus from './Pages/Games/RideTheBus/RideTheBus';
import Snap from './Pages/Games/Snap';
import Trivia from './Pages/Games/Trivia';
import PromptDash from './Pages/Games/PromptDash/PromptDash';
import DiceRoll from './Pages/Games/DiceRoll';
import DrinkRoulette from './Pages/Games/DrinkRoulette/DrinkRoulette';
import AIbartender from './Pages/Games/AIBartender/AIBartender';
import BountyBlast from './Pages/Games/BountyBlast';
import EditRulesPage from './Pages/EditRulesPage';
import GamePage from './Pages/GamePage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import UserPage from './Pages/UserPage';
import { AuthProvider } from './components/AuthProvider';

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
    basename: '/',
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
