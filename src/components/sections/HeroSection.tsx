import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

type FloatingCircleProps = {
  size: number;
  top: string;
  left: string;
  color: string;
  delay: number;
};

const mediaLogos = [
  { src: '/images/media/faz.svg', alt: 'Frankfurter Allgemeine Zeitung' },
  { src: '/images/media/spiegel.svg', alt: 'Der Spiegel' },
  { src: '/images/media/zeit.svg', alt: 'Die Zeit' },
  { src: '/images/media/handelsblatt.svg', alt: 'Handelsblatt' },
  { src: '/images/media/deutschlandfunk.svg', alt: 'Deutschlandfunk' },
  { src: '/images/media/forbes.svg', alt: 'Forbes' },
  { src: '/images/media/harvard.svg', alt: 'Harvard Business Review' }
];

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0.2]);
  const videoScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const parallaxValues = useMemo(() => ({
    backgroundY,
    textY,
    opacityText,
    videoScale
  }), [backgroundY, textY, opacityText, videoScale]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play().catch(() => {});
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(videoElement);
    return () => observer.unobserve(videoElement);
  }, []);
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const floatingCircles = [
    { size: 120, top: '15%', left: '10%', color: '#cdaffd30', delay: 0.2 },
    { size: 200, top: '60%', left: '75%', color: '#cdaffd20', delay: 0.5 },
    { size: 80, top: '25%', left: '85%', color: '#cdaffd40', delay: 0.8 }
  ];
  
  return (
    <HeroContainer>
      <VideoContainer
        style={{ scale: parallaxValues.videoScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 0.8 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <StyledVideo
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/kira-intro.mp4" type="video/mp4" />
          Ihr Browser unterstützt keine Videos.
        </StyledVideo>
        <VideoOverlay />
      </VideoContainer>
    
      <ParallaxBackground 
        style={{ y: parallaxValues.backgroundY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <GradientOverlay />
        {floatingCircles.map((circle, index) => (
          <FloatingCircle 
            key={`circle-${index}`}
            size={circle.size} 
            top={circle.top} 
            left={circle.left} 
            color={circle.color} 
            delay={circle.delay}
          />
        ))}
      </ParallaxBackground>
      
      <ContentWrapper style={{ y: parallaxValues.textY, opacity: parallaxValues.opacityText }}>
        <SubTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AUTORIN & DOZENTIN
        </SubTitle>
        <MainTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Die Zukunft der Arbeit
          <GlassmorphicHighlight>neu denken</GlassmorphicHighlight>
        </MainTitle>
        <Description
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Mit fundierten Analysen und innovativen Ansätzen gestalte ich moderne Arbeitsumgebungen, 
          die Produktivität, Wohlbefinden und Nachhaltigkeit in Einklang bringen.
        </Description>
        <HeroActions
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(205, 175, 253, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            KONTAKT
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ x: 5 }}
            href="#about"
            onClick={(e) => handleSmoothScroll(e, 'about')}
          >
            MEHR ERFAHREN
          </SecondaryButton>
        </HeroActions>
      </ContentWrapper>
      
      <TrustBanner>
        <TrustLabel>BEKANNT AUS</TrustLabel>
        <MarqueeWrapper>
          <MarqueeContent>
            {[...Array(2)].map((_, groupIndex) => (
              <MarqueeGroup key={`group-${groupIndex}`}>
                {mediaLogos.map((logo, logoIndex) => (
                  <LogoItem key={`logo-${groupIndex}-${logoIndex}`}>
                    <MediaLogo src={logo.src} alt={logo.alt} />
                  </LogoItem>
                ))}
              </MarqueeGroup>
            ))}
          </MarqueeContent>
        </MarqueeWrapper>
      </TrustBanner>
    </HeroContainer>
  );
};

const FloatingCircle = memo(({ size, top, left, color, delay }: FloatingCircleProps) => {
  return (
    <Circle 
      style={{ 
        width: size, 
        height: size, 
        top, 
        left, 
        backgroundColor: color 
      }}
      animate={{ 
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        scale: [1, 1.05, 1, 0.95, 1]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        repeatType: "loop",
        delay 
      }}
    />
  );
});

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(248, 245, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: -1;
  background: transparent;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 70% 30%, rgba(205, 175, 253, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
`;

const Circle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  z-index: -1;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const SubTitle = styled(motion.h3)`
  font-family: var(--heading-font);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 3px;
  color: var(--text-light);
  margin-bottom: 1.5rem;
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--heading-font);
  font-size: 4rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GlassmorphicHighlight = styled.span`
  display: block;
  color: transparent;
  background: linear-gradient(135deg, #cdaffd 0%, #9d7dd2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-style: italic;
  position: relative;
`;

const Description = styled(motion.p)`
  font-family: var(--body-font);
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-light);
  max-width: 700px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  padding: 12px 30px;
  background-color: #cdaffd;
  color: white;
  text-decoration: none;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  letter-spacing: 1px;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ba9cf2;
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  padding: 12px 30px;
  background-color: transparent;
  color: var(--text);
  text-decoration: none;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  letter-spacing: 1px;
  border: 1px solid var(--text-light);
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #cdaffd;
    color: #cdaffd;
  }
`;

const TrustBanner = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.03);
`;

const TrustLabel = styled.div`
  font-family: var(--heading-font);
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: #9d7dd2;
  margin-bottom: 15px;
  font-weight: 600;
`;

const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  
  &::before, &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.9), transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.9), transparent);
  }
`;

const MarqueeContent = styled.div`
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
  
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const MarqueeGroup = styled.div`
  display: flex;
  align-items: center;
`;

const LogoItem = styled.div`
  padding: 0 30px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const MediaLogo = styled.img`
  height: 30px;
  width: auto;
  object-fit: contain;
`;

export default memo(HeroSection);
// DRWEB-KM2025
