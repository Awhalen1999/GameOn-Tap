import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import KingsCup from './Pages/Games/KingsCup/KingsCup.jsx';
import RideTheBus from './Pages/Games/RideTheBus.jsx';
import Snap from './Pages/Games/Snap.jsx';
import Trivia from './Pages/Games/Trivia.jsx';
import PromptDash from './Pages/Games/PromptDash/PromptDash.jsx';
import DiceRoll from './Pages/Games/DiceRoll/DiceRoll.jsx';
import DrinkRoulette from './Pages/Games/DrinkRoulette/DrinkRoulette.jsx';
import AIbartender from './Pages/Games/AIBartender.jsx';

/**
 * /games -> toolbar/common ui
 *  - /games/kings-cup ->
 */
//test

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/KingsCup' element={<KingsCup />} />
          <Route path='/RideTheBus' element={<RideTheBus />} />
          <Route path='/Snap' element={<Snap />} />
          <Route path='/Trivia' element={<Trivia />} />
          <Route path='/PromptDash' element={<PromptDash />} />
          <Route path='/DiceRoll' element={<DiceRoll />} />
          <Route path='/DrinkRoulette' element={<DrinkRoulette />} />
          <Route path='/AIBartender' element={<AIbartender />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

/**
 * [us_en.txt]
 * title="My Awesome App"
 *
 * [ca_fr.txt]
 * title
 */
