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
  padding: 80px 20px;
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
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Sorgt dafür, dass der Autor unten bleibt
  min-height: 250px; // Mindesthöhe für gleichmäßigere Karten

  blockquote {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7;
    color: #444;
    font-style: italic;
    position: relative;
    padding-left: 25px;
    margin-bottom: 20px;

    &::before {
      content: '\"'; // Unicode für linkes doppeltes Anführungszeichen
      font-family: 'Georgia', serif; // Eine Serif-Schrift für Anführungszeichen
      font-size: 3rem;
      color: #9370DB; // Passend zum Farbschema
      position: absolute;
      left: -5px;
      top: -15px;
      opacity: 0.8;
    }
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
  p {
    margin: 0;
    line-height: 1.4;
  }
  .author-name {
    font-weight: 600;
    color: #1a1a1a;
  }
  .author-position {
    font-size: 0.9rem;
    color: #777;
  }
`;

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    fetch('/data/testimonialsData.json')
      .then(response => response.json())
      .then(data => setTestimonials(data))
      .catch(error => console.error('Error fetching testimonials data:', error));
  }, []);

  if (!testimonials.length) {
    return null;
  }

  return (
    <SectionContainer ref={sectionRef} id="testimonials">
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        Das sagen meine Kunden
      </SectionTitle>
      <TestimonialsGrid
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.3, staggerChildren: 0.15 }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.author + index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
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
