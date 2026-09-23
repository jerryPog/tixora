import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { PriceListExplorer } from '../components/PromoterDashboard/PriceListExplorer';
import { Tag, Sparkles } from 'lucide-react';

export const PricingPage = ({ onOpenRecordSale }) => {
  const [searchParams] = useSearchParams();
  const selectedEventId = searchParams.get('eventId');

  usePageSEO('prices');

  return (
    <div className="pricing-page-container" style={{ paddingBottom: '3.5rem' }}>
      {/* Page Watermark Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          RATES
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            OFFICIAL MRPS & COMMISSIONS
          </div>
          <h1 className="festival-heading">
            Concert Price Lists & Profit Calculator
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Compare ticket tiers, examine campus discount margins, and simulate your instant promoter earnings across all published 2026 shows.
          </p>
        </div>
      </div>

      <PriceListExplorer
        selectedEventId={selectedEventId}
        onSelectEventForSale={(eId, cat) => onOpenRecordSale(eId, cat)}
      />
    </div>
  );
};
