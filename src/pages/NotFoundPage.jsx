import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { NotFoundPage as NotFoundComponent } from '../components/Pages/NotFoundPage';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  usePageSEO('404');

  return (
    <div className="not-found-page-wrapper">
      <NotFoundComponent
        onNavigateToHome={() => navigate('/')}
        onSelectEvent={(eId) => navigate(`/events/${eId}`)}
      />
    </div>
  );
};
