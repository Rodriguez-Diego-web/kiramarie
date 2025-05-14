import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MediaCard, { MediaItem } from '../cards/MediaCard'; // Importiere die MediaCard Komponente und das Interface

// Beispieldaten für die Pressekarten
const mediaData: MediaItem[] = [
  {
    id: '1',
    tag: 'TV-Auftritt',
    date: '07.05.24',
    source: 'OMR',
    imageSrc: 'https://via.placeholder.com/400x225/DB7093/FFFFFF?text=OMR+2024',
    title: 'Auftritt auf der OMR 2024',
    description: 'Laura Bornmann über generationsübergreifende Zusammenarbeit.',
    link: '#omr2024',
  },
  {
    id: '2',
    tag: 'Interview',
    date: '02.05.24',
    source: 'Arbeit und Arbeitsrecht',
    imageSrc: 'https://via.placeholder.com/400x225/4682B4/FFFFFF?text=Interview',
    title: 'Gute Führung, schlechte Führung',
    description: 'Führung ist der größte Hebel für die Bindung der Mitarbeiter an ein Unternehmen. Worauf sowohl Arbeitgeber als auch Führungskräfte selbst dabei achten sollten, hat uns die HR-Expertin Laura Bornmann im Interview geschildert.',
    link: '#interview-aua',
  },
  {
    id: '3',
    tag: 'Interview',
    date: '15.03.24',
    source: 'manager magazin',
    imageSrc: 'https://via.placeholder.com/400x225/3CB371/FFFFFF?text=Manager+Magazin',
    title: 'Wie Managerinnen und Manager die Sinnkrise im Job meistern',
    description: 'Status Last. Falls auch Sie gerade in der Sinnkrise stecken, lautet die gute Nachricht: Sie sind nicht allein.',
    link: '#interview-mm',
  },
  {
    id: '4',
    tag: 'Interview',
    date: '11.02.24',
    source: 'Business Punk',
    imageSrc: 'https://via.placeholder.com/400x225/FFD700/000000?text=Business+Punk',
    title: 'Watchlist 2024: 100 Köpfe, die ihr kennen müsst!',
    description: 'Wer denkt die Dinge radikal neu? Wen sollte man kennen? Wer bringt unser Land ein Stück voran? Wir verraten es euch.',
    link: '#watchlist-bp',
  },
];

const SectionContainer = styled.section`
  background-color: #ffffff; /* Weißer Hintergrund */
  padding: 80px 20px;
  font-family: 'Montserrat', sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 700;
  color:rgb(34, 34, 34);
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: #9370DB; /* Lila für den Unterstrich */
  }
`;

const MediaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MediaSection: React.FC = () => {
  return (
    <SectionContainer id="presse">
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Presse</SectionTitle>
        </SectionHeader>
        <MediaGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
          {mediaData.map(item => (
            <MediaCard key={item.id} item={item} />
          ))}
        </MediaGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default MediaSection;