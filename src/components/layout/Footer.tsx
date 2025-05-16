import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import { VscMail } from 'react-icons/vsc';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In einer echten Anwendung würde hier der Newsletter-Subscribe-Request stehen
    console.log('Newsletter anmeldung mit:', email);
    setEmail('');
    // Hier könnte eine Erfolgsmeldung oder ein API-Call folgen
  };

  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterGradient />
      {/* Lila Hintergrundstreifen für den Newsletter */}
      <NewsletterBackground>
        <Container>
          {/* Newsletter Section */}
          <NewsletterSection>
          <NewsletterContent>
            <NewsletterHeading>Newsletter abonnieren</NewsletterHeading>
            <NewsletterDescription>
              Erhalte monatlich spannende Impulse zu Leadership, Vertrauen und persönlicher Entwicklung direkt in dein Postfach.
            </NewsletterDescription>
          </NewsletterContent>
          <NewsletterForm onSubmit={handleSubmit}>
            <NewsletterInput 
              type="email" 
              placeholder="Deine E-Mail Adresse" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubscribeButton 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowRight />
            </SubscribeButton>
          </NewsletterForm>
          </NewsletterSection>
        </Container>
      </NewsletterBackground>
      
      <Container>
        {/* Main Footer Content */}
        <FooterContent>
          <BrandColumn>
            <LogoContainer>
              <FooterLogo>
                <FirstName>KIRA</FirstName>
                <LastName>MARIE</LastName>
              </FooterLogo>
              <TagLine>Leadership & Vertrauensexpertin</TagLine>
            </LogoContainer>
            
            <SocialLinks>
              {/* Instagram */}
              <SocialLink 
                href="https://www.instagram.com/kira.marie.official/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaInstagram />
              </SocialLink>
              
              {/* LinkedIn */}
              <SocialLink 
                href="https://www.linkedin.com/in/kira-marie/" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <FaLinkedinIn />
              </SocialLink>
              
              {/* Email */}
              <SocialLink 
                href="mailto:kontakt@kira-marie.com" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <VscMail />
              </SocialLink>
            </SocialLinks>
          </BrandColumn>
          
          <LinksSection>
            <LinkColumn>
              <LinkHeading>Navigation</LinkHeading>
              
              <FooterLink
                href="/"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Home
              </FooterLink>
              
              <FooterLink
                href="/about"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Über mich
              </FooterLink>
              
              <FooterLink
                href="/services"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Leistungen
              </FooterLink>
              
              <FooterLink
                href="/impulse"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Impulse
              </FooterLink>
            </LinkColumn>
            
            <LinkColumn>
              <LinkHeading>Kooperationen</LinkHeading>
              
              <FooterLink
                href="/kooperationen/funke-feed"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Funke Feed
              </FooterLink>
              
              <FooterLink
                href="/kooperationen/podcast"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Podcast
              </FooterLink>
              
              <FooterLink
                href="/kooperationen/shopping"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Shopping
              </FooterLink>
            </LinkColumn>
            
            <LinkColumn>
              <LinkHeading>Rechtliches</LinkHeading>
              
              <FooterLink
                href="/impressum"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Impressum
              </FooterLink>
              
              <FooterLink
                href="/datenschutz"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Datenschutz
              </FooterLink>
              
              <FooterLink
                href="/agb"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                AGB
              </FooterLink>
            </LinkColumn>
          </LinksSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>&copy; {currentYear} Kira Marie. Alle Rechte vorbehalten.</Copyright>
          
          <CreatedBy>Designed with ♥ by Diego Rodriguez Web</CreatedBy>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #0a0a0a;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: visible;
  z-index: 1;
  margin-top: 6rem; /* Verschiebt den schwarzen Hintergrund nach unten */
`;

const FooterGradient = styled.div`
  position: absolute;
  top: -150px;
  right: -150px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(205, 175, 253, 0.15) 0%, rgba(205, 175, 253, 0) 70%);
  z-index: -1;
`;

const NewsletterBackground = styled.div`
  background: linear-gradient(90deg, rgba(147, 112, 219, 0.2) 0%, rgba(147, 112, 219, 0.3) 50%, rgba(147, 112, 219, 0.2) 100%);
  padding: 0;
  width: 100%;
  position: relative;
  overflow: visible;
`;

const Container = styled.div`
  width: 92%;
  max-width: 1200px;
  margin: 0 auto;
`;

const NewsletterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  padding: 2.5rem;
  border-radius: 16px;
  margin-top: -12rem; /* Stärkere negative margin, um auf derselben Position zu bleiben */
  margin-bottom: 4rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
    text-align: center;
    gap: 1.5rem;
    margin-top: -10rem;
  }
`;

const NewsletterContent = styled.div`
  flex: 1;
`;

const NewsletterHeading = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const NewsletterDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #cccccc;
  font-size: 0.95rem;
  line-height: 1.6;
  max-width: 500px;
`;

const NewsletterForm = styled.form`
  display: flex;
  max-width: 400px;
  width: 100%;
  position: relative;
  align-items: center;
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  height: 46px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(205, 175, 253, 0.5);
    box-shadow: 0 0 0 2px rgba(205, 175, 253, 0.25);
  }
`;

const SubscribeButton = styled(motion.button)`
  position: absolute;
  right: 8px;
  top: 0;
  bottom: 0;
  margin: auto;
  background: linear-gradient(135deg, #cdaffd 0%, #9370DB 100%);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
`;

const FirstName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #ffffff;
  display: block;
`;

const LastName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #cdaffd 0%, #b490eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: block;
`;

const TagLine = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #ffffff;
  margin: 0;
  opacity: 0.8;
`;

const LinksSection = styled.div`
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
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #cdaffd;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 2rem;
    height: 2px;
    background: linear-gradient(to right, rgba(205, 175, 253, 0.7), rgba(205, 175, 253, 0));
  }
`;

const FooterLink = styled(motion.a)`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #e0e0e0;
  margin-bottom: 1rem;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 0px solid #cdaffd;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #cdaffd;
    
    &::before {
      left: -15px;
      border-left-width: 4px;
      opacity: 1;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: #aaaaaa;
`;

const CreatedBy = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: #aaaaaa;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled(motion.a)`
  color: #ffffff;
  font-size: 1.4rem;
  background-color: rgba(255, 255, 255, 0.1);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(205, 175, 253, 0.2);
  }
`;

export default Footer;
