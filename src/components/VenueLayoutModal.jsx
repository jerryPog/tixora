import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  Info, 
  Users, 
  Sparkles,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VenueLayoutModal = ({ event, isOpen, onClose, onSelectSaleCategory }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !event || !event.venueLayout) return null;

  const layout = event.venueLayout;

  const handleCopyLayoutDetails = () => {
    let detailsText = `🗺️ *${layout.title.toUpperCase()} — VENUE & SEATING LAYOUT*\n`;
    detailsText += `📍 *Venue:* ${event.venue}\n`;
    detailsText += `📅 *Date & Time:* ${event.date}\n`;
    detailsText += `━━━━━━━━━━━━━━━━━━━━\n`;
    detailsText += `🏟️ *Section Layout & Pricing:*\n`;

    if (layout.type === 'khalid') {
      detailsText += `• 🎤 *STAGE (Front Center)*\n`;
      detailsText += `• 💖 *FANPIT:* ₹6,999 (Closest to artist)\n`;
      detailsText += `• 💛 *GA (+):* ₹3,549 (Mid-tier standing)\n`;
      detailsText += `• 💚 *GA:* ₹2,549 (General admission)\n`;
      detailsText += `*Type:* Standing Section/s\n`;
    } else if (layout.type === 'chainsmokers') {
      detailsText += `• ⚡ *STAGE (Center)*\n`;
      detailsText += `• 🟡 *FANPIT:* ₹6,000 (Front stage)\n`;
      detailsText += `• 🟠 *VIP:* ₹2,500 Early Bird / ₹3,000 Phase 1\n`;
      detailsText += `• 🟤 *GA:* ₹1,500 Early Bird / ₹2,000 Phase 1\n`;
    } else if (layout.type === 'fred-again') {
      detailsText += `• 🎹 *STAGE (Front)*\n`;
      detailsText += `• ⬛ *STUDENT GA:* ₹1,750 (Verified Student Pass)\n`;
      detailsText += `• ⬛ *GENERAL ADMISSION (GA):* ₹3,500\n`;
    } else if (layout.type === 'anyma') {
      detailsText += `• 🌌 *STAGE & BACKSTAGE (Center)*\n`;
      detailsText += `• 🔲 *GA FRONT:* ₹8,000\n`;
      detailsText += `• 🔲 *GA BACK:* ₹4,250\n`;
      detailsText += `• 👑 *VVIP EXPERIENCE:* ₹17,500+\n`;
      detailsText += `• 🍸 *VIP LOUNGE:* ₹32,000\n`;
    }

    detailsText += `━━━━━━━━━━━━━━━━━━━━\n`;
    detailsText += `🔒 *100% DigiLocker Verified & BookMyShow Delivery*\n`;
    detailsText += `📲 *DM me now to secure your pass for the best section!*`;

    navigator.clipboard.writeText(detailsText);
    setCopied(true);
    showToast(`Venue layout details for "${event.name}" copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    let text = `🗺️ Check out the official venue layout for *${event.name}*!\n\n`;
    text += `📍 ${event.venue} (${event.date})\n\n`;
    text += `Passes are live now with instant QR delivery to BookMyShow. DM me to book before rates hike!`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '680px', 
          width: '100%', 
          maxHeight: '92vh', 
          overflowY: 'auto', 
          position: 'relative',
          padding: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '16px',
          background: 'rgba(13, 15, 22, 0.98)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(236, 72, 153, 0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#ffffff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            zIndex: 10
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              Official Venue Layout
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Verified Seating & Standing Chart
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            {layout.title}
          </h2>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <MapPin size={12} />
            <span>{layout.subtitle || `${event.venue} • ${event.date}`}</span>
          </div>
        </div>

        {/* Venue Layout Visualization Container */}
        <div style={{
          background: layout.type === 'khalid' || layout.type === 'fred-again' ? '#ffffff' : '#050608',
          color: layout.type === 'khalid' || layout.type === 'fred-again' ? '#090a0d' : '#ffffff',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
        }}>

          {/* 1. KHALID VENUE LAYOUT */}
          {layout.type === 'khalid' && (
            <div style={{ textAlign: 'center', color: '#18181b', fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '2px' }}>
                KHALID LIVE IN DELHI NCR
              </div>
              <div style={{ fontSize: '0.75rem', color: '#52525b', marginBottom: '1rem', fontWeight: 500 }}>
                HUDA Gymkhana Club, Gurugram • 13 December 2026 | 06:00 PM Onwards
              </div>

              {/* Filter sections mock header */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e4e4e7',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                color: '#a1a1aa',
                maxWidth: '420px',
                margin: '0 auto 1.5rem auto'
              }}>
                Filter sections by price
              </div>

              {/* Stage Map Layout */}
              <div style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Stage */}
                <div style={{
                  background: '#3f3f46',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  width: '140px',
                  margin: '0 auto',
                  letterSpacing: '0.04em',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}>
                  STAGE
                </div>

                {/* FANPIT */}
                <div 
                  style={{
                    background: '#fce7f3',
                    border: '2px solid #fda4af',
                    color: '#831843',
                    fontWeight: 900,
                    fontSize: '1rem',
                    padding: '18px 20px',
                    borderRadius: '12px',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(244, 63, 94, 0.15)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div>FANPIT</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9f1239', marginTop: '2px' }}>₹6,999 (Closest access to Khalid)</div>
                </div>

                {/* GA (+) */}
                <div 
                  style={{
                    background: '#fef3c7',
                    border: '2px solid #fde047',
                    color: '#78350f',
                    fontWeight: 900,
                    fontSize: '1rem',
                    padding: '18px 20px',
                    borderRadius: '12px',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.15)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div>GA (+)</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#92400e', marginTop: '2px' }}>₹3,549 (Elevated mid-tier standing view)</div>
                </div>

                {/* GA */}
                <div 
                  style={{
                    background: '#dcfce7',
                    border: '2px solid #86efac',
                    color: '#14532d',
                    fontWeight: 900,
                    fontSize: '1rem',
                    padding: '18px 20px',
                    borderRadius: '12px',
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.15)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div>GA</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#166534', marginTop: '2px' }}>₹2,549 (General admission pass)</div>
                </div>

                {/* Footer Note */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#27272a',
                  marginTop: '0.5rem'
                }}>
                  <Users size={14} />
                  <span>Standing Section/s</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. THE CHAINSMOKERS VENUE LAYOUT */}
          {layout.type === 'chainsmokers' && (
            <div style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.25rem', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span>Sunburn Arena Ft. The Chainsmokers</span>
              </div>

              {/* Stage + Arena Graphic */}
              <div style={{ maxWidth: '400px', margin: '0 auto', background: '#090a0d', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                
                {/* Stage */}
                <div style={{
                  background: '#f4f4f5',
                  color: '#090a0d',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  padding: '8px 24px',
                  width: '130px',
                  margin: '0 auto',
                  letterSpacing: '0.04em',
                  borderRadius: '4px 4px 0 0'
                }}>
                  STAGE
                </div>

                {/* VIP & FANPIT Container */}
                <div style={{
                  background: '#ea580c', // Orange VIP
                  position: 'relative',
                  padding: '16px 12px 28px 12px',
                  borderLeft: '2px solid rgba(255,255,255,0.2)',
                  borderRight: '2px solid rgba(255,255,255,0.2)'
                }}>
                  {/* Nested FANPIT */}
                  <div style={{
                    background: '#eab308', // Gold Fanpit
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1rem',
                    padding: '12px 16px',
                    width: '160px',
                    margin: '0 auto 16px auto',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                  }}>
                    FANPIT
                  </div>

                  <div style={{
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.4rem',
                    letterSpacing: '0.06em'
                  }}>
                    VIP
                  </div>
                </div>

                {/* GA Bottom Section */}
                <div style={{
                  background: '#ffedd5', // Light Peach GA
                  color: '#090a0d',
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  padding: '38px 16px',
                  letterSpacing: '0.08em',
                  borderRadius: '0 0 6px 6px'
                }}>
                  GA
                </div>

                {/* Price Legend */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: '1.25rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '18px', height: '18px', background: '#3f3f46', borderRadius: '3px' }} />
                    <div style={{ textAlign: 'left', fontSize: '0.72rem', fontWeight: 800 }}>
                      <div>EARLY BIRD GA</div>
                      <div style={{ color: '#a1a1aa' }}>₹1,500</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '18px', height: '18px', background: '#ea580c', borderRadius: '3px' }} />
                    <div style={{ textAlign: 'left', fontSize: '0.72rem', fontWeight: 800 }}>
                      <div>EARLY BIRD VIP</div>
                      <div style={{ color: '#ea580c' }}>₹2,500</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 3. FRED AGAIN.. VENUE LAYOUT */}
          {layout.type === 'fred-again' && (
            <div style={{ textAlign: 'center', color: '#090a0d', fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '2px' }}>
                Fred again.. India Tour 2026 - Delhi NCR
              </div>
              <div style={{ fontSize: '0.74rem', color: '#52525b', marginBottom: '1.25rem', fontWeight: 600 }}>
                Leisure Valley Ground, Gurugram • 05 December 2026
              </div>

              {/* Arena Graphic */}
              <div style={{ maxWidth: '380px', margin: '0 auto' }}>
                
                {/* Stage */}
                <div style={{
                  background: '#090a0d',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  padding: '10px 24px',
                  width: '140px',
                  margin: '0 auto',
                  letterSpacing: '0.04em',
                  borderRadius: '4px'
                }}>
                  STAGE
                </div>

                {/* Massive GA Black Field */}
                <div style={{
                  background: '#090a0d',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '2.4rem',
                  padding: '60px 20px',
                  margin: '8px 0 16px 0',
                  borderRadius: '6px',
                  letterSpacing: '0.06em',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }}>
                  GA
                </div>

                {/* Legend */}
                <div style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#090a0d',
                  letterSpacing: '-0.01em'
                }}>
                  STUDENT GA <span style={{ color: '#52525b', fontWeight: 600, fontSize: '0.9rem' }}>(₹1,750)</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. ANYMA PRESENTS AEDEN VENUE LAYOUT */}
          {layout.type === 'anyma' && (
            <div style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '2px' }}>
                ANYMA presents AEDEN - Mumbai
              </div>
              <div style={{ fontSize: '0.74rem', color: '#a1a1aa', marginBottom: '1.25rem' }}>
                Mahalaxmi Racecourse, Mumbai • 21 November 2026
              </div>

              {/* Arena Wireframe (Clean white borders on pitch dark) */}
              <div style={{ maxWidth: '440px', margin: '0 auto', background: '#000000', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                
                {/* Top: Backstage + Stage + Backstage */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '4px', marginBottom: '2px' }}>
                  <div style={{ border: '1px solid #ffffff', color: '#a1a1aa', fontSize: '0.58rem', padding: '4px 8px', textTransform: 'uppercase' }}>
                    BACKSTAGE
                  </div>
                  <div style={{ background: '#ffffff', color: '#000000', fontWeight: 900, fontSize: '0.82rem', padding: '6px 20px', textTransform: 'uppercase' }}>
                    STAGE
                  </div>
                  <div style={{ border: '1px solid #ffffff', color: '#a1a1aa', fontSize: '0.58rem', padding: '4px 8px', textTransform: 'uppercase' }}>
                    BACKSTAGE
                  </div>
                </div>

                {/* Main Arena Grid Box */}
                <div style={{
                  border: '1.5px solid #ffffff',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 60px',
                  minHeight: '260px',
                  position: 'relative'
                }}>
                  
                  {/* Left Column: VVIP EXPERIENCE */}
                  <div style={{
                    borderRight: '1.5px solid #ffffff',
                    borderBottom: '1.5px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '160px',
                    padding: '4px'
                  }}>
                    <span style={{
                      transform: 'rotate(-90deg)',
                      whiteSpace: 'nowrap',
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: '#ffffff'
                    }}>
                      VVIP EXPERIENCE
                    </span>
                  </div>

                  {/* Middle: GA FRONT & GA BACK */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      borderBottom: '1.5px solid #ffffff',
                      height: '160px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em'
                    }}>
                      GA FRONT
                    </div>
                    <div style={{
                      flex: 1,
                      minHeight: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em'
                    }}>
                      GA BACK
                    </div>
                  </div>

                  {/* Right Column: LOUNGE on Top + VVIP EXPERIENCE on Bottom */}
                  <div style={{ borderLeft: '1.5px solid #ffffff', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      borderBottom: '1.5px solid #ffffff',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.62rem',
                      fontWeight: 800
                    }}>
                      LOUNGE
                    </div>
                    <div style={{
                      height: '120px',
                      borderBottom: '1.5px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}>
                      <span style={{
                        transform: 'rotate(90deg)',
                        whiteSpace: 'nowrap',
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#ffffff'
                      }}>
                        VVIP EXPERIENCE
                      </span>
                    </div>
                  </div>

                </div>

                {/* Footer Brand Badges */}
                <div style={{
                  marginTop: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.6rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  paddingTop: '0.75rem'
                }}>
                  <div>
                    <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.52rem' }}>Co-Presented By</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.72rem' }}>RuPay</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.52rem' }}>Produced & Promoted By</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.72rem' }}>Sunburn • Live Nation</strong>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Action Controls for Promoters to Share with Customers */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '220px' }}>
            <button
              onClick={handleCopyLayoutDetails}
              className="btn btn-secondary"
              style={{
                flex: 1,
                fontSize: '0.78rem',
                gap: '6px',
                borderColor: copied ? '#10b981' : 'var(--border-color)',
                color: copied ? '#10b981' : '#ffffff'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied Details!' : 'Copy Venue Pitch'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="btn btn-secondary"
              style={{
                fontSize: '0.78rem',
                gap: '6px',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                color: '#34d399'
              }}
            >
              <Share2 size={13} />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onSelectSaleCategory) onSelectSaleCategory(event.id);
            }}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', gap: '6px' }}
          >
            <Ticket size={13} />
            <span>Sell Pass for this Event</span>
          </button>
        </div>

      </div>
    </div>
  );
};
