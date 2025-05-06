import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';
import studieImage from '../../assets/images/Studie.webp';

const studyKeyFindings = [
  { id: "01", text: "Aktuelles Stimmungsbild der GenZ zu Berufseinstieg" },
  { id: "02", text: "Erwartungen an Politik, Wirtschaft und Bildung" },
  { id: "03", text: "Konkrete Handlungsempfehlungen zur Schließung von Lücken" }
];

const studyMetadata = [
  { label: "Veröffentlicht", value: "April 2025" },
  { label: "Forschungsmethode", value: "Qualitative & Quantitative Analyse" },
  { label: "Umfang", value: "120 Seiten" }
];

const StudySection: React.FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const studyImgParallax = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '10%']);
  const studyContentParallax = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '-5%']);
  const gradientParallax = useTransform(scrollYProgress, [0.3, 0.8], ['0%', '3%']);
  
  const parallaxConfig = useMemo(() => {
    return {
      studyImg: studyImgParallax,
      studyContent: studyContentParallax,
      gradient: gradientParallax,
    };
  }, [studyImgParallax, studyContentParallax, gradientParallax]);
  
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
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <SectionContainer id="study" ref={sectionRef}>
      <ParallaxBackground 
        style={{ y: parallaxConfig.gradient }}
        animate={{ 
          background: [
            'radial-gradient(circle at 80% 20%, rgba(205, 175, 253, 0.08) 0%, rgba(255, 255, 255, 0) 50%)',
            'radial-gradient(circle at 70% 30%, rgba(205, 175, 253, 0.1) 0%, rgba(255, 255, 255, 0) 60%)'
          ]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 25,
          ease: "easeInOut"
        }}
      />
      
      <ContentWrapper>
        <StudyInfo style={{ y: parallaxConfig.studyContent }}>
          <HeaderArea>
            <Preheading
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7 }}
            >
              Forschungsprojekt
            </Preheading>
            
            <Title
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Vom Klassenzimmer ins Home-Office
            </Title>
          </HeaderArea>
          
          <Description
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Was die „Generation Berufseinstieg" von Schule, Familie, Politik und Wirtschaft erwartet. 
            In dieser Studie liefern wir ein aktuelles Stimmungsbild der GenZ in Bezug auf relevante Themen 
            und konkrete Handlungsempfehlungen, um die Lücke zwischen Erwartungen junger Menschen und 
            den Bedürfnissen des Arbeitsmarktes zu schließen.
          </Description>
          
          <StudyMetadata
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerAnimation}
          >
            {studyMetadata.map((meta, index) => (
              <MetaItem 
                key={`meta-${index}`}
                variants={itemAnimation}
              >
                <MetaLabel>{meta.label}</MetaLabel>
                <MetaValue>{meta.value}</MetaValue>
              </MetaItem>
            ))}
          </StudyMetadata>
          
          <ActionButtons
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <PrimaryButton
              href="https://www.appinio.com/de/reports/ready-set-work-studie?lai_vid=rAGnEBvG1h94&lai_sr=60-64&lai_sl=h&vs_split=A"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: '0 8px 15px rgba(205, 175, 253, 0.3)' }}
              whileTap={{ y: 0 }}
            >
              <Icon icon={FaDownload} /> Studie herunterladen
            </PrimaryButton>
            <SecondaryButton
              href="https://www.appinio.com/de/reports/ready-set-work-studie?lai_vid=rAGnEBvG1h94&lai_sr=60-64&lai_sl=h&vs_split=A"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              whileTap={{ x: 0 }}
            >
              Mehr erfahren <Icon icon={FaExternalLinkAlt} size={12} />
            </SecondaryButton>
          </ActionButtons>
        </StudyInfo>
        
        <StudyVisual style={{ y: parallaxConfig.studyImg }}>
          <StudyImageContainer
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <StudyCard>
              <StudyImage src={studieImage} alt="Studie zur Zukunft der Arbeit" />
              
              <AnimatePresence>
                {isHovered && (
                  <HoverOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <KeyFindings>
                      {studyKeyFindings.map((finding, index) => (
                        <FindingItem key={`finding-${index}`}>
                          <FindingIcon>{finding.id}</FindingIcon>
                          <FindingText>{finding.text}</FindingText>
                        </FindingItem>
                      ))}
                    </KeyFindings>
                  </HoverOverlay>
                )}
              </AnimatePresence>
            </StudyCard>
            
            <YearBadge>
              <BadgeText>2025</BadgeText>
            </YearBadge>
          </StudyImageContainer>
        </StudyVisual>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  position: relative;
  padding: 120px 0;
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
  grid-template-columns: 1.1fr 0.9fr;
  gap: 6rem;
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

const HeaderArea = styled.div`
  margin-bottom: 1.5rem;
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

const Title = styled(motion.h2)`
  font-family: var(--heading-font);
  font-size: 2.8rem;
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
    font-size: 2.2rem;
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

const MetaItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.5rem;
  background-color: #f9f7fc;
  border-radius: 8px;
  border-left: 3px solid #cdaffd;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
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
  color: #9c7ad1;
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
    background-color: rgba(205, 175, 253, 0.05);
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

const StudyCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StudyImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px;
`;

const HoverOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(156, 122, 209, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 8px;
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
  color: #9c7ad1;
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

const YearBadge = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-left: 3px solid #cdaffd;
  z-index: 10;
`;

const BadgeText = styled.span`
  font-family: var(--heading-font);
  font-size: 1.3rem;
  font-weight: 700;
  color: #9c7ad1;
`;

export default React.memo(StudySection);
// DRWEB-KM2025
