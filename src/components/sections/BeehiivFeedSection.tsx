import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface FeedItemData {
  guid: string;
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  imageUrl: string | null;
  creator: string;
  description: string;
  categories: string[];
}

// Fallback image if a feed item doesn't have one or if the path in JSON is null
const FALLBACK_IMAGE_URL = '/uploads/default-newsletter-image.webp'; 

const SectionWrapper = styled.section`
  padding: 80px 20px;
  background-color: #8facff; // Light blue background from image
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-top: -114px; /* Pulls title to the top of the SectionWrapper's padding */
  margin-bottom: 15px;
  padding: 10px 20px;
  /* background-color: #f7c948; // Removed direct background */
  display: inline-block;
  border-radius: 0; // Eckig
  position: relative; /* For pseudo-element positioning */
  z-index: 1; /* Ensures text is above the pseudo-element */

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0; /* Aligns to the bottom of the padding box */
    width: 100%;
    height: 50%; /* Covers bottom 50% of the element's total height */
    background-color: #f7c948; /* Yellow highlight color */
    z-index: -1; /* Places the highlight behind the text */
    border-radius: 0; // Eckig
  }

  @media (max-width: 767px) {
    font-size: 2rem;
    /* The ::after pseudo-element will adjust its height relative to the new font size and padding */
  }

  @media (max-width: 480px) {
    margin-top: -129px;
  }
`;

const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;

  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const FeedCard = styled.a`
  background-color: #fff;
  border-radius: 0; // Eckig
  padding: 0; // Padding will be handled by inner containers
  text-decoration: none;
  position: relative; // For positioning category tags and icons
  color: inherit;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 400px; // Ensure cards have a consistent minimum height

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0; // Eckig
  margin-bottom: 15px;
  background-color: #f0f0f0; // Placeholder color if image is missing
  border-top-left-radius: 0; // Ensure top corners are square with card
  border-top-right-radius: 0;
`;

const CardContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; // Allows content to fill space and push author to bottom
`;

const CardCategoryContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  gap: 5px;
  z-index: 1;
`;

const CategoryTag = styled.span`
  background-color: rgba(0,0,0,0.6);
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 0; // Eckig
  text-transform: uppercase;
`;

const CardIconsContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 8px;
  z-index: 1;
  // Placeholder for icons - replace with actual SVGs or font icons
  span {
    font-size: 1.2rem; // Adjust as needed
    color: #555;
  }
`;

const CardDate = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px; // Adjusted margin
  // flex-grow: 1; // Let description handle more of the growth
`;

const CardDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const CardAuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto; // Pushes author to the bottom of the card content
`;

const AuthorImagePlaceholder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%; // Round placeholder
  background-color: #ccc; 
  // In a real scenario, replace with an <img> tag and actual image URL
`;

const CardAuthor = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  color: #555;
`;

const LoadMoreButton = styled.button`
  margin-top: 50px;
  padding: 12px 30px;
  background-color: #f7c948; // Yellow button
  color: #333;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0; // Eckig
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6b840;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: 'Montserrat', sans-serif;
`;

const LoadingMessage = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
`;

const BeehiivFeedSection: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/data/beehiivFeedData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeedItems(data);
      } catch (e) {
        console.error('Failed to fetch Beehiiv feed data:', e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Ein unbekannter Fehler ist aufgetreten.');
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleItemsCount((prev) => prev + 6);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      // Attempt to parse isoDate first, then pubDate
      return new Date(dateString).toLocaleDateString('de-DE', {
        day: '2-digit',
        month: 'long', // Changed to long month for better readability as in image
        year: 'numeric',
      });
    } catch (e) {
      return dateString; // return original if parsing fails
    }
  };

  if (loading) {
    return <SectionWrapper><LoadingMessage>Lade Newsletter...</LoadingMessage></SectionWrapper>;
  }

  if (error) {
    return <SectionWrapper><ErrorMessage>Fehler beim Laden: {error}</ErrorMessage></SectionWrapper>;
  }

  return (
    <SectionWrapper>
      <SectionTitle>Letzte Newsletter-Ausgaben</SectionTitle>
      <FeedGrid>
        {feedItems.slice(0, visibleItemsCount).map((item, index) => (
          <FeedCard key={item.link || index} href={item.link} target="_blank" rel="noopener noreferrer">
            <CardCategoryContainer>
              {item.categories && item.categories.slice(0, 1).map(cat => (
                <CategoryTag key={cat}>{cat}</CategoryTag>
              ))}
              {/* Placeholder for +X more categories if needed */}
            </CardCategoryContainer>
            <CardIconsContainer>
              {/* Replace with actual icons */}
              <span>❤</span> 
              <span>💬</span>
            </CardIconsContainer>
            <CardImage 
              src={item.imageUrl || FALLBACK_IMAGE_URL} 
              alt={item.title || 'Feed item image'} 
              onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
            />
            <CardContentWrapper>
              <CardDate>{formatDate(item.isoDate || item.pubDate)}</CardDate>
              <CardTitle>{item.title || 'Kein Titel'}</CardTitle>
              <CardDescription>{item.description || 'Keine Beschreibung verfügbar.'}</CardDescription>
              <CardAuthorWrapper>
                <AuthorImagePlaceholder /> 
                <CardAuthor>{item.creator || 'Kira Marie Cremer'}</CardAuthor>
              </CardAuthorWrapper>
            </CardContentWrapper>
          </FeedCard>
        ))}
      </FeedGrid>
      {visibleItemsCount < feedItems.length && (
        <LoadMoreButton onClick={handleLoadMore}>Mehr laden</LoadMoreButton>
      )}
    </SectionWrapper>
  );
};

export default BeehiivFeedSection;
