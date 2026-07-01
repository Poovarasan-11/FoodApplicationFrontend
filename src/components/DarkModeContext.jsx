import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('foodie_dark') === 'true';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('foodie_dark', dark);
  }, [dark]);

  function toggleDark() {
    setDark(prev => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
