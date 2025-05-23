import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to handle scrolling to hash anchors when the page loads.
 * This solves navigation issues when clicking section links from other pages.
 */
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    // Attempt to scroll after a delay to ensure everything is loaded
    const attemptScroll = () => {
      // If we have a hash in the URL
      if (location.hash) {
        // Get the element id by removing the # character
        const id = location.hash.substring(1);
        console.log('ScrollToHash: Attempting to scroll to', id);
        
        // Find the element by ID
        let element = document.getElementById(id);
        console.log('Element found by ID:', !!element);
        
        // Try different variations for the about section
        if (!element && (id === 'about-section' || id === 'about' || id === 'aboutsection')) {
          console.log('About section special case, trying multiple selectors');
          const possibleSelectors = ['#ueber-mich', '#about-section', '#about', '#aboutsection'];
          
          for (const selector of possibleSelectors) {
            const found = document.querySelector(selector);
            if (found) {
              console.log('Found about section with selector:', selector);
              element = found as HTMLElement;
              break;
            }
          }
        }
        
        // If element exists, scroll to it
        if (element) {
          console.log('ScrollToHash: Scrolling to element');
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log('ScrollToHash: Element not found, trying again in 500ms');
          // Try again after a slightly longer delay
          setTimeout(attemptScroll, 500);
        }
      } else if (location.pathname === '/') {
        // If we're navigating to the homepage without a hash, scroll to top
        window.scrollTo(0, 0);
      }
    };
    
    // Initial delay to ensure page has loaded
    setTimeout(attemptScroll, 500);
  }, [location]);

  return null; // This component doesn't render anything
};

export default ScrollToHash;
