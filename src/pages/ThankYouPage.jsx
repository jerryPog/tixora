import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { ThankYouPage as ThankYouComponent } from '../components/Pages/ThankYouPage';

export const ThankYouPage = ({ orderData }) => {
  const navigate = useNavigate();

  usePageSEO('thank-you');

  return (
    <div className="thank-you-page-wrapper">
      <ThankYouComponent
        orderData={orderData}
        onNavigateToHome={() => navigate('/')}
        onNavigateToLedger={() => navigate('/ledger')}
      />
    </div>
  );
};
