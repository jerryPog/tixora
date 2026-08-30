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
      background: 'rgba(9, 10, 13, 0.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.65rem 0'
    }}>
      <div className="container flex items-center justify-between" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
        
        {/* Brand & Portal Status */}
        <div className="flex items-center gap-2.5">
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#ffffff',
            color: '#090a0d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            flexShrink: 0
          }}>
            <Ticket size={18} strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Tixora
              </span>
              <span style={{
                background: currentRole === 'admin' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                color: currentRole === 'admin' ? '#fb7185' : '#e4e4e7',
                border: `1px solid ${currentRole === 'admin' ? 'rgba(244, 63, 94, 0.25)' : 'var(--border-color)'}`,
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '1px 6px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {currentRole === 'admin' ? 'Staff' : 'Promoter'}
              </span>
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1">
                <ShieldCheck size={11} color="#10b981" /> Verified
              </span>
              <span>•</span>
              <button
                onClick={onOpenLegalCompliance}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.68rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px'
                }}
              >
                <Scale size={10} color="#3b82f6" /> Policy
              </button>
            </div>
          </div>
        </div>

        {/* Controls Right */}
        <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
          
          {/* Role Switcher Pill */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '2px',
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
                padding: '4px 9px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <UserCheck size={12} /> Promoter
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
                padding: '4px 9px',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <SlidersHorizontal size={12} /> Admin
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
                  borderRadius: '8px',
                  padding: '4px 8px',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={activePromoter.avatar}
                  alt={activePromoter.name}
                  style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activePromoter.name.split(' ')[0]}
                </span>
                <ChevronDown size={11} color="var(--text-muted)" />
              </button>

              {showPromoterMenu && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '260px',
                  background: '#13151c',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
                  padding: '6px',
                  zIndex: 300
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', padding: '6px 8px', fontWeight: 600, textTransform: 'uppercase' }}>
                    Select Demo Promoter
                  </div>
                  {promoters.map((prom) => (
                    <button
                      key={prom.id}
                      onClick={() => {
                        setActivePromoterId(prom.id);
                        setShowPromoterMenu(false);
                        showToast(`Switched to ${prom.name}`, 'info');
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
                        style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prom.name}</div>
                        <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                          {prom.city} • <span style={{ color: '#ffffff' }}>{prom.tier}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Action Button */}
          {currentRole === 'promoter' ? (
            <button
              onClick={onOpenRecordSale}
              className="btn btn-primary"
              style={{ padding: '5px 11px', fontSize: '0.75rem', gap: '4px' }}
            >
              <Plus size={14} /> <span className="hidden-xs">Issue</span>
            </button>
          ) : (
            <button
              onClick={onOpenCreateEvent}
              className="btn btn-primary"
              style={{ padding: '5px 11px', fontSize: '0.75rem', gap: '4px' }}
            >
              <Plus size={14} /> <span className="hidden-xs">Add Event</span>
            </button>
          )}

          {/* Reset Button */}
          <button
            onClick={resetAllData}
            title="Reset lineup"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '6px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RotateCcw size={13} />
          </button>

        </div>
      </div>
    </header>
  );
};
