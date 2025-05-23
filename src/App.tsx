import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Home from './pages/Home';
import FunkeFeedPage from './components/pages/FunkeFeedPage';
import FunkeRssPage from './pages/FunkeRssPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kooperationen/funke-feed" element={<FunkeFeedPage />} />
          <Route path="/funke-rss" element={<FunkeRssPage />} />
          {/* Add more routes as needed */}
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
