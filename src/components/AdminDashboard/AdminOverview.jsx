import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Banknote, 
  Ticket, 
  AlertTriangle, 
  TrendingUp, 
  CalendarPlus,
  Plus
} from 'lucide-react';

export const AdminOverview = ({ activeTab, setActiveTab, onOpenCreateEvent }) => {
  const { events, promoters, sales } = useApp();

  const totalNetworkRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalTicketsIssued = sales.reduce((acc, s) => acc + s.quantity, 0);
  const totalCashInField = promoters.reduce((acc, p) => acc + p.cashOwed, 0);
  const suspendedCount = promoters.filter((p) => p.depositStatus === 'Suspended').length;
  const overdueCount = promoters.filter((p) => p.depositStatus === 'Overdue').length;

  return (
    <div style={{ marginBottom: '2rem' }}>
      
      {/* Admin Title & Add Event CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ marginBottom: '1.5rem' }}>
        <div>
          <div className="badge badge-rose" style={{ marginBottom: '6px' }}>
            Tixora Operations & Escrow Console
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
            {totalTicketsIssued} passes sold across {events.length} concerts
          </div>
        </div>

        {/* Cash in Field */}
        <div className="glass-card">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Cash In Field (Risk)
            </span>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Banknote size={15} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.02em' }}>
            ₹{totalCashInField.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Unsettled cash across {promoters.length} promoters
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

        {/* Risk Alerts */}
        <div className="glass-card">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Risk Exposure
            </span>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={15} color="#f43f5e" />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: overdueCount > 0 ? '#f43f5e' : '#10b981', letterSpacing: '-0.02em' }}>
            {overdueCount} Overdue
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {suspendedCount} currently suspended
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
          { id: 'promoters', label: 'Promoter Directory & Settlements', icon: <Users size={15} /> },
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
