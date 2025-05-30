import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; 
import MediaCard, { MediaItem } from '../cards/MediaCard'; 
import pressArticlesData from '../../generated/pressArticles.json';

// Renamed to act as the main wrapper for overlap effect
const PresseSectionWrapper = styled.section`
  position: relative;
  padding-top: 90px; /* Space for the overlapping title */
  padding-bottom: 0; /* Override global section bottom padding */
  margin-top: -100px; /* Pulls section up to overlap previous one */
  z-index: 2; /* Ensure it's above the previous section */
  font-family: 'Montserrat', sans-serif; /* Default font for section */
`;

// The large, black, overlapping 'PRESSE' title
const SectionTitle = styled(motion.h2)`
  font-family: 'Kingdom', serif; /* Kingdom font */
  font-size: 5rem; /* Large title size */
  font-weight: normal;
  color: #000000; /* Black text */
  text-align: center;
  
  position: absolute; /* Absolute positioning within PresseSectionWrapper */
  top: 40px; /* Position from top of wrapper, adjust for desired overlap */
  left: 0;
  right: 0;
  z-index: 3; /* Title above content background and previous section */

  @media (max-width: 767px) {
    font-size: 3rem;
    top: 60px;
  }
`;

// New container for the beige background and main content
const BeigeBackgroundContainer = styled.div`
  background-color: #E6DFD7; /* Beige background */
  padding: 100px 20px 40px 20px; /* Bottom padding set to 40px */
  position: relative;
  z-index: 1; /* Below the SectionTitle */
  
  /* Full viewport width */
  width: 100vw; /* Corrected from 00vw */
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

// Existing wrapper to constrain content width
const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center; /* Ensures button is centered if not full width */
`;

const MediaGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px; /* Space above LoadMoreButton */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 15px 40px; /* Increased padding for larger size */
  border: none;
  border-radius: 0; /* Rectangular shape */
  background-color: #000000; /* Black background */
  color: #fff;
  cursor: pointer;
  font-size: .8rem; /* Slightly larger font */
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  font-family: var(--body-font); 

  &:hover {
    background-color: #333; /* Darken on hover */
  }
`;

const mediaItemsContainerId = 'media-items-container';

interface PressArticle {
  id: string;
  title: string;
  publication: string;
  url: string;
  excerpt: string;
  image?: string | null; 
  tag?: string;   
}

const MediaSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(4); 
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const placeholderImage = '/uploads/default-press-image.webp'; 

    const transformedArticles: MediaItem[] = (pressArticlesData as PressArticle[]).map(article => ({
      id: article.id,
      tag: article.tag || 'Presse', 
      source: article.publication, 
      image: article.image || placeholderImage, 
      title: article.title,
      description: article.excerpt, 
      link: article.url,
    }));

    setMediaItems(transformedArticles);
  }, []); 

  const showMoreItems = () => {
    setVisibleItems(prev => prev + 4); // Show 4 more at a time for a 4-column layout
  };

  return (
    <PresseSectionWrapper id="presse">
      <SectionTitle 
        initial={{ opacity: 0, y: -30 }} // Example animation, can be adjusted
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Presse
      </SectionTitle>
      <BeigeBackgroundContainer>
        <ContentWrapper>
          {mediaItems.length > 0 ? (
            <MediaGrid
              id={mediaItemsContainerId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delayChildren: 0.1, staggerChildren: 0.05 }}
            >
              {mediaItems.slice(0, visibleItems).map(item => (
                <MediaCard
                  key={item.id}
                  item={item} 
                />
              ))}
            </MediaGrid>
          ) : (
            <p>Aktuell sind keine Presseartikel verfügbar.</p> 
          )}
          {visibleItems < mediaItems.length && (
            <LoadMoreButton onClick={showMoreItems}>Mehr laden</LoadMoreButton>
          )}
        </ContentWrapper>
      </BeigeBackgroundContainer>
    </PresseSectionWrapper>
  );
};

export default MediaSection;