import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import { Icon } from '../common/IconWrapper';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <SectionContainer id="contact">
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
              <SocialLink 
                href="https://instagram.com/kiramariecremer" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <Icon icon={FaInstagram} />
              </SocialLink>
              <SocialLink 
                href="https://twitter.com/kiramariecremer" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <Icon icon={FaTwitter} />
              </SocialLink>
              <SocialLink 
                href="https://linkedin.com/in/kiramariecremer" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
              >
                <Icon icon={FaLinkedinIn} />
              </SocialLink>
            </SocialLinks>
            
            <ContactDetails>
              <ContactLink href="https://newworknow.podcast" target="_blank" rel="noopener noreferrer">
                @newworknow.podcast
              </ContactLink>
              <ContactLink href="https://linktr.ee/kiramariecremer" target="_blank" rel="noopener noreferrer">
                linktr.ee/kiramariecremer
              </ContactLink>
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
                <FormLabel>Name</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="Dein Name"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="Deine Email-Adresse"
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel>Betreff</FormLabel>
              <FormSelect 
                name="subject" 
                value={formState.subject}
                onChange={handleChange}
                required
              >
                <option value="">Bitte wählen</option>
                <option value="allgemein">Allgemeine Anfrage</option>
                <option value="zusammenarbeit">Zusammenarbeit</option>
                <option value="vortrag">Vortrags-/Workshopanfrage</option>
                <option value="studie">Frage zur Studie</option>
                <option value="anderes">Sonstiges</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Nachricht</FormLabel>
              <FormTextarea 
                name="message" 
                value={formState.message}
                onChange={handleChange}
                required
                placeholder="Deine Nachricht..."
                rows={5}
              />
            </FormGroup>
            
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { y: -3 } : {}}
            >
              {isSubmitting ? (
                'WIRD GESENDET...'
              ) : (
                <>
                  <Icon icon={FaPaperPlane} /> NACHRICHT SENDEN
                </>
              )}
            </SubmitButton>
            
            {submitSuccess && (
              <SuccessMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Vielen Dank für deine Nachricht! Ich werde mich so schnell wie möglich bei dir melden.
              </SuccessMessage>
            )}
          </ContactForm>
        </ContactContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  background-color: var(--background-alt);
  padding: 120px 0;
`;

const ContentWrapper = styled.div`
  width: 90%;
  max-width: var(--max-width);
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
`;

const SectionHeading = styled.h2`
  position: relative;
  display: inline-block;
  font-size: 1.2rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 1px;
    background-color: var(--accent);
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContactHeading = styled.h3`
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  letter-spacing: 0;
  text-transform: none;
  color: var(--secondary);
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: var(--text);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--secondary);
  transition: var(--transition);
  
  &:hover {
    color: var(--accent);
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-light);
  transition: var(--transition);
  
  &:hover {
    color: var(--accent);
    transform: translateX(5px);
  }
`;

const ContactForm = styled(motion.form)`
  width: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--text);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: white;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: var(--text);
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 1px var(--accent);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: white;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: var(--text);
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    box-shadow: 0 0 0 1px var(--accent);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: white;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: var(--text);
  outline: none;
  resize: vertical;
  
  &:focus {
    box-shadow: 0 0 0 1px var(--accent);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--accent);
  color: white;
  padding: 1rem 2rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--secondary);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  margin-top: 1.5rem;
  padding: 1rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  color: #28a745;
`;

export default ContactSection;
