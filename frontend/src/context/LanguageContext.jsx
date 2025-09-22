import React, { createContext, useContext, useState, useEffect } from 'react';
import languages from '../config/languages.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('en');
  const [translations, setTranslations] = useState(languages.en);

  useEffect(() => {
    setTranslations(languages[currentLang] || languages.en);
  }, [currentLang]);

  const t = (key) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}