import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import KingsCup from './components/KingsCup.jsx';
import RideTheBus from './components/RideTheBus.jsx';
import TriviaSetup from './components/TriviaSetup.jsx';
import TriviaGame from './components/TriviaGame.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/KingsCup' element={<KingsCup />} />
          <Route path='/RideTheBus' element={<RideTheBus />} />
          <Route path='/TriviaSetup' element={<TriviaSetup />} />
          {/* Add routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
