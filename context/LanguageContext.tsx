"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "mr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (mr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "mr",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (mr) => mr,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("mr");

  useEffect(() => {
    const saved = localStorage.getItem("aapli_bhaji_lang") as Language;
    if (saved && (saved === "mr" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("aapli_bhaji_lang", lang);
  };

  const toggleLanguage = () => {
    const next = language === "mr" ? "en" : "mr";
    setLanguage(next);
  };

  const t = (mr: string, en: string) => {
    return language === "mr" ? mr : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
