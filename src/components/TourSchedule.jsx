import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  Music, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const SCHEDULE_DATES = [
  {
    id: 'day-1',
    tabLabel: 'Nov 14 — BLR',
    fullDate: 'Saturday, 14 Nov 2026',
    city: 'Bengaluru',
    venue: 'NICE Grounds, Bengaluru',
    lineup: [
      {
        time: '4:00 PM – 5:30 PM',
        stage: 'Acoustic Arena',
        artist: 'Opening Indie Rock Showcase',
        genre: 'Alt-Rock / Warmup',
        poster: '/posters/guns-n-roses-banner.webp',
        minPrice: 4000,
        eventId: 'evt-gnr-blr'
      },
      {
        time: '5:45 PM – 7:15 PM',
        stage: 'Main Stage',
        artist: 'Girish and The Chronicles (GATC)',
        genre: 'Heavy Metal & Hard Rock',
        poster: '/posters/guns-n-roses-india-poster.jpg',
        minPrice: 4000,
        eventId: 'evt-gnr-blr'
      },
      {
        time: '7:45 PM – 10:45 PM',
        stage: 'Main Stage (Headliner)',
        artist: "Guns N' Roses (Axl Rose, Slash, Duff)",
        genre: 'Hard Rock Legends 3-Hour Marathon',
        poster: '/posters/guns-n-roses-india-poster.jpg',
        minPrice: 4000,
        eventId: 'evt-gnr-blr',
        headliner: true
      }
    ]
  },
  {
    id: 'day-2',
    tabLabel: 'Nov 21 — MUM',
    fullDate: 'Saturday, 21 Nov 2026',
    city: 'Mumbai',
    venue: 'Mahalaxmi Racecourse, Mumbai',
    lineup: [
      {
        time: '4:30 PM – 6:00 PM',
        stage: 'Afterlife Visual Stage',
        artist: 'Cassian (Melodic Techno)',
        genre: 'Melodic Techno / Ambient',
        poster: '/posters/anyma-aeden-poster-2.jpg',
        minPrice: 4250,
        eventId: 'evt-anyma-mum'
      },
      {
        time: '6:30 PM – 8:00 PM',
        stage: 'Afterlife Visual Stage',
        artist: 'Kevin de Vries',
        genre: 'Progressive Melodic',
        poster: '/posters/anyma-aeden-poster-1.jpg',
        minPrice: 4250,
        eventId: 'evt-anyma-mum'
      },
      {
        time: '8:30 PM – 11:00 PM',
        stage: 'ÆDEN Hologram Main Stage',
        artist: 'Anyma presents ÆDEN (Matteo Milleri)',
        genre: 'Audiovisual Immersive Experience',
        poster: '/posters/anyma-aeden-poster-1.jpg',
        minPrice: 4250,
        eventId: 'evt-anyma-mum',
        headliner: true
      }
    ]
  },
  {
    id: 'day-3',
    tabLabel: 'Dec 05 — DEL',
    fullDate: 'Friday, 05 Dec 2026',
    city: 'Delhi NCR',
    venue: 'Leisure Valley Ground, Gurugram',
    lineup: [
      {
        time: '4:00 PM – 5:30 PM',
        stage: 'USB Stage',
        artist: 'Joy Anonymous (Live)',
        genre: 'House / UK Dance',
        poster: '/posters/fred-again-india-poster-2.png',
        minPrice: 1750,
        eventId: 'evt-fred-del'
      },
      {
        time: '6:00 PM – 7:30 PM',
        stage: 'USB Stage',
        artist: 'Four Tet (Special Live Guest)',
        genre: 'Electronica / Ambient Dance',
        poster: '/posters/fred-again-india-poster-1.png',
        minPrice: 1750,
        eventId: 'evt-fred-del'
      },
      {
        time: '8:00 PM – 10:30 PM',
        stage: 'Actual Life Main Arena',
        artist: 'Fred again.. (Live Sampling Solo)',
        genre: 'Electronic / UK Garage / Ambient Live',
        poster: '/posters/fred-again-india-poster-1.png',
        minPrice: 1750,
        eventId: 'evt-fred-del',
        headliner: true
      }
    ]
  },
  {
    id: 'day-4',
    tabLabel: 'Dec 20 — BLR',
    fullDate: 'Sunday, 20 Dec 2026',
    city: 'Bengaluru',
    venue: 'NICE Grounds, Bengaluru',
    lineup: [
      {
        time: '4:00 PM – 6:00 PM',
        stage: 'Sunburn Arena',
        artist: 'Lost Stories & Zaeden',
        genre: 'Indie Dance & EDM',
        poster: '/posters/chainsmokers-india-banner.jpg',
        minPrice: 1500,
        eventId: 'evt-chainsmokers-blr'
      },
      {
        time: '6:30 PM – 8:00 PM',
        stage: 'Sunburn Arena',
        artist: 'Krewella (Live Vocal Set)',
        genre: 'Dubstep / Electro Pop',
        poster: '/posters/chainsmokers-bengaluru-banner.jpg',
        minPrice: 1500,
        eventId: 'evt-chainsmokers-blr'
      },
      {
        time: '8:30 PM – 10:45 PM',
        stage: 'Sunburn Arena Headliner Stage',
        artist: 'The Chainsmokers (Live Duo & Band)',
        genre: 'Chart-topping EDM / Pop',
        poster: '/posters/chainsmokers-bengaluru-banner.jpg',
        minPrice: 1500,
        eventId: 'evt-chainsmokers-blr',
        headliner: true
      }
    ]
  }
];

export const TourSchedule = ({ onSelectEvent }) => {
  const [selectedDayId, setSelectedDayId] = useState('day-1');
  const activeSchedule = SCHEDULE_DATES.find(d => d.id === selectedDayId) || SCHEDULE_DATES[0];

  return (
    <section className="tour-schedule-section" style={{ marginBottom: '3.5rem' }}>
      
      {/* Watermark Section Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          SCHEDULE
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            TOUR TIMETABLE & STAGES
          </div>
          <h2 className="festival-heading">
            At What Time? Live Stage Schedule
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0.35rem auto 0' }}>
            Check official artist set times, stage locations, and book authorized passes before current phase sellout.
          </p>
        </div>
      </div>

      {/* Date Selector Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '1.75rem',
        overflowX: 'auto',
        paddingBottom: '6px'
      }}>
        {SCHEDULE_DATES.map((day) => {
          const isActive = selectedDayId === day.id;

          return (
            <button
              key={day.id}
              onClick={() => setSelectedDayId(day.id)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)' : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: isActive ? 'none' : '1px solid var(--border-color)',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 16px rgba(236, 72, 153, 0.4)' : 'none'
              }}
            >
              {day.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Selected Day Info Strip */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={15} color="#ec4899" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
            {activeSchedule.fullDate}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <MapPin size={13} color="#8b5cf6" />
          <span>{activeSchedule.venue}</span>
        </div>
      </div>

      {/* Lineup Timetable List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {activeSchedule.lineup.map((item, idx) => (
          <div 
            key={idx}
            className="schedule-item"
            style={{
              borderLeft: item.headliner ? '4px solid #ec4899' : '1px solid var(--border-color)',
              background: item.headliner ? 'linear-gradient(90deg, rgba(236, 72, 153, 0.08) 0%, rgba(18, 20, 28, 0.7) 100%)' : undefined
            }}
          >
            {/* Left: Time & Stage */}
            <div className="schedule-time-block">
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#ec4899', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                <span>{item.time}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {item.stage}
              </div>
            </div>

            {/* Middle: Artist Thumbnail & Details */}
            <div className="schedule-artist-block">
              <img
                src={item.poster}
                alt={`Official poster thumbnail for ${item.artist}`}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '1px solid var(--border-color)'
                }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span>{item.artist}</span>
                  {item.headliner && (
                    <span style={{
                      background: 'rgba(236, 72, 153, 0.2)',
                      color: '#f472b6',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      Headliner
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.genre}
                </div>
              </div>
            </div>

            {/* Right: Pass Booking Trigger */}
            <div className="schedule-action-block">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>From</div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#10b981' }}>
                  ₹{item.minPrice.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={() => onSelectEvent(item.eventId)}
                className="neon-btn-pink"
                style={{ padding: '6px 14px', fontSize: '0.76rem', gap: '4px', whiteSpace: 'nowrap' }}
              >
                <Ticket size={13} />
                <span>Book Pass</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
