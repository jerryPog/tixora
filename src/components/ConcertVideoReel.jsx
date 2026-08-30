import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Radio, 
  Sparkles, 
  Eye, 
  Music2, 
  Flame 
} from 'lucide-react';

export const ConcertVideoReel = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const CONCERT_CLIPS = [
    {
      id: 'anyma',
      artist: 'Anyma presents ÆDEN',
      city: 'Mumbai • Mahalaxmi Racecourse',
      genre: 'Melodic Techno & Holographic Visuals',
      bpm: '126 BPM',
      color: '#38bdf8',
      poster: '/posters/anyma-aeden-poster-2.jpg',
      headline: 'Next-Gen 3D Holographic Visuals Live in Mumbai',
      quote: '"The most visually breathtaking electronic show on earth."'
    },
    {
      id: 'fred',
      artist: 'Fred again.. Live',
      city: 'Delhi NCR • Mumbai • Bengaluru',
      genre: 'Emotional Electronic & Live Sampling',
      bpm: '132 BPM',
      color: '#10b981',
      poster: '/posters/fred-again-india-poster-1.png',
      headline: 'Iconic USB & Actual Life Live Electronic Sets',
      quote: '"Unmatched emotional crowd connection and live MPC drops."'
    },
    {
      id: 'gnr',
      artist: "Guns N' Roses World Tour",
      city: 'Bengaluru • NICE Grounds',
      genre: 'Stadium Hard Rock & Guitars',
      bpm: '120 BPM',
      color: '#f59e0b',
      poster: '/posters/guns-n-roses-banner.webp',
      headline: "Slash's Legendary Solos & Axl Rose Live in India",
      quote: '"Sweet Child O\' Mine and November Rain with 35,000+ fans."'
    },
    {
      id: 'chainsmokers',
      artist: 'The Chainsmokers — Sunburn Arena',
      city: 'Bengaluru • NICE Grounds',
      genre: 'Festival EDM & Massive Drops',
      bpm: '128 BPM',
      color: '#ec4899',
      poster: '/posters/chainsmokers-bengaluru-banner.jpg',
      headline: 'Sunburn Arena Explosive Festival Energy',
      quote: '"Sing-along anthems Closer and Paris with stadium pyros."'
    }
  ];

  // Scroll listener for dynamic parallax & scale effects
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = Math.max(0, -rect.top);
        setScrollY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio Synthesizer for live festival sound atmosphere
  const toggleAudio = () => {
    if (!isAudioActive) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Sub bass drone oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
        
        // Low pass filter to create deep festival club vibration
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsAudioActive(true);
      } catch (err) {
        console.log('AudioContext error:', err);
      }
    } else {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      setIsAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const activeClip = CONCERT_CLIPS[activeClipIndex];
  const scrollParallax = Math.min(30, scrollY * 0.08);
  const scaleEffect = Math.min(1.04, 1 + scrollY * 0.0002);

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: '#0a0c10',
        marginBottom: '2rem',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Background Visual Screen with Parallax */}
      <div style={{
        position: 'relative',
        height: '320px',
        width: '100%',
        overflow: 'hidden',
        background: '#090a0d'
      }}>
        <img
          src={activeClip.poster}
          alt={activeClip.artist}
          style={{
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            transform: `translateY(-${scrollParallax}px) scale(${scaleEffect})`,
            transition: 'transform 0.15s ease-out, filter 0.5s ease',
            filter: 'brightness(0.72) contrast(1.15)'
          }}
        />

        {/* Dynamic Light Sweeps & Atmosphere Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9,10,13,0.3) 0%, rgba(9,10,13,0.85) 85%, #090a0d 100%)'
        }} />

        {/* Subtle Stage Laser Glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '20%',
          width: '60%',
          height: '100%',
          background: `radial-gradient(ellipse at center, ${activeClip.color}22 0%, transparent 70%)`,
          pointerEvents: 'none',
          animation: 'laserPulse 4s infinite alternate ease-in-out'
        }} />

        {/* Top Header Controls */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 10
        }}>
          <div className="flex items-center gap-2">
            <span style={{
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              padding: '3px 8px',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              letterSpacing: '0.03em'
            }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#f43f5e',
                animation: 'pulse 1.5s infinite'
              }} />
              2026 INDIA TOUR LINEUP
            </span>
            <span className="badge" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}>
              {activeClip.bpm}
            </span>
          </div>

          {/* Sound & Atmosphere Toggle */}
          <button
            onClick={toggleAudio}
            style={{
              background: isAudioActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0, 0, 0, 0.65)',
              border: `1px solid ${isAudioActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.12)'}`,
              color: isAudioActive ? '#34d399' : '#ffffff',
              backdropFilter: 'blur(8px)',
              borderRadius: '7px',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span>{isAudioActive ? 'Festival Sound ON' : 'Ambient Sound'}</span>
          </button>
        </div>

        {/* Audio Visualizer Waveform Animation */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '16px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '3px',
          height: '24px',
          zIndex: 10
        }}>
          {[60, 90, 40, 100, 75, 45, 85, 30, 95, 70, 50, 85].map((h, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: `${h}%`,
                background: activeClip.color,
                borderRadius: '2px',
                opacity: 0.8,
                animation: `equalizerBounce 0.8s infinite alternate ease-in-out ${i * 0.08}s`
              }}
            />
          ))}
        </div>

        {/* Main Title & Artist Details Over Video */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '70px',
          zIndex: 10
        }}>
          <div style={{ fontSize: '0.72rem', color: activeClip.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {activeClip.genre}
          </div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.75rem)', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            {activeClip.artist}
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#d1d5db', marginTop: '2px', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            {activeClip.headline}
          </p>
        </div>
      </div>

      {/* Switchable Concert Clip Selector Tabs */}
      <div style={{
        background: 'rgba(14, 16, 22, 0.95)',
        padding: '0.65rem 1rem',
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderTop: '1px solid var(--border-color)'
      }}>
        {CONCERT_CLIPS.map((clip, idx) => (
          <button
            key={clip.id}
            onClick={() => setActiveClipIndex(idx)}
            style={{
              background: activeClipIndex === idx ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: activeClipIndex === idx ? '#ffffff' : 'var(--text-muted)',
              border: `1px solid ${activeClipIndex === idx ? 'rgba(255, 255, 255, 0.2)' : 'transparent'}`,
              borderRadius: '7px',
              padding: '5px 11px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease'
            }}
          >
            <Sparkles size={12} color={activeClipIndex === idx ? clip.color : 'var(--text-muted)'} />
            <span>{clip.artist.split(' ')[0]} {clip.artist.split(' ')[1] || ''}</span>
          </button>
        ))}
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes laserPulse {
          0% { opacity: 0.3; transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 0.7; transform: scale(1.05) rotate(2deg); }
        }
        @keyframes equalizerBounce {
          0% { height: 20%; }
          100% { height: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
};
