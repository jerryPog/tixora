import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Banknote, 
  CreditCard, 
  Clock, 
  AlertCircle, 
  ArrowUpRight
} from 'lucide-react';

export const PromoterOverview = ({ onOpenDepositModal }) => {
  const { activePromoter, commissionTiers } = useApp();

  if (!activePromoter) return null;

  const currentTierInfo = commissionTiers.find((t) => t.tier === activePromoter.tier) || commissionTiers[0];
  const progressPct = Math.min(100, Math.round((activePromoter.ticketsSold / activePromoter.nextTierTarget) * 100));
  const creditUsagePct = Math.min(100, Math.round((activePromoter.creditUsed / activePromoter.creditLimit) * 100));
  const remainingCredit = Math.max(0, activePromoter.creditLimit - activePromoter.creditUsed);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
      
      {/* Suspension Alert if applicable */}
      {activePromoter.depositStatus === 'Suspended' && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: '#fca5a5'
        }}>
          <AlertCircle size={22} color="#f43f5e" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>
              Ticket Issuance Credit Paused
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Outstanding peer cash of ₹{activePromoter.cashOwed.toLocaleString('en-IN')} is overdue. Settle balance to resume issuing tickets.
            </div>
          </div>
          <button
            onClick={onOpenDepositModal}
            className="btn"
            style={{ background: '#f43f5e', color: '#ffffff', padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            Settle Balance
          </button>
        </div>
      )}

      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Tier & Commission Card */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Commission Tier
              </span>
              <span className="badge" style={{ fontSize: '0.7rem' }}>
                {currentTierInfo.commissionRange}
              </span>
            </div>

            <div className="flex items-baseline gap-2" style={{ marginBottom: '0.25rem' }}>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff' }}>
                {activePromoter.tier}
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ({activePromoter.ticketsSold} sold)
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '0.75rem' }}>
            <div className="flex justify-between" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Target: {activePromoter.tier === 'Silver' ? 'Gold' : 'Platinum'}</span>
              <span>{activePromoter.ticketsSold} / {activePromoter.nextTierTarget}</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
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
        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Earnings
              </span>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <TrendingUp size={16} color="#10b981" />
              </div>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em' }}>
              ₹{activePromoter.totalCommissionEarned.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Avg. ₹{Math.round(activePromoter.totalCommissionEarned / (activePromoter.ticketsSold || 1))} per ticket
          </div>
        </div>

        {/* Cash Collected & Settlement Card */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Cash In Hand (To Settle)
              </span>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Banknote size={16} color="#f59e0b" />
              </div>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: activePromoter.cashOwed > 0 ? '#f59e0b' : '#ffffff', letterSpacing: '-0.02em' }}>
              ₹{activePromoter.cashOwed.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              <Clock size={11} color="#f59e0b" />
              <span>Due: 10 days before show</span>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <button
              onClick={onOpenDepositModal}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '5px 10px',
                fontSize: '0.75rem'
              }}
            >
              Deposit / Settle Cash
            </button>
          </div>
        </div>

        {/* Credit Limit Card */}
        <div className="glass-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Credit Limit
              </span>
              <div style={{
                width: '30px', height: '30px', borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <CreditCard size={16} color="#3b82f6" />
              </div>
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f4f4f6', letterSpacing: '-0.02em' }}>
              {remainingCredit} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {activePromoter.creditLimit} left</span>
            </div>
          </div>

          {/* Credit Progress */}
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{
                width: `${creditUsagePct}%`,
                height: '100%',
                background: creditUsagePct > 80 ? '#f43f5e' : '#3b82f6',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <div className="flex justify-between" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>{activePromoter.creditUsed} Issued</span>
              <span>{remainingCredit} Available</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
