import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const attemptScroll = () => {
      if (location.hash) {
        const id = location.hash.substring(1);
        
        let element = document.getElementById(id);
        
        if (!element && (id === 'about-section' || id === 'about' || id === 'aboutsection')) {
          const possibleSelectors = ['#ueber-mich', '#about-section', '#about', '#aboutsection'];
          
          for (const selector of possibleSelectors) {
            const found = document.querySelector(selector);
            if (found) {
              element = found as HTMLElement;
              break;
            }
          }
        }
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          setTimeout(attemptScroll, 500);
        }
      } else if (location.pathname === '/') {
        window.scrollTo(0, 0);
      }
    };
    
    setTimeout(attemptScroll, 500);
  }, [location]);

  return null;
};

export default ScrollToHash;
