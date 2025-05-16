import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import MediaSection from '../components/sections/MediaSection';
import ContactSection from '../components/sections/ContactSection';
import CollaborationSection from '../components/sections/CollaborationSection';
import FollowMeSection from '../components/sections/FollowMeSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

const SectionsWithDiagonalWrapper = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
`;

const SharedDiagonalLine = styled.div`
  position: absolute;
  background-color: rgba(205, 175, 253, 0.65);
  height: 400px;
  width: 250%;
  transform: rotate(-20deg);
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
      <SectionsWithDiagonalWrapper>
        <SharedDiagonalLine />
        <AboutSection />
        <NewsletterSection />
      </SectionsWithDiagonalWrapper>
      <CollaborationSection />
      <ContactSection />
      <MediaSection />
      <TestimonialsSection />
      <FollowMeSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

export default Home;
