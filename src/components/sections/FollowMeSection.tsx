import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaUserTie, FaSpotify } from 'react-icons/fa'; // Beispiel-Icons

const SectionContainer = styled.section`
  background-color: #111111; /* Dunkler Hintergrund, fast schwarz */
  padding: 80px 20px;
  color: #ffffff; /* Weiße Schriftfarbe für Kontrast */
  font-family: 'Montserrat', sans-serif;
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 50px;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 2.2rem; 
  }
`;

const SocialLinksGrid = styled(motion.div)`
  display: grid;
  gap: 20px; 
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px; 
  }
`;

const SocialLinkItem = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05); 
  border-radius: 12px;
  text-decoration: none;
  color: #ffffff;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }

  svg {
    font-size: 3rem; 
    margin-bottom: 15px;
    color: #9370DB; 
  }

  span {
    font-size: 1rem;
    font-weight: 600;
  }
`;

// Platzhalter Social Media Daten
const socialPlatforms = [
  { name: 'LinkedIn', icon: <FaLinkedin />, url: '#' }, 
  { name: 'Instagram', icon: <FaInstagram />, url: '#' }, 
  { name: 'Speaker Profil', icon: <FaUserTie />, url: 'https://disruptingminds.com/speaker/kira-marie-cremer/' },
  { name: 'Spotify', icon: <FaSpotify />, url: '#' }, 
];

const FollowMeSection: React.FC = () => {
  return (
    <SectionContainer id="folge-mir">
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Folge Mir
        </SectionTitle>
        <SocialLinksGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
        >
          {socialPlatforms.map((platform, index) => (
            <SocialLinkItem
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            >
              {platform.icon}
              <span>{platform.name}</span>
            </SocialLinkItem>
          ))}
        </SocialLinksGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FollowMeSection;
