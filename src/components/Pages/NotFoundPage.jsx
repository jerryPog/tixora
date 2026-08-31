import React, { useState } from 'react';
import { 
  Search, 
  Home, 
  Ticket, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotFoundPage = ({ onNavigateToHome, onSelectEvent }) => {
  const { events } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = searchQuery.trim()
    ? events.filter(e => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : events.slice(0, 3);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0 4rem', textAlign: 'center' }}>
      
      {/* Visual Glitch / Error Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(244, 63, 94, 0.12)',
        color: '#fb7185',
        border: '1px solid rgba(244, 63, 94, 0.3)',
        borderRadius: '9999px',
        padding: '4px 14px',
        fontSize: '0.74rem',
        fontWeight: 700,
        marginBottom: '1rem'
      }}>
        <Compass size={13} />
        <span>ERROR 404 • PAGE NOT FOUND</span>
      </div>

      <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.5rem', color: '#ffffff' }}>
        Stage Lost in the Crowd.
      </h1>

      <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        The concert link, promoter route, or festival pass you are looking for has moved, expired, or hasn't dropped yet.
      </p>

      {/* Smart Search Bar */}
      <div style={{ maxWidth: '480px', margin: '0 auto 2rem', position: 'relative' }}>
        <input
          type="text"
          placeholder="Search live concerts, artists or cities (e.g. Anyma, Bengaluru)..."
          className="input-field"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ paddingLeft: '38px', height: '44px', fontSize: '0.84rem' }}
        />
        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
      </div>

      {/* Recommended Live Concert Lineup */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="#f59e0b" />
          <span>Trending Live Concert Passes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filteredEvents.map(ev => {
            const minPrice = Math.min(...ev.priceList.map(p => p.promoterPrice));

            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent ? onSelectEvent(ev.id) : onNavigateToHome()}
                className="glass-card"
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.66rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                    {ev.city}
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffffff', margin: '2px 0 4px', lineHeight: 1.2 }}>
                    {ev.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {ev.date}
                  </div>
                </div>

                <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#ffffff' }}>
                    From ₹{minPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#60a5fa', fontWeight: 600 }}>
                    View Passes →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Home Recovery Button */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={onNavigateToHome}
          className="btn btn-primary"
          style={{ padding: '10px 22px', fontSize: '0.88rem', gap: '8px' }}
        >
          <Home size={16} />
          <span>Back to Tixora Home</span>
        </button>
      </div>

    </div>
  );
};
