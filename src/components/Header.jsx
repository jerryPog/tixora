import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ticket, 
  ShieldCheck, 
  UserCheck, 
  SlidersHorizontal, 
  RotateCcw, 
  Plus, 
  ChevronDown,
  Scale
} from 'lucide-react';

export const Header = ({ onOpenRecordSale, onOpenCreateEvent, onOpenLegalCompliance }) => {
  const { 
    currentRole, 
    setCurrentRole, 
    promoters, 
    activePromoterId, 
    setActivePromoterId, 
    activePromoter,
    resetAllData,
    showToast
  } = useApp();

  const [showPromoterMenu, setShowPromoterMenu] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 10, 13, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.75rem 0'
    }}>
      <div className="container flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand & Portal Status */}
        <div className="flex items-center gap-3">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            background: '#ffffff',
            color: '#090a0d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900
          }}>
            <Ticket size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Tixora
              </span>
              <span style={{
                background: currentRole === 'admin' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                color: currentRole === 'admin' ? '#fb7185' : '#e4e4e7',
                border: `1px solid ${currentRole === 'admin' ? 'rgba(244, 63, 94, 0.25)' : 'var(--border-color)'}`,
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '2px 7px',
                borderRadius: '5px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {currentRole === 'admin' ? 'Staff Admin' : 'Promoter Portal'}
              </span>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} color="#10b981" /> DigiLocker Verified
              </span>
              <span>•</span>
              <button
                onClick={onOpenLegalCompliance}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <Scale size={11} color="#3b82f6" /> Compliance Policy
              </button>
            </div>
          </div>
        </div>

        {/* Controls Right */}
        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          
          {/* Role Switcher Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '3px',
            display: 'flex',
            gap: '2px'
          }}>
            <button
              onClick={() => {
                setCurrentRole('promoter');
                showToast('Switched to Promoter View', 'info');
              }}
              style={{
                background: currentRole === 'promoter' ? '#ffffff' : 'transparent',
                color: currentRole === 'promoter' ? '#090a0d' : 'var(--text-muted)',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <UserCheck size={13} /> Promoter
            </button>

            <button
              onClick={() => {
                setCurrentRole('admin');
                showToast('Switched to Admin Dashboard', 'info');
              }}
              style={{
                background: currentRole === 'admin' ? '#ffffff' : 'transparent',
                color: currentRole === 'admin' ? '#090a0d' : 'var(--text-muted)',
                border: 'none',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <SlidersHorizontal size={13} /> Admin
            </button>
          </div>

          {/* Promoter Switcher Dropdown */}
          {currentRole === 'promoter' && activePromoter && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowPromoterMenu(!showPromoterMenu)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '9px',
                  padding: '5px 10px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={activePromoter.avatar}
                  alt={activePromoter.name}
                  style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{activePromoter.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {activePromoter.tier} Tier • {activePromoter.college.split(',')[0]}
                  </div>
                </div>
                <ChevronDown size={13} color="var(--text-muted)" />
              </button>

              {showPromoterMenu && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '280px',
                  background: '#13151c',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                  padding: '6px',
                  zIndex: 200
                }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', padding: '6px 8px', fontWeight: 600, textTransform: 'uppercase' }}>
                    Select Demo Promoter
                  </div>
                  {promoters.map((prom) => (
                    <button
                      key={prom.id}
                      onClick={() => {
                        setActivePromoterId(prom.id);
                        setShowPromoterMenu(false);
                        showToast(`Switched account to ${prom.name}`, 'info');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px',
                        borderRadius: '8px',
                        background: prom.id === activePromoterId ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                        border: 'none',
                        color: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <img
                        src={prom.avatar}
                        alt={prom.name}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{prom.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {prom.college.split(',')[0]} • <span style={{ color: '#e4e4e7' }}>{prom.tier}</span>
                        </div>
                      </div>
                      {prom.depositStatus === 'Suspended' && (
                        <span style={{ fontSize: '0.62rem', background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185', padding: '2px 5px', borderRadius: '4px', fontWeight: 600 }}>Suspended</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          {currentRole === 'promoter' ? (
            <button
              onClick={onOpenRecordSale}
              className="btn btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '5px' }}
            >
              <Plus size={15} /> Issue Ticket
            </button>
          ) : (
            <button
              onClick={onOpenCreateEvent}
              className="btn btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.8rem', gap: '5px' }}
            >
              <Plus size={15} /> Add Concert
            </button>
          )}

          {/* Reset Demo Data Button */}
          <button
            onClick={resetAllData}
            title="Reset to 2026 tour lineup"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '7px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RotateCcw size={14} />
          </button>

        </div>
      </div>
    </header>
  );
};
