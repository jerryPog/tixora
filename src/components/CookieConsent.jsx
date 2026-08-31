import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';

const STORAGE_KEY = 'tixora_cookie_consent_v1';

export const CookieConsent = ({ onOpenPolicy }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // Delay display slightly for smoother entrance
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setPreferences(all);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleDeclineNonEssential = () => {
    const min = { essential: true, analytics: false, marketing: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(min));
    setPreferences(min);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setShowBanner(false);
    setShowModal(false);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {/* Sticky Bottom Cookie Banner */}
      {showBanner && !showModal && (
        <div 
          style={{
            position: 'fixed',
            bottom: '16px',
            left: '16px',
            right: '16px',
            maxWidth: '920px',
            margin: '0 auto',
            zIndex: 900,
            background: 'rgba(13, 15, 20, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
            boxShadow: '0 16px 40px rgba(0,0,0,0.7)',
            animation: 'fadeInUp 0.3s ease'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#f59e0b',
                padding: '8px',
                borderRadius: '8px',
                flexShrink: 0
              }}>
                <Cookie size={20} />
              </div>

              <div>
                <h4 style={{ fontSize: '0.86rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                  Privacy & Cookie Preferences
                </h4>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Tixora uses essential cookies for DigiLocker promoter authentication, secure pass generation, and session security in compliance with DPDP & GDPR.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.74rem', gap: '4px' }}
              >
                <Settings size={12} />
                <span>Customize</span>
              </button>

              <button
                onClick={handleDeclineNonEssential}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.74rem' }}
              >
                Decline Optional
              </button>

              <button
                onClick={handleAcceptAll}
                className="btn btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.74rem', fontWeight: 700 }}
              >
                Accept All
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ zIndex: 1200 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cookie size={18} color="#f59e0b" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Cookie Privacy Settings</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="btn-ghost" style={{ padding: '4px' }}>
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Customize your privacy preferences for data processing and storage on Tixora.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
              
              {/* Essential */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    Strictly Necessary Cookies
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Session verification, DigiLocker security token & ticket quota safeguards.
                  </div>
                </div>
                <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                  ALWAYS ACTIVE
                </span>
              </div>

              {/* Analytics */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    Performance & Analytics
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Helps us track ticket purchase latency and concert demand spikes.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={e => setPreferences({ ...preferences, analytics: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#ffffff', cursor: 'pointer' }}
                />
              </div>

              {/* Marketing */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    Marketing & Retargeting
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Tailored recommendations for upcoming artist tours in your metro city.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={e => setPreferences({ ...preferences, marketing: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#ffffff', cursor: 'pointer' }}
                />
              </div>

            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              {onOpenPolicy && (
                <button
                  onClick={() => {
                    setShowModal(false);
                    onOpenPolicy();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#60a5fa',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  View Full Privacy Policy
                </button>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleAcceptAll}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                >
                  Accept All
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="btn btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.76rem', fontWeight: 700 }}
                >
                  Save Preferences
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
