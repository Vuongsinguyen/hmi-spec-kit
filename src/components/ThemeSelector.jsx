import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeSelector.css';

export function ThemeSelector() {
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  const themeOptions = [
    { key: 'standard', name: 'Standard', icon: '☀️' },
    { key: 'darkNight', name: 'Dark Night', icon: '🌙' },
    { key: 'hmiClassic', name: 'HMI Classic', icon: '⚙️' },
    { key: 'hmiFuture', name: 'HMI Future', icon: '🚀' },
  ];

  return (
    <div className="theme-selector">
      <label className="theme-label">Theme:</label>
      <select
        className="theme-select"
        value={currentTheme}
        onChange={(e) => setCurrentTheme(e.target.value)}
      >
        {themeOptions.map(theme => (
          <option key={theme.key} value={theme.key}>
            {theme.icon} {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}