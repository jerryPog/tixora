import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  MapPin, 
  Award, 
  ArrowRight, 
  Target, 
  HeartHandshake, 
  Lock,
  Ticket
} from 'lucide-react';

export const AboutPage = ({ onNavigateToEvents, onNavigateToWaitlist, onNavigateToContact }) => {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3.5rem' }}>
      
      {/* Watermark Section Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          ABOUT
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            OUR MISSION & FOUNDING STORY
          </div>
          <h1 className="festival-heading">
            Live The Hype. Democratizing Youth Concert Culture.
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0.5rem auto 0', lineHeight: 1.6 }}>
            Tixora was built to eliminate black-market scalping, empower passionate student music lovers, and provide direct, verified event access for India's massive youth generation.
          </p>
        </div>
      </div>

      {/* Board of Directors & Executive Leadership Spotlight */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem', borderRadius: '16px' }}>
        <div style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          color: '#60a5fa',
          letterSpacing: '0.05em',
          marginBottom: '6px'
        }}>
          Executive Leadership & Board of Directors
        </div>
        
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: '#ffffff' }}>
          Board of Directors (BOD) & Founding Team
        </h2>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          As avid concert-goers in college, our leadership team witnessed the extreme frustration of sold-out shows, fake Instagram DM tickets, and predatory black-market markups. Tixora was engineered to solve this crisis by turning trusted campus community leaders into certified, DigiLocker-backed event ambassadors with instant pass issuance.
        </p>

        {/* 3-Column Responsive Grid for Board of Directors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "Ronak Jain R",
              role: "Founder",
              email: "ronakj303@gmail.com",
              phone: "+91 78921 45475",
              roleColor: "#10b981",
              initials: "RJ"
            },
            {
              name: "Prajwal Gowrish H S",
              role: "Co-Founder",
              email: "gowrishprajwal123@gmail.com",
              phone: "+91 88612 00170",
              roleColor: "#60a5fa",
              initials: "PG"
            },
            {
              name: "Kanishk Jhunjhunwala",
              role: "Co-Founder",
              email: "kanishkjhunjhunwala@gmail.com",
              phone: "+91 91045 73147",
              roleColor: "#ec4899",
              initials: "KJ"
            }
          ].map((member, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'all 0.2s ease'
              }}
              className="card-interactive"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${member.roleColor}, #090a0d)`,
                  border: `1px solid ${member.roleColor}`,
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {member.initials}
                </div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                    {member.name}
                  </div>
                  <span style={{
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    color: member.roleColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {member.role}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.74rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                <a
                  href={`mailto:${member.email}`}
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', wordBreak: 'break-all', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ffffff'}
                  onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <span>✉ {member.email}</span>
                </a>

                <a
                  href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#34d399', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>📞 {member.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Pillars */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', textAlign: 'center' }}>
          Our 4 Core Operating Guarantees
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: <Target size={20} color="#f59e0b" />,
              title: "1. 100% Official MRP Ticket Protection",
              desc: "Zero black-market price gouging. All tickets reflect official festival promoter MRPs with transparent pricing breakdowns."
            },
            {
              icon: <Lock size={20} color="#10b981" />,
              title: "2. DigiLocker Identity Verification",
              desc: "Every single college promoter is government KYC-verified via DigiLocker, safeguarding buyers against fraud and illegitimate passes."
            },
            {
              icon: <HeartHandshake size={20} color="#ec4899" />,
              title: "3. Direct Student Promoter Revenue",
              desc: "We return up to 10% of ticket face values straight into the pockets of college students who organize youth campus networks."
            },
            {
              icon: <Award size={20} color="#60a5fa" />,
              title: "4. Cryptographic Digital Passes",
              desc: "Instant barcode and QR code digital delivery directly synchronized with BookMyShow and venue entry gates."
            }
          ].map((pillar, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}>
                  {pillar.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Footprint Strip */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
          <MapPin size={14} />
          <span>Active Metro Footprint</span>
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
          Empowering College Networks Across India
        </h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#e4e4e7' }}>
          {['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'].map((city, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              <strong>{city}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action CTAs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={onNavigateToEvents}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.85rem', gap: '6px' }}
        >
          <Ticket size={16} />
          <span>Explore 2026 Concert Passes</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={onNavigateToWaitlist}
          className="btn btn-secondary"
          style={{ padding: '10px 18px', fontSize: '0.85rem', gap: '6px' }}
        >
          <Sparkles size={15} color="#f59e0b" />
          <span>Join Ambassador Waitlist</span>
        </button>

        <button
          onClick={onNavigateToContact}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.82rem',
            padding: '10px 14px',
            textDecoration: 'underline'
          }}
        >
          Contact Our Founders
        </button>
      </div>

    </div>
  );
};
