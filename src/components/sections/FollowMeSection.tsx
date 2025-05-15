import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaUserTie, FaSpotify } from 'react-icons/fa'; // Beispiel-Icons

const SectionContainer = styled.section`
  background-color: #111111; /* Dunkler Hintergrund, fast schwarz */
  padding: 80px 20px;
  color: #ffffff; /* Weiße Schriftfarbe für Kontrast */
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  position: relative; /* Für Parallax-Kindelement */
  overflow: hidden; /* Verhindert, dass Pattern übersteht */
`;

const ParallaxBackgroundPattern = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%; /* Testweise Höhe erhöht */
  background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px); /* Deutlicheres Muster: 20% Deckkraft, 1px Größe */
  background-size: 30px 30px; /* Etwas größere Punkte zum Testen */
  z-index: 0; /* Hinter dem Inhalt */
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative; /* Um über dem Parallax-Pattern zu liegen */
  z-index: 1;       /* Stellt sicher, dass der Inhalt oben ist */
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 50px;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 2.2rem; 
  }
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

const SocialLinkItem = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.05); 
  border-radius: 12px;
  text-decoration: none;
  color: #ffffff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%; 

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px) scale(1.02); /* Leichte Skalierung beim Hover */
    svg {
      transform: scale(1.15) rotate(-8deg); /* Icon-Animation beim Hover */
    }
  }

  svg {
    font-size: 3rem; 
    margin-bottom: 15px;
    color: #9370DB; 
    transition: transform 0.3s ease; /* Wichtig für sanfte Icon-Animation */
  }

  span {
    font-size: 1rem;
    font-weight: 600;
    text-align: center; 
  }

  .follower-count {
    font-size: 0.8rem;
    color: #b0b0b0; /* Helleres Grau für die Follower-Zahl */
    margin-top: 5px;
  }

  @media (max-width: 767px) {
    height: 160px; 
  }
`;

// Interface für die Daten aus socialDisplayData.json
interface SocialDisplayDataItem {
  name: string;
  url: string;
  followersDisplayString: string | null;
}

// Interface für die intern verwendete Struktur inkl. Icon
interface SocialPlatform {
  name: string;
  icon: JSX.Element;
  url: string; // Wird durch dynamische Daten überschrieben
  followers?: string | null; // Wird durch dynamische Daten überschrieben
}

// Statische Basisdaten (Icons und Default-Namen/URLs)
const baseSocialPlatforms: SocialPlatform[] = [
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://de.linkedin.com/in/kiramariecremer', followers: 'Lade...' }, 
  { name: 'Instagram', icon: <FaInstagram />, url: '#', followers: 'Lade...' },
  { name: 'Speaker Profil', icon: <FaUserTie />, url: 'https://disruptingminds.com/speaker/kira-marie-cremer/' }, // Kein Follower-Feld initial
  { name: 'Spotify', icon: <FaSpotify />, url: '#', followers: 'Lade...' },
];

const FollowMeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
            url: dynamicPlatform?.url || basePlatform.url, // Fallback auf Basis-URL
            followers: dynamicPlatform ? dynamicPlatform.followersDisplayString : (basePlatform.followers === 'Lade...' ? null : basePlatform.followers)
          };
        });
        setSocialPlatformData(updatedPlatforms);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Could not fetch social display data:", error);
        // Bei Fehler bleiben die Basis-Plattformen (evtl. ohne 'Lade...' Text)
        setSocialPlatformData(baseSocialPlatforms.map(p => ({...p, followers: p.followers === 'Lade...' ? null : p.followers })));
        setIsLoading(false);
      });
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Beginnt, wenn Oberkante Sektion unteren Viewport erreicht, endet, wenn Unterkante Sektion oberen Viewport verlässt
  });

  // Parallax-Effekt für das Hintergrundmuster
  // Bewegt das Muster von -X% seiner Höhe nach +X% seiner Höhe, während die Sektion durchgescrollt wird.
  // Dies lässt das Muster langsamer scrollen als den Inhalt.
  // Kleinere Werte (z.B. '-10%', '10%') lassen es "fester" erscheinen.
  const patternY = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']); // Testweise stärkere Bewegung
  const titleInView = useInView(sectionRef, { once: true, amount: 0.1 }); // Korrekter Hook für Titelanimation

  return (
    <SectionContainer ref={sectionRef} id="folge-mir">
      <ParallaxBackgroundPattern style={{ y: patternY }} />
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Folge Mir
        </SectionTitle>
        <SocialLinksGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, staggerChildren: 0.1 }}
        >
          {socialPlatformData.map((platform, index) => (
            <SocialLinkItem
              key={platform.name} // Namen sind hier eindeutiger als der Index, falls sich Reihenfolge ändert
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            >
              {platform.icon}
              <span>{platform.name}</span>
              {platform.followers && (
                <motion.span
                  className="follower-count"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} // Stellt sicher, dass die Animation nur einmal pro Element ausgelöst wird
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }} // Verzögert nach Kachel-Animation
                >
                  {isLoading ? 'Lade...' : platform.followers}
                </motion.span>
              )}
            </SocialLinkItem>
          ))}
        </SocialLinksGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FollowMeSection;
