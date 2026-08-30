import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  CheckCircle2,
  Plus,
  Zap
} from 'lucide-react';

export const AdminOverview = ({ activeTab, setActiveTab, onOpenCreateEvent }) => {
  const { events, promoters, sales } = useApp();

  const totalNetworkRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalTicketsIssued = sales.reduce((acc, s) => acc + s.quantity, 0);
  const totalCommissionsPaid = sales.reduce((acc, s) => acc + s.commissionEarned, 0);

  return (
    <div style={{ marginBottom: '2rem' }}>
      
      {/* Admin Title & Add Event CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div className="badge badge-rose" style={{ marginBottom: '6px' }}>
            Tixora Operations & Console
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>
            Master Administration
          </h1>
        </div>

        <button
          onClick={onOpenCreateEvent}
          className="btn btn-primary"
          style={{ padding: '8px 18px', gap: '6px', fontSize: '0.82rem' }}
        >
          <Plus size={15} /> Add Concert Event
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ marginBottom: '1.75rem' }}>
        
        {/* Total Network Volume */}
        <div className="glass-card">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Network GMV
            </span>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={15} color="#ffffff" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            ₹{totalNetworkRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            100% Upfront Settled & Verified
          </div>
        </div>

        {/* Total Tickets Delivered */}
        <div className="glass-card">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Passes Delivered
            </span>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={15} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em' }}>
            {totalTicketsIssued}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Across {events.length} active concerts
          </div>
        </div>

        {/* Active Promoters */}
        <div className="glass-card">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Campus Promoters
            </span>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={15} color="#3b82f6" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {promoters.length}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            100% DigiLocker Verified
          </div>
        </div>

        {/* Promoter Commissions */}
        <div className="glass-card">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Promoter Payouts
            </span>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={15} color="#ec4899" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f472b6', letterSpacing: '-0.02em' }}>
            ₹{totalCommissionsPaid.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Calculated & credited in real-time
          </div>
        </div>

      </div>

      {/* Admin Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem',
        overflowX: 'auto'
      }}>
        {[
          { id: 'events', label: 'Concert Inventory & Pricing', icon: <Ticket size={15} /> },
          { id: 'promoters', label: 'Promoter Network Directory', icon: <Users size={15} /> },
          { id: 'sales', label: 'Global Transactions Feed', icon: <TrendingUp size={15} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #ffffff' : '2px solid transparent',
              padding: '8px 16px',
              borderRadius: '6px 6px 0 0',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};
