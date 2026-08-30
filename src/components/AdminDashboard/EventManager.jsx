import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock
} from 'lucide-react';

export const EventManager = ({ onOpenCreateEvent, onEditEvent }) => {
  const { events, deleteEvent } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Concert Inventory & Pricing Matrix</h3>
          <p className="text-muted" style={{ fontSize: '0.82rem' }}>
            Configure published MRP, promoter quotas, commission margins, and promotional assets.
          </p>
        </div>

        <button
          onClick={onOpenCreateEvent}
          className="btn btn-primary"
          style={{ fontSize: '0.8rem', padding: '7px 16px', gap: '5px' }}
        >
          <Plus size={15} /> Add Concert
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {events.map((event) => (
          <div key={event.id} className="glass-card" style={{ padding: '1.25rem' }}>
            
            {/* Top row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: '1rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-color)' }}>
              
              <div className="flex items-center gap-3">
                <img
                  src={event.posterUrl}
                  alt={event.name}
                  style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', objectPosition: event.posterPosition || 'center top', border: '1px solid var(--border-color)' }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{event.name}</h4>
                    <span className="badge badge-emerald">
                      {event.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-muted" style={{ fontSize: '0.78rem', marginTop: '2px', flexWrap: 'wrap' }}>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                    <span className="flex items-center gap-1" style={{ color: '#34d399' }}>✓ Instant BMS Delivery</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEditEvent(event)}
                  className="btn btn-secondary"
                  style={{ padding: '5px 12px', fontSize: '0.78rem', gap: '5px' }}
                >
                  <Edit3 size={13} /> Edit Tiers
                </button>
                <button
                  onClick={() => deleteEvent(event.id)}
                  style={{
                    background: 'rgba(244, 63, 94, 0.08)',
                    border: '1px solid rgba(244, 63, 94, 0.2)',
                    color: '#fb7185',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.78rem'
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>

            </div>

            {/* Price List Table */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Published Ticket Tiers & Commission Margins
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '6px' }}>TIER CATEGORY</th>
                      <th style={{ padding: '6px' }}>FACE VALUE (MRP)</th>
                      <th style={{ padding: '6px' }}>PROMOTER PRICE</th>
                      <th style={{ padding: '6px' }}>PROMOTER CUT (₹)</th>
                      <th style={{ padding: '6px' }}>PROMOTER CUT (%)</th>
                      <th style={{ padding: '6px' }}>ISSUANCE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.priceList.map((tier) => (
                      <tr key={tier.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                        <td style={{ padding: '9px 6px', fontWeight: 600, color: '#ffffff' }}>
                          {tier.category}
                        </td>
                        <td style={{ padding: '9px 6px', color: 'var(--text-muted)' }}>
                          ₹{tier.faceValue.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '9px 6px', fontWeight: 600, color: '#f4f4f6' }}>
                          ₹{tier.promoterPrice.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '9px 6px', fontWeight: 600, color: '#10b981' }}>
                          +₹{tier.commissionAmount.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '9px 6px' }}>
                          <span className="badge" style={{ padding: '1px 6px', fontSize: '0.68rem' }}>
                            {tier.commissionPct}%
                          </span>
                        </td>
                        <td style={{ padding: '9px 6px' }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {tier.quotaSold || 0} / {tier.quotaTotal || 100} sold
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
