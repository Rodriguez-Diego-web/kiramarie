import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  imageUrl: string;
  altText: string;
}

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
  text-align: center;
`;

const IntroSection = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 10rem;
  margin-bottom: 3rem;
  margin-top: -2rem;
  text-align: left;
  max-width: 1000px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  max-width: 600px;
`;

const ImageColumn = styled.div`
  flex: 0 0 80%;
  max-width: 450px;
  img {
    width: 100%;
    height: auto;
    display: block;
    margin-left: 3rem;
  }

  @media (max-width: 768px) {
    width: 80%;
    max-width: 350px;
    margin-bottom: 2rem;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-family: var(--heading-font);
  font-weight: normal;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  z-index: 0;
  margin-top: 6rem;
  margin-bottom: .5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    height: 40px;
    width: 100%;
    background-color: #FFD700;
    z-index: -1;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
    display: block;
  }
`;

const Paragraph = styled.p`
  font-size: 1rem;
  font-family: var(--body-font);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const LatestEpisodesSection = styled.section`
  background-color: #f7f4f1;
  padding: 2rem 0 4rem 0;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  font-family: var(--heading-font);
  font-weight: normal;
  text-align: center;
  margin-bottom: 2.5rem;
  margin-top: -60px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    text-align: center;
  }
`;

const EpisodeCardWrapper = styled.div`
  display: flex;
  margin: 0 auto 2rem auto;
  max-width: 900px;
  text-align: left;
  gap: 2rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
`;

const EpisodeImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 180px;
    height: auto;
    margin-bottom: 1rem;
  }
`;

const EpisodeContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EpisodeTitle = styled.h3`
  font-family: var(--body-font);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #333;
  line-height: 1.4;
`;

const EpisodeMeta = styled.p`
  font-family: var(--body-font);
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const EpisodeDescription = styled.p`
  font-family: var(--body-font);
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ListenButton = styled.button`
  font-family: var(--body-font);
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  border-radius: 0;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

const PlatformIconsContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const StyledDivider = styled.hr`
  border: 0;
  height: 2px;
  background-color: rgb(98, 98, 98);
  opacity: 0.5;
  width: 75%;
  margin: 0 0 2rem 1rem;
`;

const LoadMoreButton = styled.button`
  font-family: var(--body-font);
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
  padding: 0.8rem 3.5rem;
  font-size: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  border-radius: 0;
  display: block;
  margin: 2rem auto;

  &:hover {
    opacity: 0.7;
  }
`;

const FunkeFeedPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetch('/data/podcastEpisodes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { all_episodes: Episode[] }) => {
        setEpisodes(data.all_episodes);
      })
      .catch(error => {
        console.error("Could not fetch podcast episodes:", error);
      });
  }, []);

  return (
    <>
      <PageContainer>
        <MainTitle>New Work Now</MainTitle>
        <IntroSection>
          <ImageColumn>
            <img src="/images/Podcast_Cover.jpeg" alt="New Work Now Podcast Artwork" />
          </ImageColumn>
          <TextColumn>
            <Paragraph>
              Die Arbeitswelt verändert sich rasant – und mittendrin: wir. New Work Now gibt Orientierung, Inspiration und konkrete Impulse für alle, die Arbeit neu denken wollen. Was bedeutet „New Work“ wirklich? Wie gelingt der Wandel in Unternehmen? Und was können wir selbst dazu beitragen?
            </Paragraph>
            <Paragraph>
              Jede Woche spricht Host Kira Marie Cremer mit UnternehmerInnen, Kreativen und VordenkerInnen – über Herausforderungen, Best Practices und persönliche Aha-Momente. Immer dienstags, im Wechsel Interviews und kompakte Solo-Folgen mit Tipps und Denkanstößen.
            </Paragraph>
          </TextColumn>
        </IntroSection>
      </PageContainer>

      <LatestEpisodesSection>
        <SectionTitle>Neueste Folgen</SectionTitle>
        <ContentWrapper>
          {episodes.map(episode => (
            <React.Fragment key={episode.id}>
              <EpisodeCardWrapper>
                <EpisodeImage src={episode.imageUrl} alt={episode.altText} />
                <EpisodeContent>
                  <EpisodeTitle>{episode.title}</EpisodeTitle>
                  <EpisodeMeta>{episode.date} | {episode.duration}</EpisodeMeta>
                  <EpisodeDescription>
                    {episode.description}
                  </EpisodeDescription>
                  <ActionsContainer>
                    <ListenButton>JETZT HÖREN +</ListenButton>
                    <PlatformIconsContainer>
                      <img src="/images/icons8-youtube-48.png" alt="YouTube" />
                      <img src="/images/icons8-spotify-50.png" alt="Spotify" />
                      <img src="/images/icons8-apple-music-50.png" alt="Apple Music" />
                      <img src="/images/icons8-google-podcasts-50.png" alt="Google Podcasts" />
                    </PlatformIconsContainer>
                  </ActionsContainer>
                </EpisodeContent>
              </EpisodeCardWrapper>
              <StyledDivider />
            </React.Fragment>
          ))}
          {episodes.length > 0 && (
            <LoadMoreButton>MEHR LADEN</LoadMoreButton>
          )}
        </ContentWrapper>
      </LatestEpisodesSection>
    </>
  );
};

export default FunkeFeedPage;