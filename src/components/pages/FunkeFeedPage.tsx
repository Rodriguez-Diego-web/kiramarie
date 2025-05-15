import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const PageContainer = styled.div`
  padding: 120px 20px 60px; // Mehr Padding oben wegen fixed Header
  min-height: 100vh;
  background-color: #1c1c1c; // Dunkler Hintergrund passend zum Rest
  color: #ffffff;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: #ffffff;
`;

const FeedItemStyled = styled(motion.div)` // Umbenannt von FeedItem zu FeedItemStyled zur Vermeidung von Namenskonflikten
  background-color: #2a2a2a; // Etwas hellerer Hintergrund für Items
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #9370DB; // Lila Akzent für Titel
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 10px;
    color: #e0e0e0;
  }

  a {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.9rem;
    color: #9370DB;
    text-decoration: none;
    font-weight: 600;
    &:hover {
      text-decoration: underline;
    }
  }

  small {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    color: #aaaaaa;
    display: block;
    margin-top: 10px;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  padding: 40px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #ff6b6b; // Rote Farbe für Fehler
  padding: 40px;
`;

interface FeedItemData {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source?: string; // Quelle optional
}

const FunkeFeedPage: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        // Der Pfad zur Netlify Function ist relativ zum Root der Seite
        const response = await fetch('/.netlify/functions/getFunkeFeed');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeedItems(data);
        setError(null);
      } catch (e: any) {
        console.error("Fehler beim Laden des Feeds:", e);
        setError(e.message || 'Fehler beim Laden der Daten.');
        setFeedItems([]); // Bei Fehler leere Liste setzen
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return <PageContainer><LoadingMessage>Lade aktuelle Beiträge...</LoadingMessage></PageContainer>;
  }

  if (error) {
    return <PageContainer><ErrorMessage>Fehler: {error}</ErrorMessage></PageContainer>;
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <PageTitle>Aktuelles von Funke</PageTitle>
        {feedItems.length > 0 ? (
          feedItems.map((item, index) => (
            <FeedItemStyled // Umbenannt von FeedItem zu FeedItemStyled
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Weiterlesen
              </a>
              <small>
                Veröffentlicht: {new Date(item.pubDate).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
                {item.source && ` - Quelle: ${item.source}`}
              </small>
            </FeedItemStyled> // Umbenannt von FeedItem zu FeedItemStyled
          ))
        ) : (
          <p>Keine Beiträge gefunden.</p>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default FunkeFeedPage;