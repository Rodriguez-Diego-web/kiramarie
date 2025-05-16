import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
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

interface HomeSeoData {
  title: string;
  description: string;
  og_image: string;
}

const Home: React.FC = () => {
  const [seoData, setSeoData] = useState<HomeSeoData>({
    title: "Kira Marie - Leadership & Vertrauensexpertin | Executive Coach, Speakerin, Autorin",
    description: "Kira Marie ist Ihre Expertin für Leadership und Vertrauen. Als Executive Coach, Speakerin und Autorin unterstützt sie Führungskräfte und Unternehmen auf dem Weg zu nachhaltigem Erfolg und starker Führungskultur.",
    og_image: "/uploads/og-default.jpg"
  });
  
  useEffect(() => {
    fetch('/data/homeSeoData.json')
      .then(response => {
        if (!response.ok) throw new Error('Could not load SEO data');
        return response.json();
      })
      .then(data => setSeoData(data))
      .catch(error => console.error('Error loading SEO data:', error));
  }, []);
  
  return (
    <HomeContainer>
      <Helmet>
        {/* Dynamisch aus dem CMS-generierten SEO-Daten */}
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={seoData.title.split(' | ')[0]} /> {/* Nur den ersten Teil des Titels für OG */}
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kiramarie.app/" />
        <link rel="canonical" href="https://www.kiramarie.app/" />
        <meta property="og:image" content={`https://www.kiramarie.app${seoData.og_image}`} />
        <meta property="og:site_name" content="Kira Marie" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title.split(' | ')[0]} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={`https://www.kiramarie.app${seoData.og_image}`} />
        {/* <meta name="twitter:site" content="@DeinTwitterHandle" /> Falls vorhanden */}
        {/* <meta name="twitter:creator" content="@DeinTwitterHandle" /> Falls vorhanden */}
        
        {/* Strukturierte Daten (JSON-LD) */}
        {/* Strukturierte Daten für Person Schema - später ergänzen mit image und description */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kira Marie",
            "jobTitle": "Leadership & Vertrauensexpertin, Executive Coach, Speakerin, Autorin",
            "url": "https://www.kiramarie.app",
            "sameAs": [
              "https://instagram.com/kiramariecremer", 
              "https://twitter.com/kiramariecremer", 
              "https://linkedin.com/in/kiramariecremer"
            ]
          })}
        </script>
      </Helmet>
      <HeroSection />
      <SectionsWithDiagonalWrapper>
        <SharedDiagonalLine />
        <AboutSection />
        <FollowMeSection />
        <NewsletterSection />
      </SectionsWithDiagonalWrapper>
      <CollaborationSection />
      <TestimonialsSection />
      <ContactSection />
      <MediaSection />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

export default Home;
