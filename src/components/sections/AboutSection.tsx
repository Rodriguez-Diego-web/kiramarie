import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  padding: 60px 20px; /* Reduced top/bottom padding to move content higher */
  position: relative;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 40px 20px;
  }
`;

const ContentLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const HeaderContainer = styled.div`
  margin-bottom:-30px; /* Reduced margin to move text closer together */
  text-align: left;
  max-width: 100%;
  padding-left: 20px; /* Move title container 20px to the right */
  
  @media (max-width: 768px) {
    text-align: center;
    max-width: 100%;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Kingdom', 'Montserrat', sans-serif;
  font-size: 2.8rem;
  color: #000000;
  margin: 0 0 20px 0; 
  position: relative;
  display: inline-block;
  font-weight: 400;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px; /* Position the purple line to appear behind the text */
    left: 0;
    width: calc(100% + 30px); /* Extend 10px more on the right side */
    height: 15px; /* Slightly thinner for a more subtle effect */
    background-color: #cdaffd;
    opacity: 0.6;
    z-index: -1; /* Make sure the line appears behind the text */
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const MainContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr; /* More space for LeftColumn with all images */
  gap: 50px;
  margin: 0 auto;
  align-items: center; /* Center-align items vertically */
  width: 100%;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; // Gap between paragraph and image cluster

  @media (max-width: 991px) {
    display: contents; /* Make children grid items of MainContentWrapper on mobile */
  }
`;

const TopParagraphTextWrapper = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 1rem; /* Vereinheitlichte Schriftgröße */
  line-height: 1.8; /* Angepasst auf 1.8 wie im AuthorBioTextWrapper */
  color: #333333;
  padding-left: 20px; /* Keep alignment consistent */
  width: 80%; /* Make narrower to truncate text */
  margin-top: 20px; /* Move text lower */
  overflow: hidden; /* Ensure text gets truncated */
  font-weight: 400; /* Einheitliche Schriftstärke */
  
  .body-text {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400;
    font-size: 1rem;
  }
  
  /* Stelle sicher, dass alle Textelemente innerhalb Montserrat verwenden */
  p, div, span, br {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 1rem;
    font-weight: 400;
  }
  
  @media (max-width: 991px) {
    text-align: center;
    order: 1; /* Mobile order: First after title */
    width: 100%; /* Full width on mobile */
    padding-left: 0; /* Reset desktop padding */
    margin-top: 20px;
  }
`;

// New: Wrapper for the two smaller images in the LeftColumn
// Renamed: Now it's for all smaller images with a more complex layout
const ImagesCluster = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: auto auto;
  gap: 15px; 
  width: 90%; /* Added to make the entire image cluster smaller */
  margin-top: 20px;
  margin-bottom: 30px;
  padding-left: 20px; /* Move all left column images 20px to the right */

  @media (max-width: 991px) {
    order: 4; /* Mobile order: After Main Image */
    grid-template-columns: 1fr; /* Stack images vertically */
    width: 100%;
    padding-left: 0;
    margin-top: 30px;
    gap: 20px;
  }
`;

// New: Wrapper for the first small image (normal size)
const SmallImage1Wrapper = styled.div`
  grid-column: 1;
  grid-row: 1;
  transform: scale(0.96); /* Further reduced to make images smaller */
  transform-origin: top left;

  @media (max-width: 991px) {
    grid-column: auto;
    grid-row: auto;
    transform: none;
    width: 100%; /* Ensure images can be full width if desired */
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
`;

// New: Wrapper for the second image - now smaller
const SmallImage2Wrapper = styled.div`
  grid-column: 1;
  grid-row: 2;
  transform: scale(1.6); /* Further reduced to make images smaller */
  transform-origin: top left;
  margin-bottom: 20px;

  @media (max-width: 991px) {
    grid-column: auto;
    grid-row: auto;
    transform: none;
    margin-bottom: 0;
    width: 100%;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
`;

// New: Wrapper for the third image
const SmallImage3Wrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / span 2; /* Spans both rows */
  transform: scale(1.5); /* Further reduced to make images smaller */
  transform-origin: top left;

  @media (max-width: 991px) {
    grid-column: auto;
    grid-row: auto;
    transform: none;
    width: 100%;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-right: 15px; /* Add some padding to prevent text from touching the edge */

  @media (max-width: 991px) {
    display: contents; /* Make children grid items of MainContentWrapper on mobile */
  }
`;

// Wrapper for the main image in the RightColumn (can reuse or make specific)
const MainImageContainer = styled.div`
  position: relative; /* For BackgroundBox positioning */
  width: 100%;
  max-width: 80%; 
  margin: 0 auto; 
  transform: translate(40px, 131px); /* Y-Wert reduziert, um das Bild höher zu positionieren */
  
  @media (max-width: 991px) {
    order: 2; /* Mobile order: After Top Paragraph */
    transform: none; /* Reset desktop transform */
    max-width: 100%; /* Full width on mobile */
    margin-top: 30px;
    margin-bottom: 0; /* Adjusted from auto to control spacing better */
    padding-right: 0; /* Reset desktop padding if any was implied */
  }
`;

const AuthorBioTextWrapper = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 1rem; /* Vereinheitlichte Schriftgröße */
  line-height: 1.8;
  color: #333333;
  margin-top: 140px; /* Increased further to move the whole text block lower */
  max-width: 120%; /* Volle Breite für den Text */
  margin-left: -200px; /* Align to the left */
  font-weight: 400; /* Einheitliche Schriftstärke */
  
  .headline-main {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400; /* Einheitliche Schriftstärke */
    font-size: 1rem; /* Vereinheitlichte Schriftgröße */
    margin-bottom: 20px;
  }
  
  .body-bottom {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400; /* Einheitliche Schriftstärke */
    font-size: 1rem; /* Vereinheitlichte Schriftgröße */
    margin-top: 20px;
  }
  
  @media (max-width: 991px) {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    order: 5; /* Mobile order: Last */
    margin-top: 30px; /* Reset desktop margin-top */
    max-width: 100%; /* Full width on mobile */
    
    .headline-main {
      margin-top: 20px; 
      margin-left: 0; /* Reset desktop negative margin */
    }
  }
  
  h2 {
    font-size: 1 rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1c1c1c;
  }
`;

const BackgroundBox = styled.div`
  position: absolute;
  top: -20px;
  left: -30px;
  background-color: #e6dfd7; 
  z-index: 1;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`;

// General ImageWrapper for smaller images (maintains natural aspect ratio)
const ImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }
`;

// New: Specific wrapper for the main profile image to enforce 1:1 aspect ratio
const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 1:1 Aspect Ratio */
  z-index: 2;
  overflow: hidden; // Ensures img doesn't overflow its square container

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

// Typ-Definition für die About-Seiten-Daten
type AboutPageData = {
  name: string;
  body: string;
  body_bottom: string;
  headlineMain: string;
  profile_image: string;
  left_image_1: string;
  left_image_2: string;
  right_image: string;
  page_title: string;
}

const AboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Animation-Varianten für Framer Motion
  const textAnimationVariants = {
    hidden: { opacity: 0.2, y: 20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

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

  const { name, body, body_bottom, headlineMain } = aboutData;

  // Use actual image paths from CMS or constants if static
  const mainImage = aboutData.profile_image || '/images/image-small.webp';
  const smallImage1 = aboutData.left_image_1 || '/images/RSE_6158-small.webp';
  const smallImage2 = aboutData.left_image_2 || '/images/IMG_5927-small.webp';
  const smallImage3 = aboutData.right_image || '/images/image-small.webp';

  return (
    <AboutSectionContainer id="about-section"> 
      <ContentLayoutWrapper>
        <MainContentWrapper>
          <LeftColumn>
            <HeaderContainer>
              <MainTitle as={motion.h1} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, ich bin Kira
              </MainTitle>
            </HeaderContainer>
            <TopParagraphTextWrapper
              as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={textAnimationVariants}
            >
              {body && (
                <div 
                  className="body-text" 
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} 
                />
              )}
            </TopParagraphTextWrapper>
            <ImagesCluster>
              {smallImage1 && (
                <SmallImage1Wrapper>
                  <ImageWrapper>
                    <img 
                      src={smallImage1} 
                      srcSet={`${smallImage1} 450w, ${smallImage1.replace('.webp', '-small.webp') || smallImage1} 225w`} 
                      sizes="(max-width: 768px) 300px, 450px"
                      alt="Kira im Gespräch" 
                      loading="lazy" 
                      width="450" 
                      height="300" 
                    />
                  </ImageWrapper>
                </SmallImage1Wrapper>
              )}
              
              {smallImage2 && (
                <SmallImage2Wrapper>
                  <ImageWrapper>
                    <img 
                      src={smallImage2} 
                      srcSet={`${smallImage2} 450w, ${smallImage2.replace('.webp', '-small.webp') || smallImage2} 225w`} 
                      sizes="(max-width: 768px) 300px, 450px"
                      alt="Kira Marie Portrait" 
                      loading="lazy" 
                      width="450" 
                      height="300" 
                    />
                  </ImageWrapper>
                </SmallImage2Wrapper>
              )}
              
              {smallImage3 && (
                <SmallImage3Wrapper>
                  <ImageWrapper>
                    <img 
                      src={smallImage3} 
                      srcSet={`${smallImage3} 450w, ${smallImage3.replace('.webp', '-small.webp') || smallImage3} 225w`} 
                      sizes="(max-width: 768px) 300px, 450px"
                      alt="Kira spricht auf der Bühne" 
                      loading="lazy" 
                      width="450" 
                      height="600" 
                    />
                  </ImageWrapper>
                </SmallImage3Wrapper>
              )}
            </ImagesCluster>
          </LeftColumn>

          <RightColumn>
            {mainImage && (
              <MainImageContainer>
                <BackgroundBox />
                <ProfileImageWrapper> {/* Use new wrapper here */}
                  <img 
                    src={mainImage} 
                    srcSet={`${mainImage} 500w, ${mainImage.replace(/\.\w+$/, '-small$&') || mainImage} 250w`} 
                    sizes="(max-width: 768px) 350px, 500px"
                    alt={name || 'Kira Marie Cremer'} 
                    width="500" 
                    height="500" 
                  />
                </ProfileImageWrapper>
              </MainImageContainer>
            )}
            <AuthorBioTextWrapper className="author-bio-content">
              {headlineMain && (
                <motion.div 
                  className="headline-main"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  variants={textAnimationVariants}
                >
                  <div dangerouslySetInnerHTML={{ 
                    __html: headlineMain
                      .replace('Als Speakerin', '<br /><br />Als Speakerin')
                      .replace(/\n/g, '<br />') 
                  }} />
                </motion.div>
              )}
              {body_bottom && (
                <motion.div 
                  className="body-bottom"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  variants={textAnimationVariants}
                >
                  <div dangerouslySetInnerHTML={{ __html: body_bottom.replace(/\n/g, '<br />') }} />
                </motion.div>
              )}
            </AuthorBioTextWrapper>
          </RightColumn>
        </MainContentWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;