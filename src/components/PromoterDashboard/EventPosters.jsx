import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Download, 
  Calendar, 
  MapPin, 
  Ticket, 
  Copy, 
  Check, 
  Image as ImageIcon, 
  Clock,
  Map as MapIcon
} from 'lucide-react';
import { VenueLayoutModal } from '../VenueLayoutModal';

export const EventPosters = ({ onSelectEventForSale, onSelectEventForPriceList }) => {
  const { events, activePromoter, showToast } = useApp();
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedPosterModal, setSelectedPosterModal] = useState(null);
  const [selectedVenueLayoutModal, setSelectedVenueLayoutModal] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [copiedPriceId, setCopiedPriceId] = useState(null);

  const filteredEvents = events.filter((ev) => {
    if (selectedCityFilter === 'All') return true;
    return ev.city === selectedCityFilter;
  });

  const cities = ['All', 'Delhi NCR', 'Mumbai', 'Bengaluru'];

  const handleCopyPitch = (event) => {
    const minPrice = Math.min(...event.priceList.map((p) => p.promoterPrice));
    const pitch = `🎟️ Official Passes for ${event.name}!
📅 ${event.date} @ ${event.venue}
💰 Passes start at ₹${minPrice.toLocaleString('en-IN')}. UPI, Card & Bank Transfer accepted.
🔒 100% digital QR passes issued immediately to your BookMyShow / District account.
DM me now to grab your tickets before current phase rates increase!`;

    navigator.clipboard.writeText(pitch);
    setCopiedId(event.id);
    showToast(`Promo caption for "${event.name}" copied!`, 'success');
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleCopyPriceList = (event) => {
    const tiersText = event.priceList
      .map((p) => `• *${p.category}:* ₹${p.promoterPrice.toLocaleString('en-IN')}`)
      .join('\n');

    const message = `🎟️ *${event.name.toUpperCase()} — PRICE LIST*
📅 *Date:* ${event.date}
📍 *Venue:* ${event.venue}
━━━━━━━━━━━━━━━━━━━━
🏷️ *Ticket Categories:*
${tiersText}
━━━━━━━━━━━━━━━━━━━━
💰 *Payment:* UPI, Cards & Instant Bank Transfer
🔒 100% DigiLocker Verified & BookMyShow Delivery
📲 DM me to lock in your passes!`;

    navigator.clipboard.writeText(message);
    setCopiedPriceId(event.id);
    showToast(`Price list for "${event.name}" copied to clipboard!`, 'success');
    setTimeout(() => setCopiedPriceId(null), 3000);
  };

  const handleDownloadPoster = (event, format = 'Story') => {
    const link = document.createElement('a');
    link.href = event.posterUrl;
    link.target = '_blank';
    link.download = `Tixora-${event.name.replace(/[^a-zA-Z0-9]/g, '_')}-${format}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading promotional poster for ${event.name}`, 'info');
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      
      {/* Header & City Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            Concerts & Promo Posters
          </h2>
          <p className="text-muted" style={{ fontSize: '0.8rem' }}>
            Official promotional media and pricing to share with your peer network.
          </p>
        </div>

        {/* City Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '3px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '3px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
          maxWidth: '100%'
        }}>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCityFilter(city)}
              style={{
                background: selectedCityFilter === city ? '#ffffff' : 'transparent',
                color: selectedCityFilter === city ? '#090a0d' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredEvents.map((event, index) => {
          const isAssigned = activePromoter.assignedEvents.includes(event.id);
          const minPrice = Math.min(...event.priceList.map((p) => p.promoterPrice));
          const maxCommission = Math.max(...event.priceList.map((p) => p.commissionAmount));

          return (
            <div
              key={event.id}
              className={`glass-card card-interactive animate-slide-up stagger-${(index % 6) + 1}`}
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: isAssigned ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid var(--border-color)'
              }}
            >
              {/* Poster Image Showcase: Full-bleed Edge-to-Edge Artwork Highlight */}
              <div 
                className="poster-container"
                style={{ 
                  position: 'relative', 
                  height: '320px', 
                  width: '100%', 
                  overflow: 'hidden', 
                  background: '#090a0d'
                }}
              >
                {/* Full-bleed crisp artist face & artwork (no text) */}
                <img
                  src={event.artistImageUrl || event.posterUrl}
                  alt={`Official verified portrait for ${event.artist || event.name}`}
                  className="poster-img"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: event.posterPosition || 'center center',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'block'
                  }}
                  loading="lazy"
                />

                {/* Ambient subtle vignette gradient overlay */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to bottom, rgba(9,10,13,0.2) 0%, transparent 40%, rgba(9,10,13,0.85) 100%)',
                    pointerEvents: 'none',
                    zIndex: 2
                  }} 
                />

                {/* Badges on poster */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px', zIndex: 3, maxWidth: '80%' }}>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
                    {event.city}
                  </span>
                  {event.venueLayout && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVenueLayoutModal(event);
                      }}
                      className="badge badge-purple"
                      style={{
                        background: 'rgba(168, 85, 247, 0.3)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(192, 132, 252, 0.4)',
                        color: '#f3e8ff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px'
                      }}
                      title="View Official Venue & Seating Layout"
                    >
                      <MapIcon size={11} /> <span>Venue Map</span>
                    </button>
                  )}
                  {isAssigned && (
                    <span className="badge badge-emerald" style={{ background: 'rgba(16, 185, 129, 0.25)', backdropFilter: 'blur(6px)' }}>
                      <span className="pulse-dot" /> Assigned
                    </span>
                  )}
                </div>

                {/* Quick Poster Preview Button */}
                <button
                  onClick={() => setSelectedPosterModal(event)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 3
                  }}
                  title="View Posters"
                >
                  <ImageIcon size={15} />
                </button>
              </div>

              {/* Event Details Content */}
              <div style={{ padding: '1.15rem 1rem 1rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.25, marginBottom: '2px' }}>
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: '#e4e4e7' }}>
                    <Calendar size={12} color="var(--text-muted)" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.74rem', color: '#34d399' }}>
                    <Check size={12} />
                    <span>Instant Digital Pass Delivery</span>
                  </div>
                </div>

                {/* Price & Commission Highlights */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.85rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>From</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                      ₹{minPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Commission</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>
                      Up to ₹{maxCommission.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: 'auto' }}>
                  
                  {/* Share actions row */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: event.venueLayout ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)', 
                    gap: '4px' 
                  }}>
                    <button
                      onClick={() => handleDownloadPoster(event, 'Story')}
                      className="btn btn-secondary"
                      style={{ padding: '6px 4px', fontSize: '0.72rem', gap: '3px' }}
                      title="Download 9:16 Story Poster"
                    >
                      <Download size={11} /> Poster
                    </button>

                    {event.venueLayout && (
                      <button
                        onClick={() => setSelectedVenueLayoutModal(event)}
                        className="btn btn-secondary"
                        style={{
                          padding: '6px 4px',
                          fontSize: '0.72rem',
                          gap: '3px',
                          borderColor: 'rgba(168, 85, 247, 0.4)',
                          color: '#c084fc'
                        }}
                        title="View & Share Venue Seating Layout"
                      >
                        <MapIcon size={11} /> Layout
                      </button>
                    )}

                    <button
                      onClick={() => handleCopyPriceList(event)}
                      className="btn btn-secondary"
                      style={{
                        padding: '6px 4px',
                        fontSize: '0.72rem',
                        gap: '3px',
                        borderColor: copiedPriceId === event.id ? '#10b981' : 'var(--border-color)',
                        color: copiedPriceId === event.id ? '#10b981' : '#ffffff'
                      }}
                      title="Copy complete price list text for WhatsApp"
                    >
                      {copiedPriceId === event.id ? <Check size={11} /> : <Copy size={11} />}
                      {copiedPriceId === event.id ? 'Copied' : 'Price List'}
                    </button>

                    <button
                      onClick={() => handleCopyPitch(event)}
                      className="btn btn-secondary"
                      style={{
                        padding: '6px 4px',
                        fontSize: '0.72rem',
                        gap: '3px',
                        borderColor: copiedId === event.id ? '#10b981' : 'var(--border-color)',
                        color: copiedId === event.id ? '#10b981' : '#ffffff'
                      }}
                      title="Copy promo caption"
                    >
                      {copiedId === event.id ? <Check size={11} /> : <Copy size={11} />}
                      {copiedId === event.id ? 'Copied' : 'Caption'}
                    </button>
                  </div>

                  {/* Primary actions row */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectEventForPriceList(event.id)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '7px', fontSize: '0.76rem' }}
                    >
                      View Table
                    </button>

                    <button
                      onClick={() => onSelectEventForSale(event.id)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '7px', fontSize: '0.76rem', gap: '4px' }}
                    >
                      <Ticket size={12} /> Sell Ticket
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Poster Preview Modal */}
      {selectedPosterModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button
              onClick={() => setSelectedPosterModal(null)}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: '#ffffff',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.2rem' }}>
              Promotional Posters
            </h3>
            <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
              {selectedPosterModal.name} • {selectedPosterModal.date}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" style={{ marginBottom: '1rem' }}>
              <div>
                <div style={{ 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  height: '360px', 
                  marginBottom: '6px', 
                  border: '1px solid var(--border-color)',
                  background: '#090a0d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={selectedPosterModal.posterUrl}
                    alt={`High resolution 9:16 mobile story poster for ${selectedPosterModal.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <button
                  onClick={() => handleDownloadPoster(selectedPosterModal, 'Story')}
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.78rem', gap: '4px' }}
                >
                  <Download size={13} /> Download Story (9:16)
                </button>
              </div>

              <div>
                <div style={{ 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  height: '360px', 
                  marginBottom: '6px', 
                  border: '1px solid var(--border-color)',
                  background: '#090a0d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={selectedPosterModal.bannerUrl}
                    alt={`High resolution 16:9 feed promotional banner for ${selectedPosterModal.name}`}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <button
                  onClick={() => handleDownloadPoster(selectedPosterModal, 'Banner')}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.78rem', gap: '4px' }}
                >
                  <Download size={13} /> Download Banner (16:9)
                </button>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              <div>
                <strong>Tip:</strong> Share 9:16 on WhatsApp or Instagram Story!
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {selectedPosterModal.venueLayout && (
                  <button
                    onClick={() => {
                      const ev = selectedPosterModal;
                      setSelectedPosterModal(null);
                      setSelectedVenueLayoutModal(ev);
                    }}
                    className="btn btn-secondary"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      gap: '4px',
                      borderColor: 'rgba(168, 85, 247, 0.4)',
                      color: '#c084fc'
                    }}
                  >
                    <MapIcon size={11} /> View Venue Layout
                  </button>
                )}
                <button
                  onClick={() => handleCopyPriceList(selectedPosterModal)}
                  className="btn btn-secondary"
                  style={{ padding: '4px 8px', fontSize: '0.72rem', gap: '3px' }}
                >
                  <Copy size={11} /> Copy Price List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Venue & Seating Layout Modal */}
      <VenueLayoutModal
        event={selectedVenueLayoutModal}
        isOpen={!!selectedVenueLayoutModal}
        onClose={() => setSelectedVenueLayoutModal(null)}
        onSelectSaleCategory={onSelectEventForSale}
      />

    </div>
  );
};
