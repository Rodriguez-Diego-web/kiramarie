import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import MediaSection from '../components/sections/MediaSection';
import ContactSection from '../components/sections/ContactSection';
import CollaborationSection from '../components/sections/CollaborationSection';
import FollowMeSection from '../components/sections/FollowMeSection'; // Neuer Import

// Wrapper für Sektionen, die die diagonale Linie teilen sollen
const SectionsWithDiagonalWrapper = styled.div`
  position: relative; /* Wichtig für die absolute Positionierung der Linie darin */
  padding: 0; /* Kein extra Padding, da die Sektionen ihr eigenes haben */
  margin: 0;
`;

// NEU: Geteilte diagonale Linie
const SharedDiagonalLine = styled.div`
  position: absolute;
  background-color: rgba(205, 175, 253, 0.65); /* Helles Lila */
  height: 400px; /* Höhe so, dass sie beide Sektionen abdeckt, ggf. anpassen */
  width: 250%;  /* Sehr breit, um die Diagonale über mehrere Sektionen abzudecken */
  transform: rotate(-20deg); /* Winkel der Linie, ggf. anpassen */
  left: -75%;   /* Startet weit links außerhalb des sichtbaren Bereichs */
  top: 20%;      /* Erhöht von 10% */
  z-index: 1;   /* Liegt hinter dem Sektionsinhalt (der z-index: 2 hat) */
  pointer-events: none;

  @media (max-width: 991px) {
    height: 350px;
    top: 25%;    /* Erhöht von 15% */
    transform: rotate(-22deg);
  }
  @media (max-width: 767px) {
    height: 300px;
    top: 30%;    /* Erhöht von 20% */
    transform: rotate(-24deg);
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection />
      {/* Neuer Wrapper umschließt About und Newsletter */}
      <SectionsWithDiagonalWrapper>
        <SharedDiagonalLine /> {/* Linie ist jetzt *innerhalb* des Wrappers */}
        <AboutSection />
        <NewsletterSection />
      </SectionsWithDiagonalWrapper>
      <CollaborationSection />
      <ContactSection />
      {/* <ExpertNetworkSection /> */}
      <MediaSection />
      <FollowMeSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative; /* Erforderlich für die absolute Positionierung der SharedDiagonalLine */
`;

export default Home;
