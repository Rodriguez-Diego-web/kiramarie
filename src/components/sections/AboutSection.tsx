import React from 'react';
import styled from 'styled-components';
import profileImage from '../../assets/images/profile.webp'; // Annahme: Pfad ist korrekt

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

const ImageWrapper = styled.div`
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

const TextWrapper = styled.div`
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
  
  @media (max-width: 767px) {
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

const AboutSection: React.FC = () => {
  return (
    <AboutSectionContainer id="about">
      <ContentLayoutWrapper>
        <ImageWrapper>
          <img src={profileImage} alt="Kira Marie Cremer" />
        </ImageWrapper>
        <TextWrapper>
          <TextContent>
            <Heading>
              <strong>Kira Marie Cremer ist eine der führenden deutschen Stimmen im Bereich New Work und Expertin,</strong> wenn es um die Zukunft der Arbeitswelt geht.
            </Heading>
            <Paragraph>
              Als Autorin des Buchs „New Work – Wie arbeiten wir in Zukunft?“ und Dozentin für Future of Work and Organizational Psychology liefert sie praxisnahe Einblicke in die Arbeitswelt von morgen. Sie hostet den erfolgreichen FUNKE-Podcast „New Work Now“ und erreicht mit fast 50.000 Follower:innen auf LinkedIn und über 10.000 auf Instagram eine große Community. Als Speakerin und Beraterin setzt sie sich für innovative Arbeitsmodelle und eine bessere Arbeitswelt ein.
            </Paragraph>
          </TextContent>
        </TextWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;