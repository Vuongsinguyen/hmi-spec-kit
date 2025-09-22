import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './ControlPanel.css';

export function ControlPanel() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="control-panel glass-panel">
      <h3 className="control-title">{t('common.settings') || 'Settings'}</h3>
      <div className="control-grid">
        <div className="control-item">
          <label>{t('common.language') || 'Language'}</label>
          <LanguageSelector />
        </div>
        <div className="control-item">
          <label>Theme</label>
          <ThemeSelector />
        </div>
      </div>
      <div className="theme-info">
        <small>Current theme: <strong>{theme.name}</strong></small>
      </div>
    </div>
  );
}