import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Zap, 
  Ticket, 
  Star,
  Flame,
  Calendar,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroCTA = ({ onOpenRecordSale, onNavigateToWaitlist, onNavigateToEvents, onNavigateToReviews }) => {
  const { currentRole } = useApp();

  return (
    <section 
      className="hero-festival-section"
      style={{
        background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.06) 40%, rgba(7, 8, 11, 0.95) 100%)',
        border: '1px solid rgba(236, 72, 153, 0.25)',
        borderRadius: '24px',
        padding: 'clamp(2rem, 4.5vw, 3.25rem) clamp(1.25rem, 3vw, 2.5rem)',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 16px 50px rgba(0, 0, 0, 0.7)'
      }}
    >
      {/* Background Giant Stylized "T" Monogram Watermark */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(14rem, 28vw, 26rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.03) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          lineHeight: 0.8
        }}
        aria-hidden="true"
      >
        T
      </div>

      {/* Ambient Neon Lasers & Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-60px',
          left: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%'
        }} 
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Badges & Tour Routing Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          
          <div style={{
            background: 'rgba(236, 72, 153, 0.15)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            borderRadius: '9999px',
            padding: '4px 12px',
            fontSize: '0.72rem',
            color: '#f472b6',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            letterSpacing: '0.04em'
          }}>
            <Flame size={13} color="#ec4899" />
            <span>INDIA'S PREMIER YOUTH CONCERT & PROMOTER PORTAL</span>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '9999px',
            padding: '4px 12px',
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

        {/* Script Subheading (Inspired by Reference Design) */}
        <div style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          color: '#ffffff',
          lineHeight: 1,
          transform: 'rotate(-2deg)',
          display: 'inline-block',
          marginBottom: '0.25rem',
          textShadow: '0 0 16px rgba(236, 72, 153, 0.6)'
        }}>
          Live The Hype
        </div>

        {/* Tour Date & Location Badge */}
        <div style={{
          fontSize: '0.84rem',
          color: '#f472b6',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem'
        }}>
          [ Nov 14 – Dec 20 • Bengaluru • Mumbai • Delhi NCR • Live Concerts ]
        </div>

        {/* Hero Title & Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8">
            <h1 style={{ 
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(1.8rem, 3.8vw, 2.75rem)', 
              fontWeight: 900, 
              lineHeight: 1.15, 
              marginBottom: '0.85rem',
              color: '#ffffff',
              letterSpacing: '-0.025em'
            }}>
              Official Youth Passes, Zero Scalping & Top Campus Commissions.
            </h1>
            
            <p style={{ fontSize: '0.92rem', color: '#d4d4d8', lineHeight: 1.6, maxWidth: '660px', marginBottom: '1.75rem' }}>
              Grab verified tickets for Guns N' Roses, Anyma presents ÆDEN, Fred again.., & The Chainsmokers. Instant digital QR pass delivery to your BookMyShow account with up to 10% promoter payouts.
            </p>

            {/* CTAs Above The Fold */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              
              {currentRole === 'promoter' ? (
                <button
                  onClick={onOpenRecordSale}
                  className="neon-btn-pink"
                  style={{
                    padding: '12px 24px',
                    fontSize: '0.92rem',
                    gap: '8px'
                  }}
                  id="hero-issue-ticket-cta"
                >
                  <Ticket size={17} />
                  <span>Issue Pass Instant</span>
                  <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  onClick={onNavigateToEvents}
                  className="neon-btn-pink"
                  style={{
                    padding: '12px 24px',
                    fontSize: '0.92rem',
                    gap: '8px'
                  }}
                >
                  <Ticket size={17} />
                  <span>Explore 2026 Lineup</span>
                  <ArrowRight size={15} />
                </button>
              )}

              <button
                onClick={onNavigateToWaitlist}
                className="neon-btn-outline"
                style={{
                  padding: '12px 20px',
                  fontSize: '0.88rem',
                  gap: '6px'
                }}
                id="hero-join-waitlist-cta"
              >
                <Zap size={16} color="#f59e0b" />
                <span>Join Ambassador Waitlist</span>
              </button>

              <button
                onClick={onNavigateToReviews}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.84rem',
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
              background: 'rgba(12, 14, 20, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', padding: '8px', borderRadius: '8px' }}>
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>August 2026 Payouts</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>₹8,42,500+</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>+42% MoM</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', padding: '8px', borderRadius: '8px' }}>
                    <Users size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verified Campus Network</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>450+ Promoters</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>32 Metros</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
