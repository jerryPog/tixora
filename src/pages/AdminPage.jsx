import React, { useState } from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { AdminOverview } from '../components/AdminDashboard/AdminOverview';
import { EventManager } from '../components/AdminDashboard/EventManager';
import { PromoterManager } from '../components/AdminDashboard/PromoterManager';
import { AllSalesMonitor } from '../components/AdminDashboard/AllSalesMonitor';
import { SupportTicketsSection } from '../components/SupportTickets/SupportTicketsSection';
import { FAQSection } from '../components/FAQSection';
import { Ticket, Users, TrendingUp, LifeBuoy, HelpCircle, ShieldAlert } from 'lucide-react';

export const AdminPage = ({ onAddNewEvent, onEditEvent, onAskInChat }) => {
  const [adminTab, setAdminTab] = useState('events'); // 'events' | 'promoters' | 'sales' | 'tickets' | 'faqs'

  usePageSEO('admin');

  return (
    <div className="admin-page-container" style={{ paddingBottom: '3.5rem' }}>
      <AdminOverview
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        onOpenCreateEvent={onAddNewEvent}
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
            onOpenCreateEvent={onAddNewEvent}
            onEditEvent={onEditEvent}
          />
          <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem' }}>
            <FAQSection onAskInChat={onAskInChat} />
          </div>
        </>
      )}

      {adminTab === 'promoters' && <PromoterManager />}

      {adminTab === 'sales' && <AllSalesMonitor />}

      {adminTab === 'tickets' && <SupportTicketsSection />}

      {adminTab === 'faqs' && <FAQSection onAskInChat={onAskInChat} />}
    </div>
  );
};
