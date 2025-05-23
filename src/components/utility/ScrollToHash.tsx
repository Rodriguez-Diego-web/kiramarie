import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to handle scrolling to hash anchors when the page loads.
 * This solves navigation issues when clicking section links from other pages.
 */
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // If we have a hash in the URL
    if (location.hash) {
      // Get the element id by removing the # character
      const id = location.hash.substring(1);
      
      // Find the element by ID
      let element = document.getElementById(id);
      
      // Special case for about section which might have multiple ID variations
      if (!element && (id === 'about-section' || id === 'about')) {
        element = document.querySelector('#ueber-mich, #about-section, #about') as HTMLElement;
      }
      
      // If element exists, scroll to it
      if (element) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else if (location.pathname === '/') {
      // If we're navigating to the homepage without a hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToHash;
