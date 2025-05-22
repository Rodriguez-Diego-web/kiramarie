import React from 'react';
import styled from 'styled-components';

// Main container for the entire section
const SectionWrapper = styled.section`
  position: relative;
  /* Increased padding-top to give more room for the absolutely positioned title 
     and to ensure enough of the previous section's background is visible behind the title's top part. */
  padding-top: 150px; 
  margin-top: -100px; /* Adjust this to control how much it overlaps the section above. Deeper overlap for title. */
  z-index: 2; 
  font-family: 'Montserrat', sans-serif;
  /* The background for the area where the title overlaps the previous section is implicitly transparent */
`;

// The large, overlapping title
const SectionTitle = styled.h2`
  font-family: 'Kingdom', serif; /* User-specified Kingdom font */
  font-size: 5rem; /* Slightly larger if Kingdom font is thinner */
  font-weight: normal;
  color: #000000; /* Black title text */
  text-align: center;
  
  position: absolute; /* Absolute positioning within SectionWrapper */
  /* Top: positions the title down from the (pulled-up) top edge of SectionWrapper. 
     This needs to be tuned so part of it is over the previous section and part over ContentContainer */
  top: 50px; 
  left: 0;
  right: 0;
  z-index: 3; /* Ensure title is above ContentContainer and previous section's end */

  @media (max-width: 767px) {
    font-size: 2rem;
    top: 80px; /* Adjust for mobile if needed */
  }
`;

// Container for the main content (text and button) with a white background
const ContentContainer = styled.div`
  background-color: #FFFFFF; 
  color: #333333; 
  /* Padding-top might need to be more if the title dips very low into it, 
     or rely on title's z-index to float above content. */
  padding: 50px 20px 20px 20px; /* Reduced top and bottom padding */
  text-align: center;
  position: relative; /* For stacking context, if needed, though title z-index should handle it */
  z-index: 1; /* Below the SectionTitle */
  
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

// Descriptive text
const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555555; 
  margin: 0 auto 30px auto; 
  max-width: 600px; 
  position: relative; /* Ensure text is in stacking context of ContentContainer */
  z-index: 1;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

// The contact button
const ContactButton = styled.a`
  display: inline-block;
  background-color: #000000; 
  color: #FFFFFF; 
  padding: 15px 35px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px; 
  text-transform: uppercase;
  border: none;
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: relative; /* Ensure button is in stacking context of ContentContainer */
  z-index: 1;

  &:hover {
    background-color: #333333; 
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ContactSection: React.FC = () => {
  return (
    <SectionWrapper id="kontakt">
      <SectionTitle>Kontakt</SectionTitle>
      <ContentContainer>
        <ContactText>
          Ob Anfrage, Idee oder einfach nur ein Hallo – ich freue mich auf deine Nachricht.
        </ContactText>
        <ContactButton href="mailto:HI@KIRAMARIECREMER.DE">
          HI@KIRAMARIECREMER.DE
        </ContactButton>
      </ContentContainer>
    </SectionWrapper>
  );
};

export default ContactSection;
