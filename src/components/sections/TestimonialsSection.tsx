import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface TestimonialItem {
  author: string;
  position?: string | null;
  quote: string;
  image?: string | null;
  order?: number;
}

const SectionContainer = styled.section`
  background-color: #f9f9f9;
  padding: 60px 20px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  overflow: hidden;
`;

const PurpleBox = styled(motion.div)`
  position: absolute;
  background-color: #9370DB;
  height: 30px;
  width: 100%;
  z-index: -1;
  bottom: 0px;
  left: 0;
  opacity: 0.7;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 110px;
  color: #1a1a1a;
  text-transform: uppercase;
  position: relative;
  z-index: 0;
  padding: 0;
  line-height: 1.5;
  display: inline-block;
  @media (max-width: 767px) {
    font-size: 2.2rem;
    margin-bottom: 77px;
  }
`;

const TestimonialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div)`
  background-color: #ffffff; 
  padding: 30px;
  border-radius: 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); 
  text-align: left;
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  blockquote {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #333333;
    margin-bottom: 20px;
    font-style: italic;
    flex-grow: 1;

    &::before {
      content: '“';
      font-size: 2.5em;
      color: #CDAFFD; 
      font-weight: bold;
      line-height: 0.1;
      margin-right: 5px;
      vertical-align: -0.3em;
    }
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

const AuthorInfo = styled.div`
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
`;

const AuthorDetails = styled.div`
  text-align: left;
  
  p {
    margin: 0;
    line-height: 1.4;
  }

  .author-name {
    font-weight: 600;
    color: #333333;
    font-size: 0.9em;
  }

  .author-position {
    font-size: 0.8em;
    color: #555555;
    font-style: italic;
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

        setTestimonials(data);
      })
      .catch(error => console.error('Error fetching testimonials data:', error));
  }, []);

  if (!testimonials.length) {

    return null;
  }




  return (
    <SectionContainer ref={sectionRef} id="testimonials">
      <SectionTitle>
        Das sagen meine Kunden
        <PurpleBox />
      </SectionTitle>
      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.author + index}
          >
            <blockquote dangerouslySetInnerHTML={{ __html: testimonial.quote.replace(/\n/g, '<br />') }} />
            <AuthorInfo>
              {testimonial.image && <AuthorImage src={testimonial.image} alt={testimonial.author} />}
              <AuthorDetails>
                <p className="author-name">{testimonial.author}</p>
                {testimonial.position && <p className="author-position">{testimonial.position}</p>}
              </AuthorDetails>
            </AuthorInfo>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </SectionContainer>
  );
};

export default TestimonialsSection;
