import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Properties from './components/Properties';
import Reports from './components/Reports';
import Dashboard from './components/Dashboard';
import Layout from './components/design/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;