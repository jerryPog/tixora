import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { ContactPage as ContactComponent } from '../components/Pages/ContactPage';

export const ContactPage = () => {
  const navigate = useNavigate();

  usePageSEO('contact');

  return (
    <div className="contact-page-wrapper">
      <ContactComponent
        onOpenFAQ={() => navigate('/faqs')}
        onNavigateToEvents={() => navigate('/events')}
      />
    </div>
  );
};
