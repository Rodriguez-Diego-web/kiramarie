import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaLinkedinIn, FaYoutube, FaSpotify, FaApple, FaPodcast, FaBook, FaMicrophone } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';

interface SocialIconProps {
  bgColor: string;
}

const podcastPlatforms = [
  { icon: FaSpotify, name: 'Spotify' },
  { icon: FaApple, name: 'Apple Podcasts' },
  { icon: FaYoutube, name: 'YouTube' }
];

const speakerTopics = [
  'New Work und Arbeitskultur im 21. Jahrhundert',
  'KI und Führung: Wie Technologie Management verändert',
  'Remote-Work: Erfolgsstrategien für verteilte Teams'
];

const bookMetadata = [
  { label: 'Erschienen', value: 'April 2024' },
  { label: 'Verlag', value: 'Campus Verlag' },
  { label: 'Seiten', value: '264' }
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
    followers: '87.5K Follower',
    action: 'Folgen'
  },
  { 
    icon: FaLinkedinIn, 
    bgColor: '#0077B5', 
    platform: 'LinkedIn', 
    followers: '63.2K Follower',
    action: 'Folgen'
  },
  { 
    icon: FaYoutube, 
    bgColor: '#FF0000', 
    platform: 'YouTube', 
    followers: '42.8K Abonnenten',
    action: 'Abonnieren'
  }
];

const MediaSection: React.FC = () => {
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  
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
              <CoverImage src="/images/book-cover.jpg" alt="Die Zukunft der Arbeit - Buchcover" />
              <CoverOverlay>
                <OverlayButton>Leseprobe</OverlayButton>
              </CoverOverlay>
            </BookCover>
            <BookInfo>
              <BookTitle>Die Zukunft der Arbeit</BookTitle>
              <BookSubtitle>Wie wir morgen arbeiten werden</BookSubtitle>
              <BookDescription>
                In meinem Bestseller beschreibe ich, wie sich unsere Arbeitswelt durch Digitalisierung und KI transformiert,
                und biete praktische Ansätze für Unternehmen und Führungskräfte, diese Veränderungen gewinnbringend zu gestalten.
              </BookDescription>
              <BookMetadata>
                {renderMetadataItems(bookMetadata)}
              </BookMetadata>
              <PurchaseButton>
                Buch kaufen
              </PurchaseButton>
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
              <ArtworkImage src="/images/podcast-artwork.jpg" alt="Future of Work Podcast" />
            </PodcastArtwork>
            <PodcastInfo>
              <PodcastTitle>Die Zukunft der Arbeit</PodcastTitle>
              <PodcastDescription>
                In meinem wöchentlichen Podcast spreche ich mit Experten und Visionären über Trends, 
                Herausforderungen und Chancen in der sich wandelnden Arbeitswelt.
              </PodcastDescription>
              <PodcastMetadata>
                {renderMetadataItems(podcastMetadata)}
              </PodcastMetadata>
              <PodcastPlatforms>
                {podcastPlatforms.map((platform, index) => (
                  <PlatformButton key={`platform-${index}`}>
                    <Icon icon={platform.icon} /> {platform.name}
                  </PlatformButton>
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
            <SpeakerImage src="/images/speaker.jpg" alt="Kira Marie als Sprecherin" />
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
            <NewsletterTitle>Newsletter abonnieren</NewsletterTitle>
            <NewsletterDescription>
              Erhalten Sie monatlich aktuelle Insights, exklusive Inhalte und Einladungen zu meinen Events direkt in Ihren Posteingang.
            </NewsletterDescription>
            <NewsletterForm onSubmit={handleSubmit}>
              <NewsletterInput type="email" placeholder="Ihre E-Mail-Adresse" required />
              <NewsletterButton>Anmelden</NewsletterButton>
            </NewsletterForm>
            <BeehiivDisclaimer>Powered by Beehiiv</BeehiivDisclaimer>
          </NewsletterSection>
          
          <SocialSection>
            <SocialTitle>Folgen Sie mir</SocialTitle>
            <SocialAccounts>
              {socialAccounts.map((account, index) => (
                <SocialAccount key={`social-${index}`}>
                  <SocialIcon bgColor={account.bgColor}>
                    <Icon icon={account.icon} />
                  </SocialIcon>
                  <SocialDetails>
                    <SocialPlatform>{account.platform}</SocialPlatform>
                    <SocialFollowers>{account.followers}</SocialFollowers>
                  </SocialDetails>
                  <SocialFollow>{account.action}</SocialFollow>
                </SocialAccount>
              ))}
            </SocialAccounts>
          </SocialSection>
        </NewsletterAndSocial>
      </FullWidthContainer>
    </SectionContainer>
  );
};

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

const PurchaseButton = styled.button`
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

const PlatformButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: var(--text);
  border: 1px solid #cdaffd;
  padding: 10px 20px;
  border-radius: 50px;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
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

const SpeakerImage = styled.img`
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
  gap: 50px;
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const NewsletterSection = styled.div`
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const NewsletterTitle = styled.h4`
  font-family: var(--heading-font);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
`;

const NewsletterDescription = styled.p`
  font-family: var(--body-font);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text);
  margin-bottom: 2rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: var(--body-font);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #cdaffd;
  }
`;

const NewsletterButton = styled.button`
  background-color: #cdaffd;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-family: var(--heading-font);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: #ba9cf2;
  }
`;

const BeehiivDisclaimer = styled.div`
  font-family: var(--body-font);
  font-size: 0.8rem;
  color: var(--text-light);
`;

const SocialSection = styled.div`
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const SocialTitle = styled.h4`
  font-family: var(--heading-font);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 2rem;
`;

const SocialAccounts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SocialAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SocialIcon = styled.div<SocialIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: ${props => props.bgColor};
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
`;

const SocialDetails = styled.div`
  flex: 1;
`;

const SocialPlatform = styled.div`
  font-family: var(--heading-font);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
`;

const SocialFollowers = styled.div`
  font-family: var(--body-font);
  font-size: 0.9rem;
  color: var(--text-light);
`;

const SocialFollow = styled.button`
  background-color: transparent;
  color: #cdaffd;
  border: 1px solid #cdaffd;
  padding: 8px 15px;
  border-radius: 50px;
  font-family: var(--heading-font);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #cdaffd;
    color: white;
  }
`;

export default memo(MediaSection);
