import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

interface TestimonialItem {
  author: string;
  position?: string | null;
  quote: string;
  image?: string | null;
  order?: number;
}

const SectionContainer = styled.section`
  background-color: #E6DFD7; 
  padding: 50px 0 80px 0; /* Erhöhtes Padding, besonders unten */
  color: #333;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  overflow: visible; 
  position: relative; 
  z-index: 1; /* Attempt to bring this section (and its overflowing icon) forward */
  width: 100vw; 
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

// Icon is now a direct child of SectionContainer, so its position is relative to it.
const QuoteIcon = styled.div`
  font-family: 'Georgia', 'Times New Roman', Times, serif; 
  font-size: 14rem; 
  color: #FFFFFF; 
  position: absolute;
  top: -100px; /* Relative to SectionContainer's content box top edge */
  left: 145px;  /* Relative to SectionContainer's content box left edge */
  line-height: 0.7; 
  z-index: 2; /* Ensures it's above Swiper if there's any overlap with swiper buttons etc. */
  opacity: 0.9; 
  transform: rotate(180deg); 
`;

const StyledSwiperWrapper = styled.div`
  width: 100%; 
  margin: 0 auto;
  position: relative; /* For swiper navigation buttons */
  overflow: visible; /* Still allow slides content if it ever needed to overflow, though icon is separate */

  .swiper-button-prev, .swiper-button-next {
    color: #333333; 
    background-color: transparent; 
    width: 50px; 
    height: 50px;
    top: 60%; /* Deutlich tiefer positioniert für bessere Zentrierung */
    transform: translateY(-50%);
    z-index: 10; /* Ensure nav buttons are clickable above slides */

    &::after {
      font-size: 2rem; 
      font-weight: bold;
    }
  }

  .swiper-button-prev {
    left: 20px; 
  }
  .swiper-button-next {
    right: 20px; 
  }

  @media (max-width: 767px) {
    .swiper-button-prev {
        left: 10px; 
    }
    .swiper-button-next {
        right: 10px; 
    }
    .swiper-button-prev::after, .swiper-button-next::after {
        font-size: 1.5rem; 
    }
  }
`;

const SlideContent = styled.div`
  background-color: #E6DFD7; 
  padding: 20px 10px; 
  border-radius: 0;
  min-height: 300px; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  position: relative; /* For QuoteText/AuthorDisplay z-index if ever needed */
  box-shadow: none; 
  width: 100%; 
  /* overflow: visible; Icon is no longer a child, so this isn't for the icon */
`;

const QuoteText = styled.blockquote`
  font-size: 1.20rem; 
  line-height: 1.8;
  color: #333333; 
  margin: 20px 0 25px 0; 
  font-style: normal; 
  max-width: 680px; 
  z-index: 1;          
  position: relative;  
  text-align: center;  

  @media (max-width: 767px) {
    font-size: .8rem; /* Reduced font size for mobile */
    line-height: 1.7; /* Optional: adjust line-height if needed for smaller font */
    margin: 15px 0 10px 0; /* Optional: adjust margins for mobile */
    max-width: 60%; /* Reduced max-width for mobile */
  }
`;

const AuthorDisplay = styled.div`
  font-size: 0.95rem; 
  color: #555555;
  margin-top: 15px;
  z-index: 1;
  position: relative;
  text-align: center; 
  width: 100%; 
  max-width: 680px; 

  .author-name {
    font-weight: 600;
  }
  .author-position {
    font-style: italic;
  }
  @media (max-width: 767px) {
    font-size: .8rem; /* Reduced font size for mobile */
    line-height: 1.7; /* Optional: adjust line-height if needed for smaller font */
    margin: 15px 0 10px 0; /* Optional: adjust margins for mobile */
   
  }
`;


const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/testimonialsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a: TestimonialItem, b: TestimonialItem) => (a.order ?? Infinity) - (b.order ?? Infinity));
        setTestimonials(sortedData);
      })
      .catch(error => console.error('Error fetching testimonials data:', error));
  }, []);

  if (!testimonials.length) {
    return null;
  }

  return (
    <SectionContainer ref={sectionRef} id="testimonials">
      <QuoteIcon>“</QuoteIcon> {/* Icon is now a direct child here */}
      <StyledSwiperWrapper>
        <Swiper
          slidesPerView={1}
          spaceBetween={0} 
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          grabCursor={true} 
          modules={[Navigation, Autoplay]} 
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.author + index}>
              <SlideContent>
                {/* Icon removed from here */}
                <QuoteText dangerouslySetInnerHTML={{ __html: testimonial.quote.replace(/\n/g, '<br />') }} />
                <AuthorDisplay>
                  <span className="author-name">{testimonial.author}</span>
                  {testimonial.position && <span className="author-position">, {testimonial.position}</span>}
                </AuthorDisplay>
              </SlideContent>
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiperWrapper>
    </SectionContainer>
  );
};

export default TestimonialsSection;
