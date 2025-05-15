import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

// Importiere die generierten About-Daten
// Hinweis: Diese Datei wird durch das generate-about-data.js Skript erstellt
import aboutData from '../../generated/aboutData.json';

// DRWEB-KM2025 - Diego Rodriguez Webentwicklung

interface FloatingShapeProps {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
  color?: string;
}

const AboutSectionContainer = styled.section`
  display: flex;
  align-items: stretch; /* Kinder füllen die Höhe */
  background-color: #FFFFFF; /* Geändert von #121212 auf weiß */
  padding: 80px 0; /* Horizontales Padding entfernt */
  position: relative;
  overflow: hidden; /* Verhindert, dass Linien überlaufen */

  @media (max-width: 991px) { /* Tablet und Mobile */
    flex-direction: column;
    align-items: center;
    padding: 40px 0; /* Horizontales Padding entfernt */
  }
`;

const ContentLayoutWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 1200px; /* Maximale Breite für den Inhalt, anpassbar */
  margin: 0 auto; /* Zentriert den Inhaltswrapper */
  position: relative; /* Hinzugefügt für z-index Kontext */
  z-index: 2; /* Stellt sicher, dass der Inhalt über der globalen Diagonallinie liegt */

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled(motion.div)`
  flex: 0 0 55%; /* Deutlich vergrößert für ein wirklich größeres Bild */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0; /* Padding entfernt für mehr Platz */

  img {
    min-width: 450px; /* Garantiert eine Mindestbreite */
    max-width: 100%;
    min-height: 500px; /* Garantiert eine Mindesthöhe */
    max-height: 800px; /* Weiter erhöht */
    height: auto;
    object-fit: cover;
    border-radius: 4px; /* Leichte Abrundung */
  }

  @media (max-width: 991px) {
    flex-basis: auto; /* Basis zurücksetzen */
    width: 100%;
    max-width: 550px; /* Bildgröße erhöht */
    min-width: auto; /* Min-width zurücksetzen für Mobile */
    padding-right: 0;
    margin-bottom: 30px;
  }
`;

const TextWrapper = styled(motion.div)`
  flex: 1; /* Nimmt den verbleibenden Platz ein */
  background-color: #FFFEF7; /* Sehr helles Creme/Off-White */
  padding: 50px;
  position: relative; /* Für diagonale Linien */
  color: #000000;
  border-radius: 4px; /* Leichte Abrundung für die weiße Box */
  overflow: hidden; /* Wichtig, um diagonale Linien visuell einzuschließen, falls sie *innerhalb* wären */

  @media (max-width: 991px) {
    width: 100%;
    padding: 30px;
  }
  @media (max-width: 767px) { /* Mobile */
    padding: 25px;
  }
`;

const TextContent = styled.div`
  position: relative; /* Stellt sicher, dass Text über diagonalen Linien liegt */
  z-index: 1;
`;

const Heading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem; /* Ca. 26px */
  line-height: 1.45;
  margin-bottom: 25px;
  font-weight: 300; /* Helleres Basisgewicht für den nicht-fetten Teil */
  color: #1c1c1c;

  strong {
    font-weight: 600; /* Fetter für den ersten Teil */
  }

  @media (max-width: 991px) {
    font-size: 1.4rem;
  }
  @media (max-width: 767px) {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
`;

const Paragraph = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem; /* Ca. 15px */
  line-height: 1.8;
  color: #333333;
  margin-bottom: 20px; // Platz vor eventuellen Tags/Stats
  
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const TagsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const TagItem = styled(motion.li)`
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const StatItem = styled(motion.li)`
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  .value { font-weight: bold; }
`;

const CallToActionButton = styled(motion.a)`
  display: inline-block;
  margin-top: 30px;
  padding: 12px 25px;
  background-color: #9370DB; // Lila, passend zu MediaCard
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a5fb3;
  }
`;

// Interface für die Datenstruktur der "Über Mich"-Seite
interface AboutPageData {
  title?: string;
  headline: string;
  subheadline?: string;
  profile_image?: string; // Pfad zum Bild oder leer
  bio: string; // Markdown-Inhalt
  expertise_tags?: string[];
  stats?: Array<{ value: string; label: string }>;
  cta_button_text?: string;
  cta_button_link?: string;
}

// Die Daten werden jetzt dynamisch aus der generierten JSON-Datei geladen
// Die Datei wird durch das generate-about-data.js Skript erstellt, das die about.md Datei verarbeitet
// Wir behandeln die importierten Daten als AboutPageData-Typ
const aboutPageData: AboutPageData = aboutData as AboutPageData;

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <AboutSectionContainer id="about" ref={sectionRef}>
      <ContentLayoutWrapper>
        <ImageWrapper
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideInLeft}
        >
          {/* Verwende das Bild aus den Daten, wenn vorhanden, sonst Fallback */} 
          {aboutPageData.profile_image ? (
            <img src={aboutPageData.profile_image} alt="Kira Marie Born" />
          ) : (
            <img src="https://via.placeholder.com/450x500.png?text=Profilbild" alt="Platzhalter Kira Marie Born" />
          )}
        </ImageWrapper>
        <TextWrapper
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={slideInRight}
        >
          <TextContent>
            <Heading>
              {aboutPageData.headline}
            </Heading>
            {aboutPageData.subheadline && (
              <Paragraph style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '20px' }}>
                {aboutPageData.subheadline}
              </Paragraph>
            )}
            {/* Hier sollte der bio-Text mit einem Markdown-Renderer dargestellt werden */} 
            {aboutPageData.bio.split('\n\n').map((paragraph, index) => (
              <Paragraph key={index}>{paragraph.replace(/\n/g, ' ')}</Paragraph>
            ))}

            {aboutPageData.expertise_tags && aboutPageData.expertise_tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 style={{ marginTop: '30px', marginBottom: '15px', fontSize: '1.2rem' }}>Expertise</h3>
                <TagsList>
                  {aboutPageData.expertise_tags.map((tag, index) => (
                    <TagItem 
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                    >
                      {tag}
                    </TagItem>
                  ))}
                </TagsList>
              </motion.div>
            )}

            {aboutPageData.stats && aboutPageData.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 style={{ marginTop: '30px', marginBottom: '15px', fontSize: '1.2rem' }}>Track Record</h3>
                <StatsList>
                  {aboutPageData.stats.map((stat, index) => (
                    <StatItem 
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                    >
                      <span className="value">{stat.value}</span> {stat.label}
                    </StatItem>
                  ))}
                </StatsList>
              </motion.div>
            )}

            {aboutPageData.cta_button_text && aboutPageData.cta_button_link && (
              <CallToActionButton 
                href={aboutPageData.cta_button_link}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {aboutPageData.cta_button_text}
              </CallToActionButton>
            )}
          </TextContent>
        </TextWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;
