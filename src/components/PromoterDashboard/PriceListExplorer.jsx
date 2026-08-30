import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  HelpCircle, 
  ArrowRight,
  Ticket,
  Copy,
  Check,
  Share2
} from 'lucide-react';

export const PriceListExplorer = ({ selectedEventId, onSelectEventForSale }) => {
  const { events, showToast } = useApp();
  const [activeEventId, setActiveEventId] = useState(selectedEventId || events[0]?.id);
  const [isCopied, setIsCopied] = useState(false);

  const activeEvent = events.find((e) => e.id === activeEventId) || events[0];
  const [calcCategory, setCalcCategory] = useState(activeEvent?.priceList[0]?.category || '');
  const [calcQty, setCalcQty] = useState(5);

  const handleEventChange = (eId) => {
    setActiveEventId(eId);
    const ev = events.find((e) => e.id === eId);
    if (ev && ev.priceList.length > 0) {
      setCalcCategory(ev.priceList[0].category);
    }
  };

  const selectedPriceItem = activeEvent?.priceList.find((p) => p.category === calcCategory) || activeEvent?.priceList[0];
  const totalBuyerCost = (selectedPriceItem?.promoterPrice || 0) * calcQty;
  const totalCommission = Math.round((selectedPriceItem?.commissionAmount || 0) * calcQty);
  const cashToDeposit = totalBuyerCost - totalCommission;

  const handleCopyPriceList = () => {
    if (!activeEvent) return;

    const tiersText = activeEvent.priceList
      .map((p) => `• *${p.category}:* ₹${p.promoterPrice.toLocaleString('en-IN')}`)
      .join('\n');

    const formattedMessage = `🎟️ *OFFICIAL TICKET PRICE LIST*
🎪 *Event:* ${activeEvent.name}
📅 *Date:* ${activeEvent.date}
📍 *Venue:* ${activeEvent.venue}
━━━━━━━━━━━━━━━━━━━━
🏷️ *Ticket Categories & Rates:*
${tiersText}
━━━━━━━━━━━━━━━━━━━━
💰 *Payment Modes:* Cash & UPI accepted directly by promoter
🔒 *100% Digital Pass:* DigiLocker verified QR code issued immediately
📲 *DM me now to book your tickets before current phase sells out!*`;

    navigator.clipboard.writeText(formattedMessage);
    setIsCopied(true);
    showToast(`Price list for "${activeEvent.name}" copied to clipboard for WhatsApp!`, 'success');
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            Official Price Lists & Commission Rates
          </h2>
          <p className="text-muted" style={{ fontSize: '0.85rem' }}>
            Exact MRP published by organizers, promoter pricing, and guaranteed commission breakdown.
          </p>
        </div>

        <button
          onClick={handleCopyPriceList}
          className="btn btn-secondary"
          style={{
            padding: '7px 14px',
            fontSize: '0.82rem',
            gap: '6px',
            borderColor: isCopied ? '#10b981' : 'var(--border-color)',
            color: isCopied ? '#10b981' : '#ffffff'
          }}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          {isCopied ? 'Price List Copied!' : 'Copy Formatted Price List'}
        </button>
      </div>

      {/* Event Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => handleEventChange(event.id)}
            style={{
              background: activeEventId === event.id ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
              color: activeEventId === event.id ? '#090a0d' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: activeEventId === event.id ? '#ffffff' : 'var(--border-color)',
              borderRadius: '9px',
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <Ticket size={14} />
            <span>{event.name}</span>
          </button>
        ))}
      </div>

      {/* Active Event Price List Table + Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Price Table */}
        <div className="glass-card" style={{ gridColumn: 'span 2 / span 2', padding: '1.25rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{activeEvent.name}</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {activeEvent.venue} • {activeEvent.date}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="badge badge-emerald">
                Published MRP Verified
              </span>
              <button
                onClick={handleCopyPriceList}
                className="btn btn-secondary"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  gap: '4px',
                  borderColor: isCopied ? '#10b981' : 'var(--border-color)',
                  color: isCopied ? '#10b981' : '#ffffff'
                }}
                title="Copy complete price list text for WhatsApp"
              >
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                {isCopied ? 'Copied' : 'Copy Price List'}
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '8px 6px' }}>TICKET CATEGORY</th>
                  <th style={{ padding: '8px 6px' }}>FACE VALUE (MRP)</th>
                  <th style={{ padding: '8px 6px' }}>PROMOTER PRICE</th>
                  <th style={{ padding: '8px 6px' }}>COMMISSION (₹)</th>
                  <th style={{ padding: '8px 6px' }}>COMMISSION (%)</th>
                  <th style={{ padding: '8px 6px', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {activeEvent.priceList.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{ padding: '12px 6px', fontWeight: 600, color: '#ffffff' }}>
                      {item.category}
                    </td>
                    <td style={{ padding: '12px 6px', color: 'var(--text-muted)' }}>
                      ₹{item.faceValue.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 6px', fontWeight: 600, color: '#e4e4e7' }}>
                      ₹{item.promoterPrice.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 6px', fontWeight: 700, color: '#10b981' }}>
                      +₹{item.commissionAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '12px 6px' }}>
                      <span className="badge" style={{ padding: '2px 6px', fontSize: '0.7rem' }}>
                        {item.commissionPct}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 6px', textAlign: 'right' }}>
                      <button
                        onClick={() => onSelectEventForSale(activeEvent.id, item.category)}
                        className="btn btn-primary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem', borderRadius: '6px' }}
                      >
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '1rem',
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <HelpCircle size={14} color="#a1a1aa" />
            <span>
              Prices reflect official festival releases. Accept payments from friends via Cash or UPI, deduct your commission cut, and settle balance to Tixora.
            </span>
          </div>
        </div>

        {/* Interactive Earnings Calculator */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1.25rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Calculator size={16} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Commission Calculator</h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Simulate earnings per sale</div>
              </div>
            </div>

            {/* Select Category */}
            <div className="form-group">
              <label className="form-label">Ticket Category</label>
              <select
                className="form-select"
                value={calcCategory}
                onChange={(e) => setCalcCategory(e.target.value)}
              >
                {activeEvent.priceList.map((p) => (
                  <option key={p.id} value={p.category}>
                    {p.category} — ₹{p.promoterPrice.toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Slider */}
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '4px' }}>
                <label className="form-label">Quantity: <strong>{calcQty} passes</strong></label>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={calcQty}
                onChange={(e) => setCalcQty(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#ffffff', cursor: 'pointer' }}
              />
              <div className="flex justify-between" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>1 pass</span>
                <span>25 passes</span>
                <span>50 passes</span>
              </div>
            </div>

            {/* Calculation Output Box */}
            <div style={{
              marginTop: '1.25rem',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '10px',
              padding: '12px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div className="flex justify-between items-center" style={{ fontSize: '0.8rem' }}>
                <span className="text-muted">Total Cash to Collect:</span>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>₹{totalBuyerCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center" style={{ fontSize: '0.8rem' }}>
                <span className="text-muted">Settle to Tixora:</span>
                <span style={{ fontWeight: 600, color: '#f59e0b' }}>₹{cashToDeposit.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ height: '1px', background: 'var(--border-color)' }} />

              <div className="flex justify-between items-center">
                <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.85rem' }}>
                  Your Net Cut:
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                  ₹{totalCommission.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectEventForSale(activeEvent.id, calcCategory)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1.25rem', gap: '6px' }}
          >
            Issue {calcQty} Passes <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
