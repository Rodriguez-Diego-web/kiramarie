import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Vereinfachte Datenstruktur für die Karten
interface CollaborationCardData {
  imageSrc: string;
  buttonText: string;
  link: string;
  buttonColor: string; // Neue Eigenschaft für die Button-Farbe
}

const SectionContainer = styled.section`
  width: 100%;
  padding: 100px 20px 80px 20px; /* Bottom padding erhöht von 100px auf 180px */
  background-color: #000000; 
  color: #ffffff;
  overflow: hidden;
  position: relative;

  @media (max-width: 991px) {
    padding: 80px 15px 150px 15px; /* Auch hier anpassen */
  }
  @media (max-width: 767px) {
    padding: 60px 10px 120px 10px; /* Auch hier anpassen */
  }
`;

const ParallaxCollaborationGradient = styled(motion.div)`
  position: absolute;
  top: -18%; 
  left: -78%; 
  width: 150%; 
  height: 150%;
  background-image: radial-gradient(
    circle at center, 
    rgba(147, 112, 219, 0.06) 0%,
    rgba(147, 112, 219, 0.03) 30%,
    rgba(0, 0, 0, 0) 60%
  );
  background-size: 100% 100%; 
  z-index: 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto; // Behält den Wrapper zentriert
  text-align: left; // Textausrichtung für Kinder auf links
  position: relative;
  z-index: 1;
  padding: 0 80px; // Fügt seitliches Padding hinzu, damit Text nicht am Rand klebt
  
  @media (max-width: 767px) {
    text-align: center; // Zentriert Text auf mobilen Geräten
    padding: 0; // Kein Padding, um sicherzustellen, dass der Titel wirklich zentriert ist
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  position: relative; /* Für die absolute Positionierung des Kastens */
  display: inline-block; /* Damit der Hintergrund nur die Textbreite umfasst */
  z-index: 0; /* Ensure SectionTitle creates a stacking context */
  padding: 0 20px; /* Etwas Platz links und rechts für den Balken */

  @media (max-width: 767px) {
    font-size: 3rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: auto;
    align-self: center; /* Zusätzliche Zentrierung */
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const BeigeBox = styled(motion.div)`
  position: absolute;
  background-color: #e6dfd7; /* Beige Farbe */
  height: 25px;
  width: 10%; /* Etwas schmaler als zuvor */
  z-index: -1;
  bottom: -4px;
  left: 50%; /* Vom Mittelpunkt des Titels ausgehend */
  transform: translateX(-50%); /* Genau zentrieren */
  opacity: 0.7;
  
  @media (max-width: 767px) {
    width: 50%; /* Schmaler auf Mobilgeräten */
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 700px; // Behält eine maximale Breite für den Lesefluss
  margin: 0 0 40px 0; // Oben, Rechts, Unten, Links - kein auto mehr für horizontale Zentrierung
  color: #e0e0e0;
  
  @media (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 1rem;
  }
`;

// Neuer Wrapper für den weißen Hintergrund des Grids
const GridBackground = styled.div`
  background-color: #ffffff;
  padding: 60px 40px 40px 40px; 
  margin-top: 0;
  width: 100%; // Nimmt die Breite des Elternelements
  max-width: 1200px; // Zentriert mit maximaler Breite
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #000000; // Rahmen um den weißen Hintergrund
`;

const BoxesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px; /* Erhöhter Abstand zwischen den Karten */
  max-width: 1200px; /* Begrenzt die Breite des Grids selbst */
  margin: 0 auto; /* Zentriert das Grid im GridBackground */

  @media (max-width: 1024px) { /* Tablet */
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) { /* Mobile */
    grid-template-columns: 1fr;
    gap: 30px; /* Erhöhter Abstand zwischen den Karten */
  }
`;

const BoxItem = styled(motion.div)`
  // Kein eigener Hintergrund oder Schatten mehr, dient als reiner Container
  // border-radius: 0; // Bleibt 0, da der Container unsichtbar ist
  // overflow: hidden; // Entfernen, falls der ActionButton sonst beschnitten wird
  display: flex;
  flex-direction: column; // Bild oben, Button unten
  transition: transform 0.3s ease; // Nur noch Transform, kein Box-Shadow mehr hier

  &:hover {
    transform: translateY(-4px);
    // Kein Box-Shadow-Change hier mehr
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%; /* Quadratische Bilder, wie vom User eingestellt */
  position: relative;
  background-color: #e0e0e0; /* Heller Platzhalter-Hintergrund */
  // Optional: leichter Schatten für das Bild selbst
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border-radius: 0; // Sicherstellen, dass Bild-Wrapper eckig ist
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Button-Styling gemäß Bild
const ActionButton = styled.a<{ buttonColor?: string }>` // Props-Typ für buttonColor
  font-family: 'Montserrat', sans-serif;
  display: block; 
  width: 100%; // Volle Breite des BoxItem
  padding: 19px 15px;
  background-color: ${props => props.buttonColor || '#E9D8FD'}; // Dynamische Hintergrundfarbe
  color:rgb(255, 255, 255); 
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0; // Reset base margins, position controls offset
  position: relative; // Erforderlich für left/bottom Verschiebung
  left: 10px; // Verschiebt den Button um 10px nach rechts
  bottom: 10px; // Verschiebt den Button um 10px nach oben von seiner Normalposition

  &:hover {
    background-color: ${props => props.buttonColor === '#FFC8DD' ? '#FFB6D9' : props.buttonColor === '#A2D2FF' ? '#87CEEB' : props.buttonColor === '#BDE0FE' ? '#ADD8E6' : props.buttonColor === '#FEC8D8' ? '#FFC0CB' : '#DBC6F9'}; 
  }
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const CollaborationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gradientX = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const gradientY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const boxesData: CollaborationCardData[] = [
    {
      imageSrc: '/images/Buch.JPG', // Korrigierter Pfad
      buttonText: 'Buch',
      link: 'https://amzn.to/43vzG7R', 
      buttonColor: '#e53811' // Rot
    },
    {
      imageSrc: '/images/speaker.JPG', // Korrigierter Pfad
      buttonText: 'Speakings',
      link: 'https://nwx.new-work.se/events/nwx23/speaker/kira-marie-cremer', 
      buttonColor: '#86a4fd' // Blau
    },
    {
      imageSrc: '/images/Podcast_Cover.jpeg', // Platzhalter, ggf. anpassen
      buttonText: 'New Work Now',
      link: 'https://disruptingminds.com/speaker/kira-marie-cremer/', 
      buttonColor: '#ffe83c' // Gelb
    },
    {
      imageSrc: '/images/mediakit.JPG', // Platzhalter, ggf. anpassen
      buttonText: 'Mediakit',
      link: '#', 
      buttonColor: '#cdafff' // Lila
    }
  ];

  return (
    <SectionContainer id="expertise" ref={sectionRef}>
      <ParallaxCollaborationGradient 
        style={{
          x: gradientX,
          y: gradientY,
        }}
      />
      <ContentWrapper>
        <SectionTitle 
          style={{ 
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            textAlign: 'center', // Zusätzliche Inline-Zentrierung
            width: '100%' // Nimmt die volle Breite ein
          }}
        >
          EXPERTISE
          <BeigeBox 
            style={{ 
              opacity: titleInView ? 0.7 : 0,
              width: titleInView ? '30%' : '0%', // Kürzere Breite für den Balken
              transition: 'opacity 0.7s ease-out, width 0.7s ease-out'
            }} 
          />
        </SectionTitle>
        <SectionSubtitle initial="hidden" animate={titleInView ? "visible" : "hidden"} variants={{...fadeInUp, visible: {...fadeInUp.visible, transition: {...fadeInUp.visible.transition, delay: 0.2}}}}>
          Entdecken Sie die vielfältigen Möglichkeiten einer Zusammenarbeit mit mir. Als Expertin für New Work und moderne Arbeitskonzepte biete ich maßgeschneiderte Lösungen für Unternehmen und Organisationen. Von inspirierenden Keynotes über praxisnahe Workshops bis hin zu strategischer Beratung – gemeinsam gestalten wir die Arbeitswelt von morgen.
        </SectionSubtitle>
      </ContentWrapper>
      <GridBackground>
        <BoxesGrid>
          {boxesData.map((box, index) => (
            <BoxItem
              key={index}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              variants={{...fadeInUp, visible: {...fadeInUp.visible, transition: {...fadeInUp.visible.transition, delay: 0.4 + index * 0.1}}}}
            >
              <CardImageWrapper>
                <CardImage src={box.imageSrc} alt={box.buttonText} />
              </CardImageWrapper>
              <ActionButton href={box.link} target="_blank" rel="noopener noreferrer" buttonColor={box.buttonColor}>
                {box.buttonText}
              </ActionButton>
            </BoxItem>
          ))}
        </BoxesGrid>
      </GridBackground>
    </SectionContainer>
  );
};

export default CollaborationSection;
