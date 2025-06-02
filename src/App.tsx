import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import ScrollToHash from './components/utility/ScrollToHash';
import ScrollToTop from './components/utility/ScrollToTop';
import Home from './pages/Home';
import FunkeFeedPage from './components/pages/FunkeFeedPage';
import Qtthework from './components/pages/whatthework'; // Import der neuen Seite

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToHash />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/funke-rss" element={<FunkeFeedPage />} />
          <Route path="/whatthework" element={<Qtthework />} /> {/* Neue Route für whatthework */}
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
