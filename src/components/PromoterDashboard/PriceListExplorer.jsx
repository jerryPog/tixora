import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calculator, 
  HelpCircle, 
  ArrowRight,
  Ticket,
  Copy,
  Check
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
  const netPayableUpfront = totalBuyerCost - totalCommission;

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
    showToast(`Price list for "${activeEvent.name}" copied to clipboard!`, 'success');
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            Official Price Lists & Rates
          </h2>
          <p className="text-muted" style={{ fontSize: '0.8rem' }}>
            Exact MRP published by organizers, promoter pricing, and guaranteed commission breakdown.
          </p>
        </div>

        <button
          onClick={handleCopyPriceList}
          className="btn btn-secondary"
          style={{
            padding: '6px 12px',
            fontSize: '0.78rem',
            gap: '5px',
            borderColor: isCopied ? '#10b981' : 'var(--border-color)',
            color: isCopied ? '#10b981' : '#ffffff',
            width: '100%',
            maxWidth: '240px'
          }}
        >
          {isCopied ? <Check size={13} /> : <Copy size={13} />}
          {isCopied ? 'Price List Copied!' : 'Copy Formatted Price List'}
        </button>
      </div>

      {/* Event Selector Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.35rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '0.4rem',
        marginBottom: '1.25rem'
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
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease'
            }}
          >
            <Ticket size={13} />
            <span>{event.name}</span>
          </button>
        ))}
      </div>

      {/* Active Event Price List Table + Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Price Table */}
        <div className="glass-card" style={{ gridColumn: 'span 2 / span 2', padding: '1rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '0.85rem', flexWrap: 'wrap', gap: '6px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{activeEvent.name}</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {activeEvent.venue} • {activeEvent.date}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="badge badge-emerald">
                Official MRP
              </span>
              <button
                onClick={handleCopyPriceList}
                className="btn btn-secondary"
                style={{
                  padding: '3px 8px',
                  fontSize: '0.7rem',
                  gap: '3px',
                  borderColor: isCopied ? '#10b981' : 'var(--border-color)',
                  color: isCopied ? '#10b981' : '#ffffff'
                }}
                title="Copy complete price list text for WhatsApp"
              >
                {isCopied ? <Check size={11} /> : <Copy size={11} />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table style={{ width: '100%', minWidth: '480px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '6px 4px' }}>TICKET CATEGORY</th>
                  <th style={{ padding: '6px 4px' }}>MRP</th>
                  <th style={{ padding: '6px 4px' }}>PROMOTER PRICE</th>
                  <th style={{ padding: '6px 4px' }}>COMMISSION (₹)</th>
                  <th style={{ padding: '6px 4px' }}>COMM (%)</th>
                  <th style={{ padding: '6px 4px', textAlign: 'right' }}>ACTION</th>
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
                    <td style={{ padding: '10px 4px', fontWeight: 600, color: '#ffffff' }}>
                      {item.category}
                    </td>
                    <td style={{ padding: '10px 4px', color: 'var(--text-muted)' }}>
                      ₹{item.faceValue.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 4px', fontWeight: 600, color: '#e4e4e7' }}>
                      ₹{item.promoterPrice.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 4px', fontWeight: 700, color: '#10b981' }}>
                      +₹{item.commissionAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 4px' }}>
                      <span className="badge" style={{ padding: '1px 5px', fontSize: '0.66rem' }}>
                        {item.commissionPct}%
                      </span>
                    </td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>
                      <button
                        onClick={() => onSelectEventForSale(activeEvent.id, item.category)}
                        className="btn btn-primary"
                        style={{ padding: '3px 8px', fontSize: '0.7rem', borderRadius: '5px' }}
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
            marginTop: '0.85rem',
            padding: '8px 10px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <HelpCircle size={13} color="#a1a1aa" style={{ flexShrink: 0 }} />
            <span>
              Prices reflect official releases. Accept payments via Cash or UPI, deduct your commission cut, and settle balance to Tixora.
            </span>
          </div>
        </div>

        {/* Interactive Earnings Calculator */}
        <div className="glass-card flex flex-col justify-between" style={{ padding: '1rem' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '7px',
                background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Calculator size={15} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Commission Calculator</h3>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Simulate earnings per sale</div>
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
            <div className="form-group" style={{ marginTop: '0.75rem' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '3px' }}>
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
              <div className="flex justify-between" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                <span>1 pass</span>
                <span>25 passes</span>
                <span>50 passes</span>
              </div>
            </div>

            {/* Calculation Output Box */}
            <div style={{
              marginTop: '1rem',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '9px',
              padding: '10px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div className="flex justify-between items-center" style={{ fontSize: '0.78rem' }}>
                <span className="text-muted">Total Face Value:</span>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>₹{totalBuyerCost.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between items-center" style={{ fontSize: '0.78rem' }}>
                <span className="text-muted">Net Upfront Payment:</span>
                <span style={{ fontWeight: 600, color: '#93c5fd' }}>₹{netPayableUpfront.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ height: '1px', background: 'var(--border-color)' }} />

              <div className="flex justify-between items-center">
                <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.8rem' }}>
                  Your Promoter Profit:
                </span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981' }}>
                  ₹{totalCommission.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectEventForSale(activeEvent.id, calcCategory)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem', gap: '5px' }}
          >
            Issue {calcQty} Passes <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
};
