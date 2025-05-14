import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <FooterBranding>
            <LogoContainer>
              <FirstName>KIRA</FirstName>
              <LastName>MARIE</LastName>
            </LogoContainer>
            <TagLine>Menschlich führen. Mutig verändern.</TagLine>
          </FooterBranding>
          
          <FooterLinks>
            <LinkColumn>
              <LinkHeading>Navigation</LinkHeading>
              <Link 
                href="/#about" 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Über Mich
              </Link>
              <Link 
                href="/#study" 
                onClick={() => document.getElementById('study')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Studie
              </Link>
              <Link 
                href="/#portfolio" 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Portfolio
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Kontakt
              </Link>
            </LinkColumn>
            
            <LinkColumn>
              <LinkHeading>Social Media</LinkHeading>
              <Link href="https://www.instagram.com/kiramariecremer" target="_blank" rel="noopener noreferrer">Instagram</Link>
              <Link href="https://twitter.com/kiramariecremer" target="_blank" rel="noopener noreferrer">Twitter</Link>
              <Link href="https://linkedin.com/in/kiramariecremer" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            </LinkColumn>
            
            <LinkColumn>
              <LinkHeading>Rechtliches</LinkHeading>
              <Link href="/impressum">Impressum</Link>
              <Link href="/datenschutz">Datenschutz</Link>
            </LinkColumn>
          </FooterLinks>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>{currentYear} Kira Marie. Alle Rechte vorbehalten.</Copyright>
          <SocialLinks>
            <SocialLink 
              href="https://instagram.com/kiramariecremer" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <Icon icon={FaInstagram} />
            </SocialLink>
            <SocialLink 
              href="https://twitter.com/kiramariecremer" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <Icon icon={FaTwitter} />
            </SocialLink>
            <SocialLink 
              href="https://linkedin.com/in/kiramariecremer" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
            >
              <Icon icon={FaLinkedinIn} />
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #000000; /* Schwarz als Hintergrund */
  padding: 5rem 0 2rem;
  border-top: 1px solid #333333; /* Dunkelgrauer Border für leichten Kontrast */
`;

const Container = styled.div`
  width: 90%;
  max-width: var(--max-width);
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FooterBranding = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

const FirstName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #ffffff; /* Weiß */
  line-height: 1;
`;

const LastName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #ffffff; /* Weiß */
  line-height: 1;
  margin-top: 2px;
`;

const TagLine = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #dddddd; /* Helles Grau für Tagline */
  margin: 0;
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkHeading = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #bbbbbb; /* Helles Grau für Überschriften */
  margin-bottom: 1.5rem;
`;

const Link = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #ffffff; /* Weiß für Links */
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #9370DB; /* Lila als Hover-Farbe für Links */
    transform: translateX(5px);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #333333; /* Dunkelgrauer Border */
`;

const Copyright = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: #aaaaaa; /* Grau für Copyright */
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: #ffffff; /* Weiß für Social Icons */
  font-size: 1.3rem;
  
  &:hover {
    color: #9370DB; /* Lila als Hover-Farbe für Social Icons */
  }
`;

export default Footer;
