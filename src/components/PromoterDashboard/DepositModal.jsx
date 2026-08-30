import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Banknote, CheckCircle2, ShieldCheck } from 'lucide-react';

export const DepositModal = ({ isOpen, onClose }) => {
  const { activePromoter, submitCashDeposit, showToast } = useApp();
  const [depositAmount, setDepositAmount] = useState(activePromoter?.cashOwed || 5000);
  const [depositMode, setDepositMode] = useState('Campus Hub Drop');
  const [referenceNote, setReferenceNote] = useState('');

  if (!isOpen || !activePromoter) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (depositAmount <= 0) {
      showToast('Please enter a valid deposit amount', 'error');
      return;
    }

    submitCashDeposit(Number(depositAmount));
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
        maxWidth: '460px',
        width: '100%',
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

        <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Banknote size={20} color="#f59e0b" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Settle Cash to Tixora</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              10-Day Pre-Event Settlement Flow
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '9px',
            padding: '10px 14px',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            border: '1px solid var(--border-color)'
          }}>
            <span className="text-muted">Total Cash in Hand Owed:</span>
            <span style={{ fontWeight: 700, color: '#f59e0b', fontSize: '1rem' }}>
              ₹{activePromoter.cashOwed.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">Settlement Amount (₹)</label>
            <input
              type="number"
              min="1"
              max={activePromoter.cashOwed || 500000}
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Settlement Channel</label>
            <select
              className="form-select"
              value={depositMode}
              onChange={(e) => setDepositMode(e.target.value)}
            >
              <option value="Campus Hub Drop">Cash Drop at Campus Student Hub</option>
              <option value="Direct NEFT/IMPS">Direct Bank Transfer to Tixora Escrow</option>
              <option value="UPI Settlement">UPI Payment to Tixora Operations</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Receipt Reference (Optional)</label>
            <input
              type="text"
              placeholder="e.g. UTR-88129841 or Hub Slip #104"
              value={referenceNote}
              onChange={(e) => setReferenceNote(e.target.value)}
              className="form-input"
            />
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#a7f3d0',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0 }} />
            <span>Settling on time builds promoter credit and unlocks Gold/Platinum backstage guestlist access.</span>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '10px', gap: '6px' }}
          >
            <CheckCircle2 size={16} /> Confirm Cash Settlement
          </button>
        </form>
      </div>
    </div>
  );
};
