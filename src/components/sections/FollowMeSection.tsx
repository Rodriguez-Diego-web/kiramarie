import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import CountUp from 'react-countup';

const SectionContainer = styled.section`
  padding: 70px 10px;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-top: -1px;
`;

const BeigeBackground = styled.div`
  background-color: #e6dfd7; /* Beige background */
  height: 350px; /* Thinner beige section */
  width: 100%;
  position: absolute;
  top: 59%;
  left: 0;
  transform: translateY(-50%);
  z-index: 0;
`;

const SectionTitle = styled.h2`
  font-family: 'Kingdom', sans-serif; /* Use Kingdom font */
  font-size: 3.2rem;
  font-weight: normal; /* Kingdom font works better with normal weight */
  color: #000;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SocialLinksGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1px 1fr; /* Middle column for divider */
  gap: 0;
  justify-items: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1px auto;
    gap: 30px;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.2);
  
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
  padding: 0 40px;
  width: 100%;
`;

const PlatformIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #000;
  position: relative;
  z-index: 1;
  /* Icons already have their own styling */
`;

const FollowerCount = styled.div`
  font-family: 'Kingdom', sans-serif; /* Use Kingdom font for numbers */
  font-size: 2.5rem;
  font-weight: normal; /* Kingdom font works better with normal weight */
  color: #000;
  margin: 20px 0 20px;
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
  
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

interface SocialDisplayDataItem {
  name: string;
  url: string;
  followersDisplayString: string | null;
  rawCount?: number; // Raw follower count for precise animations
}

interface SocialPlatform {
  name: string;
  icon: JSX.Element;
  url: string;
  followers?: string | null;
  followersNumber?: number; // Numeric value for counter
  buttonText: string;
}

const baseSocialPlatforms: SocialPlatform[] = [
  { 
    name: 'LinkedIn', 
    icon: <FaLinkedin />, 
    url: 'https://de.linkedin.com/in/kiramariecremer', 
    followers: '11.500', 
    followersNumber: 11500, // Full number value
    buttonText: 'ZUM PROFIL'
  },
  { 
    name: 'Instagram', 
    icon: <FaInstagram />, 
    url: 'https://www.instagram.com/kiramariecremer/', 
    followers: '52.000', 
    followersNumber: 52000, // Full number value
    buttonText: 'ZUM PROFIL'
  }
];

// We're using static follower numbers instead of animation
// Number Counter removed for simplicity

const FollowMeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [socialPlatformData, setSocialPlatformData] = useState<SocialPlatform[]>(baseSocialPlatforms);

  useEffect(() => {
    fetch('/data/socialDisplayData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((dynamicData: SocialDisplayDataItem[]) => {
        // The data is already filtered to LinkedIn and Instagram in generate-social-display-data.js
        
        // Extract numeric values from follower strings
        // Function to extract the numeric value from CMS follower string
        const extractNumber = (str: string | null): number => {
          if (!str) return 0;
          
          // Check if string has K format (e.g. "52K Follower" or "11.5K Follower")
          if (str.includes('K')) {
            // Extract number before K
            const matches = str.match(/(\d+\.?\d*)/); // Extract number part (with decimal)
            if (matches && matches[1]) {
              return parseFloat(matches[1]) * 1000; // Convert to full number (11.5K -> 11500)
            }
          }
          
          // For full numbers
          const cleanedStr = str.replace(/[^0-9.,]/g, '');
          const matches = cleanedStr.match(/(\d+[\d.,]*)/);
          if (matches && matches[1]) {
            return parseInt(matches[1].replace(/\D/g, ''));
          }
          return 0;
        };
        
        const updatedPlatforms = baseSocialPlatforms.map(basePlatform => {
          const dynamicPlatform = dynamicData.find((dp: SocialDisplayDataItem) => dp.name === basePlatform.name);
          const followerString = dynamicPlatform ? dynamicPlatform.followersDisplayString : basePlatform.followers;
          // Use rawCount directly if available, otherwise extract from formatted string
          const followerNumber = dynamicPlatform?.rawCount || 
                               (dynamicPlatform ? extractNumber(dynamicPlatform.followersDisplayString) : basePlatform.followersNumber);
          
          return {
            ...basePlatform,
            url: dynamicPlatform?.url || basePlatform.url,
            followers: followerString,
            followersNumber: followerNumber
          };
        });
        
        setSocialPlatformData(updatedPlatforms);
      })
      .catch(error => {
        console.error("Could not fetch social display data:", error);
      });
  }, []);

  // Section reference for animations

  return (
    <SectionContainer ref={sectionRef} id="folge-mir">
      <BeigeBackground />
      <ContentWrapper>
        <SectionTitle 
          as={motion.h2}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Werde Teil meiner Community!
        </SectionTitle>
        
        <SocialLinksGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* LinkedIn */}
          <PlatformContainer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <PlatformIcon>
              <FaLinkedin />
            </PlatformIcon>
            <FollowerCount>
              + <CountUp 
                  end={52000} 
                  duration={2.5} 
                  separator="."
                  formattingFn={(value) => {
                    // Format full number with German thousands separator
                    return new Intl.NumberFormat('de-DE').format(value);
                  }}
                  enableScrollSpy={true}
                  scrollSpyDelay={200}
                />
            </FollowerCount>
            <ProfileButton 
              href={socialPlatformData.find(p => p.name === 'LinkedIn')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              ZUM PROFIL
            </ProfileButton>
          </PlatformContainer>
          
          {/* Divider */}
          <VerticalDivider />
          
          {/* Instagram */}
          <PlatformContainer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <PlatformIcon>
              <FaInstagram />
            </PlatformIcon>
            <FollowerCount>
              + <CountUp 
                  end={11500} 
                  duration={2.5}
                  separator="."
                  formattingFn={(value) => {
                    // Format full number with German thousands separator
                    return new Intl.NumberFormat('de-DE').format(value);
                  }}
                  enableScrollSpy={true}
                  scrollSpyDelay={300}
                />
            </FollowerCount>
            <ProfileButton 
              href={socialPlatformData.find(p => p.name === 'Instagram')?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              ZUM PROFIL
            </ProfileButton>
          </PlatformContainer>
        </SocialLinksGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FollowMeSection;
