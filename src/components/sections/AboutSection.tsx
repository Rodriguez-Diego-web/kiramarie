import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AboutSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  padding: 100px 20px;
  position: relative;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 60px 20px;
  }
`;

const ContentLayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  gap: 50px;
  
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 40%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 991px) {
    width: 100%;
    max-width: 350px;
    margin-bottom: 0;
  }
  
  @media (max-width: 767px) {
    max-width: 280px;
  }
  
  @media (max-width: 480px) {
    max-width: 240px;
  }
`;

const BackgroundBox = styled.div`
  position: absolute;
  top: -35px;
  left: -35px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  background-color: #e6dfd7; /* Beiger Hintergrund */
  z-index: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 0;
    max-height: 500px;
    
    @media (max-width: 767px) {
      max-height: 400px;
    }
    
    @media (max-width: 480px) {
      max-height: 350px;
    }
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 0;
  position: relative;
  color: #000000;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: center;
`;

const TextContent = styled.div`
  position: relative;
`;

const Heading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  line-height: 1.3;
  margin: 0;
  font-weight: 300; 
  color: #1c1c1c;

  strong {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1.6rem;
    display: block;
    margin-bottom: 5px;
  }

  @media (max-width: 991px) {
    font-size: 1.8rem;
  }
  @media (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const Paragraph = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #333333;
  
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: #000;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 12px 30px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    background-color: #333;
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

  const { name, headlineMain, profile_image, body } = aboutData;

  return (
    <AboutSectionContainer id="about-section"> 
      <ContentLayoutWrapper>
        <ImageContainer>
          <BackgroundBox />
          <ImageWrapper>
            <img src={profile_image || '/assets/images/default-profile.png'} alt={name || 'Profilbild'} />
          </ImageWrapper>
        </ImageContainer>
        <TextWrapper>
          <TextContent>
            <Heading>
              {name && <strong>{name}</strong>}
              {headlineMain}
            </Heading>
            
            {body && <Paragraph dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} />}
            
            <ContactButton 
              href="#kontakt" 
              onClick={(e) => {
                e.preventDefault();
                const kontaktElement = document.getElementById('kontakt');
                if (kontaktElement) {
                  kontaktElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              MEHR ERFAHREN
            </ContactButton>
          </TextContent>
        </TextWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;