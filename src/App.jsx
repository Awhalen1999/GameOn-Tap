import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import KingsCup from './KingsCup.jsx';
import RideTheBus from './RideTheBus.jsx';
import Trivia from './Trivia.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/KingsCup' element={<KingsCup />} />
          <Route path='/RideTheBus' element={<RideTheBus />} />
          <Route path='/Trivia' element={<Trivia />} />
          {/* Add routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
