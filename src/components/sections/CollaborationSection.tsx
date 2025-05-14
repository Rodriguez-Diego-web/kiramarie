import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

interface ActionButtonProps {
  text: string;
  link: string;
  primary?: boolean;
}

interface CollaborationBoxProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  description: string;
  actions: ActionButtonProps[];
}

const SectionContainer = styled.section`
  width: 100%;
  padding: 100px 20px;
  background-color: #1c1c1c; 
  color: #ffffff;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;

  @media (max-width: 767px) {
    font-size: 2rem; 
  }

  @media (max-width: 480px) {
    font-size: 1.8rem; 
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto 60px auto;
  color: #e0e0e0;
`;

const BoxesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px; /* Etwas mehr Gap für das neue Design */
  margin-top: 40px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 25px; 
  }
`;

// Komplette Neugestaltung des BoxItem
const BoxItem = styled(motion.div)`
  background-color: #ffffff; /* Heller Hintergrund für den Inhaltsbereich */
  border-radius: 16px; /* Stärkere Abrundung */
  overflow: hidden; /* Wichtig, damit das Bild die Abrundung oben übernimmt */
  display: flex;
  flex-direction: column;
  text-align: left;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  padding-top: 70%; /* Erhöht von 56.25% für ein höheres Bild */
  position: relative;
  background-color: #333; /* Platzhalter-Hintergrund für Bildbereich */
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContentWrapper = styled.div`
  padding: 20px; /* Reduziert von 25px */
  color: #1c1c1c;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Nimmt verfügbaren Platz ein */
`;

const BoxTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;  /* Reduziert von 1.5rem */
  font-weight: 600;
  margin-bottom: 6px; /* Reduziert von 8px */
`;

const BoxSubtitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem; /* Reduziert von 0.9rem */
  color: #555555;
  margin-bottom: 12px; /* Reduziert von 15px */
`;

const BoxDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem; /* Reduziert von 0.95rem */
  line-height: 1.5;
  color: #333333;
  margin-bottom: 18px; /* Reduziert von 20px */
  flex-grow: 1; /* Sorgt dafür, dass Buttons unten bleiben */
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto; /* Drückt Buttons nach unten, wenn Beschreibung kurz ist */
`;

const ActionButton = styled.a<{ primary?: boolean }>`
  font-family: 'Montserrat', sans-serif;
  padding: 8px 16px; /* Reduziert von 10px 20px */
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;

  ${props => props.primary ? `
    background-color: #9370DB; /* Lila für primäre Buttons */
    color: #ffffff;
    &:hover {
      background-color: color-mix(in srgb, #9370DB 85%, black); /* Dunkleres Lila im Hover */
      transform: scale(1.03);
    }
  ` : `
    background-color: #e0e0e0;
    color: #1c1c1c;
    &:hover {
      background-color: #d0d0d0;
      transform: scale(1.03);
    }
  `}
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const CollaborationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const boxesData: CollaborationBoxProps[] = [
    {
      imageSrc: 'https://via.placeholder.com/400x225/333/fff?text=Buch',
      title: 'Buch: Amazon',
      subtitle: 'Dein Wegweiser',
      description: 'Entdecke tiefgreifende Einblicke und Strategien im neuesten Werk.',
      actions: [{ text: 'Zum Buch', link: '#', primary: true }]
    },
    {
      imageSrc: 'https://via.placeholder.com/400x225/444/fff?text=Podcast',
      title: 'Podcast: Unterseite',
      subtitle: 'Stimmen der Zukunft',
      description: 'Höre inspirierende Gespräche und Expertenmeinungen direkt hier.',
      actions: [{ text: 'Zum Podcast', link: '#', primary: true }]
    },
    {
      imageSrc: 'https://via.placeholder.com/400x225/555/fff?text=Speaker',
      title: 'Speaker',
      subtitle: 'Live & Digital',
      description: 'Buche inspirierende Vorträge für deine nächste Veranstaltung.',
      actions: [{ text: 'Anfragen', link: '#', primary: true }]
    },
    {
      imageSrc: 'https://via.placeholder.com/400x225/666/fff?text=Koops',
      title: 'Mediakits / Koops',
      subtitle: 'Partnerschaften',
      description: 'Informationen für Kooperationen und gemeinsame Projekte.',
      actions: [{ text: 'Download', link: '#', primary: true }, { text: 'Kontakt', link: '#'}]
    }
  ];

  return (
    <SectionContainer id="collaboration" ref={sectionRef}>
      <ContentWrapper>
        <SectionTitle initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
          Zusammenarbeit
        </SectionTitle>
        <SectionSubtitle initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{...fadeInUp, visible: {...fadeInUp.visible, transition: {...fadeInUp.visible.transition, delay: 0.2}}}}>
          Entdecke die vielfältigen Möglichkeiten der Zusammenarbeit und wie wir gemeinsam Werte schaffen können.
        </SectionSubtitle>
        <BoxesGrid>
          {boxesData.map((box, index) => (
            <BoxItem
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{...fadeInUp, visible: {...fadeInUp.visible, transition: {...fadeInUp.visible.transition, delay: 0.3 + index * 0.1}}}}
            >
              <CardImageWrapper>
                <CardImage src={box.imageSrc} alt={box.title} />
              </CardImageWrapper>
              <CardContentWrapper>
                <BoxTitle>{box.title}</BoxTitle>
                {box.subtitle && <BoxSubtitle>{box.subtitle}</BoxSubtitle>}
                <BoxDescription>{box.description}</BoxDescription>
                <ActionsWrapper>
                  {box.actions.map(action => (
                    <ActionButton href={action.link} key={action.text} primary={action.primary} target="_blank" rel="noopener noreferrer">
                      {action.text}
                    </ActionButton>
                  ))}
                </ActionsWrapper>
              </CardContentWrapper>
            </BoxItem>
          ))}
        </BoxesGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default CollaborationSection;
