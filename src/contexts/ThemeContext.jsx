import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const storedTheme = localStorage.getItem('isDark');
  const [isDark, setIsDark] = useState(storedTheme === 'true' ? true : false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('isDark', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={{ isDark }}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
