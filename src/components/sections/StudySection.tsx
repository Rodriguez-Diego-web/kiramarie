import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';

const StudySection: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  
  const studyImgParallax = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '20%']);
  const studyContentParallax = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '-10%']);
  const gradientParallax = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '5%']);
  
  const parallaxConfig = useMemo(() => {
    return {
      studyImg: studyImgParallax,
      studyContent: studyContentParallax,
      gradient: gradientParallax,
    };
  }, [studyImgParallax, studyContentParallax, gradientParallax]);
  
  const backgroundVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 80% 20%, rgba(205, 175, 253, 0.15) 0%, rgba(255, 255, 255, 0) 50%)',
        'radial-gradient(circle at 70% 30%, rgba(205, 175, 253, 0.2) 0%, rgba(255, 255, 255, 0) 60%)',
        'radial-gradient(circle at 80% 20%, rgba(205, 175, 253, 0.15) 0%, rgba(255, 255, 255, 0) 50%)'
      ]
    }
  };
  
  const backgroundTransition = {
    repeat: Infinity,
    duration: 20,
    ease: "easeInOut"
  };
  
  const inViewConfig = { once: true, amount: 0.3 };
  
  return (
    <SectionContainer id="study">
      <ParallaxBackground 
        style={{ y: parallaxConfig.gradient }}
        variants={backgroundVariants}
        animate="animate"
        transition={backgroundTransition}
      />
      
      <ContentWrapper>
        <StudyInfo style={{ y: parallaxConfig.studyContent }}>
          <Title
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={inViewConfig}
          >
            STUDIE ZUR ZUKUNFT DER ARBEIT
          </Title>
          <Description
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={inViewConfig}
          >
            In meiner neuesten Studie untersuche ich, wie sich die Arbeitswelt durch Digitalisierung, 
            KI und veränderte Wertvorstellungen wandelt. Die Ergebnisse liefern konkrete Handlungsempfehlungen 
            für Unternehmen und Führungskräfte.
          </Description>
          
          <StudyMetadata
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={inViewConfig}
          >
            <MetaItem>
              <MetaLabel>Veröffentlicht</MetaLabel>
              <MetaValue>April 2025</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Forschungsmethode</MetaLabel>
              <MetaValue>Qualitative & Quantitative Analyse</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>Umfang</MetaLabel>
              <MetaValue>120 Seiten</MetaValue>
            </MetaItem>
          </StudyMetadata>
          
          <ActionButtons
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={inViewConfig}
          >
            <PrimaryButton
              href="/download-studie.pdf"
              whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(205, 175, 253, 0.4)' }}
              whileTap={{ y: 0 }}
            >
              <Icon icon={FaDownload} /> STUDIE HERUNTERLADEN
            </PrimaryButton>
            <SecondaryButton
              href="/studie-details"
              whileHover={{ x: 5, backgroundColor: 'rgba(205, 175, 253, 0.08)' }}
            >
              MEHR ERFAHREN <Icon icon={FaExternalLinkAlt} size={12} />
            </SecondaryButton>
          </ActionButtons>
        </StudyInfo>
        
        <StudyVisual style={{ y: parallaxConfig.studyImg }}>
          <StudyImageContainer
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={inViewConfig}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <NeuomorphicCard>
              <StudyImage src="/images/study-cover.jpg" alt="Studie zur Zukunft der Arbeit" />
              
              <AnimatePresence>
                {isHovered && (
                  <HoverOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <KeyFindings>
                      <FindingItem>
                        <FindingIcon>01</FindingIcon>
                        <FindingText>Hybride Arbeitsmodelle werden zum Standard</FindingText>
                      </FindingItem>
                      <FindingItem>
                        <FindingIcon>02</FindingIcon>
                        <FindingText>KI als Teampartner statt Ersatz</FindingText>
                      </FindingItem>
                      <FindingItem>
                        <FindingIcon>03</FindingIcon>
                        <FindingText>Purpose wird zum entscheidenden Faktor</FindingText>
                      </FindingItem>
                    </KeyFindings>
                  </HoverOverlay>
                )}
              </AnimatePresence>
            </NeuomorphicCard>
            
            <PatternDecoration 
              animate={{ 
                y: [0, -10, 0], 
                rotate: [0, 5, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 15, 
                ease: "easeInOut" 
              }}
            />
            
            <FloatingBadge
              animate={{ 
                y: [0, 10, 0], 
                rotate: [0, -3, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8, 
                ease: "easeInOut" 
              }}
            >
              <BadgeInner>
                <BadgeText>2025</BadgeText>
              </BadgeInner>
            </FloatingBadge>
          </StudyImageContainer>
        </StudyVisual>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  position: relative;
  padding: 140px 0;
  background-color: #ffffff;
  overflow: hidden;
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const StudyInfo = styled(motion.div)`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const Title = styled(motion.h2)`
  font-family: var(--heading-font);
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, #cdaffd, rgba(205, 175, 253, 0.3));
  }
`;

const Description = styled(motion.p)`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 2.5rem;
`;

const StudyMetadata = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-family: var(--heading-font);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  color: var(--text-light);
`;

const MetaValue = styled.span`
  font-family: var(--body-font);
  font-size: 1rem;
  color: var(--text);
  font-weight: 600;
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background-color: #cdaffd;
  color: white;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #bb9cf2;
    box-shadow: 0 4px 8px rgba(205, 175, 253, 0.4);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background-color: transparent;
  color: #333;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid #cdaffd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(205, 175, 253, 0.1);
  }
`;

const StudyVisual = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 992px) {
    order: 1;
  }
`;

const StudyImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const NeuomorphicCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  border-radius: 16px;
  box-shadow: 
    10px 10px 20px #e1e1e3,
    -10px -10px 20px #ffffff,
    inset 0 0 0 rgba(255, 255, 255, 0);
  overflow: hidden;
  transition: all 0.5s ease;
  
  &:hover {
    box-shadow: 
      15px 15px 30px #d1d1d3,
      -15px -15px 30px #ffffff,
      inset 0 0 0 rgba(255, 255, 255, 0.2);
  }
`;

const StudyImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 14px;
`;

const HoverOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(205, 175, 253, 0.92);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 14px;
`;

const KeyFindings = styled.div`
  width: 100%;
`;

const FindingItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FindingIcon = styled.div`
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--heading-font);
  font-size: 0.8rem;
  font-weight: 600;
  color: #cdaffd;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const FindingText = styled.p`
  font-family: var(--body-font);
  font-size: 1rem;
  line-height: 1.5;
  color: white;
  margin: 0;
`;

const PatternDecoration = styled(motion.div)`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 160px;
  height: 160px;
  background-image: radial-gradient(rgba(205, 175, 253, 0.15) 2px, transparent 2px);
  background-size: 15px 15px;
  z-index: -1;
`;

const FloatingBadge = styled(motion.div)`
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #cdaffd, #b992fa);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(205, 175, 253, 0.4);
  z-index: 10;
`;

const BadgeInner = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.span`
  font-family: var(--heading-font);
  font-size: 1rem;
  font-weight: 700;
  color: #cdaffd;
`;

export default StudySection;
// DRWEB-KM2025
