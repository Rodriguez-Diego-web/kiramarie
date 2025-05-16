import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Icon } from '../common/IconWrapper';

// Header component with burger menu for mobile
const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
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

  // Toggle menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <Nav>
        <LogoContainer>
          <FirstName to="/">KIRA</FirstName>
          <LastName to="/">MARIE</LastName>
        </LogoContainer>

        {/* Desktop navigation */}
        <DesktopMenu>
          <MenuItem>
            <MenuLink to="/#about" onClick={() => {
              closeMenu();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}>ÜBER MICH</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#folge-mir" onClick={() => {
              closeMenu();
              document.getElementById('folge-mir')?.scrollIntoView({ behavior: 'smooth' });
            }}>FOLGE MIR</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#funke" onClick={() => {
              closeMenu();
              document.getElementById('funke')?.scrollIntoView({ behavior: 'smooth' });
            }}>FUNKE FEED</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#newsletter" onClick={() => {
              closeMenu();
              document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            }}>NEWSLETTER</MenuLink>
          </MenuItem>
        </DesktopMenu>

        {/* Burger menu toggle */}
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
                <Icon icon={FiMenu} size={26} /> 
              </motion.div>
            ) : (
              <motion.div
                key="x-icon"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Icon icon={FiX} size={26} /> 
              </motion.div>
            )}
          </AnimatePresence>
        </MenuToggle>

        {/* Mobile menu */}
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
                <MobileMenuHeader>
                  <LogoContainerInMenu>
                    <FirstNameInMenu to="/" onClick={closeMenu}>KIRA</FirstNameInMenu>
                    <LastNameInMenu to="/" onClick={closeMenu}>MARIE</LastNameInMenu>
                  </LogoContainerInMenu>
                </MobileMenuHeader>

                <NavLinksList>
                  {/* Hauptlinks */}
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#about" onClick={() => { closeMenu(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>ÜBER MICH</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#folge-mir" onClick={() => { closeMenu(); document.getElementById('folge-mir')?.scrollIntoView({ behavior: 'smooth' }); }}>FOLGE MIR</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#funke" onClick={() => { closeMenu(); document.getElementById('funke')?.scrollIntoView({ behavior: 'smooth' }); }}>FUNKE FEED</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#leistungen" onClick={() => { closeMenu(); document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' }); }}>LEISTUNGEN</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#newsletter" onClick={() => { closeMenu(); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }); }}>NEWSLETTER</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                </NavLinksList>

                <SecondaryLinksList>
                  {/* Sekundäre Links */}
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/impressum" onClick={closeMenu}>Impressum</MobileMenuLinkSecondary>
                  </MobileMenuItemSecondary>
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/datenschutz" onClick={closeMenu}>Datenschutz</MobileMenuLinkSecondary>
                  </MobileMenuItemSecondary>
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/agb" onClick={closeMenu}>AGB</MobileMenuLinkSecondary>
                  </MobileMenuItemSecondary>
                  <MobileMenuItemSecondary>
                    <MobileMenuLinkSecondary to="/kooperationen/funke-feed" onClick={closeMenu}>Funke Feed</MobileMenuLinkSecondary>
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

// Styled components
const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: ${props => props.$scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent'};
  box-shadow: ${props => props.$scrolled ? '0 1px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  height: var(--header-height);
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: var(--max-width);
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FirstName = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: white;
  line-height: 1;
  text-decoration: none;
`;

const LastName = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #cdaffd;
  line-height: 1;
  margin-top: 2px;
  text-decoration: none;
`;

const DesktopMenu = styled.ul`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li``;

const MenuLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: white;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: #cdaffd;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 1001; 
  display: none; 
  padding: 5px; 
  position: relative; 
  width: 36px; 
  height: 36px;
  box-sizing: border-box;

  svg { 
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    display: block; 
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
  display: flex; 
  justify-content: flex-end; 
`;

const MobileMenu = styled(motion.div)`
  width: 100%; 
  height: 100%;
  background-color: #000000; 
  box-shadow: -5px 0px 15px rgba(0,0,0,0.2); 
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px; 
`;

const LogoContainerInMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstNameInMenu = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem; 
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #ffffff;
  line-height: 1;
  text-decoration: none;
`;

const LastNameInMenu = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem; 
  font-weight: 300;
  letter-spacing: 0.08em;
  color: #9370DB; 
  line-height: 1;
  margin-top: 2px;
  text-decoration: none;
`;

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; 
`;

const MobileMenuItem = styled(motion.li)`
  margin-bottom: 15px; 
`;

// Link-Stil für Hauptlinks
const MobileMenuLinkPrimary = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.2rem; 
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 0; 
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: #9370DB; 
  }
`;

const SecondaryLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0; 
  border-top: 1px solid #333333; 
  padding-top: 20px;
`;

const MobileMenuItemSecondary = styled.li`
  margin-bottom: 10px;
`;

// Link-Stil für sekundäre Links
const MobileMenuLinkSecondary = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem; 
  color: #cccccc; 
  text-decoration: none;
  display: block;
  padding: 5px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #9370DB; 
  }
`;

export default Header;
