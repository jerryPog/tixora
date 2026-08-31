import React, { useState } from 'react';
import { Play, Sparkles, Volume2, X, ShieldCheck, Ticket } from 'lucide-react';

export const ExperienceTeaser = ({ onOpenRecordSale }) => {
  const [isPlayingModal, setIsPlayingModal] = useState(false);

  return (
    <section style={{
      position: 'relative',
      borderRadius: '24px',
      overflow: 'hidden',
      marginBottom: '3.5rem',
      background: 'linear-gradient(135deg, rgba(7, 8, 11, 0.95) 0%, rgba(20, 10, 35, 0.9) 100%)',
      border: '1px solid rgba(236, 72, 153, 0.25)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
    }}>
      
      {/* Visual Backdrop Ambient Layer */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(236, 72, 153, 0.22) 0%, transparent 60%), radial-gradient(circle at 25% 70%, rgba(139, 92, 246, 0.22) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(2.5rem, 5vw, 4.5rem) 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Pulsing Neon Play Button */}
        <button 
          onClick={() => setIsPlayingModal(true)}
          className="play-btn-pulse"
          style={{ marginBottom: '1.75rem', border: 'none' }}
          aria-label="Play Concert Experience Trailer"
        >
          <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
        </button>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(236, 72, 153, 0.15)',
          border: '1px solid rgba(236, 72, 153, 0.35)',
          borderRadius: '9999px',
          padding: '4px 14px',
          fontSize: '0.74rem',
          fontWeight: 700,
          color: '#f472b6',
          marginBottom: '0.75rem',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={13} color="#ec4899" />
          <span>AUDIOVISUAL IMMERSION 2026</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
          lineHeight: 1.15
        }}>
          Live The Hype. Image Your Dream.
        </h2>

        <p style={{
          fontSize: '0.92rem',
          color: '#d4d4d8',
          maxWidth: '580px',
          lineHeight: 1.6,
          marginBottom: '2rem'
        }}>
          Feel the thunderous bass, multi-dimensional laser holograms, and unbridled euphoria of 80,000+ fans united under one sky.
        </p>

        {/* Floating Metrics Pill */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: '0.8rem',
          color: '#e4e4e7'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ec4899', display: 'inline-block' }} />
            <span>4K Hologram Stages</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
            <span>120kW L-Acoustics Sound</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span>100% Verified Entry</span>
          </div>
        </div>

      </div>

      {/* Video Trailer Modal */}
      {isPlayingModal && (
        <div className="modal-overlay" onClick={() => setIsPlayingModal(false)} style={{ zIndex: 1200 }}>
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()} 
            style={{ 
              maxWidth: '720px', 
              background: '#07080b',
              border: '1px solid rgba(236, 72, 153, 0.4)',
              padding: '1.5rem',
              borderRadius: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#ec4899" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Tixora Festival Teaser 2026</h3>
              </div>
              <button onClick={() => setIsPlayingModal(false)} className="btn-ghost" style={{ padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#000',
              aspectRatio: '16/9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              border: '1px solid var(--border-color)',
              marginBottom: '1rem'
            }}>
              <img
                src="/posters/anyma-aeden-poster-1.jpg"
                alt="Concert stage visualizer trailer preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <div style={{
                  background: 'rgba(236, 72, 153, 0.2)',
                  color: '#f472b6',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.74rem',
                  fontWeight: 700
                }}>
                  OFFICIAL 2026 FESTIVAL TEASER
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Anyma, Fred again.. & Guns N' Roses India</h4>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Official tickets available exclusively through verified campus promoters.
              </div>

              {onOpenRecordSale && (
                <button
                  onClick={() => {
                    setIsPlayingModal(false);
                    onOpenRecordSale();
                  }}
                  className="neon-btn-pink"
                  style={{ padding: '8px 18px', fontSize: '0.78rem', gap: '6px' }}
                >
                  <Ticket size={14} />
                  <span>Issue Passes Now</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
