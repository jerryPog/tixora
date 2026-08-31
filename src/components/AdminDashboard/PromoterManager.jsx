import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Building2,
  Phone,
  UserX,
  UserCheck
} from 'lucide-react';

export const PromoterManager = () => {
  const { promoters, togglePromoterSuspension, showToast } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Promoter Network Directory</h3>
        <p className="text-muted" style={{ fontSize: '0.82rem' }}>
          Verified campus ambassadors issuing official concert passes with 100% upfront settlement.
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
                <th style={{ padding: '8px 6px' }}>PASSES SOLD</th>
                <th style={{ padding: '8px 6px' }}>SALES VOLUME (GMV)</th>
                <th style={{ padding: '8px 6px' }}>COMMISSION EARNED</th>
                <th style={{ padding: '8px 6px' }}>STATUS</th>
                <th style={{ padding: '8px 6px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {promoters.map((p) => {
                const isActive = p.status !== 'Inactive';

                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      background: !isActive ? 'rgba(244, 63, 94, 0.05)' : 'transparent'
                    }}
                  >
                    {/* Promoter info */}
                    <td style={{ padding: '12px 6px' }}>
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={`Profile photo of verified promoter ${p.name}`}
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

                    {/* Tickets sold */}
                    <td style={{ padding: '12px 6px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>{p.ticketsSold} passes</div>
                    </td>

                    {/* Total Revenue Generated */}
                    <td style={{ padding: '12px 6px' }}>
                      <div style={{ fontWeight: 700, color: '#ffffff' }}>
                        ₹{(p.totalRevenueGenerated || 0).toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Commission Earned */}
                    <td style={{ padding: '12px 6px' }}>
                      <div style={{ fontWeight: 700, color: '#10b981' }}>
                        +₹{p.totalCommissionEarned.toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '12px 6px' }}>
                      <span className={isActive ? 'badge badge-emerald' : 'badge badge-rose'}>
                        {isActive ? 'Active' : 'Inactive'}
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
                          color: !isActive ? '#34d399' : '#fb7185'
                        }}
                      >
                        {!isActive ? 'Activate' : 'Deactivate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
