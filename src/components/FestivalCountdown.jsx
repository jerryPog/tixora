import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, Ticket } from 'lucide-react';

export const FestivalCountdown = ({ targetDate = "2026-11-14T16:00:00", eventName = "Guns N' Roses — Bengaluru Mega Tour", onBookTicket }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section style={{
      background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, rgba(7, 8, 11, 0.95) 100%)',
      border: '1px solid rgba(236, 72, 153, 0.25)',
      borderRadius: '20px',
      padding: '2rem 1.5rem',
      marginBottom: '3rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
    }}>
      {/* Background radial spotlight */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }} />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Subhead Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(236, 72, 153, 0.15)',
          border: '1px solid rgba(236, 72, 153, 0.35)',
          borderRadius: '9999px',
          padding: '4px 14px',
          fontSize: '0.74rem',
          fontWeight: 700,
          color: '#f472b6',
          marginBottom: '0.75rem',
          letterSpacing: '0.04em'
        }}>
          <Sparkles size={13} color="#ec4899" />
          <span>COUNT EVERY SECOND UNTIL THE SHOW</span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(1.4rem, 3.2vw, 2.2rem)',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          {eventName}
        </h2>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          Official gates open at 4:00 PM IST • NICE Grounds, Bengaluru • Quota filling fast
        </p>

        {/* Digital Countdown Timer Cards */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(8px, 2vw, 18px)',
          flexWrap: 'wrap',
          marginBottom: '1.75rem'
        }}>
          <div className="countdown-box">
            <div className="countdown-digit">{pad(timeLeft.days)}</div>
            <div className="countdown-label">Days</div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>:</div>

          <div className="countdown-box">
            <div className="countdown-digit">{pad(timeLeft.hours)}</div>
            <div className="countdown-label">Hours</div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>:</div>

          <div className="countdown-box">
            <div className="countdown-digit">{pad(timeLeft.minutes)}</div>
            <div className="countdown-label">Minutes</div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>:</div>

          <div className="countdown-box" style={{ borderColor: 'rgba(236, 72, 153, 0.4)' }}>
            <div className="countdown-digit" style={{ color: '#f472b6' }}>{pad(timeLeft.seconds)}</div>
            <div className="countdown-label" style={{ color: '#f472b6' }}>Seconds</div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onBookTicket && (
            <button
              onClick={onBookTicket}
              className="neon-btn-pink"
              style={{ padding: '10px 24px', fontSize: '0.86rem', gap: '8px' }}
            >
              <Ticket size={16} />
              <span>Lock Phase 1 Passes Before Price Hike</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
