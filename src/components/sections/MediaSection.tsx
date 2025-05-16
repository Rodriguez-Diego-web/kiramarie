import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; 
import MediaCard, { MediaItem } from '../cards/MediaCard'; 
import pressArticlesData from '../../generated/pressArticles.json';

const SectionContainer = styled.section`
  padding: 60px 20px;
  background-color: #f8f9fa; 
  text-align: center;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: #333;
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

const LoadMoreButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
`;

const mediaItemsContainerId = 'media-items-container';

interface PressArticle {
  id: string;
  title: string;
  publication: string;
  date: string; 
  url: string;
  excerpt: string;
  image?: string | null; 
  tag?: string;   
}

const MediaSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(6); 
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    const placeholderImage = '/uploads/default-press-image.webp'; 

    const transformedArticles: MediaItem[] = (pressArticlesData as PressArticle[]).map(article => ({
      id: article.id,
      tag: article.tag || 'Presse', 
      date: new Date(article.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }), 
      source: article.publication, 
      image: article.image || placeholderImage, 
      title: article.title,
      description: article.excerpt, 
      link: article.url,
    }));

    setMediaItems(transformedArticles);
  }, []); 

  const showMoreItems = () => {
    setVisibleItems(prev => prev + 6);
  };

  return (
    <SectionContainer id="presse">
      <ContentWrapper>
        <SectionHeader
          as={motion.h2} 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PRESSE
        </SectionHeader>
        {mediaItems.length > 0 ? (
          <MediaGrid
            id={mediaItemsContainerId}
            as={motion.div} 
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
    </SectionContainer>
  );
};

export default MediaSection;