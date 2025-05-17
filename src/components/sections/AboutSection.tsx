import React, { useState, useEffect } from 'react';
import styled from 'styled-components';



const AboutSectionContainer = styled.section`
  display: flex;
  align-items: stretch;
  background-color: #FFFFFF;
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
  }
`;

const ContentLayoutWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0;

  img {
    min-width: 350px;
    max-width: 100%;
    min-height: 400px;
    max-height: 600px;
    height: auto;
    object-fit: cover;
    border-radius: 0;
  }

  @media (max-width: 991px) {
    flex-basis: auto;
    width: 100%;
    max-width: 450px;
    min-width: auto;
    padding-right: 0;
    margin-bottom: 30px;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  background-color: #e6dfd7;
  padding: 50px;
  position: relative;
  color: #000000;
  border-radius: 0;
  overflow: hidden;
  z-index: 1;
`;

const TextContent = styled.div`
  position: relative;
  z-index: 1;
`;

const Heading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  line-height: 1.4;
  margin-bottom: 20px;
  font-weight: 300; 
  color: #1c1c1c;

  strong {
    font-weight: 600; 
  }

  @media (max-width: 991px) {
    font-size: 1.25rem;
  }
  @media (max-width: 767px) {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }
`;

const Paragraph = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #333333;
  margin-bottom: 15px;
  
  @media (max-width: 767px) {
    font-size: 0.8rem;
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
              <br />
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