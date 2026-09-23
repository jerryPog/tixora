import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Header } from '../Header';
import { Breadcrumbs } from '../Breadcrumbs';
import { ScrollBackgroundCanvas } from '../ScrollBackgroundCanvas';
import { ChatAssistant } from '../ChatAssistant';
import { RecordSaleModal } from '../PromoterDashboard/RecordSaleModal';
import { CreateEventModal } from '../AdminDashboard/CreateEventModal';
import { LegalComplianceModal } from '../LegalComplianceModal';
import { RLSInspectorModal } from '../RLSInspectorModal';
import { ToastContainer } from '../Toast';
import { LiveActivityPopup } from '../LiveActivityPopup';
import { CookieConsent } from '../CookieConsent';
import { 
  Ticket, 
  Zap, 
  Receipt, 
  LifeBuoy, 
  Plus, 
  Users, 
  Phone, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';

export const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole } = useApp();

  // Modals state
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false);
  const [initialSaleEventId, setInitialSaleEventId] = useState(null);
  const [initialSaleCategory, setInitialSaleCategory] = useState(null);

  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isRLSModalOpen, setIsRLSModalOpen] = useState(false);

  const [externalChatQuery, setExternalChatQuery] = useState(null);

  const handleOpenSaleWithCategory = (eventId = null, category = null) => {
    setInitialSaleEventId(eventId);
    setInitialSaleCategory(category);
    setIsRecordSaleOpen(true);
  };

  const handleAddNewEvent = () => {
    setEditingEvent(null);
    setIsCreateEventOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsCreateEventOpen(true);
  };

  const handleAskInChat = (queryText) => {
    setExternalChatQuery(queryText);
  };

  const navigateFromChat = (viewId) => {
    const routeMap = {
      posters: '/events',
      events: '/events',
      waitlist: '/waitlist',
      prices: '/prices',
      ledger: '/ledger',
      rewards: '/rewards',
      tiers: '/tiers',
      reviews: '/reviews',
      about: '/about',
      contact: '/contact',
      tickets: '/tickets',
      support: '/tickets',
      faqs: '/faqs',
      admin: '/admin'
    };
    const target = routeMap[viewId] || (viewId.startsWith('/') ? viewId : `/${viewId}`);
    navigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Scroll-Driven Dynamic Background */}
      <ScrollBackgroundCanvas />

      {/* Universal Header & Navigation Bar */}
      <Header
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenCreateEvent={handleAddNewEvent}
        onOpenLegalCompliance={() => setIsLegalModalOpen(true)}
        onOpenRLSInspector={() => setIsRLSModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container section" style={{ flex: 1, paddingTop: '1.25rem' }}>
        
        {/* Breadcrumb Navigation on Subpages */}
        {location.pathname !== '/' && (
          <Breadcrumbs />
        )}

        {/* Outlet for Dynamic Route Page Content */}
        <Outlet 
          context={{
            onOpenRecordSale: handleOpenSaleWithCategory,
            onAddNewEvent: handleAddNewEvent,
            onEditEvent: handleEditEvent,
            onAskInChat: handleAskInChat
          }}
        />

      </main>

      {/* AI Assistant Chatbox */}
      <ChatAssistant
        onNavigate={navigateFromChat}
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenPriceList={(eId) => navigate(eId ? `/prices?eventId=${eId}` : '/prices')}
        externalQueryTrigger={externalChatQuery}
        onNavigateToFAQ={() => navigate('/faqs')}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {currentRole === 'promoter' ? (
          <>
            <NavLink
              to="/events"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Ticket size={18} />
              <span>Events</span>
            </NavLink>

            <NavLink
              to="/waitlist"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Zap size={18} />
              <span>Waitlist</span>
            </NavLink>

            {/* Floating Quick Action in Center */}
            <button
              onClick={() => handleOpenSaleWithCategory(null, null)}
              style={{
                background: '#ffffff',
                color: '#090a0d',
                border: 'none',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                marginTop: '-12px'
              }}
              title="Issue Ticket"
            >
              <Plus size={20} strokeWidth={2.6} />
            </button>

            <NavLink
              to="/ledger"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Receipt size={18} />
              <span>Ledger</span>
            </NavLink>

            <NavLink
              to="/tickets"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <LifeBuoy size={18} color="#ec4899" />
              <span>Support</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Ticket size={18} />
              <span>Admin</span>
            </NavLink>

            <NavLink
              to="/events"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Zap size={18} />
              <span>Concerts</span>
            </NavLink>

            <button
              onClick={handleAddNewEvent}
              style={{
                background: '#ffffff',
                color: '#090a0d',
                border: 'none',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                marginTop: '-12px'
              }}
              title="Add Concert"
            >
              <Plus size={20} strokeWidth={2.6} />
            </button>

            <NavLink
              to="/tickets"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <LifeBuoy size={18} color="#ec4899" />
              <span>Tickets</span>
            </NavLink>

            <NavLink
              to="/prices"
              className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Pricing</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Global Modals */}
      <RecordSaleModal
        isOpen={isRecordSaleOpen}
        onClose={() => setIsRecordSaleOpen(false)}
        initialEventId={initialSaleEventId}
        initialCategory={initialSaleCategory}
      />

      <CreateEventModal
        isOpen={isCreateEventOpen}
        onClose={() => {
          setIsCreateEventOpen(false);
          setEditingEvent(null);
        }}
        editingEvent={editingEvent}
      />

      <LegalComplianceModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      <RLSInspectorModal
        isOpen={isRLSModalOpen}
        onClose={() => setIsRLSModalOpen(false)}
      />

      {/* Action Toasts & Realtime Live Activity Feed */}
      <ToastContainer />
      <LiveActivityPopup onSelectEvent={(eId) => handleOpenSaleWithCategory(eId, null)} />

      {/* Cookie Consent Banner */}
      <CookieConsent onOpenPolicy={() => setIsLegalModalOpen(true)} />

      {/* Multi-Page Rich Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2.5rem 0 2rem',
        background: 'rgba(7, 8, 10, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        marginTop: 'auto'
      }}>
        <div className="container flex flex-col gap-6">
          
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            
            {/* Brand Logo & Founders Attribution */}
            <div className="flex flex-col gap-3">
              <Link 
                to="/"
                className="flex items-center gap-2"
                style={{ textDecoration: 'none' }}
                title="Return to Tixora Home"
              >
                <img
                  src="/tixora-logo.png"
                  alt="Tixora — LIVE THE HYPE official emblem"
                  style={{
                    height: '34px',
                    width: 'auto',
                    borderRadius: '5px',
                    display: 'block'
                  }}
                />
              </Link>

              {/* Vertical Founders Attribution Pill */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '0.72rem',
                color: '#e4e4e7',
                display: 'inline-flex',
                flexDirection: 'column',
                gap: '4px',
                width: 'fit-content'
              }}>
                <div><strong>Ronak Jain R</strong> (Founder)</div>
                <div><strong>Prajwal Gowrish H S</strong> (Co-Founder)</div>
                <div><strong>Kanishk Jhunjhunwala</strong> (Co-Founder)</div>
              </div>
            </div>

            {/* Internal Links Column Matrix */}
            <div className="footer-nav-grid">
              <div className="footer-nav-col">
                <div className="footer-nav-title">
                  Platform
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/events" className="footer-link">Concerts & Passes</Link>
                  <Link to="/tickets" className="footer-link">Support Desk & Tickets</Link>
                  <Link to="/waitlist" className="footer-link">Campus Ambassador</Link>
                  <Link to="/prices" className="footer-link">Price Calculator</Link>
                  <Link to="/ledger" className="footer-link">Sales Ledger</Link>
                  <Link to="/rewards" className="footer-link">Referral Rewards</Link>
                  <Link to="/tiers" className="footer-link">Commission Tiers</Link>
                </div>
              </div>

              <div className="footer-nav-col">
                <div className="footer-nav-title">
                  Company
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/about" className="footer-link">About Us & Founders</Link>
                  <Link to="/reviews" className="footer-link">Verified Reviews</Link>
                  <Link to="/contact" className="footer-link">Contact & Help Desk</Link>
                  <Link to="/tickets" className="footer-link">Issue Resolution Center</Link>
                </div>
              </div>

              <div className="footer-nav-col">
                <div className="footer-nav-title">
                  Trust & Security
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setIsLegalModalOpen(true)} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                    Compliance Policy
                  </button>
                  <button onClick={() => setIsLegalModalOpen(true)} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                    Terms & Privacy
                  </button>
                  <button onClick={() => setIsRLSModalOpen(true)} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                    RLS Inspector
                  </button>
                  <Link to="/faqs" className="footer-link">FAQ Center</Link>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer Strip */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.74rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>© 2026 Tixora India. All rights reserved.</span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-color)',
                padding: '2px 7px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                color: '#a1a1aa',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}>
                v2.0.0 Multi-Page
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/917892145475"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#34d399',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <Phone size={12} /> Helpline: +91 78921 45475
              </a>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} color="#10b981" /> DigiLocker Verified
              </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
