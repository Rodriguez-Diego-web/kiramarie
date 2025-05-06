import React from 'react';
import styled from 'styled-components';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import StudySection from '../components/sections/StudySection';
import ExpertNetworkSection from '../components/sections/ExpertNetworkSection';
import MediaSection from '../components/sections/MediaSection';
import ContactSection from '../components/sections/ContactSection';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection />
      <AboutSection />
      <StudySection />
      <ExpertNetworkSection />
      <MediaSection />
      <ContactSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.main`
  width: 100%;
  overflow-x: hidden;
`;

export default Home;
