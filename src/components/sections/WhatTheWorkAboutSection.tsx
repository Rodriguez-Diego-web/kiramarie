import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface WhatTheWorkAboutData {
  headline: string;
  text_block_1: string;
  text_block_2: string;
  button_text: string;
  button_link: string;
  profile_image: string;
}

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: #f8f7ee; // Light beige/off-white background
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  max-width: 1100px;
  width: 100%;
  gap: 60px;
  align-items: center;

  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
`;

const TextColumn = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;

  @media (max-width: 991px) {
    order: 2;
    align-items: center;
  }
`;

const HeadlineStyled = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const ParagraphStyled = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin: 0;
`;

const ButtonStyled = styled.a`
  display: inline-block;
  background-color: #f7c948; // Yellow button color from image
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 12px 25px;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 0;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 15px;
  max-width: 300px;

  &:hover {
    background-color: #f5bf2e; // Darker yellow on hover
    transform: translateY(-2px);
  }
`;

const ImageColumn = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 450px;

  @media (max-width: 991px) {
    order: 1;
    width: 80%;
    max-width: 350px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; // For 1:1 aspect ratio, adjust if image is different
`;

const ProfileImageStyled = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  z-index: 2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const BlueBackgroundSquare = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #8facff; // Light blue from image
  border-radius: 0;
  top: -25px;
  left: -25px;
  z-index: 1;

  @media (max-width: 991px) {
    top: -10px;
    left: -10px;
  }
`;

const WhatTheWorkAboutSection: React.FC = () => {
  const [aboutData, setAboutData] = useState<WhatTheWorkAboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/whattheworkAboutData.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: WhatTheWorkAboutData) => {
        setAboutData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch whatthework about data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <SectionWrapper><p>Loading...</p></SectionWrapper>;
  }

  if (!aboutData) {
    return <SectionWrapper><p>Error loading content.</p></SectionWrapper>;
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <SectionWrapper>
      <ContentContainer>
        <TextColumn
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <HeadlineStyled>{aboutData.headline}</HeadlineStyled>
          <ParagraphStyled>{aboutData.text_block_1}</ParagraphStyled>
          <ParagraphStyled>{aboutData.text_block_2}</ParagraphStyled>
          <ButtonStyled href={aboutData.button_link} target="_blank" rel="noopener noreferrer">
            {aboutData.button_text}
          </ButtonStyled>
        </TextColumn>
        <ImageColumn
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           variants={imageVariants}
        >
          <ImageWrapper>
            <BlueBackgroundSquare />
            <ProfileImageStyled src={aboutData.profile_image} alt={aboutData.headline} />
          </ImageWrapper>
        </ImageColumn>
      </ContentContainer>
    </SectionWrapper>
  );
};

export default WhatTheWorkAboutSection;
