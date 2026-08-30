import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Eye, TrendingUp, Sparkles, X, CheckCircle } from 'lucide-react';

const RANDOM_NAMES = [
  'Aarav', 'Priya', 'Rohan', 'Sneha', 'Kabir', 'Ananya', 'Vikram', 'Riya',
  'Aditya', 'Tanvi', 'Dev', 'Neha', 'Varun', 'Pooja', 'Sameer', 'Ishaan',
  'Shreya', 'Aryan', 'Tara', 'Siddharth', 'Meera', 'Karan', 'Diya', 'Nikhil',
  'Natasha', 'Ayush', 'Alisha', 'Kunal', 'Sanjana', 'Yash', 'Armaan', 'Rhea',
  'Dhruv', 'Kritika', 'Pranav', 'Divya', 'Tushar', 'Simran', 'Akash', 'Bhavya'
];

const RANDOM_CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad',
  'Chennai', 'Kolkata', 'Ahmedabad', 'Chandigarh', 'Jaipur',
  'DU North Campus', 'Manipal', 'NMIMS Mumbai', 'Christ Bengaluru'
];

const TIME_AGOS = ['Just now', '15s ago', '45s ago', '1m ago', '2m ago', '3m ago'];

export const LiveActivityPopup = ({ onSelectEvent }) => {
  const { events } = useApp();
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const timerRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Helper to pick random item from array
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generateDynamicActivity = () => {
    const eventList = events && events.length > 0 ? events : [
      { id: 'evt-chainsmokers-blr', name: 'The Chainsmokers — Bengaluru', posterUrl: '/posters/chainsmokers-bengaluru-banner.jpg', priceList: [{ category: 'Fanpit Phase 1', commissionAmount: 510 }, { category: 'GA Phase 1', commissionAmount: 150 }] },
      { id: 'evt-anyma-mum', name: 'Anyma presents ÆDEN — Mumbai', posterUrl: '/posters/anyma-aeden-poster-1.jpg', priceList: [{ category: 'GA Front', commissionAmount: 680 }, { category: 'VIP Lounge', commissionAmount: 3200 }] },
      { id: 'evt-gnr-blr', name: "Guns N' Roses — Bengaluru", posterUrl: '/posters/guns-n-roses-india-poster.jpg', priceList: [{ category: 'Gold (Phase 1)', commissionAmount: 720 }, { category: 'Silver (Phase 1)', commissionAmount: 300 }] },
      { id: 'evt-fred-del', name: 'Fred again.. — Delhi NCR', posterUrl: '/posters/fred-again-india-poster-1.png', priceList: [{ category: 'Student Pass (Verified)', commissionAmount: 140 }, { category: 'General Admission (GA)', commissionAmount: 297 }] },
      { id: 'evt-fred-mum', name: 'Fred again.. — Mumbai', posterUrl: '/posters/fred-again-india-poster-2.png', priceList: [{ category: 'Student Pass (Verified)', commissionAmount: 140 }, { category: 'General Admission (GA)', commissionAmount: 297 }] },
      { id: 'evt-khalid-del', name: 'Khalid — Delhi NCR', posterUrl: '/posters/khalid-india-banner.jpg', priceList: [{ category: 'General Access', commissionAmount: 191 }, { category: 'Phase 1 Fanpit', commissionAmount: 595 }] }
    ];

    const ev = getRandom(eventList);
    const name = getRandom(RANDOM_NAMES);
    const city = getRandom(RANDOM_CITIES);
    const timeAgo = getRandom(TIME_AGOS);
    const tier = ev.priceList && ev.priceList.length > 0 ? getRandom(ev.priceList) : { category: 'GA Pass', commissionAmount: 300 };

    const types = ['sale', 'sale', 'view', 'commission'];
    const chosenType = getRandom(types);

    const qty = Math.floor(Math.random() * 4) + 1; // 1 to 4 tickets
    const totalComm = (tier.commissionAmount || 300) * qty;

    if (chosenType === 'sale') {
      return {
        id: `act-${Date.now()}-${Math.random()}`,
        type: 'sale',
        promoter: name,
        city: city,
        event: ev.name,
        eventId: ev.id,
        category: `${qty}x ${tier.category}`,
        poster: ev.posterUrl,
        timeAgo: timeAgo,
        highlight: `+₹${totalComm.toLocaleString('en-IN')} promoter cut`
      };
    } else if (chosenType === 'view') {
      const viewRemarks = ['High demand phase', 'Quota filling quickly', 'Active buyer inquiry', 'Phase 1 live'];
      return {
        id: `act-${Date.now()}-${Math.random()}`,
        type: 'view',
        promoter: name,
        city: city,
        event: ev.name,
        eventId: ev.id,
        poster: ev.posterUrl,
        timeAgo: timeAgo,
        highlight: getRandom(viewRemarks)
      };
    } else {
      return {
        id: `act-${Date.now()}-${Math.random()}`,
        type: 'commission',
        promoter: name,
        city: city,
        event: ev.name,
        eventId: ev.id,
        category: `${qty} tickets`,
        poster: ev.posterUrl,
        timeAgo: timeAgo,
        highlight: `Earned ₹${totalComm.toLocaleString('en-IN')} on ${ev.name.split('—')[0].trim()}`
      };
    }
  };

  const showNextRandomActivity = () => {
    if (isDismissed) return;

    const activity = generateDynamicActivity();
    setCurrentActivity(activity);
    setIsVisible(true);

    // Keep visible for 5 seconds, then animate out
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);

      // Random delay between 6.5s and 11s before the next random popup
      const nextDelay = 6500 + Math.random() * 4500;
      timerRef.current = setTimeout(() => {
        showNextRandomActivity();
      }, nextDelay);
    }, 5000);
  };

  useEffect(() => {
    if (isDismissed) return;

    // Trigger first random activity 3 seconds after page load
    const initialTimer = setTimeout(() => {
      showNextRandomActivity();
    }, 3000);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isDismissed, events]);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const handleCardClick = () => {
    if (currentActivity && currentActivity.eventId && onSelectEvent) {
      onSelectEvent(currentActivity.eventId);
    }
  };

  if (!currentActivity || !isVisible) return null;

  const isSale = currentActivity.type === 'sale';
  const isComm = currentActivity.type === 'commission';

  return (
    <div
      onClick={handleCardClick}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 998,
        maxWidth: '390px',
        width: 'calc(100% - 48px)',
        animation: 'slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      className="live-activity-container"
      title="Click to view event details & rates"
    >
      <div
        style={{
          background: 'rgba(12, 14, 20, 0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: isSale || isComm ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: isSale || isComm 
            ? '0 12px 32px rgba(0, 0, 0, 0.65), 0 0 16px rgba(16, 185, 129, 0.15)' 
            : '0 12px 32px rgba(0, 0, 0, 0.65), 0 0 16px rgba(59, 130, 246, 0.12)',
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
        {/* Top active pulse highlight bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: isSale || isComm
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
            background: isSale || isComm ? '#10b981' : '#3b82f6',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
          }}>
            {isSale ? <ShoppingBag size={10} /> : isComm ? <CheckCircle size={10} /> : <Eye size={10} />}
          </div>
        </div>

        {/* Text Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isSale || isComm ? '#10b981' : '#3b82f6',
              boxShadow: isSale || isComm ? '0 0 8px #10b981' : '0 0 8px #3b82f6',
              display: 'inline-block'
            }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: isSale || isComm ? '#34d399' : '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isSale ? 'Verified Promoter Sale' : isComm ? 'Promoter Commission Earned' : 'Live Promoter Activity'}
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
                <strong style={{ color: '#ffffff' }}>{currentActivity.promoter}</strong> from <span style={{ color: '#d4d4d8' }}>{currentActivity.city}</span> sold <strong style={{ color: '#34d399' }}>{currentActivity.category}</strong> of <em>{currentActivity.event}</em>
              </>
            ) : isComm ? (
              <>
                <strong style={{ color: '#ffffff' }}>{currentActivity.promoter}</strong> ({currentActivity.city}) just earned commission on <em>{currentActivity.event}</em>
              </>
            ) : (
              <>
                <strong style={{ color: '#ffffff' }}>{currentActivity.promoter}</strong> ({currentActivity.city}) is viewing <em>{currentActivity.event}</em>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '0.7rem', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '3px' }}>
              {isSale || isComm ? <Sparkles size={10} color="#10b981" /> : <TrendingUp size={10} color="#3b82f6" />}
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
