import React, { useState, useRef, useEffect, memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const DESKTOP_VIDEO_ID = 'PUP1iSIMbtA';
const MOBILE_VIDEO_ID = 'nkXDDwQtOKE';
const MOBILE_BREAKPOINT = 768;

const getYouTubeEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&rel=0&vq=hd2160&hd=1`;

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
  const videoRef = useRef<HTMLIFrameElement | HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>([]);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });
  
  const [currentVideoSrc, setCurrentVideoSrc] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT 
        ? getYouTubeEmbedUrl(MOBILE_VIDEO_ID) 
        : getYouTubeEmbedUrl(DESKTOP_VIDEO_ID);
    }
    return getYouTubeEmbedUrl(DESKTOP_VIDEO_ID); 
  });

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(newIsMobile);
      
      const newSrc = newIsMobile 
        ? getYouTubeEmbedUrl(MOBILE_VIDEO_ID) 
        : getYouTubeEmbedUrl(DESKTOP_VIDEO_ID);
      setCurrentVideoSrc(prevSrc => prevSrc === newSrc ? prevSrc : newSrc);
    };

    handleResize();

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
  const videoScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const parallaxValues = useMemo(() => ({
    backgroundY,
    videoScale
  }), [backgroundY, videoScale]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
  }, [currentVideoSrc]);

  const floatingCircles = [
    { size: 180, top: '15%', left: '10%', color: '#cdaffd30', delay: 0.2 },
    { size: 250, top: '60%', left: '75%', color: '#cdaffd20', delay: 0.5 },
    { size: 120, top: '25%', left: '85%', color: '#cdaffd40', delay: 0.8 },
    { size: 100, top: '75%', left: '15%', color: '#cdaffd35', delay: 0.3 }
  ];
  
 

  return (
    <HeroContainer>
      {/* Logo und Untertitel in der Mitte mit Animation */}
      <LogoOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={isMobile ? 'mobile-view' : ''}
      >
        <LogoImage 
          src="/images/KMC logo weiß_01.png" 
          alt="Kira Marie Cremer Logo" 
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 1,
            type: "spring",
            stiffness: 100 
          }}
        />
        <SubTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1.8,
            ease: "easeOut" 
          }}
        >
          AUTORIN | DOZENTIN | PODCAST HOST
        </SubTitle>
      </LogoOverlay>
      
      <VideoContainer
        style={{ scale: parallaxValues.videoScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 0.8 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <StyledVideo
          key={currentVideoSrc}
          ref={videoRef as React.RefObject<HTMLIFrameElement>}
          src={currentVideoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => {
            console.log('YouTube iframe onLoad event triggered');
            setVideoLoaded(true);
          }}
        >
        </StyledVideo>
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
  
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    top: 45%; 
    width: 80%;
  }
`;

const LogoImage = styled(motion.img)`
  max-width: 550px;
  width: 100%;
  height: auto;
  margin-bottom: 34px;
  
  @media (max-width: 768px) {
    max-width: 380px;
  }
  
  @media (max-width: 480px) {
    max-width: 270px;
  }
`;

const SubTitle = styled(motion.div)`
  color: white;
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
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



const StyledVideo = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1); 
  
  width: 100%;
  height: 100%;
  object-fit: cover; 
  background-color: black;
  min-width: 110%; 
  min-height: 110%; 
  pointer-events: none; 

  @media (max-width: ${MOBILE_BREAKPOINT}px) { 
    transform: translate(-50%, -50%) scale(1.0); 
    object-fit: contain; 
    min-width: 100%; 
    min-height: 100%; 
  }
  
  @media (max-width: 480px) { 
    transform: translate(-50%, -50%) scale(1.2); 
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
  background: black;
  opacity: ${({ $loaded }) => ($loaded ? 0 : 1)};
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
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

export default memo(HeroSection);
