import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const NewsletterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  
  // Höhere Schwelle für mobiles Gerät (50% des Elements muss sichtbar sein)
  const isInView = useInView(sectionRef, { once: true, amount: 0.5 });
  const mockupsInView = useInView(mockupContainerRef, { once: true, amount: 0.7 });
  
  return (
    <NewsletterWrapper id="newsletter" ref={sectionRef}>
      <ContentContainer>
        <KingdomTitle>Mein Newsletter</KingdomTitle>
        <NewsletterContent>
          <MockupImageContainer ref={mockupContainerRef}>
            <MockupImagesWrapper>
              <motion.div
                initial={{ opacity: 0, y: -80 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="mockup-container mockup-1"
              >
                <MockupImage 
                  src="/images/3-small.webp" 
                  alt="What The Work?! Newsletter Mockup 1" 
                  className="newsletter-image"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="mockup-container mockup-2"
              >
                <MockupImage 
                  src="/images/2-small.webp" 
                  alt="What The Work?! Newsletter Mockup 2" 
                  className="newsletter-image"
                />
              </motion.div>
            </MockupImagesWrapper>
          </MockupImageContainer>
          
          <TextContentContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <NewsletterTitle>
                In meinem wöchentlichen Newsletter „What The Work?!“ schreibe ich jede Woche über Karriere-Hacks, die dich wirklich weiterbringen: klar, praxisnah und auf den Punkt.
              </NewsletterTitle>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <NewsletterSubtext>
                Ob Mindset, Selbstorganisation oder Future Skills: Ich teile, was funktioniert und was ich gern früher gewusst hätte.
              </NewsletterSubtext>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <SubscribeForm>
                <EmailInput 
                  type="email" 
                  placeholder="Enter your email" 
                />
                <SubscribeButton>
                  Subscribe
                </SubscribeButton>
              </SubscribeForm>
            </motion.div>
          </TextContentContainer>
        </NewsletterContent>
      </ContentContainer>
    </NewsletterWrapper>
  );
};

const NewsletterWrapper = styled.section`
  width: 100%;
  background-color: #ffffff;
  padding: 80px 0; /* Desktop default */
  position: relative;

  @media (max-width: 991px) {
    padding: 50px 0; /* Mobile: Reduced padding */
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const KingdomTitle = styled.h3`
  font-family: 'Kingdom', sans-serif;
  font-size: 4rem;
  font-weight: normal;
  color: #000000;
  position: absolute;
  top: -20px;
  right: 100px; /* Auf der rechten Seite positioniert */
  z-index: 5;
  margin: 0;
  padding: 0 15px;
  display: inline-block;
  
  /* Blauer Hintergrund, der nur 50% der Höhe einnimmt */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 15%; /* Startet bei 25% von unten */
    width: 110%;
    height: 35%; /* Nimmt nur 50% der Höhe ein */
    background-color: #86a4fd; /* Blaue Farbe wie beim SPEAKINGS Button */
    z-index: -1;
  }
  
  @media (max-width: 991px) {
    font-size: 3.5rem;
    right: 60px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    right: 40px;
    padding: 0 10px;
  }
`;

const NewsletterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Desktop default */
  gap: 40px; /* Desktop default */
  align-items: center;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr; /* Mobile: Stack */
    gap: 30px; /* Mobile: Adjusted gap */
  }
`;

const MockupImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 991px) {
    order: 1;
  }
`;

// Keine spezifischen Interfaces mehr nötig, da wir Framer Motion direkt verwenden

const MockupImagesWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
  
  /* Styling für die Container der Bilder */
  .mockup-container {
    position: relative;
  }
  
  /* Die Bilder überlappen sich stark */
  .mockup-1 {
    z-index: 1;
    margin-right: -560px; /* Stärkerer negativer Margin für mehr Überlappung */
  }
  
  .mockup-2 {
    z-index: 2;
  }
  
  /* Verbesserte mobile Anpassungen */
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    .mockup-1 {
      margin-right: -300px; /* Mehr Überlappung auf mobilen Geräten */
      max-width: 65%; /* Kleinere Bilder auf mobilen Geräten */
    }
    
    .mockup-2 {
      max-width: 65%; /* Kleinere Bilder auf mobilen Geräten */
    }
  }
  
  /* Noch mehr Überlappung für sehr kleine Geräte */
  @media (max-width: 480px) {
    .mockup-1 {
      margin-right: -250px;
      max-width: 75%;
    }
    
    .mockup-2 {
      max-width: 75%;
    }
  }
`;

const MockupImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  will-change: transform, opacity; /* Performance-Optimierung */
  border-radius: 8px; /* Abgerundete Ecken */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Einheitlicher Schatten */
  object-fit: contain; /* Behält Seitenverhältnis bei */

  &.newsletter-image {
    width: 340px; /* Feste Breite für beide Bilder */
    aspect-ratio: 520 / 720; /* Festgelegtes Seitenverhältnis */
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    
    &.newsletter-image {
      width: 280px; /* Kleinere Breite auf mobilen Geräten */
    }
  }
  
  @media (max-width: 480px) {
    &.newsletter-image {
      width: 220px; /* Noch kleinere Breite auf sehr kleinen Geräten */
    }
  }
`;

const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px; /* Desktop default */
  
  @media (max-width: 991px) {
    order: 2;
    text-align: center;
    gap: 15px; /* Mobile: Reduced gap */
  }
`;

const NewsletterTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NewsletterSubtext = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin: 0;
`;

const SubscribeForm = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  
  @media (max-width: 768px) {
    flex-direction: row; /* Keep elements in a row */
    gap: 0; /* No gap between input and button */
    align-items: stretch; /* Make input and button same height */
    background-color: #f0f0f0; /* Background for the combined unit */
    border: 1px solid #e0e0e0; /* Border for the unit */
    border-radius: 8px; /* Rounded corners for the unit */
    padding: 4px; /* Internal padding for the unit */
  }
`;

const EmailInput = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 15px;
  border: 1px solid #ddd; /* Desktop default */
  border-radius: 4px 0 0 4px; /* Desktop default */
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  background-color: #fff; /* Desktop default */
  
  @media (max-width: 768px) {
    border-radius: 6px 0 0 6px; /* Mobile: rounded corners on left */
    width: auto; /* Override previous 100% width if any */
    border: none; /* Mobile: no individual border */
    background-color: #fff; /* Mobile: white background inside the form unit */
    height: 38px; /* Mobile: fixed height */
    padding: 0 12px; /* Mobile: adjusted padding */
    /* flex: 1; is already defined for desktop and applies here */
  }
`;

const SubscribeButton = styled.button`
  height: 44px;
  padding: 0 20px;
  background-color: #8facfd;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0; /* Desktop default */
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #7b9af9;
  }
  
  @media (max-width: 768px) {
    border-radius: 0 6px 6px 0; /* Mobile: rounded corners on right */
    width: auto; /* Override previous 100% width if any */
    height: 38px; /* Mobile: fixed height, matching input */
    padding: 0 18px; /* Mobile: adjusted padding */
  }
`;

export default NewsletterSection;
