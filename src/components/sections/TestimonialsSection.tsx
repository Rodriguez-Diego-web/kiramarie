import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

interface TestimonialItem {
  author: string;
  position?: string | null;
  quote: string;
  image?: string | null;
  order?: number;
}

const SectionContainer = styled.section`
  background-color: #f9f9f9; // Heller Hintergrund zur Abwechslung
  padding: 60px 20px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 60px;
  color: #1a1a1a; // Dunklerer Titel
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 2.2rem;
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
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08); 
  text-align: left;
  height: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  blockquote {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #333333; /* Explizit dunkle Farbe für Zitate */
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
  margin-top: auto; // Schiebt den Autor nach unten, falls die Karte höher ist
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
    color: #333333; /* Sicherstellen, dass Name dunkel ist */
    font-size: 0.9em;
  }

  .author-position {
    font-size: 0.8em;
    color: #555555; /* Sicherstellen, dass Position dunkel ist */
    font-style: italic;
  }
`;

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null); 
  // const titleInView = useInView(sectionRef, { once: true, amount: 0.2 }); // Vorübergehend auskommentieren

  console.log('TestimonialsSection RENDERED. Testimonials length:', testimonials.length); // NEU

  useEffect(() => {
    console.log('TestimonialsSection useEffect: Fetching data...'); // NEU
    fetch('/data/testimonialsData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('TestimonialsSection useEffect: Data fetched successfully:', data); // NEU
        setTestimonials(data);
      })
      .catch(error => console.error('Error fetching testimonials data:', error));
  }, []);

  if (!testimonials.length) {
    console.log('TestimonialsSection: No testimonials, returning null.'); // NEU
    return null;
  }

  console.log('TestimonialsSection: Rendering with testimonials:', testimonials); // NEU


  return (
    <SectionContainer ref={sectionRef} id="testimonials">
      <SectionTitle
        // initial={{ opacity: 0, y: -20 }} // Animationen für den Titel auch erstmal raus
        // animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        // transition={{ duration: 0.6 }}
      >
        Das sagen meine Kunden
      </SectionTitle>
      <TestimonialsGrid
      // Alle Animations-Props sind hier ja schon entfernt
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.author + index}
          // Alle Animations-Props sind hier ja schon entfernt
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
