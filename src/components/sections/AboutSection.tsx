import React, { memo, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import profileImage from '../../assets/images/profile.webp';

interface FloatingElementProps {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  size?: string;
  color?: string;
  opacity?: number;
}

interface StatItemType {
  number: string;
  label: string;
}

interface ExpertiseTagType {
  name: string;
}

const expertiseTags: ExpertiseTagType[] = [
  { name: 'Arbeitspsychologie' },
  { name: 'Leadership' },
  { name: 'Remote Work' },
  { name: 'Team Development' },
  { name: 'Zukunftsforschung' }
];

const stats: StatItemType[] = [
  { number: '15+', label: 'Jahre Erfahrung' },
  { number: '12', label: 'Publikationen' },
  { number: '50+', label: 'Vorträge' },
  { number: '200+', label: 'Kunden' }
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['-5%', '10%']);
  const textParallax = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  
  const parallaxValues = useMemo(() => ({
    imageParallax,
    textParallax,
    bgParallax
  }), [imageParallax, textParallax, bgParallax]);
  
  const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const staggerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <SectionWrapper id="about" ref={sectionRef}>
      <BackgroundGradient 
        style={{ y: parallaxValues.bgParallax }}
        animate={{ 
          background: [
            'radial-gradient(circle at 10% 30%, rgba(205, 175, 253, 0.08) 0%, rgba(255, 255, 255, 0) 60%)',
            'radial-gradient(circle at 30% 50%, rgba(205, 175, 253, 0.08) 0%, rgba(255, 255, 255, 0) 60%)'
          ]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 25,
          ease: "easeInOut"
        }}
      />
      
      <Container>
        <ContentGrid>
          <TextColumn 
            ref={textRef}
            style={{ y: parallaxValues.textParallax }}
          >
            <HeaderArea>
              <Preheading
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInAnimation}
              >
                Über mich
              </Preheading>
              
              <SectionTitle
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.7, 
                      delay: 0.1, 
                      ease: "easeOut" 
                    }
                  }
                }}
              >
                Kira Marie
              </SectionTitle>
            </HeaderArea>
            
            <Description
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { duration: 0.7, delay: 0.2 }
                }
              }}
            >
              Als führende Expertin im Bereich moderne Arbeitsumgebungen verbinde ich Forschung
              mit praktischer Anwendung. Mit über 15 Jahren Erfahrung, internationaler Lehrtätigkeit 
              und zahlreichen Publikationen gestalte ich die Zukunft der Arbeit aktiv mit.
            </Description>
            
            <StatsContainer
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerAnimation}
            >
              {stats.map((stat, index) => (
                <StatItem 
                  key={`stat-${index}`}
                  variants={itemAnimation}
                  whileHover={{ 
                    y: -5, 
                    transition: { duration: 0.2 }
                  }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsContainer>
            
            <ExpertiseContainer
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { duration: 0.7, delay: 0.4 }
                }
              }}
            >
              <ExpertiseTitle>
                Expertise
              </ExpertiseTitle>
              
              <ExpertiseTags
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={staggerAnimation}
              >
                {expertiseTags.map((tag, index) => (
                  <ExpertiseTag
                    key={`tag-${index}`}
                    variants={itemAnimation}
                    whileHover={{ 
                      y: -3, 
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {tag.name}
                  </ExpertiseTag>
                ))}
              </ExpertiseTags>
            </ExpertiseContainer>
          </TextColumn>
          
          <ImageColumn 
            ref={imageRef}
            style={{ y: parallaxValues.imageParallax }}
          >
            <ImageContainer
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ProfileImage 
                src={profileImage} 
                alt="Kira Marie"
              />
              
              <ImageFrame 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />
              
              <FloatingElement 
                top="-15px" 
                right="-15px"
                size="120px"
                color="rgba(205, 175, 253, 0.08)"
                opacity={0.5}
              />
              
              <FloatingElement 
                bottom="-15px" 
                left="-15px" 
                size="100px"
                color="rgba(205, 175, 253, 0.05)"
                opacity={0.3}
              />
            </ImageContainer>
            
            <ExperienceBadge
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <BadgeContent>
                <BadgeHighlight>15+</BadgeHighlight> Jahre Expertise in moderner Arbeitsumgebung
              </BadgeContent>
            </ExperienceBadge>
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

const BackgroundGradient = styled(motion.div)`
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
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const TextColumn = styled(motion.div)`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const HeaderArea = styled.div`
  margin-bottom: 2rem;
`;

const Preheading = styled(motion.span)`
  display: inline-block;
  font-family: var(--body-font);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #9c7ad1;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--heading-font);
  font-size: 3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #cdaffd;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled(motion.p)`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 3rem;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatItem = styled(motion.div)`
  padding: 1.2rem 1.5rem;
  background-color: #f9f7fc;
  border-radius: 8px;
  border-left: 3px solid #cdaffd;
  transition: all 0.3s ease;
`;

const StatNumber = styled.div`
  font-family: var(--heading-font);
  font-size: 2.2rem;
  font-weight: 700;
  color: #9c7ad1;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-family: var(--body-font);
  font-size: 0.9rem;
  color: var(--text-light);
  font-weight: 500;
`;

const ExpertiseContainer = styled(motion.div)`
  margin-top: 3rem;
`;

const ExpertiseTitle = styled.h3`
  font-family: var(--heading-font);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1.5rem;
`;

const ExpertiseTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ExpertiseTag = styled(motion.span)`
  display: inline-block;
  padding: 0.7rem 1.2rem;
  background-color: #f9f7fc;
  border: 1px solid rgba(205, 175, 253, 0.3);
  border-radius: 4px;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ImageColumn = styled(motion.div)`
  @media (max-width: 992px) {
    order: 1;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  max-width: 450px;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
`;

const ImageFrame = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  border: 1px solid rgba(205, 175, 253, 0.5);
  border-radius: 4px;
  z-index: 1;
`;

const FloatingElement = styled.div<FloatingElementProps>`
  position: absolute;
  width: ${props => props.size || '80px'};
  height: ${props => props.size || '80px'};
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  background-color: ${props => props.color || 'rgba(205, 175, 253, 0.1)'};
  opacity: ${props => props.opacity || 1};
  border-radius: 4px;
  z-index: 0;
`;

const ExperienceBadge = styled(motion.div)`
  position: absolute;
  bottom: -15px;
  right: 20px;
  background-color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-left: 3px solid #cdaffd;
  z-index: 3;
  
  @media (max-width: 992px) {
    bottom: -15px;
    right: 20px;
  }
`;

const BadgeContent = styled.div`
  font-family: var(--body-font);
  font-size: 0.9rem;
  color: var(--text-light);
`;

const BadgeHighlight = styled.span`
  font-family: var(--heading-font);
  font-weight: 700;
  color: #9c7ad1;
`;

export default memo(AboutSection);
// DRWEB-KM2025
