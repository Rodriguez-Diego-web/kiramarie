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
            <MenuLink to="/#study" onClick={() => {
              closeMenu();
              document.getElementById('study')?.scrollIntoView({ behavior: 'smooth' });
            }}>STUDIE</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#network" onClick={() => {
              closeMenu();
              document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' });
            }}>NETZWERK</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#contact" onClick={() => {
              closeMenu();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>KONTAKT</MenuLink>
          </MenuItem>
        </DesktopMenu>

        {/* Burger menu toggle */}
        <MenuToggle onClick={toggleMenu}>
          {isOpen ? <Icon icon={FiX} size={24} /> : <Icon icon={FiMenu} size={24} />}
        </MenuToggle>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MobileMenu
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, type: 'tween' }}
              >
                <MobileMenuHeader>
                  <MobileMenuClose onClick={closeMenu}>
                    <Icon icon={FiX} size={24} />
                  </MobileMenuClose>
                </MobileMenuHeader>
                <MobileMenuItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <MobileMenuLink to="/#about" onClick={() => {
                    closeMenu();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}>ÜBER MICH</MobileMenuLink>
                </MobileMenuItem>
                <MobileMenuItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <MobileMenuLink to="/#study" onClick={() => {
                    closeMenu();
                    document.getElementById('study')?.scrollIntoView({ behavior: 'smooth' });
                  }}>STUDIE</MobileMenuLink>
                </MobileMenuItem>
                <MobileMenuItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <MobileMenuLink to="/#network" onClick={() => {
                    closeMenu();
                    document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' });
                  }}>NETZWERK</MobileMenuLink>
                </MobileMenuItem>
                <MobileMenuItem
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <MobileMenuLink to="/#contact" onClick={() => {
                    closeMenu();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}>KONTAKT</MobileMenuLink>
                </MobileMenuItem>
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
  background-color: ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent'};
  box-shadow: ${props => props.$scrolled ? '0 1px 8px rgba(0, 0, 0, 0.05)' : 'none'};
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
  color: var(--secondary);
  line-height: 1;
  text-decoration: none;
`;

const LastName = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: var(--secondary);
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
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--secondary);
  text-decoration: none;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: var(--accent);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  color: var(--secondary);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.ul)`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--secondary);
`;

const MobileMenuItem = styled(motion.li)``;

const MobileMenuLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--secondary);
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  
  &:hover {
    color: var(--accent);
  }
`;

export default Header;
