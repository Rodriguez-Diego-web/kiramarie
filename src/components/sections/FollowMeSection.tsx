import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaUserTie, FaSpotify } from 'react-icons/fa'; // Beispiel-Icons

const SectionContainer = styled.section`
  background-color:rgb(255, 255, 255); /* Dunkler Hintergrund, fast schwarz */
  padding: 40px 20px 60px; /* Reduziertes Padding */
  color: #ffffff; /* Weiße Schriftfarbe für Kontrast */
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  position: relative; /* Für Parallax-Kindelement */
  overflow: hidden; /* Verhindert, dass Pattern übersteht */
  margin-top: -1px; /* Verhindert mögliche Lücke zum vorherigen Element */
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative; /* Um über dem Parallax-Pattern zu liegen */
  z-index: 1;       /* Stellt sicher, dass der Inhalt oben ist */
`;

const SocialLinksGrid = styled(motion.div)`
  display: grid;
  gap: 30px; 
  justify-items: center;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 767px) { 
    grid-template-columns: repeat(2, 1fr);
    gap: 20px; 
  }
`;

const StyledLinkCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(67, 63, 63, 0.05); 
  border-radius: 12px;
  text-decoration: none;
  color: #ffffff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%; 

  &:hover {
    background-color: rgba(66, 65, 65, 0.1);
    transform: translateY(-5px) scale(1.02); /* Leichte Skalierung beim Hover */
  }
`;

const PlatformIcon = styled.div<{
  bgColor?: string;
  hoverColor?: string;
}>`
  font-size: 1.8rem; /* Verkleinert von 2.2rem */
  margin-bottom: 8px; /* Reduziert von 10px */
  transition: color 0.3s ease;
  color: ${({ color }) => color || '#CDAFFD'}; /* Standardfarbe, falls keine spezifische Farbe */

  @media (max-width: 767px) {
    font-size: 1.6rem; /* Verkleinert für Mobile */
  }
`;

const PlatformName = styled.span`
  font-size: 0.85rem; /* Verkleinert von 0.9rem */
  font-weight: 500;
  color:rgb(31, 31, 31); /* Etwas helleres Grau für bessere Lesbarkeit auf dunklem Grund */
  text-align: center;
`;

const FollowerCount = styled.span`
  font-size: 0.75rem; /* Kleinere Schrift für Follower */
  color: #A0A0A0; /* Dezente Farbe für Follower */
  margin-top: 4px;
`;

interface SocialDisplayDataItem {
  name: string;
  url: string;
  followersDisplayString: string | null;
}

interface SocialPlatform {
  name: string;
  icon: JSX.Element;
  url: string;
  followers?: string | null;
  color?: string;
}

const baseSocialPlatforms: SocialPlatform[] = [
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://de.linkedin.com/in/kiramariecremer', followers: 'Lade...', color: '#0077B5' }, 
  { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/kiramariecremer/', followers: 'Lade...', color: '#FF69B4' },
  { name: 'Speaker Profil', icon: <FaUserTie />, url: 'https://disruptingminds.com/speaker/kira-marie-cremer/' }, 
  { name: 'Spotify', icon: <FaSpotify />, url: 'https://open.spotify.com/show/67HR7TSSRScAXYuCEGAtgc?go=1&sp_cid=e578cde98c41cde20cf9c1e52209e8b9&utm_source=embed_player_p&utm_medium=desktop&nd=1&dlsi=9daa3857efdd48ca', followers: 'Lade...', color: '#1DB954' },
];

const FollowMeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [socialPlatformData, setSocialPlatformData] = useState<SocialPlatform[]>(baseSocialPlatforms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/socialDisplayData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((dynamicData: SocialDisplayDataItem[]) => {
        const updatedPlatforms = baseSocialPlatforms.map(basePlatform => {
          const dynamicPlatform = dynamicData.find(dp => dp.name === basePlatform.name);
          return {
            ...basePlatform,
            url: dynamicPlatform?.url || basePlatform.url, 
            followers: dynamicPlatform ? dynamicPlatform.followersDisplayString : (basePlatform.followers === 'Lade...' ? null : basePlatform.followers)
          };
        });
        setSocialPlatformData(updatedPlatforms);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Could not fetch social display data:", error);
        setSocialPlatformData(baseSocialPlatforms.map(p => ({...p, followers: p.followers === 'Lade...' ? null : p.followers })));
        setIsLoading(false);
      });
  }, []);

  const titleInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <SectionContainer ref={sectionRef} id="folge-mir">
      <ContentWrapper>
        <SocialLinksGrid
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
        >
          {socialPlatformData.map((platform, index) => (
            <StyledLinkCard
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            >
              <PlatformIcon color={platform.color}>
                {platform.icon}
              </PlatformIcon>
              <PlatformName>{platform.name}</PlatformName>
              {platform.followers && <FollowerCount>{isLoading ? 'Lade...' : platform.followers}</FollowerCount>} 
            </StyledLinkCard>
          ))}
        </SocialLinksGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FollowMeSection;
