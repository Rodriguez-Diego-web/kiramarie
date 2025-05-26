import React from 'react';
import styled from 'styled-components';

const NewsletterSection: React.FC = () => {
  return (
    <NewsletterWrapper id="newsletter">
      <ContentContainer>
        <KingdomTitle>Mein Newsletter</KingdomTitle>
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
  padding: 80px 0; /* Desktop default */
  position: relative;

  @media (max-width: 991px) {
    padding: 50px 0; /* Mobile: Reduced padding */
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const KingdomTitle = styled.h3`
  font-family: 'Kingdom', serif;
  font-size: 3rem;
  font-weight: normal;
  color: #000000;
  position: absolute;
  top: -20px;
  right: 40px;
  z-index: 5;
  margin: 0;
  
  @media (max-width: 991px) {
    font-size: 2.5rem;
    top: -15px;
    right: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    top: -10px;
  }
`;

const NewsletterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Desktop default */
  gap: 40px; /* Desktop default */
  align-items: center;
  
  @media (max-width: 991px) {
    grid-template-columns: 1fr; /* Mobile: Stack */
    gap: 30px; /* Mobile: Adjusted gap */
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

  @media (max-width: 768px) {
    max-width: 85%;
    margin-bottom: 25px;
  }
`;

const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px; /* Desktop default */
  
  @media (max-width: 991px) {
    order: 2;
    text-align: center;
    gap: 15px; /* Mobile: Reduced gap */
  }
`;

const NewsletterTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NewsletterSubtext = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  margin: 0;
`;

const SubscribeForm = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  
  @media (max-width: 768px) {
    flex-direction: row; /* Keep elements in a row */
    gap: 0; /* No gap between input and button */
    align-items: stretch; /* Make input and button same height */
    background-color: #f0f0f0; /* Background for the combined unit */
    border: 1px solid #e0e0e0; /* Border for the unit */
    border-radius: 8px; /* Rounded corners for the unit */
    padding: 4px; /* Internal padding for the unit */
  }
`;

const EmailInput = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 15px;
  border: 1px solid #ddd; /* Desktop default */
  border-radius: 4px 0 0 4px; /* Desktop default */
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  background-color: #fff; /* Desktop default */
  
  @media (max-width: 768px) {
    border-radius: 6px 0 0 6px; /* Mobile: rounded corners on left */
    width: auto; /* Override previous 100% width if any */
    border: none; /* Mobile: no individual border */
    background-color: #fff; /* Mobile: white background inside the form unit */
    height: 38px; /* Mobile: fixed height */
    padding: 0 12px; /* Mobile: adjusted padding */
    /* flex: 1; is already defined for desktop and applies here */
  }
`;

const SubscribeButton = styled.button`
  height: 44px;
  padding: 0 20px;
  background-color: #8facfd;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0; /* Desktop default */
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #7b9af9;
  }
  
  @media (max-width: 768px) {
    border-radius: 0 6px 6px 0; /* Mobile: rounded corners on right */
    width: auto; /* Override previous 100% width if any */
    height: 38px; /* Mobile: fixed height, matching input */
    padding: 0 18px; /* Mobile: adjusted padding */
  }
`;

export default NewsletterSection;
