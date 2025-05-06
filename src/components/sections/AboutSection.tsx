import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingShapeProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  size?: string;
}

const expertiseTags = [
  'Arbeitspsychologie',
  'Leadership',
  'Remote Work',
  'Team Development',
  'Zukunftsforschung'
];

const stats = [
  { number: '15+', label: 'Jahre Erfahrung' },
  { number: '12', label: 'Publikationen' },
  { number: '50+', label: 'Vorträge' },
  { number: '200+', label: 'Kunden' }
];

const AboutSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textParallax = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  
  const parallaxValues = useMemo(() => ({
    imageParallax,
    textParallax,
    bgParallax
  }), [imageParallax, textParallax, bgParallax]);
  
  const backgroundVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 30% 30%, rgba(205, 175, 253, 0.1) 0%, rgba(255, 255, 255, 0) 60%)',
        'radial-gradient(circle at 40% 40%, rgba(205, 175, 253, 0.15) 0%, rgba(255, 255, 255, 0) 60%)',
        'radial-gradient(circle at 30% 30%, rgba(205, 175, 253, 0.1) 0%, rgba(255, 255, 255, 0) 60%)'
      ]
    }
  };
  
  const animationTransition = {
    repeat: Infinity,
    duration: 15,
    ease: "easeInOut"
  };
  
  const inViewConfig = { once: true, amount: 0.3 };
  
  const tagAnimation = {
    hover: { scale: 1.05, y: -5 },
    transition: { type: "spring", stiffness: 500 }
  };
  
  return (
    <SectionWrapper id="about">
      <BackgroundElement 
        style={{ y: parallaxValues.bgParallax }}
        variants={backgroundVariants}
        animate="animate"
        transition={animationTransition}
      />
      
      <Container>
        <ContentGrid>
          <TextColumn style={{ y: parallaxValues.textParallax }}>
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={inViewConfig}
            >
              Über Mich
            </SectionTitle>
            
            <Description
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={inViewConfig}
            >
              Als führende Expertin im Bereich moderne Arbeitsumgebungen verbinde ich Forschung 
              mit praktischer Anwendung. Mit über 15 Jahren Erfahrung, internationaler Lehrtätigkeit 
              und zahlreichen Publikationen gestalte ich die Zukunft der Arbeit aktiv mit.
            </Description>
            
            <StatisticsGrid
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={inViewConfig}
            >
              {stats.map((stat, index) => (
                <StatItem key={`stat-${index}`}>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatisticsGrid>
            
            <ExpertiseAreas
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={inViewConfig}
            >
              <ExpertiseTitle>Expertise</ExpertiseTitle>
              <ExpertiseTags>
                {expertiseTags.map((tag, index) => (
                  <ExpertiseTag 
                    key={`tag-${index}`}
                    whileHover={tagAnimation.hover}
                    transition={tagAnimation.transition}
                  >
                    {tag}
                  </ExpertiseTag>
                ))}
              </ExpertiseTags>
            </ExpertiseAreas>
          </TextColumn>
          
          <ImageColumn style={{ y: parallaxValues.imageParallax }}>
            <ImageContainer
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={inViewConfig}
            >
              <ProfileImage src="/images/profile.jpg" alt="Kira Marie" />
              <ImageFrame />
              <FloatingShape 
                top="-40px" 
                right="-30px"
                animate={{ 
                  y: [0, -20, 0], 
                  rotate: [0, 10, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10, 
                  ease: "easeInOut" 
                }}
              />
              <FloatingShape 
                bottom="-30px" 
                left="-20px" 
                size="60px"
                animate={{ 
                  y: [0, 15, 0], 
                  rotate: [0, -15, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8, 
                  ease: "easeInOut" 
                }}
              />
            </ImageContainer>
          </ImageColumn>
        </ContentGrid>
      </Container>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  position: relative;
  padding: 120px 0;
  overflow: hidden;
  background-color: white;
`;

const BackgroundElement = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextColumn = styled(motion.div)`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const ImageColumn = styled(motion.div)`
  @media (max-width: 992px) {
    order: 1;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--heading-font);
  font-size: 3rem;
  color: var(--text);
  margin-bottom: 2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #cdaffd;
  }
`;

const Description = styled(motion.p)`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 3rem;
`;

const StatisticsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatItem = styled.div`
  text-align: left;
`;

const StatNumber = styled.div`
  font-family: var(--heading-font);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #cdaffd;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, #cdaffd, transparent);
  }
`;

const StatLabel = styled.div`
  font-family: var(--body-font);
  font-size: 1rem;
  color: var(--text-light);
`;

const ExpertiseAreas = styled(motion.div)`
  margin-top: 3rem;
`;

const ExpertiseTitle = styled.h3`
  font-family: var(--heading-font);
  font-size: 1.5rem;
  color: var(--text);
  margin-bottom: 1.5rem;
`;

const ExpertiseTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ExpertiseTag = styled(motion.span)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #f8f5ff;
  border: 1px solid rgba(205, 175, 253, 0.3);
  border-radius: 50px;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(205, 175, 253, 0.15);
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ImageFrame = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 1px solid #cdaffd;
  border-radius: 8px;
  z-index: 1;
`;

const FloatingShape = styled(motion.div)<FloatingShapeProps>`
  position: absolute;
  width: ${props => props.size || '80px'};
  height: ${props => props.size || '80px'};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background-color: rgba(205, 175, 253, 0.15);
  z-index: 3;
`;

export default memo(AboutSection);
// DRWEB-KM2025
