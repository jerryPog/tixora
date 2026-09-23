import React from 'react';
import { useApp } from '../context/AppContext';
import { usePageSEO } from '../hooks/usePageSEO';
import { PromoterOverview } from '../components/PromoterDashboard/PromoterOverview';
import { CheckCircle2, Award, Sparkles, ShieldCheck } from 'lucide-react';

export const TiersPage = () => {
  const { commissionTiers, activePromoter } = useApp();

  usePageSEO('tiers');

  return (
    <div className="tiers-page-container" style={{ paddingBottom: '3.5rem' }}>
      {/* Top Promoter KPI Strip */}
      <PromoterOverview />

      {/* Page Watermark Header */}
      <div className="section-watermark-wrapper" style={{ marginTop: '1.5rem' }}>
        <div className="section-watermark-bg" aria-hidden="true">
          TIERS
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            CAREER PROGRESSION & CUTS
          </div>
          <h1 className="festival-heading">
            Promoter Commission Tiers & VIP Privileges
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Sell tickets to your campus network, climb tiers, and unlock backstage artist access, higher profit shares, and festival hospitality.
          </p>
        </div>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginTop: '1.5rem' }}>
        {commissionTiers.map((tier) => {
          const isCurrent = activePromoter.tier === tier.tier;

          return (
            <div
              key={tier.tier}
              className="glass-card"
              style={{
                background: tier.bgGradient,
                border: isCurrent ? '2px solid #ffffff' : '1px solid var(--border-color)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                padding: '1.5rem'
              }}
            >
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '16px',
                  background: '#ffffff',
                  color: '#090a0d',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}>
                  Active Tier
                </div>
              )}

              <div style={{ marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                  {tier.tier}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {tier.ticketRange}
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.35)',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '1rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Commission Cut
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                  {tier.commissionRange}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>per ticket issued</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Tier Privileges & Rewards
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#e4e4e7' }}>
                      <CheckCircle2 size={14} color="#10b981" style={{ flexShrink: 0 }} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
