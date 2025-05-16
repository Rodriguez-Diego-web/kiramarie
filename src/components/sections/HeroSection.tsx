import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PartnerLogo {
  name: string;
  image: string;
  alt_text: string;
  order?: number;
}

type FloatingCircleProps = {
  size: number;
  top: string;
  left: string;
  color: string;
  delay: number;
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);

  useEffect(() => {
    fetch('/data/partnerLogosData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setPartnerLogos(data))
      .catch(error => console.error('Error fetching partner logos data:', error));
  }, []);

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
    { size: 180, top: '15%', left: '10%', color: '#cdaffd30', delay: 0.2 },
    { size: 250, top: '60%', left: '75%', color: '#cdaffd20', delay: 0.5 },
    { size: 120, top: '25%', left: '85%', color: '#cdaffd40', delay: 0.8 },
    { size: 100, top: '75%', left: '15%', color: '#cdaffd35', delay: 0.3 }
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
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          LEADERSHIP & VERTRAUENSEXPERTIN
        </SubTitle>
        <MainTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          KIRA
          <GlassmorphicHighlight>MARIE</GlassmorphicHighlight>
        </MainTitle>
        <Description
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Executive Coach · Speakerin · Autorin
        </Description>
        <HeroActions
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <PrimaryButton
            whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(147, 112, 219, 0.4)' }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            aria-label="Kontakt aufnehmen"
          >
            KONTAKT
          </PrimaryButton>
          <SecondaryButton
            whileHover={{ x: 8, opacity: 0.95 }}
            whileTap={{ x: 3 }}
            href="#about"
            onClick={(e) => handleSmoothScroll(e, 'about')}
            aria-label="Mehr über Kira Marie erfahren"
          >
            MEHR ERFAHREN
          </SecondaryButton>
        </HeroActions>
      </ContentWrapper>
      
      <TrustBanner>
        <TrustLabel>BEKANNT AUS</TrustLabel>
        <MarqueeWrapper>
          <MarqueeTrack>
            {partnerLogos.length > 0 && Array(3).fill(null).map((_, groupIndex) => (
              <MarqueeGroup key={`group-${groupIndex}`}>
                {partnerLogos.map((logo) => (
                  <LogoItem key={logo.name}>
                    <MediaLogo src={logo.image} alt={logo.alt_text} />
                  </LogoItem>
                ))}
              </MarqueeGroup>
            ))}
          </MarqueeTrack>
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
  background-color: black;
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
  background-color: black; /* Fallback bis Video geladen wird */
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black; /* Temporärer schwarzer Hintergrund bis Video verfügbar */
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: -1;
  background: black;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 70% 30%, rgba(205, 175, 253, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
`;

const Circle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(35px);
  z-index: -1;
  opacity: 0.35;
  mix-blend-mode: screen;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: right; /* Text nach rechts ausgerichtet */
  margin-left: auto;
  margin-right: 0;
  padding-right: 8%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubTitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 4px;
  color: #cdaffd; /* Lila Farbton für Kontrast auf schwarzem Hintergrund */
  margin-bottom: 1.2rem;
  text-shadow: 0 0 15px rgba(205, 175, 253, 0.3);
`;

const MainTitle = styled(motion.h1)`
  font-family: 'Montserrat', sans-serif;
  font-size: 5.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1;
  letter-spacing: 3px;
  text-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
  
  @media (max-width: 992px) {
    font-size: 4.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 2.8rem;
  }
`;

const GlassmorphicHighlight = styled.span`
  display: block;
  color: transparent;
  background: linear-gradient(135deg, #cdaffd 0%, #b490eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  font-style: normal;
  position: relative;
  text-shadow: none;
  filter: drop-shadow(0 0 18px rgba(205, 175, 253, 0.4));
`;

const Description = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  line-height: 1.7;
  color: #e6e6e6;
  font-weight: 400;
  max-width: 550px;
  margin: 0 0 3rem auto;
  letter-spacing: 1.2px;
  
  @media (max-width: 992px) {
    font-size: 1.2rem;
    max-width: 500px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 450px;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const HeroActions = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  width: auto;
  max-width: 550px;
  
  @media (max-width: 992px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 1.2rem;
    max-width: 450px;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    width: 100%;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-block;
  padding: 12px 30px;
  background-color: #9370DB; /* Lila Akzentfarbe */
  color: #ffffff;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  /* Wichtig: Hover-Effekt mit der neuen Akzentfarbe anpassen */
  &:hover {
    background-color: color-mix(in srgb, #9370DB 85%, black); /* Dunkleres Lila im Hover */
    box-shadow: 0 8px 25px rgba(147, 112, 219, 0.5); /* Angepasster Shadow mit Lila-Ton */
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  color: #e6e6e6;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;
  padding: 14px 5px;
  position: relative;
  
  &:after {
    content: '→';
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: white;
  }
  
  &:hover:after {
    transform: translateX(4px);
  }
  
  &:focus {
    outline: none;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const TrustBanner = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.2rem 0;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  border-top: 1px solid #333;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.7);
`;

const TrustLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  text-transform: uppercase;
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
    background: linear-gradient(to right, rgba(205, 175, 253, 0.2), transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(205, 175, 253, 0.2), transparent);
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  animation: marquee 35s linear infinite;
  width: fit-content;
  background-color: transparent;
  
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-16.7%);
    }
  }
`;

const MarqueeGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-color: transparent;
  padding: 0 25px;
  min-width: calc(100vw / 6);
`;

const LogoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;     /* Beibehaltung der Gesamthöhenbeschränkung */
  width: 160px;     /* Jedem Logo-Slot eine konsistente Breite geben */
  flex-shrink: 0;   /* Schrumpfen im Flex-Layout der MarqueeGroup verhindern */
  opacity: 0.85;
  transition: all 0.4s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.08);
    filter: brightness(1.1);
  }
  
  &:focus-within {
    opacity: 1;
    outline: none;
  }
`;

const MediaLogo = styled.img`
  max-height: 100%; /* Passt in die 50px Höhe des LogoItem */
  max-width: 100%;  /* Passt in die 160px Breite des LogoItem */
  object-fit: contain;
  filter: grayscale(100%) brightness(300%) contrast(0%);
  opacity: 0.7;
`;

export default memo(HeroSection);
