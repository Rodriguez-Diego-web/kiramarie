import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const FunkeRssPage: React.FC = () => {
  // Ensure the page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Funke Feed | Kira Marie Cremer</title>
        <meta name="description" content="Verbinden Sie sich mit dem Funke Feed von Kira Marie Cremer. Spannende Inhalte über Leadership und Vertrauen." />
      </Helmet>
      <PageContainer>
        <ContentWrapper>
          <PageHeader
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Funke Feed
          </PageHeader>

          <MainContent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <IntroText>
              Hier finden Sie eine Sammlung meiner Beiträge zum Thema Leadership und Vertrauen. 
              Diese Inhalte wurden ursprünglich auf dem Funke Feed veröffentlicht und 
              bieten wertvolle Einblicke und Strategien für moderne Führungskräfte.
            </IntroText>

            <LinkSection>
              <SectionTitle>Besuchen Sie den Funke Feed</SectionTitle>
              <SectionText>
                Für die vollständige Sammlung meiner Beiträge und die neuesten Updates 
                besuchen Sie bitte direkt den Funke Feed.
              </SectionText>
              <FunkeButton 
                href="https://www.funkemedien.de/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ZUM FUNKE FEED
              </FunkeButton>
            </LinkSection>

            <FeaturedContent>
              <SectionTitle>Ausgewählte Themen</SectionTitle>
              <TopicsList>
                <TopicItem>
                  <TopicTitle>Vertrauensbasierte Führung</TopicTitle>
                  <TopicDescription>
                    Wie Sie eine Kultur des Vertrauens in Ihrem Team aufbauen und warum dies der Schlüssel 
                    zu langfristigem Erfolg ist.
                  </TopicDescription>
                </TopicItem>
                <TopicItem>
                  <TopicTitle>New Work Prinzipien</TopicTitle>
                  <TopicDescription>
                    Moderne Arbeitsmethoden, die Kreativität, Zusammenarbeit und Produktivität fördern.
                  </TopicDescription>
                </TopicItem>
                <TopicItem>
                  <TopicTitle>Wirksame Kommunikation</TopicTitle>
                  <TopicDescription>
                    Strategien für eine klare, authentische und wirkungsvolle Kommunikation in einer 
                    komplexen Arbeitswelt.
                  </TopicDescription>
                </TopicItem>
              </TopicsList>
            </FeaturedContent>
          </MainContent>
        </ContentWrapper>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 120px 0 80px;
  
  @media (max-width: 768px) {
    padding: 100px 0 60px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageHeader = styled(motion.h1)`
  font-family: 'Kingdom', sans-serif;
  font-size: 3.5rem;
  font-weight: normal;
  color: #000000;
  margin-bottom: 50px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 30px;
  }
`;

const MainContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const IntroText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333333;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #E6DFD7;
  border-radius: 8px;
  margin: 0 auto;
  width: 100%;
  max-width: 700px;
`;

const SectionTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333333;
  text-align: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const FunkeButton = styled(motion.a)`
  display: inline-block;
  background-color: #000000;
  color: #FFFFFF;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 1px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333333;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px 25px;
  }
`;

const FeaturedContent = styled.div`
  margin-top: 20px;
`;

const TopicsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const TopicItem = styled.div`
  background-color: #f8f8f8;
  padding: 25px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

const TopicTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TopicDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #555555;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default FunkeRssPage;
