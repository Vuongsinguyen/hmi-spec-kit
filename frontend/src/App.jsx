import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './subpages/TopPage';
import Settings from './subpages/Settings';
import { GaugesDemo } from './components/GaugesDemo';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/gauges-demo" element={<GaugesDemo />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
