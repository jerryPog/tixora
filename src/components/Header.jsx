import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  UserCheck, 
  SlidersHorizontal, 
  RotateCcw, 
  Plus, 
  ChevronDown,
  Scale,
  HelpCircle,
  Menu,
  X,
  Ticket,
  Zap,
  Star,
  Info,
  Phone,
  Lock,
  Receipt,
  Gift
} from 'lucide-react';

export const Header = ({ 
  currentView,
  onNavigate,
  onOpenRecordSale, 
  onOpenCreateEvent, 
  onOpenLegalCompliance, 
  onOpenRLSInspector,
  onOpenFAQ, 
  onGoHome 
}) => {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'posters', label: 'Concerts', icon: <Ticket size={14} /> },
    { id: 'waitlist', label: 'Waitlist', icon: <Zap size={14} color="#f59e0b" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star size={14} color="#f59e0b" /> },
    { id: 'about', label: 'About', icon: <Info size={14} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={14} /> },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={14} /> }
  ];

  const handleNavClick = (viewId) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 10, 13, 0.94)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.55rem 0'
    }}>
      <div className="container flex items-center justify-between" style={{ gap: '0.75rem' }}>
        
        {/* Brand Logo & Portal Tag */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Hamburger Toggle (Visible only on small screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-mobile-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div 
            onClick={onGoHome}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
            title="Return to Tixora Home"
          >
            <img 
              src="/tixora-logo.png" 
              alt="Tixora official logo — Live The Hype youth concert ticketing" 
              style={{
                height: '34px',
                width: 'auto',
                borderRadius: '6px',
                display: 'block'
              }}
            />
          </div>

          <div className="header-brand-badge" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '10px' }}>
            <div>
              <div className="flex items-center gap-1.5">
                <span style={{
                  background: currentRole === 'admin' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                  color: currentRole === 'admin' ? '#fb7185' : '#e4e4e7',
                  border: `1px solid ${currentRole === 'admin' ? 'rgba(244, 63, 94, 0.25)' : 'var(--border-color)'}`,
                  fontSize: '0.64rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {currentRole === 'admin' ? 'Staff Admin' : 'Promoter Portal'}
                </span>
              </div>
              <div className="flex items-center gap-2" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={11} color="#10b981" /> DigiLocker Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (Horizontal Row on Desktop) */}
        <nav className="header-nav-desktop" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                  padding: '6px 11px',
                  borderRadius: '6px 6px 0 0',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#ffffff';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls Right */}
        <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
          
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
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
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
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
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
                  alt={`Profile picture of verified promoter ${activePromoter.name}`}
                  style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.74rem', fontWeight: 600, maxWidth: '75px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                        alt={`Profile picture of ${prom.name}`}
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
              style={{ padding: '5px 11px', fontSize: '0.74rem', gap: '4px' }}
            >
              <Plus size={14} /> <span className="hidden-xs">Issue</span>
            </button>
          ) : (
            <button
              onClick={onOpenCreateEvent}
              className="btn btn-primary"
              style={{ padding: '5px 11px', fontSize: '0.74rem', gap: '4px' }}
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
            aria-label="Reset Mock Data"
          >
            <RotateCcw size={13} />
          </button>

        </div>
      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: '#090a0d',
            borderTop: '1px solid var(--border-color)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease'
          }}
          className="lg:hidden"
        >
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, padding: '0 4px 4px' }}>
            Menu Navigation
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: currentView === link.id ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                  color: currentView === link.id ? '#ffffff' : '#e4e4e7',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'left'
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Helpline in Mobile Menu */}
          <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <a
              href="https://wa.me/917892145475"
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}
            >
              <Phone size={12} /> Helpline: +91 78921 45475
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
