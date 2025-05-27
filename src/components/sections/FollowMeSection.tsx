import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaSpotify } from 'react-icons/fa';
import CountUp from 'react-countup';

const FollowMeSectionWrapper = styled.section`
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  position: relative;
  overflow: hidden; 
  margin-top: 60px; 
  padding: 0; 
`;

const SectionTitle = styled.h2`
  font-family: 'Kingdom', sans-serif;
  font-size: 4rem;
  font-weight: normal;
  color: #000;
  margin-bottom: 30px; 
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px; 
  }
`;

const BeigeBarContainer = styled.div`
  background-color: #E6DFD7; 
  padding: 40px 10px; 
  position: relative; 
  width: 100%; 
  margin-top: -70px; 
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SocialLinksGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr; 
  gap: 0;
  justify-items: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1px auto 1px auto; 
    gap: 30px;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 100px; 
  
  @media (max-width: 767px) {
    width: 80%;
    height: 1px;
  }
`;

const PlatformContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px; 
  width: 100%;
`;

const PlatformIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: -10px; 
  color: #000;
  position: relative;
  z-index: 1;
`;

const FollowerCount = styled.div`
  font-family: 'Montserrat', sans-serif !important; 
  font-size: 2.5rem;
  font-weight: 400; 
  color: #000;
  margin: 0px 0 0px; 
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ProfileButton = styled.a`
  display: inline-block;
  background-color: #000;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 8px 20px;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  margin-top: 15px; 
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

interface SocialDisplayDataItem {
  name: string;
  url: string;
  followersDisplayString: string | null;
  rawCount?: number; 
}

interface SocialPlatform {
  name: string;
  icon: JSX.Element;
  url: string;
  followers?: string | null;
  followersNumber?: number; 
  buttonText: string;
}

const baseSocialPlatforms: SocialPlatform[] = [
  { 
    name: 'LinkedIn', 
    icon: <FaLinkedin />, 
    url: 'https://de.linkedin.com/in/kiramariecremer', 
    followers: '52.000', 
    followersNumber: 52000, 
    buttonText: 'ZUM PROFIL'
  },
  { 
    name: 'Instagram', 
    icon: <FaInstagram />, 
    url: 'https://www.instagram.com/kiramariecremer/', 
    followers: '11.500', 
    followersNumber: 11500, 
    buttonText: 'ZUM PROFIL'
  },
  { 
    name: 'Spotify', 
    icon: <FaSpotify />, 
    url: '#', 
    followers: '2.600', 
    followersNumber: 2600, 
    buttonText: 'ZUM PODCAST'
  }
];

const FollowMeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [socialPlatformData, setSocialPlatformData] = useState<SocialPlatform[]>(baseSocialPlatforms);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    fetch('/data/socialDisplayData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((dynamicData: SocialDisplayDataItem[]) => {
        const extractNumber = (str: string | null): number => {
          if (!str) return 0;
          if (str.includes('K')) {
            const matches = str.match(/(\d+\.?\d*)/);
            if (matches && matches[1]) {
              return parseFloat(matches[1]) * 1000;
            }
          }
          const cleanedStr = str.replace(/[^0-9.,]/g, '');
          const matches = cleanedStr.match(/(\d+[\d.,]*)/);
          if (matches && matches[1]) {
            return parseInt(matches[1].replace(/\D/g, ''));
          }
          return 0;
        };

        const updatedPlatforms = baseSocialPlatforms.map(platform => {
          const foundData = dynamicData.find(d => d.name.toLowerCase() === platform.name.toLowerCase());
          if (foundData) {
            return {
              ...platform,
              followers: foundData.followersDisplayString || platform.followers,
              followersNumber: foundData.rawCount || extractNumber(foundData.followersDisplayString) || platform.followersNumber,
              url: foundData.url || platform.url,
            };
          }
          return platform;
        });
        setSocialPlatformData(updatedPlatforms);
      })
      .catch(error => {
        console.error("Error loading or processing social display data:", error);
        setSocialPlatformData(baseSocialPlatforms); 
      });
  }, []);

  return (
    <FollowMeSectionWrapper ref={sectionRef}>
      <SectionTitle>
        Werde Teil meiner Community!
      </SectionTitle>
      <BeigeBarContainer>
        <ContentWrapper>
          <SocialLinksGrid
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialPlatformData.map((platform, index) => (
              <React.Fragment key={platform.name}>
                <PlatformContainer
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                >
                  <PlatformIcon>{platform.icon}</PlatformIcon>
                  <FollowerCount>
                    {hasAnimated && platform.followersNumber ? (
                      <CountUp end={platform.followersNumber} duration={2.5} separator="." decimal="," />
                    ) : (
                      platform.followersNumber ? platform.followersNumber.toLocaleString('de-DE') : 'N/A'
                    )}
                  </FollowerCount>
                  <ProfileButton href={platform.url} target="_blank" rel="noopener noreferrer">
                    {platform.buttonText}
                  </ProfileButton>
                </PlatformContainer>
                {index < socialPlatformData.length - 1 && (
                  <VerticalDivider />
                )}
              </React.Fragment>
            ))}
          </SocialLinksGrid>
        </ContentWrapper>
      </BeigeBarContainer>
    </FollowMeSectionWrapper>
  );
};

export default FollowMeSection;
