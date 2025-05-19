import React from 'react';
import styled from 'styled-components';

// Moderne, stilvolle Komponenten mit visuellem Interesse
const NewsletterSection: React.FC = () => {
  return (
    <NewsletterWrapper id="newsletter">
      <ContentContainer>
        <NewsletterCard>
          <LogoContainer>
            <NewsletterLogo 
              src="/uploads/Newsletter Logo.png" 
              alt="What The Work?! Newsletter" 
            />
          </LogoContainer>
          
          <FormContainer>
            <IntroText>
              Deine wöchentliche Dosis Inspiration und praktische Tipps für die moderne Arbeitswelt
            </IntroText>
            
            <NewsletterForm>
              <StyledIframe 
                src="https://embeds.beehiiv.com/81fc6fc1-ddd0-4079-81fb-899807142dfd" 
                data-test-id="beehiiv-embed"
                title="Kira Marie Newsletter"
                frameBorder="0" 
                scrolling="no" 
              />
            </NewsletterForm>
          </FormContainer>
        </NewsletterCard>
      </ContentContainer>
    </NewsletterWrapper>
  );
};

// Styled Components mit modernen Design-Elementen
const NewsletterWrapper = styled.section`
  width: 100%;
  background-color: #ffffff;
  padding: 80px 0;
  position: relative;
`;



const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const NewsletterCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  align-items: stretch;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color:#8facfd;
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const NewsletterLogo = styled.img`
  width: 200%;
  max-width: 380px;
  height: auto;
  display: block;
`;

const FormContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const IntroText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;
  margin: 0 0 20px;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const NewsletterForm = styled.div`
  width: 100%;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 320px;
  border: none;
  background-color: transparent;
`;

export default NewsletterSection;
