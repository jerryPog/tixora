import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Edit2
} from 'lucide-react';

export const PromoterManager = () => {
  const { promoters, updatePromoter, togglePromoterSuspension, showToast } = useApp();
  const [selectedPromoter, setSelectedPromoter] = useState(null);
  const [newCreditLimit, setNewCreditLimit] = useState(50);
  const [showCreditModal, setShowCreditModal] = useState(false);

  const handleEditCredit = (promoter) => {
    setSelectedPromoter(promoter);
    setNewCreditLimit(promoter.creditLimit);
    setShowCreditModal(true);
  };

  const handleSaveCreditLimit = () => {
    if (!selectedPromoter) return;
    updatePromoter({
      ...selectedPromoter,
      creditLimit: Number(newCreditLimit)
    });
    setShowCreditModal(false);
    showToast(`Credit limit updated to ${newCreditLimit} tickets for ${selectedPromoter.name}`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Promoter Directory & Credit Control</h3>
        <p className="text-muted" style={{ fontSize: '0.82rem' }}>
          Monitor verified campus student promoters, manage credit lines, track cash in field, and flag missed settlements.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '8px 6px' }}>PROMOTER</th>
                <th style={{ padding: '8px 6px' }}>COLLEGE & CITY</th>
                <th style={{ padding: '8px 6px' }}>TIER</th>
                <th style={{ padding: '8px 6px' }}>TICKETS SOLD</th>
                <th style={{ padding: '8px 6px' }}>CREDIT LINE</th>
                <th style={{ padding: '8px 6px' }}>CASH IN HAND</th>
                <th style={{ padding: '8px 6px' }}>STATUS</th>
                <th style={{ padding: '8px 6px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map((p) => {
                const isSuspended = p.depositStatus === 'Suspended';
                const isOverdue = p.depositStatus === 'Overdue';

                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      background: isSuspended ? 'rgba(244, 63, 94, 0.05)' : 'transparent'
                    }}
                  >
                    {/* Promoter info */}
                    <td style={{ padding: '12px 6px' }}>
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {p.name}
                            {p.digiLockerVerified && (
                              <ShieldCheck size={13} color="#10b981" title="DigiLocker Verified" />
                            )}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* College */}
                    <td style={{ padding: '12px 6px' }}>
                      <div style={{ color: '#e4e4e7', fontWeight: 500 }}>{p.college}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.city}</div>
                    </td>

                    {/* Tier */}
                    <td style={{ padding: '12px 6px' }}>
                      <span className="badge" style={{ padding: '2px 7px', fontSize: '0.7rem' }}>
                        {p.tier}
                      </span>
                    </td>

                    {/* Tickets sold & earnings */}
                    <td style={{ padding: '12px 6px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{p.ticketsSold} passes</div>
                      <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                        +₹{p.totalCommissionEarned.toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Credit Line */}
                    <td style={{ padding: '12px 6px' }}>
                      <div className="flex items-center gap-2">
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>
                          {p.creditUsed} / {p.creditLimit}
                        </span>
                        <button
                          onClick={() => handleEditCredit(p)}
                          title="Adjust Limit"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                        >
                          <Edit2 size={12} />
                        </button>
                      </div>
                      <div style={{ width: '70px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min(100, (p.creditUsed / p.creditLimit) * 100)}%`, height: '100%', background: '#ffffff' }} />
                      </div>
                    </td>

                    {/* Cash in Hand Owed */}
                    <td style={{ padding: '12px 6px' }}>
                      <div style={{ fontWeight: 700, color: p.cashOwed > 0 ? '#f59e0b' : '#ffffff' }}>
                        ₹{p.cashOwed.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        ₹{p.cashDeposited.toLocaleString('en-IN')} settled
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '12px 6px' }}>
                      <span className={isSuspended || isOverdue ? 'badge badge-rose' : p.depositStatus === 'Due Soon' ? 'badge badge-amber' : 'badge badge-emerald'}>
                        {p.depositStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px 6px', textAlign: 'right' }}>
                      <button
                        onClick={() => togglePromoterSuspension(p.id)}
                        className="btn btn-secondary"
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.72rem',
                          color: isSuspended ? '#34d399' : '#fb7185'
                        }}
                      >
                        {isSuspended ? 'Unsuspend' : 'Suspend'}
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Limit Modal */}
      {showCreditModal && selectedPromoter && (
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
          <div className="glass-card" style={{ maxWidth: '400px', width: '100%', position: 'relative' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Adjust Credit Limit
            </h3>
            <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: '1rem' }}>
              Set max simultaneous ticket credit for {selectedPromoter.name}.
            </p>

            <div className="form-group">
              <label className="form-label">Ticket Credit Quota</label>
              <input
                type="number"
                min="10"
                max="500"
                step="5"
                value={newCreditLimit}
                onChange={(e) => setNewCreditLimit(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="flex gap-3" style={{ marginTop: '1.25rem' }}>
              <button
                onClick={() => setShowCreditModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCreditLimit}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Save Limit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
