import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const NewsletterContainer = styled.section`
  width: 100%;
  background-color: #ffffff;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 0 20px;
`;

const PurpleBox = styled(motion.div)`
  position: absolute;
  background-color: #9370DB; /* Lila Farbe */
  height: 30px; /* Höhe angepasst */
  width: 100%; /* Volle Breite des Titels */
  z-index: -1;
  bottom: -10px; /* Leicht nach oben verschoben vom unteren Rand des Textes */
  left: 0;
`;

const Title = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1c1c1c;
  margin-bottom: 20px;
  text-align: center;
  position: relative; /* Für die absolute Positionierung des Kastens */
`;

const Subtitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  max-width: 650px;
  text-align: center;
  margin-bottom: 40px;
`;

const FormPlaceholder = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background-color: transparent;
  border-radius: 16px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;

// Animationseffekte
const fadeInUpAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const NewsletterSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  return (
    <NewsletterContainer id="newsletter" ref={sectionRef}>
      <ContentWrapper>
        <Title
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpAnimation}
        >
          Insights in deinen Posteingang
          <PurpleBox 
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 0.7, width: "100%" } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          />
        </Title>
        <Subtitle
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.7, delay: 0.2, ease: "easeOut" }
            }
          }}
        >
          Abonniere meinen Newsletter für exklusive Einblicke, Tipps und Trends rund um New Work und die Zukunft der Arbeit – direkt in dein Postfach.
        </Subtitle>
        
        <FormPlaceholder
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.3 }
            }
          }}
        >
          <iframe 
            src="https://embeds.beehiiv.com/81fc6fc1-ddd0-4079-81fb-899807142dfd" 
            data-test-id="beehiiv-embed" 
            width="100%" 
            height="320" 
            frameBorder="0" 
            scrolling="no" 
            style={{ 
              borderRadius: '12px', 
              border: '2px solid rgba(205, 175, 253, 0.3)',
              margin: 0, 
              backgroundColor: 'transparent'
            }}
            title="Kira Marie Newsletter"
          />
        </FormPlaceholder>
      </ContentWrapper>
    </NewsletterContainer>
  );
};

export default NewsletterSection;
