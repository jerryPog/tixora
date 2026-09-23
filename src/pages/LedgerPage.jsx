import React from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { PromoterOverview } from '../components/PromoterDashboard/PromoterOverview';
import { SalesLedger } from '../components/PromoterDashboard/SalesLedger';
import { Receipt, Sparkles } from 'lucide-react';

export const LedgerPage = ({ onOpenRecordSale }) => {
  usePageSEO('ledger');

  return (
    <div className="ledger-page-container" style={{ paddingBottom: '3.5rem' }}>
      {/* Top Promoter KPI Strip */}
      <PromoterOverview />

      {/* Page Watermark Header */}
      <div className="section-watermark-wrapper" style={{ marginTop: '1.5rem' }}>
        <div className="section-watermark-bg" aria-hidden="true">
          LEDGER
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            REALTIME TRANSACTION AUDIT
          </div>
          <h1 className="festival-heading">
            Promoter Sales Ledger & Payout History
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Monitor verified digital QR delivery status, buyer verification records, and automated UPI bank transfers.
          </p>
        </div>
      </div>

      <SalesLedger onOpenRecordSale={() => onOpenRecordSale(null, null)} />
    </div>
  );
};
