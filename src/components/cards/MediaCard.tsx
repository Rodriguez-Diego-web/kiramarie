import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export interface MediaItem {
  id: string; 
  tag: string;
  source: string;
  image: string; 
  title: string;
  description: string;
  link: string;
}

interface MediaCardProps {
  item: MediaItem;
}

const CardWrapper = styled(motion.div)`
  background-color: #f9f9f9;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: var(--body-font);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;
  }

  ${CardWrapper}:hover & img {
    transform: scale(1.05);
  }
`;

const ContentArea = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: #e6dfd7;
  color: #9370DB;
  padding: 4px 10px;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  align-self: flex-start;
`;

const MetaInfo = styled.p`
  font-size: 0.8rem;
  color: #666666;
  margin-bottom: 12px;
  line-height: 1.4;
`;

const CardTitle = styled.h3`
  font-family: var(--body-font);
  font-size: 1.05rem;
  font-weight: 700;
  color: #222222;
  margin-bottom: 10px;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #555555;
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const ReadMoreButton = styled(motion.a)`
  display: inline-block;
  text-align: center;
  background-color: #9370DB; 
  color: #e6dfd7; 
  padding: 10px 20px;
  border-radius: 0;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  margin-top: auto;
  transition: background-color 0.3s ease;
  font-family: var(--body-font);

  &:hover {
    background-color: color-mix(in srgb, #9370DB 85%, black);
  }
`;

const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
    >
      <ImageContainer>
        <img 
          src={`${process.env.PUBLIC_URL}${item.image}`} 
          alt={`Vorschaubild für ${item.title}`} 
          loading="lazy"
          onError={(e) => {
            // Fallback wenn das Bild nicht geladen werden kann
            const target = e.target as HTMLImageElement;
            target.src = `${process.env.PUBLIC_URL}/uploads/default-press-image.webp`;
            console.error(`Bild konnte nicht geladen werden: ${item.image}`);
          }}
        />
      </ImageContainer>
      <ContentArea>
        <Tag>{item.tag}</Tag>
        <MetaInfo>{item.source}</MetaInfo>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <ReadMoreButton href={item.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2 }}>
          Mehr dazu
        </ReadMoreButton>
      </ContentArea>
    </CardWrapper>
  );
};

export default MediaCard;