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
  Clock
} from 'lucide-react';

export const EventPosters = ({ onSelectEventForSale, onSelectEventForPriceList }) => {
  const { events, activePromoter, showToast } = useApp();
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedPosterModal, setSelectedPosterModal] = useState(null);
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
💰 Passes start at ₹${minPrice.toLocaleString('en-IN')}. Cash & UPI accepted directly by me.
🔒 100% digital QR passes issued to your phone with DigiLocker verification.
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
💰 *Payment:* Cash & UPI accepted
🔒 100% DigiLocker Verified Digital Pass
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
        {filteredEvents.map((event) => {
          const isAssigned = activePromoter.assignedEvents.includes(event.id);
          const minPrice = Math.min(...event.priceList.map((p) => p.promoterPrice));
          const maxCommission = Math.max(...event.priceList.map((p) => p.commissionAmount));

          return (
            <div
              key={event.id}
              className="glass-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: isAssigned ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid var(--border-color)'
              }}
            >
              {/* Poster Image with overlays */}
              <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', background: '#0e1017' }}>
                <img
                  src={event.posterUrl}
                  alt={event.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Gradient scrim */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9,10,13,0.95) 0%, rgba(9,10,13,0.2) 60%, rgba(0,0,0,0.6) 100%)'
                }} />

                {/* Badges on poster */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
                    {event.city}
                  </span>
                  {isAssigned && (
                    <span className="badge badge-emerald" style={{ background: 'rgba(16, 185, 129, 0.25)', backdropFilter: 'blur(6px)' }}>
                      Assigned
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
                    cursor: 'pointer'
                  }}
                  title="View Posters"
                >
                  <ImageIcon size={15} />
                </button>

                {/* Event Name on Poster bottom */}
                <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {event.name}
                  </h3>
                </div>
              </div>

              {/* Event Details Content */}
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem' }}>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: '#e4e4e7' }}>
                    <Calendar size={12} color="var(--text-muted)" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <MapPin size={12} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.74rem', color: '#fbbf24' }}>
                    <Clock size={12} />
                    <span>Deposit: {event.depositDeadline}</span>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                    <button
                      onClick={() => handleDownloadPoster(event, 'Story')}
                      className="btn btn-secondary"
                      style={{ padding: '6px 4px', fontSize: '0.72rem', gap: '3px' }}
                      title="Download 9:16 Story Poster"
                    >
                      <Download size={11} /> Poster
                    </button>

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
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '260px', marginBottom: '6px', border: '1px solid var(--border-color)' }}>
                  <img
                    src={selectedPosterModal.posterUrl}
                    alt="Story Poster"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '260px', marginBottom: '6px', border: '1px solid var(--border-color)' }}>
                  <img
                    src={selectedPosterModal.bannerUrl}
                    alt="Feed Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
      )}

    </div>
  );
};
