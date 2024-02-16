import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import KingsCup from './KingsCup.jsx';
import RideTheBus from './RideTheBus.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/KingsCup' element={<KingsCup />} />
          <Route path='/RideTheBus' element={<RideTheBus />} />
          {/* Add routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
