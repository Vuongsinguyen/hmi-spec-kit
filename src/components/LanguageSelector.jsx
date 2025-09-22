import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSelector.css';

export function LanguageSelector() {
  const { t, currentLang, setCurrentLang } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'zh-CN', name: '简体中文' },
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'es', name: 'Español' },
    { code: 'ko', name: '한국어' },
    { code: 'de', name: 'Deutsch' }
  ];

  return (
    <div className="language-selector">
      <label className="language-label">{t('common.language')}:</label>
      <select
        className="language-select"
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}