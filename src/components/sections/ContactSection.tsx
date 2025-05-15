import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';

const SectionContainer = styled.section`
  background-color: #000000; /* Hintergrund auf Schwarz geändert */
  color: #e0e0e0; /* Helle Standard-Textfarbe */
  padding: 100px 20px;
  font-family: 'Montserrat', sans-serif; /* Globale Schriftart für die Sektion */
  position: relative; /* Notwendig für absolut positionierte Kindelemente (Parallax) */
  overflow: hidden;   /* Verhindert, dass der Parallax-Hintergrund übersteht */
`;

const ParallaxGradientBackground = styled(motion.div)`
  position: absolute;
  top: -15%; /* Erlaube Überlappung für Bewegung */
  left: -5%;
  width: 60%; /* Größer als der Container, um Bewegung ohne Kanten zu ermöglichen */
  height: 150%;
  background-image: radial-gradient(
    circle at center, 
    rgba(147, 112, 219, 0.08) 0%,  /* Etwas intensiver für besseren Kontrast auf Schwarz */
    rgba(147, 112, 219, 0.04) 30%,
    rgba(28, 28, 28, 0) 65%  /* Ausblenden zur Hintergrundfarbe der Sektion */
  );
  background-size: 100% 100%; /* Relative Größe, die Position wird animiert */
  z-index: 0;
`;

const ParallaxWhiteDiagonalGradient = styled(motion.div)`
  position: absolute;
  top: -30%; /* Kann leicht variieren für unterschiedliche Effekte */
  left: -30%;
  width: 160%; /* Etwas größer für breitere Bewegung */
  height: 160%;
  background-image: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.04) 0%, /* Sehr subtiles Weiß */
    rgba(255, 255, 255, 0.02) 25%,
    rgba(0, 0, 0, 0) 50%       /* Ausblenden zu Schwarz */
  );
  background-size: 100% 100%;
  z-index: 0; /* Gleicher z-index, überlagern sich */
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  position: relative; /* Stellt sicher, dass der Inhalt über dem Parallax-Hintergrund liegt */
  z-index: 1;
`;

const SectionHeader = styled(motion.div)`
  margin-bottom: 50px;
`;

const SectionHeading = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffffff; /* Weiß für Hauptüberschrift */
`;

const ContactContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  text-align: left;
`;

const ContactInfo = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const ContactHeading = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
`;

const ContactText = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 30px;
  color: #c0c0c0; /* Etwas dunkleres Grau für Fließtext */
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const SocialLink = styled(motion.a)`
  color: #e0e0e0;
  font-size: 1.8rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-color, #8A2BE2); /* Akzentfarbe beim Hover */
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  color: #b0b0b0;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    color: var(--primary-color, #8A2BE2);
  }
`;

const ContactForm = styled(motion.form)`
  flex: 1;
  min-width: 300px;
  background-color: #2a2a2a; /* Leicht hellerer dunkler Hintergrund für Formular */
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: calc(50% - 10px);
  margin-bottom: 25px;
  &:last-child {
    margin-bottom: 0; /* Entfernt doppelten Abstand wenn nur eine Gruppe in der Reihe ist */
  }
  /* Für Betreff und Nachricht, die volle Breite einnehmen könnten */
  &.full-width {
    min-width: 100%;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #e0e0e0; /* Helle Labelfarbe */
  margin-bottom: 8px;
`;

const commonInputStyles = `
  width: 100%;
  padding: 14px 18px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #e0e0e0; /* Helle Textfarbe im Input */
  background-color: #383838; /* Dunkler Hintergrund für Inputs */
  border: 1px solid #555555; /* Hellerer dunkler Rahmen */
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: #888888; /* Hellerer Platzhalter */
    opacity: 1;
    font-family: 'Montserrat', sans-serif;
  }

  &:focus {
    outline: none;
    border-color: var(--primary-color, #8A2BE2);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary-color, #8A2BE2) 25%, transparent);
  }
`;

const FormInput = styled.input`
  ${commonInputStyles}
`;

const FormSelect = styled.select`
  ${commonInputStyles}
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23CCCCCC%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E'); /* Pfeilfarbe auf Hellgrau geändert */
  background-repeat: no-repeat;
  background-position: right 18px top 50%;
  background-size: .65em auto;
  padding-right: 40px;
`;

const FormTextarea = styled.textarea`
  ${commonInputStyles}
  resize: vertical;
  min-height: 120px;
`;

const SubmitButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff; /* Heller Text für Button */
  background-color: #9370DB; /* Lila Akzentfarbe */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background-color: color-mix(in srgb, #9370DB 85%, black); /* Dunkleres Lila im Hover */
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #555555; /* Dunkleres Grau für disabled Button */
    color: #999999;
    cursor: not-allowed;
  }

  svg {
    font-size: 1.2em;
  }
`;

const SuccessMessage = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  margin-top: 20px;
  padding: 15px;
  background-color: color-mix(in srgb, var(--primary-color, #8A2BE2) 20%, #2a2a2a) ; /* Heller Akzent auf Form-Hintergrund */
  color: #ffffff; /* Heller Text */
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
`;

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <SectionContainer ref={sectionRef}>
      <ParallaxGradientBackground 
        style={{
          x: useTransform(scrollYProgress, [0, 1], ['-20%', '20%']),
          y: useTransform(scrollYProgress, [0, 1], ['-20%', '15%']), // Leichte Variation zur y-Bewegung
        }}
      />
      <ParallaxWhiteDiagonalGradient
        style={{
          x: useTransform(scrollYProgress, [0, 1], ['-25%', '10%']), // z.B. von links nach rechts
          y: useTransform(scrollYProgress, [0, 1], ['10%', '-25%']), // z.B. von unten nach oben
        }}
      />
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading>KONTAKT</SectionHeading>
        </SectionHeader>
        
        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactHeading>Sprich mich an</ContactHeading>
            <ContactText>
              Hast du Fragen zu meiner Arbeit, möchtest du eine Zusammenarbeit besprechen oder einfach nur Hallo sagen? 
              Ich freue mich auf deine Nachricht.
            </ContactText>
            
            <SocialLinks>
              <SocialLink href="https://instagram.com/kiramariecremer" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}> <Icon icon={FaInstagram} /> </SocialLink>
              <SocialLink href="https://twitter.com/kiramariecremer" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}> <Icon icon={FaTwitter} /> </SocialLink>
              <SocialLink href="https://linkedin.com/in/kiramariecremer" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}> <Icon icon={FaLinkedinIn} /> </SocialLink>
            </SocialLinks>
            
            <ContactDetails>
              <ContactLink href="https://newworknow.podcast" target="_blank" rel="noopener noreferrer"> @newworknow.podcast </ContactLink>
              <ContactLink href="https://linktr.ee/kiramariecremer" target="_blank" rel="noopener noreferrer"> linktr.ee/kiramariecremer </ContactLink>
            </ContactDetails>
          </ContactInfo>
          
          <ContactForm
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput type="text" name="name" id="name" value={formState.name} onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))} required placeholder="Dein Name" />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput type="email" name="email" id="email" value={formState.email} onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))} required placeholder="Deine Email-Adresse" />
              </FormGroup>
            </FormRow>
            
            <FormGroup className="full-width">
              <FormLabel htmlFor="subject">Betreff</FormLabel>
              <FormSelect name="subject" id="subject" value={formState.subject} onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))} required>
                <option value="">Bitte wählen</option>
                <option value="allgemein">Allgemeine Anfrage</option>
                <option value="zusammenarbeit">Zusammenarbeit</option>
                <option value="vortrag">Vortrags-/Workshopanfrage</option>
                {/* <option value="studie">Frage zur Studie</option> Entfernt, da Studie-Sektion gelöscht wurde */}
                <option value="anderes">Sonstiges</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup className="full-width">
              <FormLabel htmlFor="message">Nachricht</FormLabel>
              <FormTextarea name="message" id="message" value={formState.message} onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))} required placeholder="Deine Nachricht..." rows={5} />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isSubmitting} whileHover={!isSubmitting ? { y: -3 } : {}}>
              {isSubmitting ? ('WIRD GESENDET...') : (<><Icon icon={FaPaperPlane} /> NACHRICHT SENDEN</>)}
            </SubmitButton>
            
            {submitSuccess && (
              <SuccessMessage initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                Vielen Dank für deine Nachricht! Ich werde mich so schnell wie möglich bei dir melden.
              </SuccessMessage>
            )}
          </ContactForm>
        </ContactContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default ContactSection;
