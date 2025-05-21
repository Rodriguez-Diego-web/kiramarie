import React from 'react';
import styled from 'styled-components';

const NewsletterSection: React.FC = () => {
  return (
    <NewsletterWrapper id="newsletter">
      <ContentContainer>
        <NewsletterContent>
          <MockupImageContainer>
            <MockupImage 
              src="/images/Mockup.png" 
              alt="What The Work?! Newsletter Mockup" 
            />
          </MockupImageContainer>
          
          <TextContentContainer>
            <NewsletterTitle>
              In meinem wöchentlichen Newsletter „What The Work?!" schreibe ich jede Woche über Karriere-Hacks, die dich wirklich weiterbringen: klar, praxisnah und auf den Punkt.
            </NewsletterTitle>
            
            <NewsletterSubtext>
              Ob Mindset, Selbstorganisation oder Future Skills: Ich teile, was funktioniert und was ich gern früher gewusst hätte.
            </NewsletterSubtext>
            
            <SubscribeTagline>
              Jede Woche praktische Hacks für mehr Erfolg in deiner Karriere! Geschrieben von mir, Kira Marie Cremer.
            </SubscribeTagline>
            
            <SubscribeForm>
              <EmailInput 
                type="email" 
                placeholder="Enter your email" 
              />
              <SubscribeButton>
                Subscribe
              </SubscribeButton>
            </SubscribeForm>
          </TextContentContainer>
        </NewsletterContent>
      </ContentContainer>
    </NewsletterWrapper>
  );
};

const NewsletterWrapper = styled.section`
  width: 100%;
  background-color: #ffffff;
  padding: 80px 0;
  position: relative;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const NewsletterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const MockupImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 991px) {
    order: 1;
  }
`;

const MockupImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;

const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  
  @media (max-width: 991px) {
    order: 2;
    text-align: center;
  }
`;

const NewsletterTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
  margin: 0;
`;

const NewsletterSubtext = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin: 0;
`;

const SubscribeTagline = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
  margin: 25px 0 10px;
`;

const SubscribeForm = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  
  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

const SubscribeButton = styled.button`
  height: 44px;
  padding: 0 20px;
  background-color: #8facfd;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #7b9af9;
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

export default NewsletterSection;
