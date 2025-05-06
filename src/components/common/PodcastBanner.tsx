import React from 'react';
import styled from 'styled-components';
import { FaSpotify } from 'react-icons/fa';
import { Icon } from './IconWrapper';

const PodcastBanner: React.FC = () => {
  return (
    <BannerWrapper>
      <BannerContent>
        <SpotifyIcon>
          <Icon icon={FaSpotify} />
        </SpotifyIcon>
        <BannerText>Der Zukunft der Arbeit Podcast - jetzt auf Spotify</BannerText>
      </BannerContent>
      <RatingStars>★★★★★</RatingStars>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  width: 100%;
  background-color: #f8f5ff;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
`;

const SpotifyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cdaffd;
  font-size: 1.2rem;
  margin-right: 8px;
`;

const BannerText = styled.div`
  font-family: var(--heading-font);
  font-size: 0.9rem;
  color: var(--text);
`;

const RatingStars = styled.div`
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  color: #cdaffd;
  font-size: 0.7rem;
  letter-spacing: 2px;
`;

export default PodcastBanner;
