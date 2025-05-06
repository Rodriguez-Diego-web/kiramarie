import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioItem {
  id: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: 'Podcast',
    title: 'New Work Know',
    description: 'Podcast über moderne Arbeitswelten und innovative Arbeitskonzepte.',
    imageUrl: '/portfolio-1.jpg',
    link: 'https://newworknow.podcast',
  },
  {
    id: 2,
    category: 'Buch',
    title: 'Die Zukunft der Arbeit',
    description: 'Mein Buch über neue Arbeitsmodelle und deren Implementierung.',
    imageUrl: '/portfolio-2.jpg',
    link: '/book',
  },
  {
    id: 3,
    category: 'Workshop',
    title: 'Remote Work Excellence',
    description: 'Workshop für Führungskräfte zur optimalen Gestaltung von Remote-Arbeit.',
    imageUrl: '/portfolio-3.jpg',
    link: '/workshops',
  },
  {
    id: 4,
    category: 'Job Tipps',
    title: 'Karriereentwicklung',
    description: 'Guide zur persönlichen Karriereentwicklung in modernen Unternehmen.',
    imageUrl: '/portfolio-4.jpg',
    link: '/job-tipps',
  },
  {
    id: 5,
    category: 'Studie',
    title: 'Generation Z im Berufsleben',
    description: 'Umfassende Studie zu Erwartungen und Bedürfnissen der Generation Z.',
    imageUrl: '/portfolio-5.jpg',
    link: '/studies',
  },
  {
    id: 6,
    category: 'Vortrag',
    title: 'New Leadership',
    description: 'Vortrag über moderne Führungsansätze in agilen Organisationen.',
    imageUrl: '/portfolio-6.jpg',
    link: '/talks',
  },
];

const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
  // Convert Set to Array before spreading to fix TypeScript error
  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];
  
  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  
  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
  };
  
  const closeModal = () => {
    setSelectedItem(null);
  };
  
  return (
    <SectionContainer id="portfolio">
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Portfolio</SectionTitle>
          <SectionSubtitle>Entdecke meine Arbeit in verschiedenen Bereichen</SectionSubtitle>
        </SectionHeader>
        
        <FilterContainer>
          {categories.map((category, index) => (
            <FilterButton
              key={index}
              $active={activeCategory === category}
              onClick={() => handleCategoryClick(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <PortfolioGrid>
          <AnimatePresence>
            {filteredItems.map((item) => (
              <PortfolioCard
                key={item.id}
                layoutId={`card-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                onClick={() => openModal(item)}
              >
                <PortfolioImage style={{ backgroundImage: `url(${item.imageUrl})` }}>
                  <PortfolioCategory>{item.category}</PortfolioCategory>
                </PortfolioImage>
                <PortfolioContent>
                  <PortfolioTitle>{item.title}</PortfolioTitle>
                  <PortfolioDescription>{item.description}</PortfolioDescription>
                  <PortfolioLink>Mehr erfahren</PortfolioLink>
                </PortfolioContent>
              </PortfolioCard>
            ))}
          </AnimatePresence>
        </PortfolioGrid>
        
        <AnimatePresence>
          {selectedItem && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModalOverlay onClick={closeModal} />
              <ModalContent
                layoutId={`card-${selectedItem.id}`}
                transition={{ duration: 0.3 }}
              >
                <ModalHeader>
                  <ModalTitle>{selectedItem.title}</ModalTitle>
                  <ModalClose onClick={closeModal}>&times;</ModalClose>
                </ModalHeader>
                
                <ModalImage style={{ backgroundImage: `url(${selectedItem.imageUrl})` }} />
                
                <ModalBody>
                  <ModalCategory>{selectedItem.category}</ModalCategory>
                  <ModalDescription>{selectedItem.description}</ModalDescription>
                  <ModalButton 
                    href={selectedItem.link}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Zum Projekt
                  </ModalButton>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  background-color: var(--background-alt);
  padding: 100px 0;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: var(--max-width);
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--accent);
  }
`;

const SectionSubtitle = styled.p`
  color: var(--text-light);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  background-color: ${props => props.$active ? 'var(--accent)' : 'var(--background)'};
  color: ${props => props.$active ? 'white' : 'var(--text)'};
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  box-shadow: ${props => props.$active ? '0 4px 6px rgba(230, 57, 70, 0.2)' : '0 2px 4px var(--shadow)'};
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--accent)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`;

const PortfolioCard = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 4px 10px var(--shadow);
  cursor: pointer;
  transition: var(--transition);
`;

const PortfolioImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const PortfolioCategory = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--accent);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PortfolioContent = styled.div`
  padding: 1.5rem;
`;

const PortfolioTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const PortfolioDescription = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PortfolioLink = styled.a`
  color: var(--accent);
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-block;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(3px);
`;

const ModalContent = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-light);
  transition: var(--transition);
  
  &:hover {
    color: var(--accent);
  }
`;

const ModalImage = styled.div`
  height: 350px;
  background-size: cover;
  background-position: center;
  
  @media (max-width: 576px) {
    height: 200px;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalCategory = styled.span`
  display: inline-block;
  background-color: var(--accent);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ModalButton = styled(motion.a)`
  display: inline-block;
  background-color: var(--accent);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-align: center;
  box-shadow: 0 4px 6px rgba(230, 57, 70, 0.2);
  
  &:hover {
    box-shadow: 0 6px 8px rgba(230, 57, 70, 0.3);
  }
`;

export default PortfolioSection;
