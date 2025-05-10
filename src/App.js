import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const pageSize = 9;

  return (
    <div>
      <Router>
        <LoadingBar height={4} color="#f11946" progress={progress} />
        <Navbar />
        <Routes>
          <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
          <Route path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />} />
          <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology" />} />
          <Route path="*" element={<News setProgress={setProgress} key="default" pageSize={pageSize} country="us" category="general" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
