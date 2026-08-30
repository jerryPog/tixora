import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2,
  Zap
} from 'lucide-react';

export const PromoterOverview = () => {
  const { activePromoter, commissionTiers } = useApp();

  if (!activePromoter) return null;

  const currentTierInfo = commissionTiers.find((t) => t.tier === activePromoter.tier) || commissionTiers[0];
  const progressPct = Math.min(100, Math.round((activePromoter.ticketsSold / activePromoter.nextTierTarget) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      
      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Tier & Commission Card */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Tier
              </span>
              <span className="badge" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>
                {currentTierInfo.commissionRange}
              </span>
            </div>

            <div className="flex items-baseline gap-1.5" style={{ marginBottom: '0.2rem' }}>
              <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.85rem)', fontWeight: 800, color: '#ffffff' }}>
                {activePromoter.tier}
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                ({activePromoter.ticketsSold})
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '0.5rem' }}>
            <div className="flex justify-between" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
              <span>Next Target</span>
              <span>{activePromoter.ticketsSold}/{activePromoter.nextTierTarget}</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{
                width: `${progressPct}%`,
                height: '100%',
                background: '#ffffff',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Total Commission Earned Card */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Earnings
              </span>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <TrendingUp size={13} color="#10b981" />
              </div>
            </div>
            <div style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.85rem)', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em' }}>
              ₹{activePromoter.totalCommissionEarned.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{
            marginTop: '0.5rem',
            paddingTop: '0.35rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            ₹{Math.round(activePromoter.totalCommissionEarned / (activePromoter.ticketsSold || 1))}/pass avg
          </div>
        </div>

        {/* Total Volume Generated */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Sales Volume
              </span>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Banknote size={13} color="#f59e0b" />
              </div>
            </div>
            <div style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.85rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              ₹{(activePromoter.totalRevenueGenerated || 0).toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{
            marginTop: '0.5rem',
            paddingTop: '0.35rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)'
          }}>
            {activePromoter.ticketsSold} passes issued
          </div>
        </div>

        {/* Instant Settlement Clearance Mode */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Settlement Model
              </span>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Zap size={13} color="#3b82f6" />
              </div>
            </div>
            <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 800, color: '#34d399', letterSpacing: '-0.02em' }}>
              100% Upfront
            </div>
          </div>

          <div style={{
            marginTop: '0.5rem',
            paddingTop: '0.35rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.68rem',
            color: '#93c5fd',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <CheckCircle2 size={11} color="#34d399" /> Card • UPI • Bank IMPS
          </div>
        </div>

      </div>
    </div>
  );
};
