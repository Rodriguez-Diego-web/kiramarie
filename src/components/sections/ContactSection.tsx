import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useInView } from 'framer-motion'; 
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa'; 
import { Icon } from '../common/IconWrapper';

const SectionContainer = styled.section`
  background-color: #000000; /* Hintergrund auf Schwarz geändert */
  color: #e0e0e0; /* Helle Standard-Textfarbe */
  padding: 100px 20px;
  font-family: 'Montserrat', sans-serif; /* Globale Schriftart für die Sektion */
  position: relative; /* Notwendig für absolut positionierte Kindelemente (Parallax) */
  overflow: hidden;   /* Verhindert, dass der Parallax-Hintergrund übersteht */
  z-index: 1;
`;

const ParallaxGradientBackground = styled(motion.div)`
  position: absolute;
  top: -15%; /* Erlaube Überlappung für Bewegung */
  left: -5%;
  width: 60%; /* Größer als der Container, um Bewegung ohne Kanten zu ermöglichen */
  height: 150%;
  background-image: radial-gradient(
    circle at center, 
    rgba(147, 112, 219, 0.08) 0%,  /* Etwas intensiver für besseren Kontrast auf Schwarz */
    rgba(147, 112, 219, 0.04) 30%,
    rgba(28, 28, 28, 0) 65%  /* Ausblenden zur Hintergrundfarbe der Sektion */
  );
  background-size: 100% 100%; /* Relative Größe, die Position wird animiert */
  z-index: 0;
`;

const ParallaxWhiteDiagonalGradient = styled(motion.div)`
  position: absolute;
  top: -30%;
  left: -30%;
  width: 160%;
  height: 160%;
  background-image: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.04) 0%, /* Sehr subtiles Weiß */
    rgba(255, 255, 255, 0.02) 25%,
    rgba(0, 0, 0, 0) 50%       /* Ausblenden zu Schwarz */
  );
  background-size: 100% 100%;
  z-index: 0; /* Gleicher z-index, überlagern sich */
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  position: relative; /* Stellt sicher, dass der Inhalt über dem Parallax-Hintergrund liegt */
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  margin-bottom: 50px;
`;

const SectionHeading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffffff; /* Weiß für Hauptüberschrift */
  margin-bottom: 40px; /* Mehr Abstand nach unten */
  position: relative; /* Für die absolute Positionierung des Kastens */
  display: inline-block; /* Damit der Hintergrund nur die Textbreite umfasst */
  z-index: 0; /* Ensure SectionTitle creates a stacking context */
`;

const PurpleBox = styled(motion.div)`
  position: absolute;
  background-color: #e6dfd7; /* Lila Farbe aus anderen Elementen der Seite */
  height: 25px;
  width: 100%;
  z-index: -1;
  bottom: -4px;
  left: 0;
  opacity: 0.7;
`;

const ContactContent = styled.div`
  display: flex;
  justify-content: center; /* Zentriert den Inhalt, da das Formular wegfällt */
  flex-wrap: wrap;
  gap: 40px;
  text-align: left;
`;

const ContactInfo = styled(motion.div)`
  flex-basis: 100%; /* Nimmt die volle Breite ein, da es der Hauptinhalt ist */
  max-width: 600px; /* Begrenzt die maximale Breite für bessere Lesbarkeit */
  text-align: center; /* Zentriert den Text innerhalb der Info-Box */
`;

const ContactHeading = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem; /* Etwas kleiner, da "Kontakt" die Hauptüberschrift ist */
  font-weight: 600;
  margin-bottom: 25px;
  color: #ffffff;
`;

const EmailLink = styled.a`
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem; /* Größer für mehr Prominenz */
  font-weight: 500;
  color: #CDAFFD; /* Akzentfarbe */
  text-decoration: none;
  padding: 12px 25px;
  border: 2px solid #CDAFFD;
  border-radius: 8px;
  margin-bottom: 30px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #CDAFFD;
    color: #000000;
  }
`;

const ContactText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 40px; /* Mehr Abstand zu Social Links */
  color: #c0c0c0; 
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center; /* Zentriert die Social Media Icons */
  gap: 25px; /* Etwas mehr Abstand */
  margin-bottom: 30px;
`;

const SocialLink = styled(motion.a)`
  color: #e0e0e0;
  font-size: 1.8rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color, #8A2BE2); /* Akzentfarbe beim Hover */
  }
`;

const ContactSection: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const gradientX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const gradientY = useTransform(scrollYProgress, [0, 1], ['-5%', '15%']);

  const whiteGradientX = useTransform(scrollYProgress, [0, 1], ['15%', '-5%']);
  const whiteGradientY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  const contentInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <SectionContainer id="kontakt" ref={sectionRef}>
      <ParallaxGradientBackground style={{ x: gradientX, y: gradientY }} />
      <ParallaxWhiteDiagonalGradient style={{ x: whiteGradientX, y: whiteGradientY }} />
      <ContentWrapper>
        <SectionHeader
            initial={{ opacity: 0, y: -30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
        >
          <SectionHeading>
            Kontakt
            <PurpleBox 
              initial={{ opacity: 0, width: 0 }}
              animate={contentInView ? { opacity: 0.7, width: "100%" } : { opacity: 0, width: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
          </SectionHeading>
        </SectionHeader>
        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ContactHeading>Lassen Sie uns sprechen</ContactHeading>
            <EmailLink href="mailto:DEINE-EMAIL-ADRESSE-HIER">DEINE-EMAIL-ADRESSE-HIER</EmailLink>
            <ContactText>
              Ich freue mich darauf, von Ihnen zu hören. Für Projektanfragen, Kooperationen oder einen allgemeinen Austausch – Ihre Nachricht ist willkommen.
            </ContactText>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com/in/kiramariecremer/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Icon icon={FaLinkedinIn} />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/kiramariecremer/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Icon icon={FaInstagram} />
              </SocialLink>
              {/* Beispiel für weitere Links, falls vorhanden 
              <SocialLink href="https://twitter.com/deinHandle" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Icon icon={FaTwitter} />
              </SocialLink> 
              */}
            </SocialLinks>
          </ContactInfo>
        </ContactContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default ContactSection;
