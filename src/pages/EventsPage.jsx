import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageSEO } from '../hooks/usePageSEO';
import { EventPosters } from '../components/PromoterDashboard/EventPosters';
import { TourSchedule } from '../components/TourSchedule';
import { ArtistLineupShowcase } from '../components/ArtistLineupShowcase';
import { Ticket, Sparkles, SlidersHorizontal } from 'lucide-react';

export const EventsPage = ({ onOpenRecordSale }) => {
  const navigate = useNavigate();

  usePageSEO('events');

  return (
    <div className="events-page-container" style={{ paddingBottom: '3rem' }}>
      {/* Page Header Watermark */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          LINEUP
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            2026 PUBLISHED MEGA TOURS
          </div>
          <h1 className="festival-heading">
            Official Concert Lineup & Verified Passes
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Instant digital pass delivery directly to BookMyShow and District accounts with transparent promoter commission rates.
          </p>
        </div>
      </div>

      {/* Main Event Posters Grid with City Filter & Actions */}
      <div style={{ marginBottom: '3.5rem' }}>
        <EventPosters
          onSelectEventForSale={(eId) => onOpenRecordSale(eId, null)}
          onSelectEventForPriceList={(eId) => navigate(`/prices?eventId=${eId}`)}
          onSelectEventDetails={(eId) => navigate(`/events/${eId}`)}
        />
      </div>

      {/* Interactive Tour Timetable */}
      <TourSchedule onSelectEvent={(eId) => navigate(`/events/${eId}`)} />

      {/* Artist Lineup Showcase */}
      <ArtistLineupShowcase onSelectEvent={(eId) => navigate(`/events/${eId}`)} />
    </div>
  );
};
