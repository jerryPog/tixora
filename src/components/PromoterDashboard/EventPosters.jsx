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
  ListOrdered
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Events & Downloadable Promotional Posters
          </h2>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Official promotional media and pricing to share with your peer network.
          </p>
        </div>

        {/* City Filter Pills */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255, 255, 255, 0.04)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCityFilter(city)}
              style={{
                background: selectedCityFilter === city ? '#ffffff' : 'transparent',
                color: selectedCityFilter === city ? '#090a0d' : 'var(--text-muted)',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden', background: '#0e1017' }}>
                <img
                  src={event.posterUrl}
                  alt={event.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                
                {/* Gradient scrim */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(9,10,13,0.95) 0%, rgba(9,10,13,0.2) 60%, rgba(0,0,0,0.6) 100%)'
                }} />

                {/* Badges on poster */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}>
                    {event.city}
                  </span>
                  {isAssigned && (
                    <span className="badge badge-emerald" style={{ background: 'rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(6px)' }}>
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
                <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {event.name}
                  </h3>
                </div>
              </div>

              {/* Event Details Content */}
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#e4e4e7' }}>
                    <Calendar size={13} color="var(--text-muted)" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.78rem', color: '#fbbf24' }}>
                    <Clock size={13} />
                    <span>Deposit Deadline: {event.depositDeadline}</span>
                  </div>
                </div>

                {/* Price & Commission Highlights */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '9px',
                  padding: '9px 12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Passes From</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                      ₹{minPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Commission</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981' }}>
                      Up to ₹{maxCommission.toLocaleString('en-IN')}/tkt
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: 'auto' }}>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadPoster(event, 'Story')}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '7px', fontSize: '0.78rem', gap: '5px' }}
                    >
                      <Download size={13} /> Poster (9:16)
                    </button>

                    <button
                      onClick={() => handleCopyPriceList(event)}
                      className="btn btn-secondary"
                      style={{
                        padding: '7px 10px',
                        fontSize: '0.78rem',
                        gap: '5px',
                        borderColor: copiedPriceId === event.id ? '#10b981' : 'var(--border-color)',
                        color: copiedPriceId === event.id ? '#10b981' : '#ffffff'
                      }}
                      title="Copy complete price list text for WhatsApp"
                    >
                      {copiedPriceId === event.id ? <Check size={13} /> : <Copy size={13} />}
                      {copiedPriceId === event.id ? 'Copied' : 'Price List'}
                    </button>

                    <button
                      onClick={() => handleCopyPitch(event)}
                      className="btn btn-secondary"
                      style={{
                        padding: '7px 10px',
                        fontSize: '0.78rem',
                        gap: '5px',
                        borderColor: copiedId === event.id ? '#10b981' : 'var(--border-color)',
                        color: copiedId === event.id ? '#10b981' : '#ffffff'
                      }}
                      title="Copy promo caption"
                    >
                      {copiedId === event.id ? <Check size={13} /> : <Copy size={13} />}
                      {copiedId === event.id ? 'Copied' : 'Caption'}
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectEventForPriceList(event.id)}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}
                    >
                      View Table
                    </button>

                    <button
                      onClick={() => onSelectEventForSale(event.id)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '7px', fontSize: '0.78rem', gap: '4px' }}
                    >
                      <Ticket size={13} /> Sell Ticket
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
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button
              onClick={() => setSelectedPosterModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
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

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Official Promotional Posters
            </h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {selectedPosterModal.name} • {selectedPosterModal.date}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: '1.25rem' }}>
              <div>
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '280px', marginBottom: '8px', border: '1px solid var(--border-color)' }}>
                  <img
                    src={selectedPosterModal.posterUrl}
                    alt="Story Poster"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <button
                  onClick={() => handleDownloadPoster(selectedPosterModal, 'Story')}
                  className="btn btn-primary"
                  style={{ width: '100%', fontSize: '0.8rem', gap: '5px' }}
                >
                  <Download size={14} /> Download Story (9:16)
                </button>
              </div>

              <div>
                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '280px', marginBottom: '8px', border: '1px solid var(--border-color)' }}>
                  <img
                    src={selectedPosterModal.bannerUrl}
                    alt="Feed Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <button
                  onClick={() => handleDownloadPoster(selectedPosterModal, 'Banner')}
                  className="btn btn-secondary"
                  style={{ width: '100%', fontSize: '0.8rem', gap: '5px' }}
                >
                  <Download size={14} /> Download Banner (16:9)
                </button>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.85rem',
              borderRadius: '9px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div>
                <strong>Tip:</strong> Share the 9:16 format directly on Instagram Story or WhatsApp Status!
              </div>
              <button
                onClick={() => handleCopyPriceList(selectedPosterModal)}
                className="btn btn-secondary"
                style={{ padding: '5px 10px', fontSize: '0.75rem', gap: '4px' }}
              >
                <Copy size={12} /> Copy Price List Text
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
