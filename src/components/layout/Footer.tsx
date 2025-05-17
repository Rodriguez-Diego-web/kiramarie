import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { VscMail } from 'react-icons/vsc';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <BrandSection>
            <NameContainer>
              <FirstName>KIRA</FirstName>
              <LastName>MARIE</LastName>
            </NameContainer>
            
            <TagLine>Leadership & Vertrauensexpertin</TagLine>
            
            <SocialLinks>
              <SocialLink 
                href="https://www.instagram.com/kiramariecremer/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </SocialLink>
              
              <SocialLink 
                href="https://www.linkedin.com/in/kiramariecremer/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </SocialLink>
              
              <SocialLink 
                href="mailto:kontakt@kira-marie.com" 
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <VscMail />
              </SocialLink>
            </SocialLinks>
          </BrandSection>
          
          <LinksSection>
            <LinkGroup>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">Über mich</FooterLink>
              <FooterLink href="/services">Leistungen</FooterLink>
              <FooterLink href="/impulse">Impulse</FooterLink>
            </LinkGroup>
            
            <LinkGroup>
              <FooterLink href="/impressum">Impressum</FooterLink>
              <FooterLink href="/datenschutz">Datenschutz</FooterLink>
              <FooterLink href="/agb">AGB</FooterLink>
            </LinkGroup>
          </LinksSection>
        </FooterContent>
        
        <Divider />
        
        <FooterBottom>
          <Copyright>&copy; {currentYear} Kira Marie. Alle Rechte vorbehalten.</Copyright>
          <CreatedBy>Designed by Diego Rodriguez Web</CreatedBy>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #0a0a0a;
  padding: 3rem 0 1.5rem;
  width: 100%;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
  display: block;
`;

const LastName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #cdaffd;
  display: block;
`;

const TagLine = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: #cccccc;
  margin: 0;
`;

const LinksSection = styled.div`
  display: flex;
  gap: 4rem;
  
  @media (max-width: 576px) {
    gap: 2rem;
    flex-wrap: wrap;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const FooterLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #cccccc;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #cdaffd;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.07);
  margin: 2.5rem 0 1.5rem 0;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #888888;
  margin: 0;
`;

const CreatedBy = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #888888;
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #ffffff;
  font-size: 1.2rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: #cdaffd;
  }
`;

export default Footer;
