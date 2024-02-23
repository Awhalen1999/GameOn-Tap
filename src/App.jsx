import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage.jsx';
import KingsCup from './components/games/KingsCup/KingsCup.jsx';
import RideTheBus from './components/games/RideTheBus.jsx';
import Snap from './components/games/Snap.jsx';
import Trivia from './components/games/Trivia.jsx';
import PromptDash from './components/games/PromptDash/PromptDash.jsx';
import DiceRoll from './components/games/DiceRoll/DiceRoll.jsx';
import DrinkRoulette from './components/games/DrinkRoulette/DrinkRoulette.jsx';
import AIbartender from './components/games/AIBartender.jsx';

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
