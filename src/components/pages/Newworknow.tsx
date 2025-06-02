import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import WhatTheWorkTestimonialsSection from '../sections/WhatTheWorkTestimonialsSection';
import WhatTheWorkAboutSection from '../sections/WhatTheWorkAboutSection';
import BeehiivFeedSection from '../sections/BeehiivFeedSection';


const PageWrapper = styled.div`
  background-color: #F9F7F4; /* Light cream background for the page below blue header */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  position: relative; /* Immer position relative für den Container */
`;

const BlueHeaderSection = styled.div`
  background-color: #8facff; /* User specified blue */
  padding: 40px 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px; 
  @media (max-width: 768px) {
    padding: 20px 15px;
    margin-top: 75px;
    min-height: 90px;
  }
`;

const LogoImage = styled.img`
  max-height: 180px; 
  max-width: 90%; 
  display: block; 
  margin-top: 50px;
  margin-left: -750px;
  margin-bottom: -10px;
  @media (max-width: 768px) {
    max-height: 50px;
    margin-left: -125px;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const MainContentSection = styled.div`
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "headline mockups"
    "subscription mockups"
    "text mockups";
  gap: 50px;
  align-items: center; /* Or align-items: start; if preferred */

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "headline"
      "subscription"
      "mockups"
      "text";
    gap: 20px;
    overflow: visible; /* Sicherstellen, dass kein Inhalt abgeschnitten wird */
  }
  
  @media (max-width: 480px) {
    gap: 0; /* Kein Gap für kleine Geräte */
    margin-bottom: 30px; /* Zusätzlicher Abstand unten */
  }
`;

const TextContainer = styled.div`
  grid-area: text;
  @media (max-width: 991px) {
    order: 4;
    margin-top: 40px; /* Mehr Abstand nach dem Mockup - may need adjustment later */
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const Headline = styled.h2`
  grid-area: headline;
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 25px;
  line-height: 1.3;
  max-width: 1200px;
  min-width: 800px;
  width: 100%;
  @media (max-width: 991px) { /* Apply order at the 991px breakpoint */
    order: 1;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    min-width: unset;
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

// Formular-Styling jetzt direkt per Inline-Styles

const SubscriptionBarWrapper = styled.div`
  grid-area: subscription;
  display: flex;
  justify-content: flex-start; /* Align content to the left for desktop */
  width: 100%; /* Take full width of its grid area */

  @media (max-width: 991px) {
    order: 2; /* New mobile order */
    margin-top: 15px; 
    margin-bottom: 20px; 
  }
`;

const DescriptionText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333333;
  max-width: 450px;
  min-width: 30px;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const MockupContainer = styled.div`
  grid-area: mockups;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Immer relative positioniert */
  @media (max-width: 991px) {
    order: 3; /* Adjusted for new mobile layout */
    margin-bottom: 15px;
    width: 100%;
    overflow: visible; /* Ändere von hidden zu visible */
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
    padding-top: 30px; /* Zusätzlicher Platz oben */
    min-height: 300px; /* Erhöhte Mindesthöhe */
  }
`;

const StyledMockupImagesWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -150px;
  min-height: 500px; /* Increased height for larger mockups */

  .mockup-container {
    position: absolute;
    transition: transform 0.5s ease-out;
  }

  .mockup-main {
    z-index: 1;
    img {
      max-width: 500px; /* Increased size */
    }
  }

  .mockup-secondary {
    z-index: 2;
    img {
      max-width: 500px; /* Increased size */
    }
  }
  
  @media (max-width: 991px) {
    margin-top: 0;
    min-height: 350px;
    position: relative; /* Hinzufügen für Positionierungskontext */
  }
  
  @media (max-width: 768px) {
    min-height: auto; /* Adjusted from 500px */
    margin-top: 20px; /* Position mockups lower */
    flex-direction: row; 
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
    .mockup-main img {
      max-width: 250px;
    }
    .mockup-secondary img {
      max-width: 250px;
    }
  }
  
  @media (max-width: 480px) {
    min-height: auto; /* Adjusted from 400px */
    margin-top: 20px; /* Position mockups lower */
    /* margin-left: 150px; Removed for centering */
    z-index: 3;
    flex-direction: row; /* Ensure horizontal layout if desired, or column for stacking */
    align-items: center;
    justify-content: center;
    .mockup-main img {
      max-width: 250px; /* Slightly reduced for very small screens */
      position: relative;
    
    }
    .mockup-secondary img {
      max-width: 250px; /* Slightly reduced for very small screens */
      position: relative;
    }
  }
`;

const StyledMockupImage = styled.img`
  display: block;
  height: auto;
  /* Removed border-radius and box-shadow for clean mockups */
`;



const Newworknow: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textContainerRef, { once: true, amount: 0.3 });
  const mockupsInView = useInView(mockupContainerRef, { once: true, amount: 0.5 });
  
  return (
    <PageWrapper>
      <BlueHeaderSection>
        <LogoImage src="/uploads/NLLogo.png" alt="What The Work Logo" />
      </BlueHeaderSection>

      <MainContentSection>
        <GridLayout>
          <Headline>Jede Woche praktische Hacks für mehr Erfolg in deiner Karriere!</Headline>
          <SubscriptionBarWrapper>
            {/* Beehiiv iframe embed anstelle des benutzerdefinierten Formulars */}
            <div style={{ marginTop: '20px', marginBottom: '20px', width: '100%', maxWidth: '500px' }}>
              <iframe 
                src="https://embeds.beehiiv.com/81fc6fc1-ddd0-4079-81fb-899807142dfd?slim=true" 
                data-test-id="beehiiv-embed" 
                width="100%" 
                height="53" 
                frameBorder="0" 
                scrolling="no" 
                style={{
                  borderRadius: '15px', 
                  border: '1px solid #8facff', 
                  margin: 0, 
                  backgroundColor: 'transparent',
                  minHeight: 'auto'
                }}
                title="Kira Marie Newsletter Subscription"
              />
            </div>
          </SubscriptionBarWrapper>
          <TextContainer>
            {/* Die ursprüngliche Beschreibung bleibt erhalten */}
<div ref={textContainerRef}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={textInView ? { opacity: 1 } : {}}
    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
  >
    <DescriptionText>
      „What The Work?!" ist der Newsletter für alle, die mehr vom Job wollen. Jede Woche gibt's Klartext zu Themen rund um deine Karriere und die neue Arbeitswelt. Mit Hacks, Tipps und Tools, die dich wirklich weiterbringen: Melde dich jetzt an und hol dir Karriere-Input, den du wirklich brauchst!
    </DescriptionText>
  </motion.div>
</div>
          </TextContainer>
          <MockupContainer ref={mockupContainerRef}>
            <StyledMockupImagesWrapper>
              <motion.div
                className="mockup-container mockup-main"
                initial={{ opacity: 0, y: -80 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -80 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <StyledMockupImage src="/images/3.webp" alt="What The Work?! Newsletter Mockup Main" />
              </motion.div>
              <motion.div
                className="mockup-container mockup-secondary"
                initial={{ opacity: 0, y: 80 }}
                animate={mockupsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <StyledMockupImage src="/images/2-small.webp" alt="What The Work?! Newsletter Mockup Secondary" />
              </motion.div>
            </StyledMockupImagesWrapper>
          </MockupContainer>
        </GridLayout>
      </MainContentSection>

      <WhatTheWorkTestimonialsSection />

      <WhatTheWorkAboutSection />
      <BeehiivFeedSection />
    </PageWrapper>
  );
};

export default Newworknow;
