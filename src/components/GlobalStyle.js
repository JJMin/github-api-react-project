import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Assistant:400,700&display=swap');

  // minimal CSS reset
  *,
  *:before,
  *:after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
  font-family: 'Assistant', sans-serif;
  }

  html {
  box-sizing: border-box;
  font-size: 62.5%;
  }

  body {
  font-size: 1.6rem;
  }

  li {
    list-style: none;
  }
`;

export default GlobalStyle;
