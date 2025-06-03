import React, { useEffect, useState } from 'react';
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
import Newworknow from './components/pages/Newworknow'; // Import der umbenannten Newsletter-Seite

function App() {
  // Prüfe, ob wir auf newworknow.de sind
  const [isNewworkNowDomain, setIsNewworkNowDomain] = useState(false);
  
  useEffect(() => {
    // Prüfe die aktuelle Domain, sobald die Komponente im Browser geladen ist
    const hostname = window.location.hostname;
    setIsNewworkNowDomain(
      hostname === 'newworknow.de' ||
      hostname === 'www.newworknow.de' ||
      // Für Testzwecke auch lokale Entwicklung berücksichtigen
      (hostname === 'localhost' && window.location.pathname === '/newworknow-standalone')
    );
  }, []);
  
  // Wenn wir auf newworknow.de sind, zeige nur die Newsletter-Seite ohne Header/Footer
  if (isNewworkNowDomain) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Newworknow />
      </ThemeProvider>
    );
  }
  
  // Auf kiramariecremer.de zeigen wir die vollständige Website mit allen Routen
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
          <Route path="/whatthework" element={<Newworknow />} /> {/* Route für Newsletter-Seite */}
          {/* Für Entwicklungszwecke zusätzliche Route */}
          <Route path="/newworknow-standalone" element={<Newworknow />} />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
