import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Index from './Pages/Index/IndexPage';
import ErrorPage from './error-page';
import KingsCup from './Pages/Games/KingsCup/KingsCup';
import RideTheBus from './Pages/Games/RideTheBus';
import Snap from './Pages/Games/Snap';
import Trivia from './Pages/Games/Trivia';
import PromptDash from './Pages/Games/PromptDash/PromptDash';
import DiceRoll from './Pages/Games/DiceRoll/DiceRoll';
import DrinkRoulette from './Pages/Games/DrinkRoulette/DrinkRoulette';
import AIbartender from './Pages/Games/AIBartender';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/KingsCup',
    element: <KingsCup />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/RideTheBus',
    element: <RideTheBus />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Snap',
    element: <Snap />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Trivia',
    element: <Trivia />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/PromptDash',
    element: <PromptDash />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/DiceRoll',
    element: <DiceRoll />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/DrinkRoulette',
    element: <DrinkRoulette />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/AIBartender',
    element: <AIbartender />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
