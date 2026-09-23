import React from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { FAQSection } from '../components/FAQSection';
import { HelpCircle, Sparkles } from 'lucide-react';

export const FAQPage = ({ onAskInChat }) => {
  usePageSEO('faqs');

  return (
    <div className="faq-page-container" style={{ paddingBottom: '3.5rem' }}>
      {/* Page Watermark Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          FAQS
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            KNOWLEDGE BASE & GUIDELINES
          </div>
          <h1 className="festival-heading">
            Frequently Asked Questions & Policies Center
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Instant answers covering ticket issuance, DigiLocker verification, anti-scalping policies, and UPI payout schedules.
          </p>
        </div>
      </div>

      <FAQSection onAskInChat={onAskInChat} />
    </div>
  );
};
