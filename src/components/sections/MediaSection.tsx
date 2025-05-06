import React, { memo, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaTiktok, FaSpotify, FaApple, FaPodcast, FaBook, FaMicrophone, FaArrowRight, FaYoutube } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';
import buchCover from '../../assets/images/buch.png';    
import podcastArtwork from '../../assets/images/podcast-artwork.png';
import speakerImage from '../../assets/images/speaker.webp';

interface SocialIconProps {
  bgColor: string;
}

const podcastPlatforms = [
  { icon: FaSpotify, name: 'Spotify', url: 'https://open.spotify.com/show/67HR7TSSRScAXYuCEGAtgc?si=5d025b1f8f594745&nd=1&dlsi=5ef1d88785f148a0' },
  { icon: FaApple, name: 'Apple Podcasts', url: 'https://podcasts.apple.com/podcast/id1234567890' },
  { icon: FaYoutube, name: 'YouTube', url: 'https://www.youtube.com/channel/' }
];

const speakerTopics = [
  'New Work und Arbeitskultur im 21. Jahrhundert',
  'KI und Führung: Wie Technologie Management verändert',
  'Remote-Work: Erfolgsstrategien für verteilte Teams'
];

const bookMetadata = [
  { label: 'Erschienen', value: 'April 2024' },
  { label: 'Verlag', value: 'Campus Verlag' },
  { label: 'Seiten', value: '112' }
];

const podcastMetadata = [
  { label: 'Neue Folgen', value: 'Jeden Montag' },
  { label: 'Länge', value: '40-60 Min' },
  { label: 'Sprache', value: 'Deutsch' }
];

const socialAccounts = [
  { 
    icon: FaInstagram, 
    bgColor: '#E1306C', 
    platform: 'Instagram', 
    followers: '10.9K Follower',
    action: 'Folgen',
    url: 'https://instagram.com/kiramariecremer'
  },
  { 
    icon: FaTiktok, 
    bgColor: '#000000', 
    platform: 'TikTok', 
    followers: 'Neu',
    action: 'Folgen',
    url: 'https://tiktok.com/@kiramariecremer'
  },
  { 
    icon: FaLinkedinIn, 
    bgColor: '#0077B5', 
    platform: 'LinkedIn', 
    followers: 'Professionelles Netzwerk',
    action: 'Verbinden',
    url: 'https://www.linkedin.com/in/kiramariecremer'
  }
];

const MediaSection: React.FC = memo(() => {
  const { scrollYProgress } = useScroll();
  const [isNewsletterSuccess, setIsNewsletterSuccess] = useState(false);
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  const parallaxValues = useMemo(() => ({
    backgroundY
  }), [backgroundY]);
  
  const renderMetadataItems = (items: { label: string; value: string }[]) => (
    items.map((item, index) => (
      <MetaItem key={`meta-${index}`}>
        <MetaLabel>{item.label}</MetaLabel>
        <MetaValue>{item.value}</MetaValue>
      </MetaItem>
    ))
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter-Anmeldung simulieren
    setIsNewsletterSuccess(true);
    setTimeout(() => setIsNewsletterSuccess(false), 3000);
  };

  return (
    <SectionContainer id="media">
      <SectionBackground style={{ y: parallaxValues.backgroundY }}>
        <BackgroundGradient />
      </SectionBackground>
      
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Meine Medien & Inhalte</SectionTitle>
          <SectionSubtitle>Erfahren Sie mehr über meine Arbeit und Projekte</SectionSubtitle>
        </SectionHeader>
        
        <BookSection>
          <MediaFeatureTitle>
            <FeatureIcon>
              <Icon icon={FaBook} />
            </FeatureIcon>
            Mein Buch
          </MediaFeatureTitle>
          
          <BookShowcase>
            <BookCover>
              <CoverImage src={buchCover} alt="New Work - Buchcover von Kira Marie Cremer" />
              <CoverOverlay>
                <OverlayButton>Leseprobe</OverlayButton>
              </CoverOverlay>
            </BookCover>
            <BookInfo>
              <BookTitle>Arbeit ist das halbe Leben?</BookTitle>
              <BookSubtitle>New Work in der modernen Arbeitswelt</BookSubtitle>
              <BookDescription>
                Als New-Work-Expertin beschreibe ich in meinem Kurzsachbuch die Bedeutung von New Work für die moderne Arbeitswelt. 
                In meinem ersten eigenen Buch teile ich praxisnahe Beispiele und spannende Insights aus meinem beliebten Podcast, 
                in dem ich mit Gäst*innen aus unterschiedlichen Branchen über neue Arbeitsmodelle, Unternehmenskultur, 
                Diversity, New Leadership und vieles mehr spreche.
              </BookDescription>
              <BookMetadata>
                {renderMetadataItems(bookMetadata)}
              </BookMetadata>
              <BookLink href="https://www.amazon.de/dp/3960963998/ref=cm_sw_r_as_gl_api_gl_i_Y230PD988ZWBDQEH5Y1C?linkCode=ml1&tag=kira017-21" target="_blank" rel="noopener noreferrer">
                Buch kaufen
              </BookLink>
            </BookInfo>
          </BookShowcase>
        </BookSection>
        
        <PodcastSection>
          <MediaFeatureTitle>
            <FeatureIcon>
              <Icon icon={FaPodcast} />
            </FeatureIcon>
            Mein Podcast
          </MediaFeatureTitle>
          
          <PodcastShowcase>
            <PodcastArtwork>
              <ArtworkImage src={podcastArtwork} alt="New Work Podcast mit Kira Marie Cremer" />
            </PodcastArtwork>
            <PodcastInfo>
              <PodcastTitle>New Work Podcast</PodcastTitle>
              <PodcastDescription>
                In meinem wöchentlichen Podcast spreche ich mit Gäst*innen aus unterschiedlichen Branchen über 
                neue Arbeitsmodelle, Unternehmenskultur, Diversity, New Leadership und weitere spannende Themen 
                rund um die moderne Arbeitswelt.
              </PodcastDescription>
              <PodcastMetadata>
                {renderMetadataItems(podcastMetadata)}
              </PodcastMetadata>
              <PodcastPlatforms>
                {podcastPlatforms.map((platform, index) => (
                  <PlatformLink 
                    key={`platform-${index}`}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon icon={platform.icon} /> {platform.name}
                  </PlatformLink>
                ))}
              </PodcastPlatforms>
            </PodcastInfo>
          </PodcastShowcase>
        </PodcastSection>
        
        <SpeakerSection>
          <MediaFeatureTitle>
            <FeatureIcon>
              <Icon icon={FaMicrophone} />
            </FeatureIcon>
            Als Sprecherin buchen
          </MediaFeatureTitle>
          
          <SpeakerContent>
            <SpeakerImg src={speakerImage} alt="Kira Marie als Sprecherin" />
            <SpeakerInfo>
              <SpeakerDescription>
                Mit über 10 Jahren Erfahrung als Keynote-Speakerin bei Konferenzen, Unternehmen und Events 
                biete ich inspirierende und tiefgehende Vorträge zu den Themen Zukunft der Arbeit, 
                moderne Führung und digitale Transformation.
              </SpeakerDescription>
              <SpeakerTopics>
                <TopicLabel>Vortragsthemen:</TopicLabel>
                <TopicList>
                  {speakerTopics.map((topic, index) => (
                    <TopicItem key={`topic-${index}`}>{topic}</TopicItem>
                  ))}
                </TopicList>
              </SpeakerTopics>
              <BookSpeakerButton>
                Anfrage senden
              </BookSpeakerButton>
            </SpeakerInfo>
          </SpeakerContent>
        </SpeakerSection>
      </ContentWrapper>
      
      <FullWidthContainer>
        <NewsletterAndSocial>
          <NewsletterSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <NewsletterTitle>Lese- & Wissensvorsprung sichern</NewsletterTitle>
              <NewsletterDescription>
                Erhalten Sie monatlich exklusive Insights, Zukunftstrends und Einladungen zu Veranstaltungen direkt in Ihren Posteingang.
              </NewsletterDescription>
              
              {isNewsletterSuccess ? (
                <SuccessMessage>
                  <SuccessIcon>✓</SuccessIcon>
                  Vielen Dank! Ihre Anmeldung war erfolgreich.
                </SuccessMessage>
              ) : (
                <NewsletterForm onSubmit={handleSubmit}>
                  <NewsletterInput type="email" placeholder="Ihre E-Mail-Adresse" required />
                  <NewsletterButton>
                    <span>Anmelden</span>
                    <Icon icon={FaArrowRight} size={14} />
                  </NewsletterButton>
                </NewsletterForm>
              )}
              
              <BeehiivDisclaimer>Powered by Beehiiv</BeehiivDisclaimer>
            </motion.div>
          </NewsletterSection>
          
          <SocialSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SocialTitle>Social Media</SocialTitle>
              <SocialAccounts>
                {socialAccounts.map((account, index) => (
                  <SocialAccount 
                    key={`social-${index}`}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <SocialIcon bgColor={account.bgColor}>
                      <Icon icon={account.icon} size={20} color="#fff" />
                    </SocialIcon>
                    <SocialDetails>
                      <SocialPlatform>{account.platform}</SocialPlatform>
                      <SocialFollowers>{account.followers}</SocialFollowers>
                    </SocialDetails>
                    <SocialFollow>
                      {account.action} <Icon icon={FaArrowRight} size={12} />
                    </SocialFollow>
                  </SocialAccount>
                ))}
              </SocialAccounts>
            </motion.div>
          </SocialSection>
        </NewsletterAndSocial>
      </FullWidthContainer>
    </SectionContainer>
  );
});

const SectionContainer = styled.section`
  position: relative;
  padding: 120px 0;
  overflow: hidden;
`;

const SectionBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #f8f5ff 0%, #ffffff 100%);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-family: var(--heading-font);
  font-size: 3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: var(--body-font);
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
`;

const MediaFeatureTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--heading-font);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 40px;
`;

const FeatureIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #cdaffd;
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-family: var(--heading-font);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
  color: var(--text-light);
`;

const MetaValue = styled.span`
  font-family: var(--body-font);
  font-size: 1rem;
  color: var(--text);
  font-weight: 600;
`;

const BookSection = styled.div`
  margin-bottom: 100px;
`;

const BookShowcase = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const BookCover = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
  
  &:hover {
    img {
      transform: scale(1.05);
    }
    
    > div {
      opacity: 1;
    }
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
`;

const CoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const OverlayButton = styled.button`
  background-color: white;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #cdaffd;
    color: white;
    transform: translateY(-2px);
  }
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.h4`
  font-family: var(--heading-font);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
`;

const BookSubtitle = styled.h5`
  font-family: var(--heading-font);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 1.5rem;
`;

const BookDescription = styled.p`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2rem;
`;

const BookMetadata = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const BookLink = styled.a`
  display: inline-block;
  background-color: #cdaffd;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-family: var(--heading-font);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background-color: #ba9cf2;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(205, 175, 253, 0.3);
  }
`;

const PodcastSection = styled.div`
  margin-bottom: 100px;
`;

const PodcastShowcase = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const PodcastArtwork = styled.div`
  width: 100%;
  max-width: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  margin: 0 auto;
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const PodcastInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PodcastTitle = styled.h4`
  font-family: var(--heading-font);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
`;

const PodcastDescription = styled.p`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2rem;
`;

const PodcastMetadata = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const PodcastPlatforms = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const PlatformLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: var(--text);
  border: 1px solid #cdaffd;
  padding: 10px 20px;
  border-radius: 50px;
  font-family: var(--body-font);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: #cdaffd;
    color: white;
    transform: translateY(-2px);
  }
`;

const SpeakerSection = styled.div`
  margin-bottom: 100px;
`;

const SpeakerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SpeakerImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const SpeakerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpeakerDescription = styled.p`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2rem;
`;

const SpeakerTopics = styled.div`
  margin-bottom: 2rem;
`;

const TopicLabel = styled.h5`
  font-family: var(--heading-font);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
`;

const TopicList = styled.ul`
  padding-left: 1.5rem;
`;

const TopicItem = styled.li`
  font-family: var(--body-font);
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const BookSpeakerButton = styled.button`
  align-self: flex-start;
  background-color: #cdaffd;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-family: var(--heading-font);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ba9cf2;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(205, 175, 253, 0.3);
  }
`;

const FullWidthContainer = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background: linear-gradient(135deg, #f8f5ff 0%, #f0e9ff 100%);
  padding: 80px 0;
  margin-top: 50px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, transparent, #cdaffd, transparent);
  }
`;

const NewsletterAndSocial = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: #f8f5ff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(205, 175, 253, 0.1);
  margin-top: 6rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const NewsletterSection = styled.div`
  padding: 4rem;
  background: linear-gradient(135deg, #eee9fb 0%, #f3edff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const NewsletterTitle = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: var(--secondary);
`;

const NewsletterDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  color: var(--text);
  max-width: 90%;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 1.2rem 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0d8f3;
  background-color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: var(--text);
  outline: none;
  
  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(205, 175, 253, 0.2);
  }
`;

const NewsletterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: var(--accent);
  color: white;
  padding: 1.2rem 1.8rem;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--secondary);
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 1.5rem;
  background-color: rgba(104, 219, 153, 0.1);
  border-left: 3px solid #68db99;
  border-radius: 8px;
  color: #2a7e53;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const SuccessIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #68db99;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
`;

const BeehiivDisclaimer = styled.small`
  font-size: 0.8rem;
  color: #a99fc5;
  font-family: 'Montserrat', sans-serif;
`;

const SocialSection = styled.div`
  padding: 4rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const SocialTitle = styled.h4`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--secondary);
`;

const SocialAccounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SocialAccount = styled(motion.a)`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.2rem;
  border: 1px solid #f0ebfb;
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SocialIcon = styled.div<SocialIconProps>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.2rem;
  color: white;
`;

const SocialDetails = styled.div`
  flex: 1;
`;

const SocialPlatform = styled.h5`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: var(--secondary);
`;

const SocialFollowers = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #7b7691;
  margin: 0;
`;

const SocialFollow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--accent);
`;

export default memo(MediaSection);
