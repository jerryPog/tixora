import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarPlus, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const CreateEventModal = ({ isOpen, onClose, editingEvent }) => {
  const { addEvent, updateEvent, showToast } = useApp();

  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('Delhi NCR');
  const [depositDeadline, setDepositDeadline] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [description, setDescription] = useState('');
  const [priceList, setPriceList] = useState([
    { id: 'pl-1', category: 'General Access (GA)', faceValue: 2500, promoterPrice: 2500, commissionPct: 8, commissionAmount: 200, quotaTotal: 100, quotaSold: 0 },
    { id: 'pl-2', category: 'VIP Pass', faceValue: 5000, promoterPrice: 5000, commissionPct: 9, commissionAmount: 450, quotaTotal: 50, quotaSold: 0 }
  ]);

  useEffect(() => {
    if (editingEvent) {
      setName(editingEvent.name);
      setArtist(editingEvent.artist || '');
      setDate(editingEvent.date);
      setVenue(editingEvent.venue);
      setCity(editingEvent.city || 'Delhi NCR');
      setDepositDeadline(editingEvent.depositDeadline);
      setPosterUrl(editingEvent.posterUrl);
      setBannerUrl(editingEvent.bannerUrl || editingEvent.posterUrl);
      setDescription(editingEvent.description || '');
      setPriceList(editingEvent.priceList || []);
    } else {
      setName('');
      setArtist('');
      setDate('10 Jan 2027, 5:00 PM');
      setVenue('JLN Stadium, Delhi');
      setCity('Delhi NCR');
      setDepositDeadline('31 Dec 2026');
      setPosterUrl('/posters/guns-n-roses-india-poster.jpg');
      setBannerUrl('/posters/guns-n-roses-banner.webp');
      setDescription('Concert tour in India.');
      setPriceList([
        { id: 'pl-1', category: 'Phase 1 GA', faceValue: 2000, promoterPrice: 2000, commissionPct: 8, commissionAmount: 160, quotaTotal: 100, quotaSold: 0 },
        { id: 'pl-2', category: 'Phase 1 VIP', faceValue: 4500, promoterPrice: 4500, commissionPct: 9, commissionAmount: 405, quotaTotal: 50, quotaSold: 0 }
      ]);
    }
  }, [editingEvent, isOpen]);

  if (!isOpen) return null;

  const handleAddTier = () => {
    setPriceList([
      ...priceList,
      {
        id: `pl-${Date.now()}`,
        category: 'New Ticket Tier',
        faceValue: 3000,
        promoterPrice: 3000,
        commissionPct: 8,
        commissionAmount: 240,
        quotaTotal: 50,
        quotaSold: 0
      }
    ]);
  };

  const handleTierChange = (index, field, value) => {
    const updated = [...priceList];
    const item = { ...updated[index], [field]: value };

    if (field === 'promoterPrice' || field === 'commissionPct') {
      const price = field === 'promoterPrice' ? Number(value) : item.promoterPrice;
      const pct = field === 'commissionPct' ? Number(value) : item.commissionPct;
      item.commissionAmount = Math.round((price * pct) / 100);
    }

    updated[index] = item;
    setPriceList(updated);
  };

  const handleRemoveTier = (index) => {
    setPriceList(priceList.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !date.trim() || !venue.trim()) {
      showToast('Please fill all required event details', 'error');
      return;
    }

    if (priceList.length === 0) {
      showToast('Add at least one ticket tier', 'error');
      return;
    }

    const eventPayload = {
      id: editingEvent ? editingEvent.id : `evt-${Date.now()}`,
      name,
      artist,
      date,
      venue,
      city,
      status: 'active',
      depositDeadline,
      posterUrl: posterUrl || '/posters/guns-n-roses-india-poster.jpg',
      bannerUrl: bannerUrl || posterUrl,
      description,
      priceList
    };

    if (editingEvent) {
      updateEvent(eventPayload);
    } else {
      addEvent(eventPayload);
    }

    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '620px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
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

        <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
          <CalendarPlus size={20} color="#ffffff" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            {editingEvent ? 'Edit Concert Event' : 'Add New Concert Event'}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input
                type="text"
                placeholder="e.g. Martin Garrix — Mumbai"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Headliner Artist</label>
              <input
                type="text"
                placeholder="e.g. Martin Garrix"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="form-group">
              <label className="form-label">Date & Time</label>
              <input
                type="text"
                placeholder="e.g. 15 Jan 2027, 4:00 PM"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <select
                className="form-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Pune">Pune</option>
                <option value="Goa">Goa</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Deposit Due Date</label>
              <input
                type="text"
                placeholder="e.g. 05 Jan 2027"
                value={depositDeadline}
                onChange={(e) => setDepositDeadline(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Concert Venue</label>
            <input
              type="text"
              placeholder="e.g. Mahalaxmi Racecourse, Mumbai"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="form-group">
              <label className="form-label">Poster Image (Path / URL)</label>
              <input
                type="text"
                placeholder="/posters/..."
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Image (Path / URL)</label>
              <input
                type="text"
                placeholder="/posters/..."
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Dynamic Price List Tiers */}
          <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '0.6rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>
                Ticket Pricing Tiers & Commission Margins
              </label>
              <button
                type="button"
                onClick={handleAddTier}
                className="btn btn-secondary"
                style={{ padding: '3px 10px', fontSize: '0.75rem', gap: '3px' }}
              >
                <Plus size={13} /> Add Tier
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {priceList.map((tier, idx) => (
                <div
                  key={tier.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                    gap: '6px',
                    alignItems: 'center'
                  }}
                >
                  <input
                    type="text"
                    placeholder="Category"
                    value={tier.category}
                    onChange={(e) => handleTierChange(idx, 'category', e.target.value)}
                    className="form-input"
                    style={{ padding: '5px 8px' }}
                  />
                  <input
                    type="number"
                    placeholder="MRP"
                    value={tier.promoterPrice}
                    onChange={(e) => handleTierChange(idx, 'promoterPrice', e.target.value)}
                    className="form-input"
                    style={{ padding: '5px 8px' }}
                  />
                  <input
                    type="number"
                    placeholder="Comm %"
                    value={tier.commissionPct}
                    onChange={(e) => handleTierChange(idx, 'commissionPct', e.target.value)}
                    className="form-input"
                    style={{ padding: '5px 8px' }}
                  />
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#10b981', textAlign: 'center' }}>
                    +₹{tier.commissionAmount}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTier(idx)}
                    style={{ background: 'transparent', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '11px', gap: '6px' }}
          >
            <CheckCircle2 size={16} /> {editingEvent ? 'Save Updates' : 'Publish Concert Event'}
          </button>
        </form>
      </div>
    </div>
  );
};
