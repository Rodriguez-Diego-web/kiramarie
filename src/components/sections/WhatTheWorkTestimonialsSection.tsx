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
  background-color: #8facff; 
  padding: 50px 0 80px 0; 
  color: #333;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  overflow: visible; 
  position: relative; 
  z-index: 1; 
  width: 100vw; 
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  
  @media (max-width: 767px) {
    padding: 20px 0 100px 0; 
  }
`;

const QuoteIcon = styled.div`
  font-family: 'Georgia', 'Times New Roman', Times, serif; 
  font-size: 18rem; 
  color: #ffcb56;
  position: absolute;
  top: -170px; 
  left: 145px; 
  line-height: 0.7; 
  z-index: 2; 
  opacity: 0.9; 
  transform: rotate(180deg); 
  
  @media (max-width: 767px) {
    font-size: 16rem;
    top: auto;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    text-align: center;
    width: 100%;
  }
`;

const StyledSwiperWrapper = styled.div`
  width: 100%; 
  margin: 0 auto;
  position: relative; 
  overflow: visible; 

  .swiper {
    height: auto;
  }

  .swiper-slide {
    height: auto;
  }

  .swiper-button-prev, .swiper-button-next {
    color: #333333; 
    background-color: transparent; 
    width: 50px; 
    height: 50px;
    top: 60%; 
    transform: translateY(-50%);
    z-index: 10; 

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
  background-color: #8facff; 
  padding: 20px 10px; 
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start;
  position: relative;
  box-shadow: none; 
  width: 100%; 
  
  @media (max-width: 767px) {
    padding: 15px 10px;
    justify-content: flex-start;
  }
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
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 10px 15px 10px;
    max-width: 75%; 
    padding: 0;
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
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 5px 0 5px 0;
    font-weight: 500;
    max-width: 85%; 
  }
`;

const WhatTheWorkTestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/data/whattheworkTestimonialsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const testimonialList = data && Array.isArray(data.testimonials) ? data.testimonials : [];
        const sortedData = testimonialList.sort((a: TestimonialItem, b: TestimonialItem) => (a.order ?? Infinity) - (b.order ?? Infinity));
        setTestimonials(sortedData);
      })
      .catch(error => console.error('Error fetching whatthework testimonials data:', error));
  }, []);

  if (!testimonials.length) {
    return null;
  }

  return (
    <SectionContainer ref={sectionRef} id="whatthework-testimonials">
      <QuoteIcon>“</QuoteIcon>
      <StyledSwiperWrapper>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          autoHeight={true} // Hinzugefügt für dynamische Höhe
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <SlideContent>
                <QuoteText>"{testimonial.quote}"</QuoteText>
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

export default WhatTheWorkTestimonialsSection;
