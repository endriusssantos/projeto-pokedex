import React from 'react';
import { AppRoutes } from './pages/routes';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from './contexts/ThemeContext';
import { PokemonListProvider } from './contexts/PokemonListContext';

function App() {
  return (
    <>
      <ThemeProvider>
        <PokemonListProvider>
          <GlobalStyle />
          <AppRoutes />
        </PokemonListProvider>
      </ThemeProvider>
    </>
  );
}

export default App;