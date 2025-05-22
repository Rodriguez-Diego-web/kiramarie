import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Icon } from '../common/IconWrapper';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <Nav>
        <LogoContainer>
          <LogoLink to="/">
            <Logo src="/images/KMC logo schwarz_02.png" alt="Kira Marie Cremer Logo" />
          </LogoLink>
        </LogoContainer>

        <DesktopMenu>
          <MenuItem>
            <MenuLink to="/#about-section" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              const aboutSection = document.querySelector('#ueber-mich, #about-section, #about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>ÜBER MICH</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#presse" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              document.getElementById('presse')?.scrollIntoView({ behavior: 'smooth' });
            }}>ZUSAMMENARBEIT</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#collaboration" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' });
            }}>PODCAST: NEW WORK NOW</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#kontakt" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
            }}>KONTAKT</MenuLink>
          </MenuItem>
        </DesktopMenu>

        <MenuToggle onClick={toggleMenu}>
          <AnimatePresence mode="wait" initial={false}>
            {!isOpen ? (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Icon icon={FiMenu} size={26} color="#333333" /> 
              </motion.div>
            ) : (
              <motion.div
                key="x-icon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Icon icon={FiX} size={26} color="#FFFFFF" /> {/* Changed to white for dark menu */}
              </motion.div>
            )}
          </AnimatePresence>
        </MenuToggle>

        <AnimatePresence>
          {isOpen && (
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu} 
            >
              <MobileMenu
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, type: 'tween' }} 
                onClick={(e) => e.stopPropagation()} 
              >
                <NavLinksList>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#about-section" onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      const aboutSection = document.querySelector('#ueber-mich, #about-section, #about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}>ÜBER MICH</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#presse" onClick={(e) => {
                      e.preventDefault();
                      closeMenu(); 
                      document.getElementById('presse')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}>ZUSAMMENARBEIT</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#collaboration" onClick={(e) => {
                      e.preventDefault();
                      closeMenu(); 
                      document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}>PODCAST: NEW WORK NOW</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#kontakt" onClick={(e) => {
                      e.preventDefault();
                      closeMenu(); 
                      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' }); 
                    }}>KONTAKT</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                </NavLinksList>

                <SecondaryLinksList>
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/impressum" onClick={closeMenu}>Impressum</MobileMenuLinkSecondary>
                  </MobileMenuItemSecondary>
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/datenschutz" onClick={closeMenu}>Datenschutz</MobileMenuLinkSecondary>
                  </MobileMenuItemSecondary>
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/agb" onClick={closeMenu}>AGB</MobileMenuLinkSecondary>
                  </MobileMenuItemSecondary>

                </SecondaryLinksList>

              </MobileMenu>
            </MobileMenuOverlay>
          )}
        </AnimatePresence>
      </Nav>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: #e6dfd7; // Always beige
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 1px 8px rgba(0, 0, 0, 0.2)' : 'none'}; // Shadow based on scroll
  height: auto; // Let content determine height
  padding: 0.5rem 0; // Default/Desktop vertical padding
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 0; // Increased vertical padding for mobile
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`;

const LogoLink = styled(Link)`
  z-index: 1001; // Ensure logo is above mobile menu background
  margin: 0;
  padding: 0;
  line-height: 0; /* Removes extra space below image */
`;

const Logo = styled.img`
  height: 55px; /* Increased */
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 36px; /* Increased */
  }
`;

const DesktopMenu = styled.ul`
  display: flex;
  gap: 1.5rem; /* Reduced gap between items */

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  list-style: none; /* Remove default list item marker */
  position: relative; /* For potential ::before elements */

  /* Attempt to remove any existing dot/separator from ::before */
  &::before {
    display: none !important; 
    content: '' !important;
  }

  /* Remove styling for specific separator if it's done via first-child/last-child logic */
  &:not(:first-child)::before {
    display: none !important;
    content: '' !important;
  }
`;

const MenuLink = styled(Link)`
  font-family: 'Almarai', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  font-weight: 400; /* Changed to regular weight */
  text-transform: uppercase;
  color: #333333;
  text-decoration: none;
  padding: 0.05rem 0.6rem; /* Minimal vertical padding, reduced horizontal */
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #8c7851; 
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001; /* Ensure toggle is above overlay */
  padding: 0.5rem;
  margin-right: -0.5rem; /* Counteract padding for alignment */

  @media (max-width: 768px) {
    display: block;
    /* Adjust icon color if needed when menu is open, handled by FiX props for now */
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay, can be removed if menu is solid */
  z-index: 999; /* Below toggle, above page content */
  display: flex; /* To help position MobileMenu if needed, though MobileMenu is also fixed */
  justify-content: flex-end; /* If menu wasn't full width and sliding from right */
`;

const MobileMenu = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0; /* Start from the right edge */
  width: 100%; /* Full width */
  height: 100vh; /* Full viewport height */
  background-color: #0A0A0A; /* Dark background - same as footer */
  color: #FFFFFF; /* White text for links */
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Above overlay, below toggle if toggle needs to be on top of it */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
  overflow-y: auto; /* Scroll if content exceeds height */
`;

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center links */
  gap: 1.5rem; /* Increased gap */
  width: 100%;
`;

const MobileMenuItem = styled.li`
  width: 100%;
  text-align: center;
`;

const MobileMenuLink = styled(Link)` // Generic link for reuse
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  width: 100%;

  &:hover,
  &:focus {
    color: #CDAFFD; /* Accent color on hover */
  }
`;

const MobileMenuLinkPrimary = styled(MobileMenuLink)`
  font-size: 1.8rem; /* Larger font size for primary links */
  font-weight: 500;
  padding: 0.8rem 0;
  text-transform: uppercase;
`;

const SecondaryLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 3rem; /* Space above secondary links */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const MobileMenuItemSecondary = styled.li`
  width: 100%;
  text-align: center;
`;

const MobileMenuLinkSecondary = styled(MobileMenuLink)`
  font-size: 1rem; /* Standard font size for secondary */
  font-weight: 400;
  color: #CCCCCC; /* Slightly dimmer color for secondary links */
  padding: 0.5rem 0;

  &:hover,
  &:focus {
    color: #CDAFFD;
  }
`;

export default Header;
