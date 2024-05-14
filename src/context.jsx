import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;

  const theme = JSON.parse(localStorage.getItem('theme'));

  if (theme === true) {
    return true;
  }

  if (theme === false) {
    return false;
  }

  return prefersDarkMode;
};

export const AppContextProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => getInitialDarkMode());
  const [searchValue, setSearchValue] = useState('pikachu');

  const toggleDarkTheme = () => {
    setIsDarkTheme((prev) => !prev);
    localStorage.setItem('theme', JSON.stringify(!isDarkTheme));
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchValue, setSearchValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error('Global context use outside of provider');
  return value;
};
