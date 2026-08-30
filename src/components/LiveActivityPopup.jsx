import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Eye, TrendingUp, ShieldCheck, X, Sparkles } from 'lucide-react';

const SAMPLE_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'sale',
    promoter: 'Priya',
    city: 'Bangalore',
    event: 'The Chainsmokers',
    category: '2 Fanpits',
    poster: '/posters/chainsmokers-bengaluru-banner.jpg',
    timeAgo: 'Just now',
    highlight: '₹1,020 commission earned'
  },
  {
    id: 'act-2',
    type: 'view',
    promoter: 'Priya',
    city: 'Bangalore',
    event: 'The Chainsmokers — Bengaluru',
    poster: '/posters/chainsmokers-bengaluru-banner.jpg',
    timeAgo: '2m ago',
    highlight: 'High demand • 88 sold'
  },
  {
    id: 'act-3',
    type: 'sale',
    promoter: 'Aarav',
    city: 'Delhi NCR',
    event: 'Fred again.. — Delhi NCR',
    category: '1 Student Pass',
    poster: '/posters/fred-again-india-poster-1.png',
    timeAgo: 'Just now',
    highlight: 'DigiLocker verified sale'
  },
  {
    id: 'act-4',
    type: 'view',
    promoter: 'Rohan',
    city: 'Mumbai',
    event: 'Anyma presents ÆDEN — Mumbai',
    poster: '/posters/anyma-aeden-poster-1.jpg',
    timeAgo: '1m ago',
    highlight: 'Phase 1 filling fast'
  },
  {
    id: 'act-5',
    type: 'sale',
    promoter: 'Sneha',
    city: 'Bangalore',
    event: "Guns N' Roses — Bengaluru",
    category: '2 Gold Passes',
    poster: '/posters/guns-n-roses-india-poster.jpg',
    timeAgo: 'Just now',
    highlight: '₹1,440 commission'
  },
  {
    id: 'act-6',
    type: 'sale',
    promoter: 'Kabir',
    city: 'Mumbai',
    event: 'Anyma presents ÆDEN — Mumbai',
    category: '4 GA Front Passes',
    poster: '/posters/anyma-aeden-poster-1.jpg',
    timeAgo: '3m ago',
    highlight: '₹2,720 commission'
  },
  {
    id: 'act-7',
    type: 'view',
    promoter: 'Ananya',
    city: 'Delhi',
    event: 'Khalid — Delhi NCR',
    poster: '/posters/khalid-india-banner.jpg',
    timeAgo: 'Just now',
    highlight: 'Tour announcement'
  },
  {
    id: 'act-8',
    type: 'sale',
    promoter: 'Riya',
    city: 'Mumbai',
    event: 'Fred again.. — Mumbai',
    category: '2 GA Tickets',
    poster: '/posters/fred-again-india-poster-2.png',
    timeAgo: 'Just now',
    highlight: 'BMS digital pass issued'
  }
];

export const LiveActivityPopup = ({ onSelectEvent }) => {
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const activityIndexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 3.5 seconds
    const initialTimeout = setTimeout(() => {
      showNextActivity();
    }, 3500);

    return () => {
      clearTimeout(initialTimeout);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isDismissed]);

  const showNextActivity = () => {
    if (isDismissed) return;

    const activity = SAMPLE_ACTIVITIES[activityIndexRef.current % SAMPLE_ACTIVITIES.length];
    activityIndexRef.current += 1;

    setCurrentActivity(activity);
    setIsVisible(true);

    // Keep visible for 5.5 seconds, then hide and queue next
    timerRef.current = setTimeout(() => {
      setIsVisible(false);

      // Next popup appears in 7-11 seconds
      const nextDelay = 7000 + Math.random() * 4000;
      timerRef.current = setTimeout(() => {
        showNextActivity();
      }, nextDelay);
    }, 5500);
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (!currentActivity || !isVisible) return null;

  const isSale = currentActivity.type === 'sale';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 998,
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
        animation: 'slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transition: 'all 0.3s ease'
      }}
      className="live-activity-container"
    >
      <div
        style={{
          background: 'rgba(14, 16, 23, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: isSale ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: isSale 
            ? '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 16px rgba(16, 185, 129, 0.15)' 
            : '0 12px 32px rgba(0, 0, 0, 0.6)',
          borderRadius: '14px',
          padding: '10px 14px 10px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top green live pulse bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: isSale 
            ? 'linear-gradient(90deg, #10b981 0%, #34d399 50%, #10b981 100%)' 
            : 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)'
        }} />

        {/* Thumbnail Image */}
        <div style={{
          position: 'relative',
          width: '46px',
          height: '46px',
          borderRadius: '10px',
          overflow: 'hidden',
          flexShrink: 0,
          background: '#090a0d',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <img
            src={currentActivity.poster}
            alt={currentActivity.event}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Status Icon Badge */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: isSale ? '#10b981' : '#3b82f6',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
          }}>
            {isSale ? <ShoppingBag size={10} /> : <Eye size={10} />}
          </div>
        </div>

        {/* Text Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isSale ? '#10b981' : '#3b82f6',
              boxShadow: isSale ? '0 0 8px #10b981' : '0 0 8px #3b82f6',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isSale ? '#34d399' : '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isSale ? 'Verified Promoter Sale' : 'Live Promoter Activity'}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginLeft: 'auto', marginRight: '16px' }}>
              {currentActivity.timeAgo}
            </span>
          </div>

          <div style={{
            fontSize: '0.82rem',
            color: '#f4f4f5',
            lineHeight: 1.35,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {isSale ? (
              <>
                <strong>{currentActivity.promoter}</strong> from <span style={{ color: '#e4e4e7' }}>{currentActivity.city}</span> sold <strong style={{ color: '#ffffff' }}>{currentActivity.category}</strong> of <em>{currentActivity.event}</em>
              </>
            ) : (
              <>
                <strong>{currentActivity.promoter}</strong> ({currentActivity.city}) just viewed <em>{currentActivity.event}</em>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '0.7rem', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '3px' }}>
              {isSale ? <Sparkles size={10} color="#10b981" /> : <TrendingUp size={10} color="#3b82f6" />}
              {currentActivity.highlight}
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            transition: 'color 0.15s ease, background 0.15s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          title="Dismiss activity feed"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};
