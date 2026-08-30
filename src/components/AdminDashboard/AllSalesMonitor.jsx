import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search } from 'lucide-react';

export const AllSalesMonitor = () => {
  const { sales } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = sales.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.ticketCode.toLowerCase().includes(term) ||
      s.eventName.toLowerCase().includes(term) ||
      s.promoterName.toLowerCase().includes(term) ||
      s.buyerName.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Global Transactions Feed</h3>
          <p className="text-muted" style={{ fontSize: '0.82rem' }}>
            Real-time audit stream of all digital ticket issuances and settlements across India.
          </p>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search code, promoter, event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '32px', fontSize: '0.82rem' }}
          />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '8px 6px' }}>TICKET CODE</th>
                <th style={{ padding: '8px 6px' }}>EVENT</th>
                <th style={{ padding: '8px 6px' }}>PROMOTER</th>
                <th style={{ padding: '8px 6px' }}>BUYER</th>
                <th style={{ padding: '8px 6px' }}>QTY & CAT</th>
                <th style={{ padding: '8px 6px' }}>AMOUNT</th>
                <th style={{ padding: '8px 6px' }}>COMMISSION</th>
                <th style={{ padding: '8px 6px' }}>SETTLEMENT</th>
                <th style={{ padding: '8px 6px', textAlign: 'right' }}>ISSUED AT</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '10px 6px', fontFamily: 'monospace', fontWeight: 600, color: '#f4f4f6' }}>
                    {s.ticketCode}
                  </td>
                  <td style={{ padding: '10px 6px', fontWeight: 600, color: '#ffffff' }}>
                    {s.eventName}
                  </td>
                  <td style={{ padding: '10px 6px', color: 'var(--text-muted)' }}>
                    {s.promoterName}
                  </td>
                  <td style={{ padding: '10px 6px' }}>
                    <div style={{ color: '#ffffff' }}>{s.buyerName}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.buyerPhone}</div>
                  </td>
                  <td style={{ padding: '10px 6px' }}>
                    <span style={{ fontWeight: 600 }}>{s.quantity}x</span> {s.ticketCategory}
                  </td>
                  <td style={{ padding: '10px 6px', fontWeight: 600, color: '#ffffff' }}>
                    ₹{s.totalAmount.toLocaleString('en-IN')}
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.paymentMethod}</div>
                  </td>
                  <td style={{ padding: '10px 6px', fontWeight: 600, color: '#10b981' }}>
                    +₹{s.commissionEarned.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '10px 6px' }}>
                    <span className="badge badge-emerald" style={{ padding: '2px 6px', fontSize: '0.68rem' }}>
                      {s.paymentStatus || 'Paid & Cleared'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 6px', textAlign: 'right', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {s.issuedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
