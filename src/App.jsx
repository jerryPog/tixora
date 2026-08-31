import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { ScrollBackgroundCanvas } from './components/ScrollBackgroundCanvas';
import { ChatAssistant } from './components/ChatAssistant';
import { HeroCTA } from './components/HeroCTA';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ReviewsSection } from './components/ReviewsSection';
import { CookieConsent } from './components/CookieConsent';
import { RLSInspectorModal } from './components/RLSInspectorModal';
import { WaitlistPage } from './components/Pages/WaitlistPage';
import { ThankYouPage } from './components/Pages/ThankYouPage';
import { AboutPage } from './components/Pages/AboutPage';
import { ContactPage } from './components/Pages/ContactPage';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { SupportTicketsSection } from './components/SupportTickets/SupportTicketsSection';

import { TourSchedule } from './components/TourSchedule';
import { ArtistLineupShowcase } from './components/ArtistLineupShowcase';
import { ExperienceTeaser } from './components/ExperienceTeaser';
import { FestivalStatsStrip } from './components/FestivalStatsStrip';
import { TourNewsSection } from './components/TourNewsSection';

import { PromoterOverview } from './components/PromoterDashboard/PromoterOverview';
import { EventPosters } from './components/PromoterDashboard/EventPosters';
import { PriceListExplorer } from './components/PromoterDashboard/PriceListExplorer';
import { SalesLedger } from './components/PromoterDashboard/SalesLedger';
import { RecordSaleModal } from './components/PromoterDashboard/RecordSaleModal';
import { RewardsAndReferrals } from './components/PromoterDashboard/RewardsAndReferrals';

import { AdminOverview } from './components/AdminDashboard/AdminOverview';
import { EventManager } from './components/AdminDashboard/EventManager';
import { PromoterManager } from './components/AdminDashboard/PromoterManager';
import { AllSalesMonitor } from './components/AdminDashboard/AllSalesMonitor';
import { CreateEventModal } from './components/AdminDashboard/CreateEventModal';
import { LegalComplianceModal } from './components/LegalComplianceModal';
import { FAQSection } from './components/FAQSection';
import { ToastContainer } from './components/Toast';
import { LiveActivityPopup } from './components/LiveActivityPopup';
import { usePageSEO } from './hooks/usePageSEO';

import { 
  Ticket, 
  Tag, 
  Receipt, 
  Award, 
  Gift,
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Users, 
  TrendingUp, 
  Plus, 
  Phone, 
  HelpCircle,
  Zap,
  Star,
  Info,
  Lock,
  LifeBuoy
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

  // Active View Navigation State
  // Views: 'posters' | 'prices' | 'ledger' | 'rewards' | 'tiers' | 'faqs' | 'waitlist' | 'about' | 'contact' | 'reviews' | 'thank-you' | '404'
  const [activeView, setActiveView] = useState('posters');
  const [selectedEventForPrices, setSelectedEventForPrices] = useState(null);
  const [externalChatQuery, setExternalChatQuery] = useState(null);
  const [lastOrderData, setLastOrderData] = useState(null);

  // Modals State
  const [isRecordSaleOpen, setIsRecordSaleOpen] = useState(false);
  const [initialSaleEventId, setInitialSaleEventId] = useState(null);
  const [initialSaleCategory, setInitialSaleCategory] = useState(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isRLSModalOpen, setIsRLSModalOpen] = useState(false);

  // Admin View State
  const [adminTab, setAdminTab] = useState('events'); // 'events' | 'promoters' | 'sales' | 'faqs'
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Dynamic SEO Page Title & Meta Tags Hook
  usePageSEO(activeView);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews = ['events', 'posters', 'tickets', 'waitlist', 'prices', 'ledger', 'rewards', 'tiers', 'reviews', 'about', 'contact', 'faqs', 'thank-you', '404'];
      
      if (hash === 'events' || !hash) {
        setActiveView('posters');
      } else if (validViews.includes(hash)) {
        setActiveView(hash);
      }
    };

    handleHashChange();
    window.scrollTo(0, 0);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateTo = (viewId) => {
    if (currentRole === 'admin' && viewId === 'support') {
      setAdminTab('support');
    }
    setActiveView(viewId);
    window.location.hash = viewId === 'posters' ? 'events' : viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    navigateTo('posters');
    setAdminTab('events');
    setIsRecordSaleOpen(false);
    setIsCreateEventOpen(false);
    setIsLegalModalOpen(false);
    setIsRLSModalOpen(false);
  };

  const handleOpenSaleWithCategory = (eventId, category = null) => {
    setInitialSaleEventId(eventId);
    setInitialSaleCategory(category);
    setIsRecordSaleOpen(true);
  };

  const handleViewPriceList = (eventId) => {
    setSelectedEventForPrices(eventId);
    navigateTo('prices');
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsCreateEventOpen(true);
  };

  const handleAddNewEvent = () => {
    setEditingEvent(null);
    setIsCreateEventOpen(true);
  };

  const handleAskInChat = (queryText) => {
    setExternalChatQuery(queryText);
  };

  const handleOpenFAQ = () => {
    if (currentRole === 'admin') {
      setAdminTab('faqs');
    } else {
      navigateTo('faqs');
    }
  };

  const handleWaitlistSuccess = (data) => {
    setLastOrderData(data);
    navigateTo('thank-you');
  };

  // Breadcrumbs Generator
  const getBreadcrumbs = () => {
    switch (activeView) {
      case 'waitlist':
        return [{ label: 'Campus Ambassador Waitlist', view: 'waitlist' }];
      case 'about':
        return [{ label: 'About Tixora & Founders', view: 'about' }];
      case 'contact':
        return [{ label: 'Contact Support & Helpline', view: 'contact' }];
      case 'reviews':
        return [{ label: 'Verified Reviews & Stories', view: 'reviews' }];
      case 'prices':
        return [{ label: 'Concert Rates & Price Calculator', view: 'prices' }];
      case 'ledger':
        return [{ label: 'Promoter Sales Ledger', view: 'ledger' }];
      case 'rewards':
        return [{ label: 'Rewards & Referrals', view: 'rewards' }];
      case 'tiers':
        return [{ label: 'Commission Tiers', view: 'tiers' }];
      case 'faqs':
        return [{ label: 'FAQ & Policies Center', view: 'faqs' }];
      case 'support':
        return [{ label: 'Issue Resolution Center', view: 'support' }];
      case 'thank-you':
        return [{ label: 'Confirmation & Digital Pass', view: 'thank-you' }];
      case '404':
        return [{ label: '404 Page Not Found', view: '404' }];
      default:
        return [];
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Scroll-Driven Dynamic Video Frame Background */}
      <ScrollBackgroundCanvas />

      {/* Universal Responsive Header & Navigation Bar */}
      <Header
        currentView={activeView}
        onNavigate={navigateTo}
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenCreateEvent={handleAddNewEvent}
        onOpenLegalCompliance={() => setIsLegalModalOpen(true)}
        onOpenRLSInspector={() => setIsRLSModalOpen(true)}
        onOpenFAQ={handleOpenFAQ}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="container section" style={{ flex: 1, paddingTop: '1.25rem' }}>
        
        {/* Dynamic Breadcrumb Navigation */}
        {activeView !== 'posters' && (
          <Breadcrumbs items={getBreadcrumbs()} onNavigate={navigateTo} />
        )}

        {/* ================= PROMOTER / PUBLIC DASHBOARD ================= */}
        {currentRole === 'promoter' ? (
          <div>
            
            {/* Top KPI Strip (Visible on Dashboard Tabs) */}
            {['posters', 'prices', 'ledger', 'rewards', 'tiers'].includes(activeView) && (
              <PromoterOverview />
            )}

            {/* Desktop Navigation Tabs */}
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
                { id: 'posters', label: 'Events & Lineup', icon: <Ticket size={15} /> },
                { id: 'waitlist', label: 'Ambassador Waitlist', icon: <Zap size={15} color="#f59e0b" /> },
                { id: 'prices', label: 'Price Lists & Calculator', icon: <Tag size={15} /> },
                { id: 'ledger', label: 'My Sales Ledger', icon: <Receipt size={15} /> },
                { id: 'rewards', label: 'Rewards & Referrals', icon: <Gift size={15} /> },
                { id: 'tiers', label: 'Tier Milestones', icon: <Award size={15} /> },
                { id: 'reviews', label: 'Reviews', icon: <Star size={15} color="#f59e0b" /> },
                { id: 'about', label: 'About Us', icon: <Info size={15} /> },
                { id: 'contact', label: 'Contact', icon: <Phone size={15} /> },
                { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={15} /> },
                { id: 'support', label: 'Support requests', icon: <Headphones size={15} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id)}
                  style={{
                    background: activeView === tab.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    color: activeView === tab.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    borderBottom: activeView === tab.id ? '2px solid #ffffff' : '2px solid transparent',
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

            {/* Subview 1: Concert Lineup & Festival Experience Flow */}
            {activeView === 'posters' && (
              <>
                {/* 1. Electrifying Above The Fold Festival Hero */}
                <HeroCTA
                  onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
                  onNavigateToWaitlist={() => navigateTo('waitlist')}
                  onNavigateToEvents={() => navigateTo('posters')}
                  onNavigateToReviews={() => navigateTo('reviews')}
                />

                {/* 2. Official Concert Postings & Tier Passes */}
                <div style={{ marginBottom: '3.5rem' }}>
                  <div className="section-watermark-wrapper">
                    <div className="section-watermark-bg" aria-hidden="true">
                      LINEUP
                    </div>
                    <div className="section-watermark-front">
                      <div className="festival-tag">
                        2026 PUBLISHED MEGA TOURS
                      </div>
                      <h2 className="festival-heading">
                        Explore Concert Lineup & Official Passes
                      </h2>
                      <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0.35rem auto 0' }}>
                        100% verified digital passes with instant QR issuance and transparent student commission breakdowns.
                      </p>
                    </div>
                  </div>

                  <EventPosters
                    onSelectEventForSale={(eId) => handleOpenSaleWithCategory(eId, null)}
                    onSelectEventForPriceList={handleViewPriceList}
                  />
                </div>

                {/* 4. Interactive Tour Schedule & Timetable */}
                <TourSchedule onSelectEvent={handleViewPriceList} />

                {/* 5. Headlining Artists & Special Guests Showcase */}
                <ArtistLineupShowcase onSelectEvent={handleViewPriceList} />

                {/* 6. Cinematic Audiovisual Experience Teaser */}
                <ExperienceTeaser onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)} />

                {/* 7. Live Festival & Campus Stats Metric Strip */}
                <FestivalStatsStrip />

                {/* 9. Latest Tour News & Phase Updates */}
                <TourNewsSection onSelectArticle={() => {}} />

                {/* 10. Real Verified Student & Fan Reviews */}
                <ReviewsSection />

                {/* 11. Live Operational FAQ Center */}
                <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
                  <FAQSection onAskInChat={handleAskInChat} />
                </div>
              </>
            )}

            {/* Subview 2: Waitlist Page */}
            {activeView === 'waitlist' && (
              <WaitlistPage
                onSubmitSuccess={handleWaitlistSuccess}
                onNavigateToEvents={() => navigateTo('posters')}
              />
            )}

            {/* Subview 3: Price List & Calculator */}
            {activeView === 'prices' && (
              <PriceListExplorer
                selectedEventId={selectedEventForPrices}
                onSelectEventForSale={(eId, cat) => handleOpenSaleWithCategory(eId, cat)}
              />
            )}

            {/* Subview 4: Sales Ledger */}
            {activeView === 'ledger' && (
              <SalesLedger
                onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
              />
            )}

            {/* Subview 5: Rewards & Referrals */}
            {activeView === 'rewards' && (
              <RewardsAndReferrals />
            )}

            {/* Subview 6: Commission Tiers */}
            {activeView === 'tiers' && (
              <PromoterCommissionRules />
            )}

            {/* Subview 7: Real Reviews */}
            {activeView === 'reviews' && (
              <ReviewsSection />
            )}

            {/* Subview 8: About Us Page */}
            {activeView === 'about' && (
              <AboutPage
                onNavigateToEvents={() => navigateTo('posters')}
                onNavigateToWaitlist={() => navigateTo('waitlist')}
                onNavigateToContact={() => navigateTo('contact')}
              />
            )}

            {/* Subview 9: Contact Page */}
            {activeView === 'contact' && (
              <ContactPage
                onOpenFAQ={handleOpenFAQ}
                onNavigateToEvents={() => navigateTo('posters')}
              />
            )}

            {/* Subview: Support Tickets Desk */}
            {activeView === 'tickets' && (
              <SupportTicketsSection />
            )}

            {/* Subview 10: FAQ Center */}
            {activeView === 'faqs' && (
              <FAQSection onAskInChat={handleAskInChat} />
            )}

            {/* Subview 11: Thank You Page */}
            {activeView === 'thank-you' && (
              <ThankYouPage
                orderData={lastOrderData}
                onNavigateToHome={handleGoHome}
                onNavigateToLedger={() => navigateTo('ledger')}
              />
            )}

            {/* Subview 12: Custom 404 Page */}
            {activeView === '404' && (
              <NotFoundPage
                onNavigateToHome={handleGoHome}
                onSelectEvent={(eId) => {
                  handleViewPriceList(eId);
                }}
              />
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

            {/* Admin Tab Strip */}
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
                { id: 'events', label: 'Concert Roster', icon: <Ticket size={15} /> },
                { id: 'promoters', label: 'Promoter Network', icon: <Users size={15} /> },
                { id: 'sales', label: 'Audit & Sales Feed', icon: <TrendingUp size={15} /> },
                { id: 'tickets', label: 'Support Tickets', icon: <LifeBuoy size={15} color="#ec4899" /> },
                { id: 'faqs', label: 'Operational FAQs', icon: <HelpCircle size={15} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id)}
                  style={{
                    background: adminTab === tab.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    color: adminTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    borderBottom: adminTab === tab.id ? '2px solid #ffffff' : '2px solid transparent',
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

            {adminTab === 'events' && (
              <>
                <EventManager
                  onOpenCreateEvent={handleAddNewEvent}
                  onEditEvent={handleEditEvent}
                />
                <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
                  <FAQSection onAskInChat={handleAskInChat} />
                </div>
              </>
            )}

            {adminTab === 'promoters' && (
              <PromoterManager />
            )}

            {adminTab === 'sales' && (
              <AllSalesMonitor />
            )}

            {adminTab === 'tickets' && (
              <SupportTicketsSection />
            )}

            {adminTab === 'faqs' && (
              <FAQSection onAskInChat={handleAskInChat} />
            )}
          </div>
        )}

      </main>

      {/* AI Assistant Chatbox */}
      <ChatAssistant
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenPriceList={handleViewPriceList}
        externalQueryTrigger={externalChatQuery}
        onNavigateToFAQ={handleOpenFAQ}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {currentRole === 'promoter' ? (
          <>
            <button
              onClick={() => navigateTo('posters')}
              className={`mobile-nav-item ${activeView === 'posters' ? 'active' : ''}`}
            >
              <Ticket size={18} />
              <span>Events</span>
            </button>

            <button
              onClick={() => navigateTo('waitlist')}
              className={`mobile-nav-item ${activeView === 'waitlist' ? 'active' : ''}`}
            >
              <Zap size={18} />
              <span>Waitlist</span>
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
              onClick={() => navigateTo('ledger')}
              className={`mobile-nav-item ${activeView === 'ledger' ? 'active' : ''}`}
            >
              <Receipt size={18} />
              <span>Ledger</span>
            </button>

            <button
              onClick={() => navigateTo('tickets')}
              className={`mobile-nav-item ${activeView === 'tickets' ? 'active' : ''}`}
            >
              <LifeBuoy size={18} color="#ec4899" />
              <span>Tickets</span>
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
              onClick={() => { setAdminTab('tickets'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${adminTab === 'tickets' ? 'active' : ''}`}
            >
              <LifeBuoy size={18} color="#ec4899" />
              <span>Tickets</span>
            </button>

            <button
              onClick={() => { setAdminTab('promoters'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`mobile-nav-item ${adminTab === 'promoters' ? 'active' : ''}`}
            >
              <Users size={18} />
              <span>Promoters</span>
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

      {/* Action Toasts & Realtime Live Activity FOMO Pulse */}
      <ToastContainer />
      <LiveActivityPopup onSelectEvent={(eId) => handleOpenSaleWithCategory(eId, null)} />

      {/* Working Cookie Consent Banner */}
      <CookieConsent onOpenPolicy={() => setIsLegalModalOpen(true)} />

      {/* Rich Footer with Founders, Internal Links & Helpline */}
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Brand Logo & Founders Attribution */}
            <div className="flex flex-col gap-2">
              <div 
                onClick={handleGoHome}
                className="flex items-center gap-2"
                style={{ cursor: 'pointer' }}
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
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                padding: '4px 14px',
                fontSize: '0.72rem',
                color: '#e4e4e7',
                display: 'inline-flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '6px',
                width: 'fit-content'
              }}>
                <span><strong>Ronak Jain R</strong> (Founder)</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span><strong>Prajwal Gowrish H S</strong> (Co-Founder)</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span><strong>Anshul S Balan</strong> (Co-Founder)</span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span><strong>Kanishk Jhunjhunwala</strong> (Co-Founder)</span>
              </div>
            </div>

            {/* Internal Links Column Matrix */}
            <div className="footer-nav-grid">
              <div className="footer-nav-col">
                <div className="footer-nav-title">
                  Platform
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigateTo('posters')} className="footer-link">Concerts & Passes</button>
                  <button onClick={() => navigateTo('tickets')} className="footer-link">Support Tickets</button>
                  <button onClick={() => navigateTo('waitlist')} className="footer-link">Campus Ambassador</button>
                  <button onClick={() => navigateTo('prices')} className="footer-link">Price Calculator</button>
                  <button onClick={() => navigateTo('rewards')} className="footer-link">Referral Rewards</button>
                </div>
              </div>

              <div className="footer-nav-col">
                <div className="footer-nav-title">
                  Company
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigateTo('about')} className="footer-link">About Us & Founders</button>
                  <button onClick={() => navigateTo('reviews')} className="footer-link">Verified Reviews</button>
                  <button onClick={() => navigateTo('contact')} className="footer-link">Contact & Help Desk</button>
                  <button onClick={() => navigateTo('support')} className="footer-link">Issue Resolution Center</button>
                </div>
              </div>

              <div className="footer-nav-col">
                <div className="footer-nav-title">
                  Trust & Security
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setIsLegalModalOpen(true)} className="footer-link">Compliance Policy</button>
                  <button onClick={() => setIsLegalModalOpen(true)} className="footer-link">Terms & Privacy</button>
                  <button onClick={handleOpenFAQ} className="footer-link">FAQ Center</button>
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
                v1.12.3
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

export default function App() {
  return (
    <AppProvider>
      <MainDashboard />
    </AppProvider>
  );
}
