import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
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
  Scale
} from 'lucide-react';
import './index.css';

const PromoterCommissionRules = () => {
  const { commissionTiers, activePromoter } = useApp();

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
          Commission Tiers & Promoter Privileges
        </h2>
        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          Sell tickets to your campus network, climb tiers, and unlock VIP access and higher profit cuts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  fontSize: '0.68rem',
                  padding: '2px 9px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Your Active Tier
                </div>
              )}

              <div style={{ marginBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                  {tier.tier}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {tier.ticketRange}
                </div>
              </div>

              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '1rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Commission Rate
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>
                  {tier.commissionRange}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>per ticket sold</div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Privileges & Rewards
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: '#e4e4e7' }}>
                      <CheckCircle2 size={14} color="#ffffff" style={{ flexShrink: 0 }} />
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Universal Header */}
      <Header
        onOpenRecordSale={() => handleOpenSaleWithCategory(null, null)}
        onOpenCreateEvent={handleAddNewEvent}
        onOpenLegalCompliance={() => setIsLegalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container section" style={{ flex: 1, paddingTop: '1.5rem' }}>
        
        {/* ================= PROMOTER DASHBOARD ================= */}
        {currentRole === 'promoter' ? (
          <div>
            
            {/* Top KPI Strip */}
            <PromoterOverview
              onOpenDepositModal={() => setIsDepositModalOpen(true)}
            />

            {/* Promoter Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '0.35rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '0.4rem',
              marginBottom: '1.75rem',
              overflowX: 'auto'
            }}>
              {[
                { id: 'posters', label: 'Events & Posters', icon: <Ticket size={16} /> },
                { id: 'prices', label: 'Price Lists & Calculator', icon: <Tag size={16} /> },
                { id: 'ledger', label: 'My Sales Ledger', icon: <Receipt size={16} /> },
                { id: 'tiers', label: 'Tier Milestones', icon: <Award size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPromoterTab(tab.id)}
                  style={{
                    background: promoterTab === tab.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    color: promoterTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                    border: 'none',
                    borderBottom: promoterTab === tab.id ? '2px solid #ffffff' : '2px solid transparent',
                    padding: '8px 16px',
                    borderRadius: '6px 6px 0 0',
                    fontSize: '0.85rem',
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

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.75rem 0',
        background: '#07080a',
        marginTop: 'auto'
      }}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div style={{
              width: '24px', height: '24px', borderRadius: '6px',
              background: '#ffffff',
              color: '#090a0d',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Ticket size={14} strokeWidth={2.2} />
            </div>
            <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Tixora
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} color="#10b981" /> 100% DigiLocker Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Anti-Scalping Protected (MRP Only)
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
                gap: '4px'
              }}
            >
              <Scale size={13} /> Legal & Regulatory Policy
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
