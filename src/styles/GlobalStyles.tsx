import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Kingdom';
    src: url('/fonts/Kingdom.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/Montserrat-VariableFont_wght.ttf') format('truetype-variations');
    font-weight: 100 900; 
    font-style: normal;
  }

  :root {
    --primary: #cdaffd;
    --secondary: #000000;
    --accent: #cdaffd;
    --text: #333333;
    --text-light: #666666;
    --background: #ffffff;
    --background-alt: #f8f5ff;
    --shadow: rgba(0, 0, 0, 0.05);
    --header-height: 80px;
    --heading-font: 'Kingdom', sans-serif; 
    --body-font: 'Montserrat', sans-serif; 
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--body-font);
    color: var(--text);
    background-color: var(--background);
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--heading-font);
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: var(--heading-font);
  }

  section {
    padding: 80px 0;
  }

  @media (max-width: 768px) {
    section {
      padding: 60px 0;
    }
  }
`;

export default GlobalStyles;
