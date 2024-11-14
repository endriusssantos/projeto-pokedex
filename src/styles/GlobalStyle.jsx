import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Play", sans-serif;
    background: ${({ theme }) =>
      theme.isDark
        ? 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(75,72,72,1) 50%, rgba(0,0,0,1) 100%);'
        : 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(130,198,255,1) 0%, rgba(188,161,255,1) 48%, rgba(255,155,221,1) 100%)'};
    transition: background 0.3s ease; // Para transição suave
  }
`;

export { GlobalStyle };
