import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Share2, 
  Copy, 
  Check, 
  Download, 
  Info, 
  Users, 
  Sparkles,
  Ticket,
  ChevronRight,
  Zap,
  ShieldCheck,
  Calendar,
  Layers,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VenueLayoutModal = ({ event, isOpen, onClose, onSelectSaleCategory }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'image'

  if (!isOpen || !event || !event.venueLayout) return null;

  const layout = event.venueLayout;

  const handleCopyLayoutDetails = () => {
    let detailsText = `🗺️ *${layout.title.toUpperCase()} — VENUE & SEATING LAYOUT*\n`;
    detailsText += `📍 *Venue:* ${event.venue}\n`;
    detailsText += `📅 *Date & Time:* ${event.date}\n`;
    detailsText += `━━━━━━━━━━━━━━━━━━━━\n`;
    detailsText += `🏟️ *Section Layout & Pricing:*\n`;

    if (layout.type === 'guns-n-roses' || layout.type === 'gnr') {
      detailsText += `• 🎸 *STAGE (Front Center)*\n`;
      detailsText += `• 🔴 *VIP:* From ₹10,999 (Front of house viewing, dedicated lane & bars)\n`;
      detailsText += `• ⬛ *KOTAK & PLATINUM LOUNGE:* From ₹28,999 (Elevated deck, appetizers, alco-beverages, dedicated washrooms & free parking)\n`;
      detailsText += `• 🟡 *GENERAL ADMISSION (GA):* From ₹4,499 (Full GA access with food/bar zones)\n`;
    } else if (layout.type === 'fred-again') {
      detailsText += `• 🎹 *STAGE (Front)*\n`;
      detailsText += `• ⬛ *STUDENT GA:* ₹1,750 (Verified Student Pass, Dedicated Lane)\n`;
      detailsText += `• ⬛ *GENERAL ADMISSION (GA):* ₹3,500 (Common GA Area & Bars)\n`;
      detailsText += `• ⚡ *GA+ PASS:* ₹6,000 (Early Venue Access, Dedicated Bars & Washrooms)\n`;
      detailsText += `*Tour Cities:* Delhi NCR • Mumbai • Bengaluru\n`;
    } else if (layout.type === 'khalid') {
      detailsText += `• 🎤 *STAGE (Front Center)*\n`;
      detailsText += `• 💖 *FANPIT:* ₹6,999 (Closest to artist)\n`;
      detailsText += `• 💛 *GA (+):* ₹3,549 (Mid-tier standing)\n`;
      detailsText += `• 💚 *GA:* ₹2,549 (General admission)\n`;
      detailsText += `*Type:* Standing Section/s\n`;
    } else if (layout.type === 'chainsmokers') {
      detailsText += `• ⚡ *STAGE (Center)*\n`;
      detailsText += `• 🟡 *FANPIT:* ₹6,000 (Front stage)\n`;
      detailsText += `• 🟠 *VIP:* ₹2,500 Early Bird / ₹3,000 Phase 1\n`;
      detailsText += `• 🟤 *GA:* ₹1,500 Early Bird / ₹2,000 Phase 1\n`;
    } else if (layout.type === 'anyma') {
      detailsText += `• 🌌 *STAGE & BACKSTAGE (Center)*\n`;
      detailsText += `• 🔲 *GA FRONT:* ₹8,000\n`;
      detailsText += `• 🔲 *GA BACK:* ₹4,250\n`;
      detailsText += `• 👑 *VVIP EXPERIENCE:* ₹17,500+\n`;
      detailsText += `• 🍸 *VIP LOUNGE:* ₹32,000\n`;
    }

    detailsText += `━━━━━━━━━━━━━━━━━━━━\n`;
    detailsText += `🔒 *100% DigiLocker Verified & BookMyShow Delivery*\n`;
    detailsText += `📲 *DM me now to secure your pass for the best section!*`;

    navigator.clipboard.writeText(detailsText);
    setCopied(true);
    showToast(`Venue layout details for "${event.name}" copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    let text = `🗺️ Check out the official venue layout for *${event.name}*!\n\n`;
    text += `📍 ${event.venue} (${event.date})\n\n`;
    if (layout.type === 'guns-n-roses' || layout.type === 'gnr') {
      text += `• GA: From ₹4,499\n• VIP: From ₹10,999\n• Kotak & Platinum Lounge: From ₹28,999\n\n`;
    } else if (layout.type === 'fred-again') {
      text += `• Student GA: ₹1,750\n• GA: ₹3,500\n• GA+: ₹6,000\n\n`;
    }
    text += `Passes are live now with instant QR delivery to BookMyShow. DM me to book before rates hike!`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadLayoutImage = () => {
    if (!layout.image) return;
    const link = document.createElement('a');
    link.href = layout.image;
    link.download = `Tixora-Layout-${event.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading official venue layout image`, 'info');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '720px', 
          width: '100%', 
          maxHeight: '92vh', 
          overflowY: 'auto', 
          position: 'relative',
          padding: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '16px',
          background: 'rgba(13, 15, 22, 0.98)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 32px rgba(236, 72, 153, 0.15)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#ffffff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
            zIndex: 10
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              Official Venue Layout
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Verified Seating & Standing Chart
            </span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            {layout.title}
          </h2>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <MapPin size={12} />
            <span>{layout.subtitle || `${event.venue} • ${event.date}`}</span>
          </div>
        </div>

        {/* View Mode Toggle Switch (if layout image exists) */}
        {layout.image && (
          <div style={{
            display: 'flex',
            gap: '6px',
            marginBottom: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: '8px',
            width: 'fit-content'
          }}>
            <button
              onClick={() => setViewMode('interactive')}
              style={{
                background: viewMode === 'interactive' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <Layers size={12} />
              <span>Interactive Map & Perks</span>
            </button>
            <button
              onClick={() => setViewMode('image')}
              style={{
                background: viewMode === 'image' ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'transparent',
                color: '#ffffff',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease'
              }}
            >
              <ImageIcon size={12} />
              <span>Official BMS Graphic</span>
            </button>
          </div>
        )}

        {/* Image View Mode */}
        {viewMode === 'image' && layout.image && (
          <div style={{
            background: '#050608',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            textAlign: 'center'
          }}>
            <div style={{ maxHeight: '55vh', overflowY: 'auto', borderRadius: '8px', background: '#000000', padding: '0.5rem' }}>
              <img 
                src={layout.image} 
                alt={`${event.name} Official BMS Layout`} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  borderRadius: '6px',
                  display: 'block',
                  margin: '0 auto',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                }} 
              />
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button 
                onClick={handleDownloadLayoutImage}
                className="btn btn-secondary"
                style={{ fontSize: '0.74rem', gap: '5px', padding: '6px 12px' }}
              >
                <Download size={12} />
                <span>Download High-Res Graphic</span>
              </button>
            </div>
          </div>
        )}

        {/* Interactive View Mode */}
        {viewMode === 'interactive' && (
          <div style={{
            background: layout.type === 'guns-n-roses' || layout.type === 'gnr'
              ? 'linear-gradient(180deg, #140407 0%, #1f0b12 50%, #0d0a14 100%)'
              : layout.type === 'fred-again' || layout.type === 'khalid'
                ? '#ffffff'
                : '#050608',
            color: layout.type === 'guns-n-roses' || layout.type === 'gnr' || layout.type === 'anyma' || layout.type === 'chainsmokers'
              ? '#ffffff'
              : '#090a0d',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
          }}>

            {/* 1. GUNS N' ROSES VENUE LAYOUT */}
            {(layout.type === 'guns-n-roses' || layout.type === 'gnr') && (
              <div style={{ textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
                
                {/* Stylized 3D Red/Yellow "VENUE LAYOUT" Title */}
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  letterSpacing: '0.06em',
                  color: '#facc15',
                  textShadow: '2px 2px 0px #b91c1c, 4px 4px 0px #7f1d1d, 0 8px 16px rgba(0,0,0,0.8)',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem'
                }}>
                  VENUE LAYOUT
                </div>

                {/* Stadium Diagram Box */}
                <div style={{
                  maxWidth: '380px',
                  margin: '0 auto 1.5rem auto',
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '6px',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.4)'
                }}>
                  {/* STAGE */}
                  <div style={{
                    background: '#9ca3af',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    fontFamily: 'Impact, sans-serif',
                    letterSpacing: '0.08em',
                    padding: '14px 10px',
                    border: '1.5px solid #000000',
                    marginBottom: '4px'
                  }}>
                    STAGE
                  </div>

                  {/* VIP & LOUNGES SECTION */}
                  <div style={{ position: 'relative' }}>
                    {/* VIP Center Box */}
                    <div style={{
                      background: '#b91c1c',
                      color: '#000000',
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      fontFamily: 'Impact, sans-serif',
                      letterSpacing: '0.08em',
                      padding: '28px 10px',
                      border: '1.5px solid #000000',
                      borderBottom: 'none'
                    }}>
                      VIP
                    </div>

                    {/* Left Flanking Box: KOTAK LOUNGE */}
                    <div style={{
                      position: 'absolute',
                      left: '0',
                      top: '50%',
                      transform: 'translateY(-20%)',
                      background: '#000000',
                      color: '#ffffff',
                      border: '1.5px solid #ffffff',
                      padding: '10px 6px',
                      width: '84px',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      fontFamily: 'Impact, sans-serif',
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                      zIndex: 3
                    }}>
                      KOTAK LOUNGE
                    </div>

                    {/* Right Flanking Box: PLATINUM LOUNGE */}
                    <div style={{
                      position: 'absolute',
                      right: '0',
                      top: '50%',
                      transform: 'translateY(-20%)',
                      background: '#000000',
                      color: '#ffffff',
                      border: '1.5px solid #ffffff',
                      padding: '10px 6px',
                      width: '84px',
                      fontSize: '0.72rem',
                      fontWeight: 900,
                      fontFamily: 'Impact, sans-serif',
                      letterSpacing: '0.04em',
                      lineHeight: 1.1,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                      zIndex: 3
                    }}>
                      PLATINUM LOUNGE
                    </div>
                  </div>

                  {/* GENERAL ADMISSION Large Yellow Box */}
                  <div style={{
                    background: '#facc15',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: '1.5rem',
                    fontFamily: 'Impact, sans-serif',
                    letterSpacing: '0.06em',
                    padding: '50px 10px',
                    border: '1.5px solid #000000',
                    lineHeight: 1.15
                  }}>
                    <div>GENERAL</div>
                    <div>ADMISSION</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.68rem', color: '#a1a1aa', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  *This layout is not drawn to scale & is subject to change without prior notice.*
                </div>

                {/* Section Perks & Pricing Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left', maxWidth: '460px', margin: '0 auto' }}>
                  
                  {/* General Admission Perks */}
                  <div style={{
                    background: 'rgba(250, 204, 21, 0.06)',
                    borderLeft: '4px solid #facc15',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}>
                    <div style={{
                      fontFamily: 'Impact, sans-serif',
                      fontSize: '1.2rem',
                      color: '#facc15',
                      letterSpacing: '0.04em',
                      marginBottom: '6px'
                    }}>
                      GENERAL ADMISSION <span style={{ fontSize: '0.85rem', color: '#fef08a', fontWeight: 600 }}>FROM ₹4,499</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.76rem', color: '#e4e4e7' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#facc15" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Each ticket grants entry to one person in the GA area</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#facc15" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Access to food stalls, bars and washrooms in the GA area</span>
                      </div>
                    </div>
                  </div>

                  {/* VIP Perks */}
                  <div style={{
                    background: 'rgba(185, 28, 28, 0.08)',
                    borderLeft: '4px solid #ef4444',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}>
                    <div style={{
                      fontFamily: 'Impact, sans-serif',
                      fontSize: '1.2rem',
                      color: '#ef4444',
                      letterSpacing: '0.04em',
                      marginBottom: '6px'
                    }}>
                      VIP <span style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 600 }}>FROM ₹10,999</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.76rem', color: '#e4e4e7' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Each ticket grants entry to one person in the VIP area</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Front of house viewing space</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Access to food stalls, bars and washrooms in the VIP area</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Dedicated entry lane to the concert</span>
                      </div>
                    </div>
                  </div>

                  {/* Kotak Lounge & Platinum Lounge Perks */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderLeft: '4px solid #ffffff',
                    borderRadius: '8px',
                    padding: '12px 14px'
                  }}>
                    <div style={{
                      fontFamily: 'Impact, sans-serif',
                      fontSize: '1.15rem',
                      color: '#ffffff',
                      letterSpacing: '0.04em',
                      marginBottom: '6px'
                    }}>
                      KOTAK LOUNGE & PLATINUM LOUNGE <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>FROM ₹28,999</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.76rem', color: '#e4e4e7' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Each ticket grants entry to one person in the Kotak Lounge/Platinum Lounge</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Elevated premium viewing deck in a prime location</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Inclusive of appetizers and alco-beverages in the Kotak Lounge/Platinum Lounge</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Dedicated washrooms</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Dedicated entry lane to the concert</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                        <Zap size={13} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>Dedicated free parking* with pick-up and drop-off service from the wooden gate (*Available on first arrival basis only)</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 2. FRED AGAIN.. VENUE LAYOUT */}
            {layout.type === 'fred-again' && (
              <div style={{ textAlign: 'center', color: '#090a0d', fontFamily: 'system-ui, sans-serif' }}>
                
                {/* Multilingual Script Banner */}
                <div style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  marginBottom: '1rem',
                  color: '#000000'
                }}>
                  again.. फिर से.. पुन्हा.. ಮತ್ತೆ..
                </div>

                {/* Tour Schedule Dates Table */}
                <div style={{
                  maxWidth: '440px',
                  margin: '0 auto 1.5rem auto',
                  background: '#f4f4f5',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e4e7', paddingBottom: '3px', fontWeight: 800 }}>
                    <span>05 Dec 2026</span>
                    <span>Leisure Valley Ground</span>
                    <span>Delhi NCR</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e4e7', paddingBottom: '3px' }}>
                    <span>08 Dec 2026</span>
                    <span>Mahalaxmi Race Course</span>
                    <span>Mumbai</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e4e7', paddingBottom: '3px' }}>
                    <span>09 Dec 2026</span>
                    <span>Mahalaxmi Race Course</span>
                    <span>Mumbai</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e4e4e7', paddingBottom: '3px' }}>
                    <span>12 Dec 2026</span>
                    <span>NICE Grounds</span>
                    <span>Bengaluru</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>13 Dec 2026</span>
                    <span>NICE Grounds</span>
                    <span>Bengaluru</span>
                  </div>
                </div>

                {/* High Contrast Diagram */}
                <div style={{ maxWidth: '340px', margin: '0 auto 1.25rem auto' }}>
                  {/* STAGE */}
                  <div style={{
                    background: '#000000',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    fontFamily: 'Impact, sans-serif',
                    letterSpacing: '0.06em',
                    padding: '8px 24px',
                    width: '130px',
                    margin: '0 auto 8px auto',
                    borderRadius: '2px'
                  }}>
                    STAGE
                  </div>

                  {/* GIANT GA SQUARE */}
                  <div style={{
                    background: '#000000',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '2.8rem',
                    fontFamily: 'Impact, sans-serif',
                    letterSpacing: '0.08em',
                    padding: '60px 10px',
                    borderRadius: '4px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
                  }}>
                    GA
                  </div>
                </div>

                {/* Tier Rules & Perks Cards */}
                <div style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Student GA */}
                  <div style={{ background: '#f4f4f5', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #000000' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#000000', fontFamily: 'Impact, sans-serif', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      STUDENT GA <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#52525b' }}>(₹1750)</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.74rem', color: '#27272a', lineHeight: 1.45 }}>
                      <li>Entry into the common GA area</li>
                      <li>A valid student ID card picture must be submitted</li>
                      <li>Dedicated entry lane</li>
                      <li>Students will be checked for ID at the gate</li>
                      <li>Ticket holders without a valid student ID shall be denied entry</li>
                      <li>Please read all student ticket guidelines on the ticketing page</li>
                    </ul>
                  </div>

                  {/* GA */}
                  <div style={{ background: '#f4f4f5', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #3f3f46' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#000000', fontFamily: 'Impact, sans-serif', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      GA <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#52525b' }}>(₹3500)</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.74rem', color: '#27272a', lineHeight: 1.45 }}>
                      <li>Entry into the common GA area</li>
                      <li>Access to food stalls, bars and washrooms</li>
                    </ul>
                  </div>

                  {/* GA+ */}
                  <div style={{ background: '#f4f4f5', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#000000', fontFamily: 'Impact, sans-serif', letterSpacing: '0.04em', marginBottom: '6px' }}>
                      GA+ <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#059669' }}>(₹6000)</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.74rem', color: '#27272a', lineHeight: 1.45 }}>
                      <li>Entry into the common GA area</li>
                      <li>Access to dedicated food stalls, bars & washrooms</li>
                      <li>Dedicated entry lane for smooth access</li>
                      <li>Early access into venue (Gate timings closer to show day)</li>
                    </ul>
                  </div>

                </div>

                <div style={{ fontSize: '0.68rem', color: '#71717a', fontStyle: 'italic', marginTop: '1rem' }}>
                  *This layout is not drawn to scale & is subject to change without prior notice.*
                </div>

              </div>
            )}

            {/* 3. KHALID VENUE LAYOUT */}
            {layout.type === 'khalid' && (
              <div style={{ textAlign: 'center', color: '#18181b', fontFamily: 'system-ui, sans-serif' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '2px' }}>
                  KHALID LIVE IN DELHI NCR
                </div>
                <div style={{ fontSize: '0.75rem', color: '#52525b', marginBottom: '1rem', fontWeight: 500 }}>
                  HUDA Gymkhana Club, Gurugram • 13 December 2026 | 06:00 PM Onwards
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e4e4e7',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontSize: '0.8rem',
                  color: '#a1a1aa',
                  maxWidth: '420px',
                  margin: '0 auto 1.5rem auto'
                }}>
                  Filter sections by price
                </div>

                {/* Stage Map Layout */}
                <div style={{ maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    background: '#3f3f46',
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: '0.95rem',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    width: '140px',
                    margin: '0 auto',
                    letterSpacing: '0.04em'
                  }}>
                    STAGE
                  </div>

                  <div 
                    style={{
                      background: '#fce7f3',
                      border: '2px solid #fda4af',
                      color: '#831843',
                      fontWeight: 900,
                      fontSize: '1rem',
                      padding: '18px 20px',
                      borderRadius: '12px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <div>FANPIT</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9f1239', marginTop: '2px' }}>₹6,999 (Closest access to Khalid)</div>
                  </div>

                  <div 
                    style={{
                      background: '#fef3c7',
                      border: '2px solid #fde047',
                      color: '#78350f',
                      fontWeight: 900,
                      fontSize: '1rem',
                      padding: '18px 20px',
                      borderRadius: '12px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <div>GA (+)</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#92400e', marginTop: '2px' }}>₹3,549 (Elevated mid-tier standing view)</div>
                  </div>

                  <div 
                    style={{
                      background: '#dcfce7',
                      border: '2px solid #86efac',
                      color: '#14532d',
                      fontWeight: 900,
                      fontSize: '1rem',
                      padding: '18px 20px',
                      borderRadius: '12px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <div>GA</div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#166534', marginTop: '2px' }}>₹2,549 (General admission pass)</div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#27272a',
                    marginTop: '0.5rem'
                  }}>
                    <Users size={14} />
                    <span>Standing Section/s</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. THE CHAINSMOKERS VENUE LAYOUT */}
            {layout.type === 'chainsmokers' && (
              <div style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.25rem', color: '#ffffff' }}>
                  <span>Sunburn Arena Ft. The Chainsmokers</span>
                </div>

                <div style={{ maxWidth: '400px', margin: '0 auto', background: '#090a0d', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{
                    background: '#f4f4f5',
                    color: '#090a0d',
                    fontWeight: 900,
                    fontSize: '0.85rem',
                    padding: '8px 24px',
                    width: '130px',
                    margin: '0 auto',
                    letterSpacing: '0.04em',
                    borderRadius: '4px 4px 0 0'
                  }}>
                    STAGE
                  </div>

                  <div style={{
                    background: '#ea580c',
                    position: 'relative',
                    padding: '16px 12px 28px 12px',
                    borderLeft: '2px solid rgba(255,255,255,0.2)',
                    borderRight: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <div style={{
                      background: '#eab308',
                      color: '#ffffff',
                      fontWeight: 900,
                      fontSize: '1rem',
                      padding: '12px 16px',
                      width: '160px',
                      margin: '0 auto 16px auto',
                      borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                    }}>
                      FANPIT
                    </div>

                    <div style={{
                      color: '#ffffff',
                      fontWeight: 900,
                      fontSize: '1.4rem',
                      letterSpacing: '0.06em'
                    }}>
                      VIP
                    </div>
                  </div>

                  <div style={{
                    background: '#ffedd5',
                    color: '#090a0d',
                    fontWeight: 900,
                    fontSize: '1.6rem',
                    padding: '38px 16px',
                    letterSpacing: '0.08em',
                    borderRadius: '0 0 6px 6px'
                  }}>
                    GA
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '18px', height: '18px', background: '#3f3f46', borderRadius: '3px' }} />
                      <div style={{ textAlign: 'left', fontSize: '0.72rem', fontWeight: 800 }}>
                        <div>EARLY BIRD GA</div>
                        <div style={{ color: '#a1a1aa' }}>₹1,500</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '18px', height: '18px', background: '#ea580c', borderRadius: '3px' }} />
                      <div style={{ textAlign: 'left', fontSize: '0.72rem', fontWeight: 800 }}>
                        <div>EARLY BIRD VIP</div>
                        <div style={{ color: '#ea580c' }}>₹2,500</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 5. ANYMA PRESENTS AEDEN VENUE LAYOUT */}
            {layout.type === 'anyma' && (
              <div style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '2px' }}>
                  ANYMA presents AEDEN - Mumbai
                </div>
                <div style={{ fontSize: '0.74rem', color: '#a1a1aa', marginBottom: '1.25rem' }}>
                  Mahalaxmi Racecourse, Mumbai • 21 November 2026
                </div>

                <div style={{ maxWidth: '440px', margin: '0 auto', background: '#000000', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '4px', marginBottom: '2px' }}>
                    <div style={{ border: '1px solid #ffffff', color: '#a1a1aa', fontSize: '0.58rem', padding: '4px 8px', textTransform: 'uppercase' }}>
                      BACKSTAGE
                    </div>
                    <div style={{ background: '#ffffff', color: '#000000', fontWeight: 900, fontSize: '0.82rem', padding: '6px 20px', textTransform: 'uppercase' }}>
                      STAGE
                    </div>
                    <div style={{ border: '1px solid #ffffff', color: '#a1a1aa', fontSize: '0.58rem', padding: '4px 8px', textTransform: 'uppercase' }}>
                      BACKSTAGE
                    </div>
                  </div>

                  <div style={{
                    border: '1.5px solid #ffffff',
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr 60px',
                    minHeight: '260px',
                    position: 'relative'
                  }}>
                    <div style={{
                      borderRight: '1.5px solid #ffffff',
                      borderBottom: '1.5px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '160px',
                      padding: '4px'
                    }}>
                      <span style={{
                        transform: 'rotate(-90deg)',
                        whiteSpace: 'nowrap',
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#ffffff'
                      }}>
                        VVIP EXPERIENCE
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{
                        borderBottom: '1.5px solid #ffffff',
                        height: '160px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em'
                      }}>
                        GA FRONT
                      </div>
                      <div style={{
                        flex: 1,
                        minHeight: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.95rem',
                        fontWeight: 800,
                        letterSpacing: '0.06em'
                      }}>
                        GA BACK
                      </div>
                    </div>

                    <div style={{ borderLeft: '1.5px solid #ffffff', display: 'flex', flexDirection: 'column' }}>
                      <div style={{
                        borderBottom: '1.5px solid #ffffff',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.62rem',
                        fontWeight: 800
                      }}>
                        LOUNGE
                      </div>
                      <div style={{
                        height: '120px',
                        borderBottom: '1.5px solid #ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                      }}>
                        <span style={{
                          transform: 'rotate(90deg)',
                          whiteSpace: 'nowrap',
                          fontSize: '0.64rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          color: '#ffffff'
                        }}>
                          VVIP EXPERIENCE
                        </span>
                      </div>
                    </div>

                  </div>

                  <div style={{
                    marginTop: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '0.75rem'
                  }}>
                    <div>
                      <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.52rem' }}>Co-Presented By</span>
                      <strong style={{ color: '#ffffff', fontSize: '0.72rem' }}>RuPay</strong>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.52rem' }}>Produced & Promoted By</span>
                      <strong style={{ color: '#ffffff', fontSize: '0.72rem' }}>Sunburn • Live Nation</strong>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* Action Controls for Promoters to Share with Customers */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '220px' }}>
            <button
              onClick={handleCopyLayoutDetails}
              className="btn btn-secondary"
              style={{
                flex: 1,
                fontSize: '0.78rem',
                gap: '6px',
                borderColor: copied ? '#10b981' : 'var(--border-color)',
                color: copied ? '#10b981' : '#ffffff'
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'Copied Details!' : 'Copy Venue Pitch'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="btn btn-secondary"
              style={{
                fontSize: '0.78rem',
                gap: '6px',
                borderColor: 'rgba(16, 185, 129, 0.4)',
                color: '#34d399'
              }}
            >
              <Share2 size={13} />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onSelectSaleCategory) onSelectSaleCategory(event.id);
            }}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', gap: '6px' }}
          >
            <Ticket size={13} />
            <span>Sell Pass for this Event</span>
          </button>
        </div>

      </div>
    </div>
  );
};
