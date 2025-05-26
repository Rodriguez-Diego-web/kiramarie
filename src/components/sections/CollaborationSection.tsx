import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface CollaborationCardData {
  imageSrc: string;
  buttonText: string;
  link: string;
  buttonColor: string;
}

const SectionContainer = styled.section`
  width: 100%;
  padding: 0px 20px 60px 20px; 
  background-color: #000000; 
  color:rgb(1, 1, 1);
  overflow: visible; 
  position: relative;

  @media (max-width: 991px) {
    padding: 20px 15px 120px 15px; 
  }
  @media (max-width: 767px) {
    padding: 20px 10px 100px 10px; 
  }
`;

const ParallaxCollaborationGradient = styled(motion.div)`
  position: absolute;
  top: -18%; 
  left: -78%; 
  width: 150%; 
  height: 150%;
  background-image: radial-gradient(
    circle at center, 
    rgba(147, 112, 219, 0.06) 0%,
    rgba(147, 112, 219, 0.03) 30%,
    rgba(0, 0, 0, 0) 60%
  );
  background-size: 100% 100%; 
  z-index: 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto; 
  text-align: center; 
  position: relative;
  z-index: 1;
  padding: 0 20px; 
  
  @media (max-width: 767px) {
    padding: 10px 0; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Kingdom', sans-serif; 
  font-size: 4rem; 
  font-weight: normal; 
  margin-top: 0; 
  margin-bottom: 30px; 
  color: rgb(0, 0, 0); 
  position: relative; 
  display: inline-block; 
  z-index: 0; 
  padding-top: 30px; 
  padding-left: 0; 
  padding-right: 0; 
  
  @media (max-width: 767px) {
    font-size: 2.8rem; 
    padding-left: 0; 
    padding-right: 0; 
    padding-top: 0px; 
    color:rgb(0, 0, 0);
  }

  @media (max-width: 480px) {
    font-size: 2rem; 
    padding-top: 10px; 
    transform: translateY(-130px); 
  }
`;

const NewTitleBackground = styled(motion.div)`
  position: absolute;
  background-color: #e6dfd7; 
  height: 45px; 
  width: 100%; 
  z-index: 1; 
  top: 0; 
  left: 50%; 
  transform: translateX(-50%); 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
  
  @media (max-width: 767px) {
    height: 20px; 
    top: -30px; 
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 850px; 
  margin: 0 auto 50px auto; 
  color: #e0e0e0;
  text-align: center; 
  
  @media (max-width: 767px) {
    font-size: 1rem;
    max-width: 95%; 
    margin: 0 auto 30px auto; 
  }
`;

const GridBackground = styled.div`
  background-color: #ffffff;
  padding: 60px 40px 40px 40px; 
  margin-top: 0;
  width: 100%; 
  max-width: 1200px; 
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #000000; 
`;

const BoxesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px; 
  max-width: 1200px; 
  margin: 0 auto; 

  @media (max-width: 1024px) { 
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) { 
    grid-template-columns: 1fr;
    gap: 30px; 
  }
`;

const BoxItem = styled(motion.div)`
  display: flex;
  flex-direction: column; 
  transition: transform 0.3s ease; 

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%; 
  position: relative;
  background-color: #e0e0e0; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border-radius: 0; 
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ActionButton = styled.a<{ buttonColor?: string }>` 
  font-family: 'Montserrat', sans-serif;
  display: block; 
  width: 100%; 
  padding: 15px 10px; 
  background-color: ${props => props.buttonColor || '#E9D8FD'}; 
  color: ${props => props.buttonColor === '#ffe83c' ? 'rgb(255, 255, 255)' : 'rgb(255,255,255)'}; 
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem; 
  line-height: 1.3; 
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0; 
  position: relative; 
  left: 10px; 
  bottom: 10px; 

  &:hover {
    background-color: ${props => props.buttonColor === '#FFC8DD' ? '#FFB6D9' : props.buttonColor === '#A2D2FF' ? '#87CEEB' : props.buttonColor === '#BDE0FE' ? '#ADD8E6' : props.buttonColor === '#FEC8D8' ? '#FFC0CB' : '#DBC6F9'}; 
  }
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] } }
};

const CollaborationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.6 }); 
  const subtitleInView = useInView(subtitleRef, { once: true, amount: 0.7 }); 
  const gridInView = useInView(gridRef, { once: true, amount: 0.4 }); 
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const gradientX = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const gradientY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const boxesData: CollaborationCardData[] = [
    {
      imageSrc: '/images/Buch.JPG', 
      buttonText: 'BUCH',
      link: 'https://amzn.to/43vzG7R', 
      buttonColor: '#e53811' 
    },
    {
      imageSrc: '/images/speaker.JPG', 
      buttonText: 'SPEAKINGS',
      link: '#kontakt', 
      buttonColor: '#86a4fd' 
    },
    {
      imageSrc: '/images/Podcast_Cover.jpeg', 
      buttonText: 'PODCAST: NEW WORK NOW',
      link: '/funke-rss', 
      buttonColor: '#ffe83c' 
    },
    {
      imageSrc: '/images/mediakit.JPG', 
      buttonText: 'MEDIAKIT-DOWNLOAD', 
      link: '/mediakit/mediakit.pdf', 
      buttonColor: '#cdafff' 
    }
  ];

  return (
    <SectionContainer id="collaboration" ref={sectionRef}>
      <ParallaxCollaborationGradient 
        style={{
          x: gradientX,
          y: gradientY,
        }}
      />
      <ContentWrapper>
        <SectionTitle 
          ref={titleRef}
          style={{ 
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            textAlign: 'center', 
            width: '100%' 
          }}
        >
          <NewTitleBackground 
            style={{ 
              opacity: titleInView ? 1 : 0, 
              width: titleInView ? '100%' : '0%', 
              transition: 'opacity 0.7s ease-out, width 0.7s ease-out'
            }} 
          />
          <span style={{ position: 'relative', top: '-60px', display: 'inline-block', zIndex: 10 }}>Projekte & Kooperationen</span>
        </SectionTitle>
        <SectionSubtitle 
          ref={subtitleRef}
          initial="hidden" 
          animate={subtitleInView ? "visible" : "hidden"} 
          variants={{...fadeInRight, visible: {...fadeInRight.visible, transition: {...fadeInRight.visible.transition, delay: 0.3}}}}>
          Egal ob als Autorin, Dozentin, Speakerin, Podcast-Host oder Creatorin: Ich setze mich leidenschaftlich für eine Arbeitswelt ein, die menschlicher, flexibler und sinnstiftender ist. In meinen Projekten verbinde ich fundiertes Wissen mit pragmatischer Umsetzung. Eine Übersicht meiner aktuellen Formate und möglichen Kooperationen:
        </SectionSubtitle>
      </ContentWrapper>
      <GridBackground>
        <BoxesGrid ref={gridRef}>
          {boxesData.map((box, index) => {
            let animation;
            switch (index % 4) {
              case 0:
                animation = fadeInUp;
                break;
              case 1:
                animation = fadeInRight;
                break;
              case 2:
                animation = fadeInLeft;
                break;
              case 3:
                animation = popIn;
                break;
              default:
                animation = fadeInUp;
            }
            
            const randomDelay = 0.2 + (Math.random() * 0.3) + (index * 0.1);
            
            return (
              <BoxItem
                key={index}
                initial="hidden"
                animate={gridInView ? "visible" : "hidden"}
                variants={{...animation, visible: {...animation.visible, transition: {...animation.visible.transition, delay: randomDelay}}}}
              >
              <CardImageWrapper>
                <CardImage src={box.imageSrc} alt={box.buttonText} />
              </CardImageWrapper>
              <ActionButton
                href={box.link}
                buttonColor={box.buttonColor}
                target="_blank"
                rel="noopener noreferrer"
                {...(box.link === '/mediakit/mediakit.pdf' && { download: 'Mediakit_KiraMarieCremer.pdf' })}
              >
                {box.buttonText}
              </ActionButton>
            </BoxItem>
            );
          })}
        </BoxesGrid>
      </GridBackground>
    </SectionContainer>
  );
};

export default CollaborationSection;
