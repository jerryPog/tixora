import React from 'react';
import { Users, Ticket, MapPin, Award, TrendingUp } from 'lucide-react';

const STATS = [
  {
    value: "21+",
    label: "Live Touring Acts",
    detail: "Global Headliners & Indian Indie"
  },
  {
    value: "88,000+",
    label: "Youth Fans & Attendees",
    detail: "Across Bengaluru, Mumbai & Delhi"
  },
  {
    value: "1,480+",
    label: "Campus Ambassadors",
    detail: "45+ Top Indian Universities"
  },
  {
    value: "₹8.4L+",
    label: "August Promoter Cuts",
    detail: "100% Upfront Payouts"
  }
];

export const FestivalStatsStrip = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, rgba(15, 17, 24, 0.95) 0%, rgba(26, 15, 38, 0.9) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '18px',
      padding: '2rem 1.5rem',
      marginBottom: '3.5rem',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
    }}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {STATS.map((stat, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
              marginBottom: '4px'
            }}>
              {stat.value}
            </div>

            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
              {stat.label}
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {stat.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
