import React from 'react';
import { Sparkles, Music, Star, ArrowRight, Ticket } from 'lucide-react';

const HEADLINER_ARTISTS = [
  {
    id: 'art-gnr',
    name: "Axl Rose & Slash",
    band: "Guns N' Roses",
    genre: "Legendary Hard Rock",
    city: "Bengaluru (14 Nov)",
    avatar: "/posters/guns-n-roses-india-poster.jpg",
    eventId: "evt-gnr-blr",
    quote: "Sweet Child O' Mine • November Rain World Tour"
  },
  {
    id: 'art-anyma',
    name: "Matteo Milleri",
    band: "Anyma presents ÆDEN",
    genre: "Melodic Techno & Holograms",
    city: "Mumbai (21 Nov)",
    avatar: "/posters/anyma-aeden-poster-1.jpg",
    eventId: "evt-anyma-mum",
    quote: "Groundbreaking 3D Visual Production"
  },
  {
    id: 'art-fred',
    name: "Fred Gibson",
    band: "Fred again..",
    genre: "Live Electronic & Sampling",
    city: "Delhi & Mumbai (Dec 2026)",
    avatar: "/posters/fred-again-india-poster-1.png",
    eventId: "evt-fred-del",
    quote: "Actual Life to USB Live World Tour"
  },
  {
    id: 'art-chainsmokers',
    name: "Alex Pall & Drew Taggart",
    band: "The Chainsmokers",
    genre: "EDM / Pop Headliners",
    city: "Bengaluru Sunburn (20 Dec)",
    avatar: "/posters/chainsmokers-bengaluru-banner.jpg",
    eventId: "evt-chainsmokers-blr",
    quote: "Closer • Paris • Something Just Like This"
  },
  {
    id: 'art-khalid',
    name: "Khalid Robinson",
    band: "Khalid Live",
    genre: "Soulful R&B / Pop",
    city: "Delhi NCR (13 Dec)",
    avatar: "/posters/khalid-india-banner.jpg",
    eventId: "evt-khalid-del",
    quote: "Young Dumb & Broke • Location"
  }
];

export const ArtistLineupShowcase = ({ onSelectEvent }) => {
  return (
    <section className="artist-showcase-section" style={{ marginBottom: '3.5rem' }}>
      
      {/* Watermark Section Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          HEADLINERS
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            2026 OFFICIAL TOURING GUESTS
          </div>
          <h2 className="festival-heading">
            World-Class Headlining Artists
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0.35rem auto 0' }}>
            Direct access to official passes for the biggest global music icons performing in India.
          </p>
        </div>
      </div>

      {/* Circular Artist Avatar Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
        {HEADLINER_ARTISTS.map((artist) => (
          <div
            key={artist.id}
            onClick={() => onSelectEvent(artist.eventId)}
            className="glass-card"
            style={{
              padding: '1.25rem 0.85rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(18, 20, 28, 0.8) 100%)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Glowing Halo Avatar */}
            <div className="artist-halo-avatar" style={{ marginBottom: '0.85rem' }}>
              <img
                src={artist.avatar}
                alt={`Photo of headliner artist ${artist.name} (${artist.band})`}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px', lineHeight: 1.2 }}>
              {artist.band}
            </h3>

            <div style={{ fontSize: '0.74rem', color: '#f472b6', fontWeight: 600, marginBottom: '4px' }}>
              {artist.name}
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '0.66rem',
              color: 'var(--text-muted)',
              marginBottom: '8px'
            }}>
              {artist.city}
            </div>

            <div style={{
              fontSize: '0.7rem',
              color: '#38bdf8',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              marginTop: 'auto'
            }}>
              <span>View Tour Passes</span>
              <ArrowRight size={11} />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
