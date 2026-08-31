import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PARTNERS = [
  { name: 'BookMyShow', label: 'OFFICIAL TICKETING PARTNER' },
  { name: 'DigiLocker', label: 'GOVERNMENT KYC VERIFICATION' },
  { name: 'Sunburn Arena', label: 'FESTIVAL ORGANIZER' },
  { name: 'Tuborg Lounge', label: 'EXPERIENCE SPONSOR' },
  { name: 'District App', label: 'DISCOVERY PARTNER' },
  { name: 'VH1 Supersonic', label: 'OFFICIAL MEDIA' }
];

export const PartnerLogoStrip = () => {
  return (
    <section style={{
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '1.75rem 0',
      marginBottom: '3.5rem',
      background: 'rgba(7, 8, 11, 0.6)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          Trusted Official Ticketing & Verification Ecosystem
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'clamp(1.5rem, 4vw, 3.5rem)',
        flexWrap: 'wrap'
      }}>
        {PARTNERS.map((partner, i) => (
          <div 
            key={i} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              opacity: 0.75,
              transition: 'opacity 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.75')}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.04em'
            }}>
              {partner.name}
            </div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>
              {partner.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
