import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { WaitlistPage as WaitlistComponent } from '../components/Pages/WaitlistPage';

export const WaitlistPage = ({ onWaitlistSuccess }) => {
  const navigate = useNavigate();

  usePageSEO('waitlist');

  return (
    <div className="waitlist-page-wrapper">
      <WaitlistComponent
        onSubmitSuccess={(data) => {
          if (onWaitlistSuccess) onWaitlistSuccess(data);
          navigate('/thank-you');
        }}
        onNavigateToEvents={() => navigate('/events')}
      />
    </div>
  );
};
