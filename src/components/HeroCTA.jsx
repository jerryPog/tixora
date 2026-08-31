import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Zap, 
  Ticket, 
  Star 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroCTA = ({ onOpenRecordSale, onNavigateToWaitlist, onNavigateToEvents, onNavigateToReviews }) => {
  const { currentRole } = useApp();

  return (
    <section 
      className="hero-cta-section"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(0, 0, 0, 0) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.75rem 1.5rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow Accent */}
      <div 
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }} 
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            padding: '3px 10px',
            fontSize: '0.72rem',
            color: '#ffffff',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Sparkles size={12} color="#f59e0b" />
            <span>INDIA'S #1 YOUTH PROMOTER NETWORK</span>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '9999px',
            padding: '3px 10px',
            fontSize: '0.72rem',
            color: '#10b981',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldCheck size={12} />
            <span>100% DigiLocker Verified</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8">
            <h1 style={{ 
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              marginBottom: '0.65rem',
              color: '#ffffff'
            }}>
              Live The Hype. Official Concert Tickets, Zero Scalping & Top Campus Commissions.
            </h1>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: '680px', marginBottom: '1.25rem' }}>
              Sell verified concert passes to your college network for Guns N' Roses, Anyma, Fred again.., & The Chainsmokers. Instant digital QR pass delivery with 7.5%–10% promoter payouts.
            </p>

            {/* CTAs Above The Fold */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              
              {currentRole === 'promoter' ? (
                <button
                  onClick={onOpenRecordSale}
                  className="btn btn-primary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    gap: '8px',
                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)'
                  }}
                  id="hero-issue-ticket-cta"
                >
                  <Ticket size={16} />
                  <span>Issue Ticket Instant</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={onNavigateToEvents}
                  className="btn btn-primary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    gap: '8px',
                    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)'
                  }}
                >
                  <Ticket size={16} />
                  <span>Explore Live Roster</span>
                  <ArrowRight size={14} />
                </button>
              )}

              <button
                onClick={onNavigateToWaitlist}
                className="btn btn-secondary"
                style={{
                  padding: '10px 18px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderColor: 'rgba(255, 255, 255, 0.18)'
                }}
                id="hero-join-waitlist-cta"
              >
                <Zap size={15} color="#f59e0b" />
                <span>Join Campus Ambassador Waitlist</span>
              </button>

              <button
                onClick={onNavigateToReviews}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  transition: 'color 0.15s ease'
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span>4.9/5 (180+ Student Reviews)</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Pillar */}
          <div className="lg:col-span-4">
            <div style={{
              background: '#090a0d',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', padding: '6px', borderRadius: '6px' }}>
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>August 2026 Payouts</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>₹8,42,500+</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>+42% MoM</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa', padding: '6px', borderRadius: '6px' }}>
                    <Users size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Verified Campus Promoters</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>450+ College Leads</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>32 Metros</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
