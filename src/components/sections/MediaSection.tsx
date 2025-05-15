import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MediaCard from '../cards/MediaCard'; 

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

interface MediaItemData {
  slug: string; 
  title: string;
  publication: string; 
  date: string; 
  url: string; 
  excerpt: string; 
  image?: string; 
  tag?: string;   
}

const mediaData: MediaItemData[] = [
  {
    slug: '2025-05-15-supertestartikel',
    title: 'Super Testartikel von Decap CMS!',
    publication: 'CMS Test Instanz',
    date: '2025-05-15',
    url: '#',
    excerpt: 'Dies ist ein **Testartikel**, der über das CMS erstellt und nun (hoffentlich) angezeigt wird. Der Inhalt hier ist Markdown.',
    image: 'https://via.placeholder.com/300x200.png?text=Pressebild', 
    tag: 'Test',
  },
  {
    slug: '2025-05-15-test',
    title: 'Zweiter Testartikel',
    publication: 'Interne Tests',
    date: '2025-05-15',
    url: '#',
    excerpt: 'Noch ein Eintrag, um das Grid-Layout zu testen.',
    image: 'https://via.placeholder.com/300x200.png?text=Artikelbild+2',
    tag: 'Neuigkeit',
  }
];

const MediaSection: React.FC = () => {
  return (
    <SectionContainer id="presse">
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          PRESSE
        </SectionHeader>
        {mediaData.length > 0 ? (
          <MediaGrid
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {mediaData.map((item) => (
              <MediaCard
                key={item.slug}
                item={{
                  id: item.slug,
                  title: item.title,
                  source: item.publication, 
                  date: item.date,
                  link: item.url,
                  description: item.excerpt, 
                  image: item.image || 'https://via.placeholder.com/300x200.png?text=Bild+fehlt', 
                  tag: item.tag || '', 
                }}
              />
            ))}
          </MediaGrid>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
            Zurzeit sind keine Presseartikel verfügbar.
          </p>
        )}
      </ContentWrapper>
    </SectionContainer>
  );
};

export default MediaSection;