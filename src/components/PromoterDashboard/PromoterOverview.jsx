import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Banknote, 
  Building2, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  CreditCard
} from 'lucide-react';

export const PromoterOverview = ({ onOpenDepositModal }) => {
  const { activePromoter, commissionTiers } = useApp();

  if (!activePromoter) return null;

  const currentTierInfo = commissionTiers.find((t) => t.tier === activePromoter.tier) || commissionTiers[0];
  const progressPct = Math.min(100, Math.round((activePromoter.ticketsSold / activePromoter.nextTierTarget) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      
      {/* Suspension Alert if applicable */}
      {activePromoter.depositStatus === 'Suspended' && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          color: '#fca5a5'
        }}>
          <div className="flex items-center gap-2">
            <AlertCircle size={20} color="#f43f5e" style={{ flexShrink: 0 }} />
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#ffffff' }}>
              Ticket Issuance Paused
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Outstanding cash of ₹{activePromoter.cashOwed.toLocaleString('en-IN')} is overdue. Settle balance to resume.
          </div>
          <button
            onClick={onOpenDepositModal}
            className="btn"
            style={{ background: '#f43f5e', color: '#ffffff', padding: '0.4rem 0.85rem', fontSize: '0.75rem', alignSelf: 'flex-start' }}
          >
            Settle Balance
          </button>
        </div>
      )}

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
              <span>Target</span>
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

        {/* Cash In Hand / Due to Deposit */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Cash In Hand
              </span>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Banknote size={13} color="#f59e0b" />
              </div>
            </div>
            <div style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.85rem)', fontWeight: 800, color: activePromoter.cashOwed > 0 ? '#f59e0b' : '#ffffff', letterSpacing: '-0.02em' }}>
              ₹{activePromoter.cashOwed.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={onOpenDepositModal}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '4px 6px',
                fontSize: '0.7rem',
                minHeight: '28px'
              }}
            >
              Deposit Cash
            </button>
          </div>
        </div>

        {/* Bank & Online Settlement Card (Zero Credit System) */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Settled to Bank
              </span>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Building2 size={13} color="#3b82f6" />
              </div>
            </div>
            <div style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.85rem)', fontWeight: 800, color: '#f4f4f6', letterSpacing: '-0.02em' }}>
              ₹{activePromoter.cashDeposited.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{
            marginTop: '0.5rem',
            paddingTop: '0.35rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.68rem',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <CheckCircle2 size={11} /> Card • UPI • Bank Direct
          </div>
        </div>

      </div>
    </div>
  );
};
