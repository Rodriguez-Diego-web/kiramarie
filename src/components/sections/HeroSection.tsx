import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const MOBILE_BREAKPOINT = 768;

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
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });
  const videoSrc = isMobile ? '/videos/Hero_mobile.MOV' : '/videos/Hero.MP4';
  
  useEffect(() => {
    // Setzt den Ladezustand zurück, damit die Einblendanimation bei einem Videowechsel erneut ausgelöst wird.
    setVideoLoaded(false);
  }, [videoSrc]);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  
  const parallaxValues = useMemo(() => ({
    backgroundY
  }), [backgroundY]);
  
  const floatingCircles = [
    { size: 180, top: '15%', left: '10%', color: '#cdaffd30', delay: 0.2 },
    { size: 250, top: '60%', left: '75%', color: '#cdaffd20', delay: 0.5 },
    { size: 120, top: '25%', left: '85%', color: '#cdaffd40', delay: 0.8 },
    { size: 100, top: '75%', left: '15%', color: '#cdaffd35', delay: 0.3 }
  ];
  
 

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          href="/images/KMClogo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Preload für Videos */}
        <link rel="preload" href="/videos/Hero.MP4" as="video" type="video/mp4" media="(min-width: 769px)" />
        <link rel="preload" href="/videos/Hero_mobile.MOV" as="video" type="video/mov" media="(max-width: 768px)" />
      </Helmet>
      <HeroContainer>
      {/* Logo und Untertitel entfernt - nur noch Video wird angezeigt */}
      
      {/* Ladeanimation, die angezeigt wird, während das Video lädt */}
      <AnimatePresence>
        {!videoLoaded && (
          <LoadingOverlay
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LoadingLogo
              src="/images/KMClogo.webp"
              alt="Kira Marie Cremer Logo"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </LoadingOverlay>
        )}
      </AnimatePresence>

      {/* Logo und Untertitel in der Mitte mit Animation */}
      <LogoOverlay
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className={isMobile ? 'mobile-view' : ''}
      >
        {/* Entferne jegliche Animation vom LCP-Element für schnellste Anzeige */}
        <img 
          src="/images/KMClogoweiss.webp" 
          alt="Kira Marie Cremer Logo" 
          width="500"
          height="250"
          style={{ opacity: 1 }}
        />
        <SubTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          AUTORIN | DOZENTIN | PODCAST HOST
        </SubTitle>
      </LogoOverlay>
      
      <VideoContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <StyledVideo
          key={videoSrc}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={videoSrc}
          onLoadedData={() => setVideoLoaded(true)}
        />
        <VideoOverlay $loaded={videoLoaded} />
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
      
      <ContentWrapper>
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
    </>
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
  max-height: 1080px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0e0e0e;
  z-index: 1;

  @media (max-width: 768px) {
    max-height: none;
    height: calc(100vh - 80px); 
  }
`;

const VideoContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  
  width: 100%;
  height: 100%;
  object-fit: contain; 
  background-color: black;
  min-width: 100%; 
  min-height: 100%; 
  pointer-events: none; 

  @media (max-width: ${MOBILE_BREAKPOINT}px) { 
    transform: translate(-50%, -50%); 
    object-fit: contain; 
    min-width: 100%; 
    min-height: 100%; 
  }
  
  @media (max-width: 480px) { 
    transform: translate(-50%, -50%); 
    object-fit: contain; 
    min-width: 100%;
    min-height: 100%;
  }
`;

const VideoOverlay = styled.div<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const LogoOverlay = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  text-align: center;
transform: translate(-50%, -50%);
display: flex;
flex-direction: column;
align-items: center;
z-index: 10;
text-align: center;
  
@media (max-width: ${MOBILE_BREAKPOINT}px) {
  top: 45%; 
  width: 80%;
}
`;

const SubTitle = styled(motion.div)`
  color: white;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 3px;
  white-space: nowrap;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-top: 10px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    letter-spacing: 2px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    letter-spacing: 1.5px;
  }
`;

const ParallaxBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: -1;
  background: black;
  overflow: hidden;
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
  text-align: right;
  margin-left: auto;
  margin-right: 0;
  padding-right: 8%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
  height: 60px;
  width: 180px;
  flex-shrink: 0;
  opacity: 0.95;
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
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;
`;

// Neue Styled Components für die Ladeanimation
const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6d5ba; /* Beiger Hintergrund */
  z-index: 999;
`;

const LoadingLogo = styled(motion.img)`
  width: 200px;
  height: auto;
`;

export default memo(HeroSection);
