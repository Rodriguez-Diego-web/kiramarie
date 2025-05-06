import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaYoutube, FaPodcast } from 'react-icons/fa';

type CardIconProps = {
  color: string;
};

const networkCards = [
  {
    id: 'insights',
    icon: FaLinkedinIn,
    color: '#e6d4ff',
    title: 'Exklusive Einblicke',
    text: 'Erhalten Sie frühzeitigen Zugang zu Forschungsergebnissen und Trendanalysen'
  },
  {
    id: 'events',
    icon: FaYoutube,
    color: '#ffccf9',
    title: 'VIP-Events',
    text: 'Teilnahme an regelmäßigen Webinaren und exklusiven Netzwerktreffen'
  },
  {
    id: 'data',
    icon: FaPodcast,
    color: '#d4f0ff',
    title: 'Datengetriebene Insights',
    text: 'Profitieren Sie von Benchmark-Daten aus über 200 Unternehmen'
  }
];

const ExpertNetworkSection: React.FC = () => {
  return (
    <NetworkSection id="network">
      <NetworkInner>
        <NetworkTopline
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          ZUKUNFT GEMEINSAM GESTALTEN
        </NetworkTopline>
        
        <NetworkHeading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Werden Sie Teil meines <NetworkAccent>Expertennetzwerks</NetworkAccent>
        </NetworkHeading>
        
        <NetworkDivider 
          initial={{ width: 0 }}
          whileInView={{ width: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        />
        
        <NetworkCards>
          {networkCards.map((card, index) => (
            <NetworkCard 
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            >
              <CardIcon color={card.color}>
                <card.icon />
              </CardIcon>
              <CardTitle>{card.title}</CardTitle>
              <CardText>{card.text}</CardText>
            </NetworkCard>
          ))}
        </NetworkCards>
        
        <CtaButton
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: '#bb9cf2' 
          }}
          whileTap={{ scale: 0.98 }}
        >
          JETZT ANMELDEN
        </CtaButton>
      </NetworkInner>
    </NetworkSection>
  );
};

const NetworkSection = styled.section`
  padding: 100px 0;
  background-color: #f8f8fc;
  text-align: center;
`;

const NetworkInner = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NetworkTopline = styled(motion.div)`
  font-family: var(--heading-font);
  font-size: 14px;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 10px;
`;

const NetworkHeading = styled(motion.h2)`
  font-family: var(--heading-font);
  font-size: 44px;
  font-weight: 500;
  color: #333;
  margin: 0 0 20px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const NetworkAccent = styled.span`
  color: #cdaffd;
  font-weight: 300;
  display: block;
`;

const NetworkDivider = styled(motion.div)`
  height: 2px;
  background-color: #cdaffd;
  margin: 0 auto 60px;
`;

const NetworkCards = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 60px;
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NetworkCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 30px;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const CardIcon = styled.div<CardIconProps>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #fff;
  font-size: 24px;
`;

const CardTitle = styled.h3`
  font-family: var(--heading-font);
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 15px;
  color: #333;
`;

const CardText = styled.p`
  font-family: var(--body-font);
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

const CtaButton = styled(motion.button)`
  background-color: #cdaffd;
  color: white;
  font-family: var(--heading-font);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 16px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export default memo(ExpertNetworkSection);
// DRWEB-KM2025
