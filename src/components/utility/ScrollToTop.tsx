import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation(); // Ganze Location verwenden

  useEffect(() => {
    // Nur zum Seitenanfang scrollen, wenn kein Hash in der URL ist.
    // Wenn ein Hash vorhanden ist, soll ScrollToHash die Navigation übernehmen.
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]); // location.hash zur Dependency-Liste hinzugefügt

  return null;
}

export default ScrollToTop;
