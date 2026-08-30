import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ScrollBackgroundCanvas } from './components/ScrollBackgroundCanvas';
import { ChatAssistant } from './components/ChatAssistant';
import { PromoterOverview } from './components/PromoterDashboard/PromoterOverview';
import { EventPosters } from './components/PromoterDashboard/EventPosters';
import { PriceListExplorer } from './components/PromoterDashboard/PriceListExplorer';
import { SalesLedger } from './components/PromoterDashboard/SalesLedger';
import { RecordSaleModal } from './components/PromoterDashboard/RecordSaleModal';
import { DepositModal } from './components/PromoterDashboard/DepositModal';
import { AdminOverview } from './components/AdminDashboard/AdminOverview';
import { EventManager } from './components/AdminDashboard/EventManager';
import { PromoterManager } from './components/AdminDashboard/PromoterManager';
import { AllSalesMonitor } from './components/AdminDashboard/AllSalesMonitor';
import { CreateEventModal } from './components/AdminDashboard/CreateEventModal';
import { LegalComplianceModal } from './components/LegalComplianceModal';
import { ToastContainer } from './components/Toast';
import { 
  Ticket, 
  Tag, 
  Receipt, 
  Award, 
  CheckCircle2,
  ShieldCheck,
  Scale,
  Users,
  TrendingUp,
  Plus,
  Phone
} from 'lucide-react';
import './index.css';

const PromoterCommissionRules = () => {
  const { commissionTiers, activePromoter } = useApp();

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
          Commission Tiers & Promoter Privileges
        </h2>
        <p className="text-muted" style={{ fontSize: '0.82rem' }}>
          Sell tickets to your campus network, climb tiers, and unlock VIP access and higher profit cuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {commissionTiers.map((tier) => {
          const isCurrent = activePromoter.tier === tier.tier;

          return (
            <div
              key={tier.tier}
              className="glass-card"
              style={{
                background: tier.bgGradient,
                border: isCurrent ? '1px solid #ffffff' : '1px solid var(--border-color)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {isCurrent && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '14px',
                  background: '#ffffff',
                  color: '#090a0d',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Your Active Tier
                </div>
              )}

              <div style={{ marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                  {tier.tier}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {tier.ticketRange}
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '10px',
                borderRadius: '9px',
                marginBottom: '0.85rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Commission Rate
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {tier.commissionRange}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>per ticket sold</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Privileges & Rewards
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: '#e4e4e7' }}>
                      <CheckCircle2 size={13} color="#ffffff" style={{ flexShrink: 0 }} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const { currentRole } = useApp();

  // Promoter View State
  const [promoterTab, setPromoterTab] = useState('posters'); // 'posters' | 'prices' | 'ledger' | 'tiers'
  const [selectedEventForPrices, setSelectedEventForPrices] = useState(null);

  // Modals
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false);
  const [initialSaleEventId, setInitialSaleEventId] = useState(null);
  const [initialSaleCategory, setInitialSaleCategory] = useState(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Admin View State
  const [adminTab, setAdminTab] = useState('events'); // 'events' | 'promoters' | 'sales'
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleOpenSaleWithCategory = (eventId, category = null) => {
    setInitialSaleEventId(eventId);
    setInitialSaleCategory(category);
    setIsRecordSaleOpen(true);
  };

  const handleViewPriceList = (eventId) => {
    setSelectedEventForPrices(eventId);
    setPromoterTab('prices');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsCreateEventOpen(true);
  };

  const handleAddNewEvent = () => {
    setEditingEvent(null);
    setIsCreateEventOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Scroll-Driven Dynamic Video Frame Background */}
      <ScrollBackgroundCanvas />

      {/* Universal Header */}
      <Header
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenCreateEvent={handleAddNewEvent}
        onOpenLegalCompliance={() => setIsLegalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container section" style={{ flex: 1, paddingTop: '1.25rem' }}>
        
        {/* ================= PROMOTER DASHBOARD ================= */}
        {currentRole === 'promoter' ? (
          <div>
            
            {/* Top KPI Strip */}
            <PromoterOverview
              onOpenDepositModal={() => setIsDepositModalOpen(true)}
            />

            {/* Desktop Navigation Tabs (Hidden on mobile) */}
            <div style={{
              display: 'flex',
              gap: '0.35rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.4rem',
              marginBottom: '1.5rem',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}>
              {[
                { id: 'posters', label: 'Events & Posters', icon: <Ticket size={15} /> },
                { id: 'prices', label: 'Price Lists & Calculator', icon: <Tag size={15} /> },
                { id: 'ledger', label: 'My Sales Ledger', icon: <Receipt size={15} /> },
                { id: 'tiers', label: 'Tier Milestones', icon: <Award size={15} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPromoterTab(tab.id)}
                  style={{
                    background: promoterTab === tab.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    color: promoterTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    borderBottom: promoterTab === tab.id ? '2px solid #ffffff' : '2px solid transparent',
                    padding: '8px 14px',
                    borderRadius: '6px 6px 0 0',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Subviews */}
            {promoterTab === 'posters' && (
              <EventPosters
                onSelectEventForSale={(eId) => handleOpenSaleWithCategory(eId, null)}
                onSelectEventForPriceList={handleViewPriceList}
              />
            )}

            {promoterTab === 'prices' && (
              <PriceListExplorer
                selectedEventId={selectedEventForPrices}
                onSelectEventForSale={(eId, cat) => handleOpenSaleWithCategory(eId, cat)}
              />
            )}

            {promoterTab === 'ledger' && (
              <SalesLedger
                onOpenDepositModal={() => setIsDepositModalOpen(true)}
              />
            )}

            {promoterTab === 'tiers' && (
              <PromoterCommissionRules />
            )}

          </div>
        ) : (
          /* ================= ADMIN DASHBOARD ================= */
          <div>
            <AdminOverview
              activeTab={adminTab}
              setActiveTab={setAdminTab}
              onOpenCreateEvent={handleAddNewEvent}
            />

            {adminTab === 'events' && (
              <EventManager
                onOpenCreateEvent={handleAddNewEvent}
                onEditEvent={handleEditEvent}
              />
            )}

            {adminTab === 'promoters' && (
              <PromoterManager />
            )}

            {adminTab === 'sales' && (
              <AllSalesMonitor />
            )}
          </div>
        )}

      </main>

      {/* AI Assistant Chatbox */}
      <ChatAssistant
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenPriceList={handleViewPriceList}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {currentRole === 'promoter' ? (
          <>
            <button
              onClick={() => { setPromoterTab('posters'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${promoterTab === 'posters' ? 'active' : ''}`}
            >
              <Ticket size={18} />
              <span>Events</span>
            </button>

            <button
              onClick={() => { setPromoterTab('prices'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${promoterTab === 'prices' ? 'active' : ''}`}
            >
              <Tag size={18} />
              <span>Prices</span>
            </button>

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

            <button
              onClick={() => { setPromoterTab('ledger'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${promoterTab === 'ledger' ? 'active' : ''}`}
            >
              <Receipt size={18} />
              <span>Ledger</span>
            </button>

            <button
              onClick={() => { setPromoterTab('tiers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${promoterTab === 'tiers' ? 'active' : ''}`}
            >
              <Award size={18} />
              <span>Tiers</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setAdminTab('events'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${adminTab === 'events' ? 'active' : ''}`}
            >
              <Ticket size={18} />
              <span>Concerts</span>
            </button>

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

            <button
              onClick={() => { setAdminTab('promoters'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${adminTab === 'promoters' ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Promoters</span>
            </button>

            <button
              onClick={() => { setAdminTab('sales'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${adminTab === 'sales' ? 'active' : ''}`}
            >
              <TrendingUp size={18} />
              <span>Feed</span>
            </button>
          </>
        )}
      </nav>

      {/* Modals */}
      <RecordSaleModal
        isOpen={isRecordSaleOpen}
        onClose={() => setIsRecordSaleOpen(false)}
        initialEventId={initialSaleEventId}
        initialCategory={initialSaleCategory}
      />

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
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

      {/* Action Toasts */}
      <ToastContainer />

      {/* Footer with Official Logo, Founders Attribution & Helpline */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.75rem 0',
        background: 'rgba(7, 8, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        marginTop: 'auto'
      }}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand Logo & Founders Tag */}
          <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
            <div className="flex items-center gap-2">
              <img
                src="/tixora-logo.png"
                alt="Tixora — LIVE THE HYPE"
                style={{
                  height: '32px',
                  width: 'auto',
                  borderRadius: '5px',
                  display: 'block'
                }}
              />
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              padding: '3px 12px',
              fontSize: '0.74rem',
              color: '#e4e4e7',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span><strong>Ronak Jain R</strong> (Founder)</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span><strong>Anshul S Balan</strong> (Co-Founder)</span>
            </div>
          </div>

          {/* Queries & Helpline and Legal Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.74rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
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
            <span>•</span>
            <button
              onClick={() => setIsLegalModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#60a5fa',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Scale size={12} /> Compliance Policy
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainDashboard />
    </AppProvider>
  );
}
