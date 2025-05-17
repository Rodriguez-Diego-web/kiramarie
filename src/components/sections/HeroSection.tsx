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
  const videoRef = useRef<HTMLIFrameElement>(null);
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
  const videoScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const parallaxValues = useMemo(() => ({
    backgroundY,
    videoScale
  }), [backgroundY, videoScale]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // IntersectionObserver-Logik ist nicht direkt mit YouTube iframe kompatibel ohne API
    // und wird vorerst auskommentiert, da Autoplay über URL-Parameter gesteuert wird.
    /*
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Für iframes kann man nicht einfach .play() aufrufen
          // Man bräuchte die YouTube Iframe API, um das Video zu steuern
          // videoElement.play().catch(() => {});
        } else {
          // videoElement.pause();
        }
      },
      { threshold: 0.2 }
    );
    
    observer.observe(videoElement);
    return () => {
      if (videoElement) { // Sicherstellen, dass videoElement noch existiert
        observer.unobserve(videoElement);
      }
    };
    */
  }, []);
  
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
          src="https://www.youtube-nocookie.com/embed/UXNL0Sl78js?start=2736&controls=0&modestbranding=1&rel=0&playsinline=1&autoplay=1&mute=1&loop=1&playlist=UXNL0Sl78js"
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
        {/* Text und Buttons entfernt, da im Video enthalten */}
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
  z-index: 0; /* Geändert von -2 */
  overflow: hidden;
`;

const StyledVideo = styled.iframe`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5); /* Video näher herangezoomt mit Faktor 1.5 */
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: black; /* Fallback bis Video geladen wird */
  pointer-events: none; /* Verhindert Maus-Interaktionen mit dem YouTube-Player */

  @media (max-width: 768px) {
    transform: translate(-50%, -50%) scale(2.3); /* Noch näher für Mobile Ansicht */
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
  pointer-events: none; /* Sicherstellen, dass Overlay keine Klicks abfängt */
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
  /* Gradienten entfernt */
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
  height: 60px;     /* Erhöhte Höhe für größere Logos */
  width: 180px;     /* Mehr Breite für größere Logos */
  flex-shrink: 0;   /* Schrumpfen im Flex-Layout der MarqueeGroup verhindern */
  opacity: 0.95;    /* Erhöhte Opazität für bessere Sichtbarkeit */
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
  max-height: 100%; /* Passt in die erhöhte Höhe des LogoItem */
  max-width: 100%;  /* Passt in die erhöhte Breite des LogoItem */
  object-fit: contain;
  filter: brightness(0) invert(1); /* Klarer weißer Filter für bessere Sichtbarkeit */
  opacity: 0.9;     /* Erhöhte Opazität für bessere Sichtbarkeit */
`;

export default memo(HeroSection);
