import React from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { PromoterOverview } from '../components/PromoterDashboard/PromoterOverview';
import { RewardsAndReferrals } from '../components/PromoterDashboard/RewardsAndReferrals';
import { Gift, Sparkles } from 'lucide-react';

export const RewardsPage = () => {
  usePageSEO('rewards');

  return (
    <div className="rewards-page-container" style={{ paddingBottom: '3.5rem' }}>
      {/* Top Promoter KPI Strip */}
      <PromoterOverview />

      {/* Page Watermark Header */}
      <div className="section-watermark-wrapper" style={{ marginTop: '1.5rem' }}>
        <div className="section-watermark-bg" aria-hidden="true">
          REWARDS
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            REFERRALS & VIP PERKS
          </div>
          <h1 className="festival-heading">
            Ambassador Milestones & Referral Prizes
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Earn ₹500 cash bonuses per recruited promoter plus artist backstage passes, official hoodies, and VIP lounge wristbands.
          </p>
        </div>
      </div>

      <RewardsAndReferrals />
    </div>
  );
};
