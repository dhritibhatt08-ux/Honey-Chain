import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { hi } from '../translations/hi';

const LanguageContext = createContext();

const translations = { en, hi };

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('honeychain_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('honeychain_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (path, fallback = '') => {
    const keys = path.split('.');
    let current = translations[lang] || translations.en;

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English if missing in current language
        let enCurrent = translations.en;
        for (const enKey of keys) {
          if (enCurrent && enCurrent[enKey] !== undefined) {
            enCurrent = enCurrent[enKey];
          } else {
            return fallback || path;
          }
        }
        return enCurrent;
      }
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isHindi: lang === 'hi' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
