import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { AboutPage as AboutComponent } from '../components/Pages/AboutPage';

export const AboutPage = () => {
  const navigate = useNavigate();

  usePageSEO('about');

  return (
    <div className="about-page-wrapper">
      <AboutComponent
        onNavigateToEvents={() => navigate('/events')}
        onNavigateToWaitlist={() => navigate('/waitlist')}
        onNavigateToContact={() => navigate('/contact')}
      />
    </div>
  );
};
