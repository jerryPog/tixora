import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { usePageSEO } from '../hooks/usePageSEO';
import { HeroCTA } from '../components/HeroCTA';
import { TourSchedule } from '../components/TourSchedule';
import { ArtistLineupShowcase } from '../components/ArtistLineupShowcase';
import { ExperienceTeaser } from '../components/ExperienceTeaser';
import { FestivalStatsStrip } from '../components/FestivalStatsStrip';
import { TourNewsSection } from '../components/TourNewsSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { FAQSection } from '../components/FAQSection';
import { 
  Ticket, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight 
} from 'lucide-react';

export const HomePage = ({ onOpenRecordSale, onAskInChat }) => {
  const navigate = useNavigate();
  const { events } = useApp();
  
  usePageSEO('home');

  const featuredEvents = events.slice(0, 4);

  return (
    <div className="home-page-container">
      {/* 1. Electrifying Above-The-Fold Festival Hero */}
      <HeroCTA
        onOpenRecordSale={() => onOpenRecordSale(null, null)}
        onNavigateToWaitlist={() => navigate('/waitlist')}
        onNavigateToEvents={() => navigate('/events')}
        onNavigateToReviews={() => navigate('/reviews')}
      />

      {/* 2. Featured Concerts Spotlight Bar */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div className="section-watermark-wrapper">
          <div className="section-watermark-bg" aria-hidden="true">
            FEATURED
          </div>
          <div className="section-watermark-front">
            <div className="festival-tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              2026 HEADLINING SHOWS
            </div>
            <h2 className="festival-heading">
              Trending Concerts & Official Festival Passes
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '540px', margin: '0.35rem auto 0' }}>
              Direct BookMyShow & District QR delivery. 100% verified student prices with zero scalping markups.
            </p>
          </div>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginTop: '1.5rem' }}>
          {featuredEvents.map((event) => {
            const minPrice = Math.min(...event.priceList.map(p => p.promoterPrice));
            const maxCommission = Math.max(...event.priceList.map(p => p.commission));

            return (
              <div 
                key={event.id}
                className="glass-card hover-lift"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(15, 17, 23, 0.75)'
                }}
              >
                {/* Poster Artwork Header */}
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={event.posterUrl}
                    alt={event.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {event.city}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.02em'
                  }}>
                    Earn up to ₹{maxCommission}
                  </div>
                </div>

                {/* Event Details Content */}
                <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: '#ec4899', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
                    {event.artist}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '0.5rem' }}>
                    {event.name}
                  </h3>

                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '1rem' }}>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} color="#94a3b8" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <MapPin size={12} color="#94a3b8" /> {event.venue}
                    </span>
                  </div>

                  {/* Pricing and Action Buttons */}
                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Passes from</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                          ₹{minPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <Link
                        to={`/events/${event.id}`}
                        style={{
                          fontSize: '0.74rem',
                          color: '#60a5fa',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          textDecoration: 'none',
                          fontWeight: 600
                        }}
                      >
                        Details <ChevronRight size={13} />
                      </Link>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/events/${event.id}`}
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: '6px', fontSize: '0.72rem', textDecoration: 'none', textAlign: 'center' }}
                      >
                        Tiers
                      </Link>
                      <button
                        onClick={() => onOpenRecordSale(event.id, null)}
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '6px', fontSize: '0.72rem', gap: '4px' }}
                      >
                        <Ticket size={11} /> Issue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Concerts CTA Banner */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <Link
            to="/events"
            className="btn btn-secondary"
            style={{
              padding: '10px 24px',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <span>Explore All 2026 Concerts & Lineups</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 3. Interactive Tour Timetable */}
      <TourSchedule onSelectEvent={(eId) => navigate(`/events/${eId}`)} />

      {/* 4. Headlining Artists Showcase */}
      <ArtistLineupShowcase onSelectEvent={(eId) => navigate(`/events/${eId}`)} />

      {/* 5. Audiovisual Festival Teaser */}
      <ExperienceTeaser onOpenRecordSale={() => onOpenRecordSale(null, null)} />

      {/* 6. Campus & Festival Metric Strip */}
      <FestivalStatsStrip />

      {/* 7. Latest Tour News */}
      <TourNewsSection onSelectArticle={() => {}} />

      {/* 8. Verified Student & Fan Reviews Snippet */}
      <div style={{ marginBottom: '3rem' }}>
        <ReviewsSection />
      </div>

      {/* 9. Live Operational FAQ Center */}
      <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
        <FAQSection onAskInChat={onAskInChat} />
      </div>
    </div>
  );
};
