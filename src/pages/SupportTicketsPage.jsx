import React from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { SupportTicketsSection } from '../components/SupportTickets/SupportTicketsSection';

export const SupportTicketsPage = () => {
  usePageSEO('tickets');

  return (
    <div className="support-tickets-page-container" style={{ paddingBottom: '3.5rem' }}>
      <SupportTicketsSection />
    </div>
  );
};
