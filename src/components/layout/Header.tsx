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
            <MenuLink to="/" onClick={(e) => {
              e.preventDefault();
              closeMenu();
              const aboutSection = document.querySelector('#ueber-mich, #about-section, #about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>ÜBER MICH</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#newsletter" onClick={() => {
              closeMenu();
              document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
            }}>NEWSLETTER</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#expertise" onClick={() => {
              closeMenu();
              document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
            }}>EXPERTISE</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#presse" onClick={() => {
              closeMenu();
              document.getElementById('presse')?.scrollIntoView({ behavior: 'smooth' });
            }}>PRESSE</MenuLink>
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
                <Icon icon={FiX} size={26} color="#333333" /> 
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
                <MobileMenuHeader>
                  <LogoContainerInMenu>
                    <LogoLink to="/" onClick={closeMenu}>
                      <Logo src="/images/KMC logo schwarz_02.png" alt="Kira Marie Cremer Logo" />
                    </LogoLink>
                  </LogoContainerInMenu>
                </MobileMenuHeader>

                <NavLinksList>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/" onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      const aboutSection = document.querySelector('#ueber-mich, #about-section, #about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}>ÜBER MICH</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#newsletter" onClick={() => { closeMenu(); document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' }); }}>NEWSLETTER</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#expertise" onClick={() => { closeMenu(); document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' }); }}>EXPERTISE</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#presse" onClick={() => { closeMenu(); document.getElementById('presse')?.scrollIntoView({ behavior: 'smooth' }); }}>PRESSE</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#leistungen" onClick={() => { closeMenu(); document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' }); }}>LEISTUNGEN</MobileMenuLinkPrimary>
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
  padding: 0.5rem 0; // Further reduced vertical padding for thinner header
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
  background: none;
  border: none;
  color: #333333;
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

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1; 
`;

const MobileMenuItem = styled(motion.li)`
  margin-bottom: 15px; 
`;

const MobileMenuLinkPrimary = styled(Link)`
  display: block;
  padding: 1.2rem 2rem;
  font-family: 'Montserrat', sans-serif; /* Reverted font */
  font-size: 2.2rem; /* Reverted size */
  font-weight: 700; /* Reverted weight */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #333333;
  text-decoration: none;
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

const MobileMenuLinkSecondary = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem; 
  color: #555555; 
  text-decoration: none;
  display: block;
  padding: 5px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #9370DB; 
  }
`;

export default Header;
