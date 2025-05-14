import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const NewsletterContainer = styled.section`
  width: 100%;
  background-color: #FFFFFF;
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

const Title = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: #1c1c1c;
  margin-bottom: 20px;
  text-align: center;
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
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
  text-align: center;
  
  /* Platzhalter-Stil bis der Beehiiv-Code eingefügt wird */
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 30px;
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
          <h3>Newsletter-Anmeldung</h3>
          <p>Hier wird der Beehiiv-Newsletter-Embed eingefügt.</p>
          
          {/* 
            HIER DEN BEEHIIV-EMBED-CODE EINFÜGEN
            
            Beispiel (zu ersetzen mit dem tatsächlichen Code):
            <iframe 
              src="https://embeds.beehiiv.com/DEINE-PUBLIKATIONS-ID" 
              data-test-id="beehiiv-embed" 
              width="100%" 
              height="320" 
              frameBorder="0" 
              scrolling="no" 
              style={{borderRadius: '4px'}}
            />
          */}
        </FormPlaceholder>
      </ContentWrapper>
    </NewsletterContainer>
  );
};

export default NewsletterSection;
