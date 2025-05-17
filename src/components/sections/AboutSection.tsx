import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// DRWEB-KM2025 - Diego Rodriguez Webentwicklung

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
  flex: 0 0 45%; /* Reduziert von 55% */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0; /* Padding entfernt für mehr Platz */

  img {
    min-width: 350px; /* Reduziert von 450px */
    max-width: 100%;
    min-height: 400px; /* Reduziert von 500px */
    max-height: 600px; /* Reduziert von 800px */
    height: auto;
    object-fit: cover;
    border-radius: 4px; /* Leichte Abrundung */
  }

  @media (max-width: 991px) {
    flex-basis: auto; /* Basis zurücksetzen */
    width: 100%;
    max-width: 450px; /* Reduziert von 550px */
    min-width: auto; /* Min-width zurücksetzen für Mobile */
    padding-right: 0;
    margin-bottom: 30px;
  }
`;

const TextWrapper = styled.div`
  flex: 1; /* Nimmt den verbleibenden Platz ein */
  background-color: #FFFEF7; /* Sehr helles Creme/Off-White */
  padding: 50px; /* Etwas mehr Padding für Ästhetik */
  position: relative; /* Für diagonale Linien */
  color: #000000;
  border-radius: 4px; /* Leichte Abrundung für die weiße Box */
  overflow: hidden; /* Wichtig, um diagonale Linien visuell einzuschließen, falls sie *innerhalb* wären */
  z-index: 1;
`;

const TextContent = styled.div`
  position: relative; /* Stellt sicher, dass Text über diagonalen Linien liegt */
  z-index: 1;
`;

const Heading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem; /* Reduziert von 1.6rem */
  line-height: 1.4;
  margin-bottom: 20px; /* Reduziert von 25px */
  font-weight: 300; 
  color: #1c1c1c;

  strong {
    font-weight: 600; 
  }

  @media (max-width: 991px) {
    font-size: 1.25rem; /* Reduziert von 1.4rem */
  }
  @media (max-width: 767px) {
    font-size: 1.1rem; /* Reduziert von 1.25rem */
    margin-bottom: 15px; /* Reduziert von 20px */
  }
`;

const Paragraph = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem; /* Reduziert von 0.95rem */
  line-height: 1.7;
  color: #333333;
  margin-bottom: 15px; /* Reduziert von 20px */
  
  @media (max-width: 767px) {
    font-size: 0.8rem; /* Reduziert von 0.9rem */
  }
`;

interface AboutPageData {
  name: string;
  additionalHeadline?: string;
  headlineMain: string;
  profile_image: string;
  body: string;
  page_title: string;
}

const AboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/aboutData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAboutData(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
        console.error("Failed to fetch about data:", e);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <AboutSectionContainer><p>Loading...</p></AboutSectionContainer>;
  }

  if (error) {
    return <AboutSectionContainer><p>Error loading data: {error}</p></AboutSectionContainer>;
  }

  if (!aboutData) {
    return <AboutSectionContainer><p>No data available.</p></AboutSectionContainer>;
  }

  const { name, additionalHeadline, headlineMain, profile_image, body } = aboutData;

  return (
    <AboutSectionContainer id="about-section"> 
      <ContentLayoutWrapper>
        <ImageWrapper>
          <img src={profile_image || '/assets/images/default-profile.png'} alt={name || 'Profilbild'} />
        </ImageWrapper>
        <TextWrapper>
          <TextContent>
            
            <Heading>
              {name && <strong>{name}</strong>}
              <br /> {/* Immer einen Zeilenumbruch nach dem Namen einfügen */}
              {additionalHeadline && additionalHeadline}
              {name && headlineMain && <br />}
              {headlineMain}
            </Heading>
            
            {body && <Paragraph dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} />} 

          </TextContent>
        </TextWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;