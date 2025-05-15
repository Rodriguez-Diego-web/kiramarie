import React from 'react';
import styled from 'styled-components';

// DRWEB-KM2025 - Diego Rodriguez Webentwicklung

const AboutSectionContainer = styled.section`
  display: flex;
  align-items: stretch; /* Kinder füllen die Höhe */
  background-color: #FFFFFF; /* Geändert von #121212 auf weiß */
  padding: 80px 0; /* Horizontales Padding entfernt */
  position: relative;
  overflow: hidden; /* Verhindert, dass Linien überlaufen */

  @media (max-width: 991px) { /* Tablet und Mobile */
    flex-direction: column;
    align-items: center;
    padding: 40px 0; /* Horizontales Padding entfernt */
  }
`;

const ContentLayoutWrapper = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 1200px; /* Maximale Breite für den Inhalt, anpassbar */
  margin: 0 auto; /* Zentriert den Inhaltswrapper */
  position: relative; /* Hinzugefügt für z-index Kontext */
  z-index: 2; /* Stellt sicher, dass der Inhalt über der globalen Diagonallinie liegt */

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  flex: 0 0 55%; /* Deutlich vergrößert für ein wirklich größeres Bild */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0; /* Padding entfernt für mehr Platz */

  img {
    min-width: 450px; /* Garantiert eine Mindestbreite */
    max-width: 100%;
    min-height: 500px; /* Garantiert eine Mindesthöhe */
    max-height: 800px; /* Weiter erhöht */
    height: auto;
    object-fit: cover;
    border-radius: 4px; /* Leichte Abrundung */
  }

  @media (max-width: 991px) {
    flex-basis: auto; /* Basis zurücksetzen */
    width: 100%;
    max-width: 550px; /* Bildgröße erhöht */
    min-width: auto; /* Min-width zurücksetzen für Mobile */
    padding-right: 0;
    margin-bottom: 30px;
  }
`;

const TextWrapper = styled.div`
  flex: 1; /* Nimmt den verbleibenden Platz ein */
  background-color: #FFFEF7; /* Sehr helles Creme/Off-White */
  padding: 50px;
  position: relative; /* Für diagonale Linien */
  color: #000000;
  border-radius: 4px; /* Leichte Abrundung für die weiße Box */
  overflow: hidden; /* Wichtig, um diagonale Linien visuell einzuschließen, falls sie *innerhalb* wären */

  @media (max-width: 991px) {
    width: 100%;
    padding: 30px;
  }
  @media (max-width: 767px) { /* Mobile */
    padding: 25px;
  }
`;

const TextContent = styled.div`
  position: relative; /* Stellt sicher, dass Text über diagonalen Linien liegt */
  z-index: 1;
`;

const Heading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem; /* Ca. 26px */
  line-height: 1.45;
  margin-bottom: 25px;
  font-weight: 300; /* Helleres Basisgewicht für den nicht-fetten Teil */
  color: #1c1c1c;

  strong {
    font-weight: 600; /* Fetter für den ersten Teil */
  }

  @media (max-width: 991px) {
    font-size: 1.4rem;
  }
  @media (max-width: 767px) {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
`;

const Paragraph = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem; /* Ca. 15px */
  line-height: 1.8;
  color: #333333;
  margin-bottom: 20px; // Platz vor eventuellen Tags/Stats
  
  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const TagsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const TagItem = styled.li`
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const StatsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const StatItem = styled.li`
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  .value { font-weight: bold; }
`;

const CallToActionButton = styled.a`
  display: inline-block;
  margin-top: 30px;
  padding: 12px 25px;
  background-color: #9370DB; // Lila, passend zu MediaCard
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a5fb3;
  }
`;

// Interface für die Datenstruktur der "Über Mich"-Seite
interface AboutPageData {
  title?: string;
  headline: string;
  subheadline?: string;
  profile_image?: string; // Pfad zum Bild oder leer
  bio: string; // Markdown-Inhalt
  expertise_tags?: string[];
  stats?: Array<{ value: string; label: string }>;
  cta_button_text?: string;
  cta_button_link?: string;
}

// --- WICHTIGER HINWEIS --- 
// Dies sind aktuell PLATZHALTERDATEN.
// Diese Daten müssen dynamisch aus src/content/about.md geladen werden.
// Für Create React App: Pre-Build-Skript erstellen, das Markdown analysiert
// und in ein JSON-Array/Objekt umwandelt, das hier importiert werden kann.
const aboutPageData: AboutPageData = {
  headline: 'Kira Marie Born ist eine der führenden deutschen Stimmen im Bereich New Work und Expertin für die Zukunft der Arbeitswelt.',
  subheadline: 'Autorin, Dozentin, Podcasterin, Speakerin & Beraterin.',
  profile_image: '/uploads/default-profile.webp', // Beispielpfad, wird vom CMS überschrieben
  bio: `Als Autorin des Buchs „New Work – Wie arbeiten wir in Zukunft?“ und Dozentin für Future of Work and Organizational Psychology liefert sie praxisnahe Einblicke in die Arbeitswelt von morgen. 

Sie hostet den erfolgreichen FUNKE-Podcast „New Work Now“ und erreicht mit fast 50.000 Follower:innen auf LinkedIn und über 10.000 auf Instagram eine große Community. Als Speakerin und Beraterin setzt sie sich für innovative Arbeitsmodelle und eine bessere Arbeitswelt ein.

**Weitere spannende Details hier als Markdown!**`,
  expertise_tags: ['New Work', 'Future of Work', 'Organizational Psychology', 'Leadership', 'Keynote Speaker'],
  stats: [
    { value: '5+', label: 'Jahre Erfahrung im Bereich New Work' },
    { value: '100+', label: 'Keynotes & Workshops gehalten' },
    { value: '50k', label: 'LinkedIn Follower' },
  ],
  cta_button_text: 'Kontakt aufnehmen',
  cta_button_link: '/contact',
};

const AboutSection: React.FC = () => {
  // HINWEIS: Für die Darstellung von Markdown-Inhalten (aboutPageData.bio)
  // sollte eine Bibliothek wie 'react-markdown' verwendet werden.
  // Beispiel: import ReactMarkdown from 'react-markdown';
  // Dann im JSX: <ReactMarkdown>{aboutPageData.bio}</ReactMarkdown>

  return (
    <AboutSectionContainer id="about">
      <ContentLayoutWrapper>
        <ImageWrapper>
          {/* Verwende das Bild aus den Daten, wenn vorhanden, sonst Fallback oder nichts */} 
          {aboutPageData.profile_image ? (
            <img src={aboutPageData.profile_image} alt="Kira Marie Born" />
          ) : (
            <img src="https://via.placeholder.com/450x500.png?text=Profilbild" alt="Platzhalter Kira Marie Born" /> // Fallback-Bild
          )}
        </ImageWrapper>
        <TextWrapper>
          <TextContent>
            <Heading>
              {/* Die CMS headline könnte <strong> Tags enthalten, aber ein String-Widget gibt diese nicht als HTML aus. */} 
              {/* Für die "strong" Formatierung: Entweder zwei Felder im CMS oder Markdown im Bio-Text nutzen. */} 
              {aboutPageData.headline}
            </Heading>
            {aboutPageData.subheadline && (
              <Paragraph style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '20px' }}>
                {aboutPageData.subheadline}
              </Paragraph>
            )}
            {/* Hier sollte der bio-Text mit einem Markdown-Renderer dargestellt werden */} 
            {aboutPageData.bio.split('\n\n').map((paragraph, index) => (
              <Paragraph key={index}>{paragraph.replace(/\n/g, '<br />')}</Paragraph> // Einfache Behandlung von Zeilenumbrüchen, Markdown-Renderer ist besser
            ))}

            {aboutPageData.expertise_tags && aboutPageData.expertise_tags.length > 0 && (
              <>
                <h3 style={{ marginTop: '30px', marginBottom: '15px', fontSize: '1.2rem' }}>Expertise</h3>
                <TagsList>
                  {aboutPageData.expertise_tags.map(tag => <TagItem key={tag}>{tag}</TagItem>)}
                </TagsList>
              </>
            )}

            {aboutPageData.stats && aboutPageData.stats.length > 0 && (
              <>
                <h3 style={{ marginTop: '30px', marginBottom: '15px', fontSize: '1.2rem' }}>Track Record</h3>
                <StatsList>
                  {aboutPageData.stats.map(stat => (
                    <StatItem key={stat.label}><span className="value">{stat.value}</span> {stat.label}</StatItem>
                  ))}
                </StatsList>
              </>
            )}

            {aboutPageData.cta_button_text && aboutPageData.cta_button_link && (
              <CallToActionButton href={aboutPageData.cta_button_link}>
                {aboutPageData.cta_button_text}
              </CallToActionButton>
            )}
          </TextContent>
        </TextWrapper>
      </ContentLayoutWrapper>
    </AboutSectionContainer>
  );
};

export default AboutSection;