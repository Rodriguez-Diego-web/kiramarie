import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Icon } from '../common/IconWrapper';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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

  const handleSectionNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    closeMenu();
    navigate('/' + sectionId);
  };

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <Nav>
        <LogoContainer>
          <LogoLink to="/">
            <Logo src="/images/KMClogoschwarz.webp" alt="Kira Marie Cremer Logo" fetchPriority="high" />
          </LogoLink>
        </LogoContainer>

        <DesktopMenu>
          <MenuItem>
            <MenuLink to="/#about-section" onClick={(e) => handleSectionNavigation(e, '#about-section')}>ÜBER MICH</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#collaboration" onClick={(e) => handleSectionNavigation(e, '#collaboration')}>ZUSAMMENARBEIT</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/funke-rss">PODCAST</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/whatthework">NEWSLETTER</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/#kontakt" onClick={(e) => handleSectionNavigation(e, '#kontakt')}>KONTAKT</MenuLink>
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
                <Icon icon={FiX} size={26} color="#FFFFFF" />
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
                    <MobileMenuLinkPrimary to="/#about-section" onClick={(e) => handleSectionNavigation(e, '#about-section')}>ÜBER MICH</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#collaboration" onClick={(e) => handleSectionNavigation(e, '#collaboration')}>ZUSAMMENARBEIT</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/funke-rss" onClick={closeMenu}>PODCAST</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/whatthework" onClick={closeMenu}>NEWSLETTER</MobileMenuLinkPrimary>
                  </MobileMenuItem>
                  <MobileMenuItem>
                    <MobileMenuLinkPrimary to="/#kontakt" onClick={(e) => handleSectionNavigation(e, '#kontakt')}>KONTAKT</MobileMenuLinkPrimary>
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
  background-color: #e6dfd7;
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 1px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  height: auto;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem 0;
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
  z-index: 1001;
  margin: 0;
  padding: 0;
  line-height: 0;
`;

const Logo = styled.img`
  height: 55px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const DesktopMenu = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  list-style: none;
  position: relative;
`;

const MenuLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  font-weight: 400;
  text-transform: uppercase;
  color: #333333;
  text-decoration: none;
  padding: 0.05rem 0.6rem;
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
  z-index: 1001;
  padding: 0.5rem;
  margin-right: -0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
`;

const MobileMenu = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: #0A0A0A;
  color: #FFFFFF;
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;

const MobileMenuItem = styled.li`
  width: 100%;
  text-align: center;
`;

const MobileMenuLink = styled(Link)`
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  width: 100%;

  &:hover,
  &:focus {
    color: #CDAFFD;
  }
`;

const MobileMenuLinkPrimary = styled(MobileMenuLink)`
  font-size: 1.8rem;
  font-weight: 500;
  padding: 0.8rem 0;
  text-transform: uppercase;
`;

const SecondaryLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 3rem;
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
  font-size: 1rem;
  font-weight: 400;
  color: #CCCCCC;
  padding: 0.5rem 0;

  &:hover,
  &:focus {
    color: #CDAFFD;
  }
`;

export default Header;
