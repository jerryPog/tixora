import React, { useState, useMemo } from 'react';
import { 
  LifeBuoy, 
  Plus, 
  Search, 
  CreditCard, 
  Coins, 
  Ticket, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUp,
  Inbox,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RaiseTicketModal } from './RaiseTicketModal';
import { TicketDetailModal } from './TicketDetailModal';

export const SupportTicketsSection = () => {
  const { tickets = [], currentRole } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState('All'); // 'All' | 'Open' | 'In Progress' | 'Awaiting Reply' | 'Escalated' | 'Resolved'
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [starterCategory, setStarterCategory] = useState(null);
  const [starterSubject, setStarterSubject] = useState(null);

  // Compute Live Metrics
  const metrics = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
    const awaiting = tickets.filter(t => t.status === 'Awaiting Reply' || t.status === 'Escalated').length;
    const resolved = tickets.filter(t => t.status === 'Resolved').length;

    return { total, open, awaiting, resolved };
  }, [tickets]);

  // Filter Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchSearch = 
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.orderId && t.orderId.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchSearch) return false;

      if (activeStatusFilter === 'All') return true;
      if (activeStatusFilter === 'Open') return t.status === 'Open';
      if (activeStatusFilter === 'In Progress') return t.status === 'In Progress';
      if (activeStatusFilter === 'Awaiting Reply') return t.status === 'Awaiting Reply';
      if (activeStatusFilter === 'Escalated') return t.status === 'Escalated';
      if (activeStatusFilter === 'Resolved') return t.status === 'Resolved';

      return true;
    });
  }, [tickets, searchQuery, activeStatusFilter]);

  const handleQuickStarter = (cat, defaultSub) => {
    setStarterCategory(cat);
    setStarterSubject(defaultSub);
    setIsRaiseModalOpen(true);
  };

  const handleOpenNewTicket = () => {
    setStarterCategory(null);
    setStarterSubject(null);
    setIsRaiseModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Open':
        return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: '#3b82f6' };
      case 'In Progress':
        return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: '#f59e0b' };
      case 'Awaiting Reply':
        return { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6', border: '#ec4899' };
      case 'Escalated':
        return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', border: '#ef4444' };
      case 'Resolved':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: '#10b981' };
      default:
        return { bg: 'rgba(255, 255, 255, 0.1)', text: '#ffffff', border: 'var(--border-color)' };
    }
  };

  const statusFilters = ['All', 'Open', 'In Progress', 'Awaiting Reply', 'Escalated', 'Resolved'];

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '4.5rem', position: 'relative' }}>
      
      {/* 1. Header Section */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '0.75rem' }}>
          
          {/* Lifebuoy Emblem Icon */}
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(236, 72, 153, 0.12)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ec4899',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)'
          }}>
            <LifeBuoy size={24} />
          </div>

          <div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}>
              Support Tickets
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Raise issues, track replies, and escalate when needed.
            </p>
          </div>

        </div>

        {/* Raise New Ticket Action Button */}
        <button
          onClick={handleOpenNewTicket}
          style={{
            background: '#ec4899',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '10px 22px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 18px rgba(236, 72, 153, 0.35)',
            transition: 'all 0.2s ease',
            marginTop: '0.5rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Plus size={16} strokeWidth={3} />
          <span>Raise New Ticket</span>
        </button>
      </div>

      {/* 2. 4 Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5" style={{ marginBottom: '1.5rem' }}>
        
        {/* Total Tickets */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.1rem 1.25rem', 
            borderRadius: '14px', 
            borderTop: '3px solid #ec4899',
            background: 'rgba(23, 27, 36, 0.65)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ec4899', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Inbox size={14} />
            <span>TOTAL TICKETS</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {metrics.total}
          </div>
        </div>

        {/* Open */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.1rem 1.25rem', 
            borderRadius: '14px', 
            borderTop: '3px solid #3b82f6',
            background: 'rgba(23, 27, 36, 0.65)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <AlertCircle size={14} />
            <span>OPEN</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {metrics.open}
          </div>
        </div>

        {/* Awaiting Your Reply */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.1rem 1.25rem', 
            borderRadius: '14px', 
            borderTop: '3px solid #f59e0b',
            background: 'rgba(23, 27, 36, 0.65)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Clock size={14} />
            <span>AWAITING YOUR REPLY</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {metrics.awaiting}
          </div>
        </div>

        {/* Resolved */}
        <div 
          className="glass-card" 
          style={{ 
            padding: '1.1rem 1.25rem', 
            borderRadius: '14px', 
            borderTop: '3px solid #10b981',
            background: 'rgba(23, 27, 36, 0.65)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <CheckCircle2 size={14} />
            <span>RESOLVED</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
            {metrics.resolved}
          </div>
        </div>

      </div>

      {/* 3. Search & Filter Bar Card */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.25rem', 
          borderRadius: '14px', 
          marginBottom: '1.75rem',
          background: 'rgba(23, 27, 36, 0.5)'
        }}
      >
        {/* Search Input Box */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search 
            size={16} 
            color="var(--text-muted)" 
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            placeholder="Search by ticket number or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(13, 16, 23, 0.8)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '10px 14px 10px 38px',
              color: '#ffffff',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* Filter Pills Horizontal Scroller */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {statusFilters.map((filter) => {
            const isActive = activeStatusFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveStatusFilter(filter)}
                style={{
                  background: isActive ? '#ec4899' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid #ec4899' : '1px solid var(--border-color)',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Tickets List OR Empty State */}
      {filteredTickets.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredTickets.map((t) => {
            const badge = getStatusBadge(t.status);
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className="glass-card card-interactive"
                style={{
                  padding: '1.25rem',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#ec4899' }}>
                      {t.ticketNumber || `#${t.id}`}
                    </span>
                    <span style={{
                      background: badge.bg,
                      color: badge.text,
                      border: `1px solid ${badge.border}`,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '0.66rem',
                      fontWeight: 700
                    }}>
                      {t.status}
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: '#a1a1aa',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.66rem'
                    }}>
                      {t.category}
                    </span>
                    {t.priority === 'Urgent' && (
                      <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 6px', borderRadius: '4px', fontSize: '0.64rem', fontWeight: 700 }}>
                        URGENT
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                    {t.subject}
                  </h3>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', gap: '10px' }}>
                    <span>Created: {t.createdAt}</span>
                    <span>• Updated: {t.updatedAt}</span>
                    <span>• {t.messages?.length || 1} messages</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontSize: '0.78rem', fontWeight: 600 }}>
                  <span>View Thread</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State with Quick Starter Cards (Matching Image 1 & 2) */
        <div 
          className="glass-card" 
          style={{ 
            padding: '2.5rem 1.5rem', 
            borderRadius: '16px', 
            textAlign: 'center',
            background: 'rgba(23, 27, 36, 0.45)',
            border: '1px solid var(--border-color)'
          }}
        >
          {/* Lifebuoy Center Icon */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'rgba(236, 72, 153, 0.12)',
            border: '1px solid rgba(236, 72, 153, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ec4899',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 25px rgba(236, 72, 153, 0.25)'
          }}>
            <LifeBuoy size={30} />
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>
            No support tickets yet
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.5 }}>
            Our team is ready to help. Raise a ticket and we'll get back to you within hours.
          </p>

          {/* Quick Issue Starter Templates Grid (From Image 2) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '480px', margin: '0 auto 2rem' }}>
            
            {/* 1. Refund stuck? */}
            <div
              onClick={() => handleQuickStarter('Booking / Refund', 'Refund stuck for recent booking')}
              className="card-interactive"
              style={{
                background: 'rgba(13, 16, 23, 0.75)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.1rem 1.25rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div style={{ fontSize: '1.4rem' }}>💳</div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#ffffff' }}>
                  Refund stuck?
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Booking / Refund
                </div>
              </div>
            </div>

            {/* 2. Partner discount not received? */}
            <div
              onClick={() => handleQuickStarter('Partner Discount', 'Partner discount not received on group booking')}
              className="card-interactive"
              style={{
                background: 'rgba(13, 16, 23, 0.75)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.1rem 1.25rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div style={{ fontSize: '1.4rem' }}>💰</div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#ffffff' }}>
                  Partner discount not received?
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Partner Discount
                </div>
              </div>
            </div>

            {/* 3. Inventory issue? */}
            <div
              onClick={() => handleQuickStarter('Inventory', 'Inventory quota allocation issue')}
              className="card-interactive"
              style={{
                background: 'rgba(13, 16, 23, 0.75)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.1rem 1.25rem',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div style={{ fontSize: '1.4rem' }}>🎫</div>
              <div>
                <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#ffffff' }}>
                  Inventory issue?
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Inventory
                </div>
              </div>
            </div>

          </div>

          {/* Raise New Ticket Bottom Button */}
          <button
            onClick={handleOpenNewTicket}
            style={{
              background: '#ec4899',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '11px 26px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 18px rgba(236, 72, 153, 0.35)'
            }}
          >
            <Plus size={16} strokeWidth={3} />
            <span>Raise New Ticket</span>
          </button>
        </div>
      )}

      {/* 5. Floating Scroll to Top Button (from screenshot bottom-right) */}
      <button
        onClick={scrollToTop}
        title="Scroll to top"
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '24px',
          zIndex: 900,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: '#181b24',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <ArrowUp size={18} />
      </button>

      {/* Raise Ticket Modal */}
      <RaiseTicketModal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        initialCategory={starterCategory}
        initialSubject={starterSubject}
      />

      {/* Ticket Detail Conversation Modal */}
      {selectedTicket && (
        <TicketDetailModal
          ticket={tickets.find(t => t.id === selectedTicket.id) || selectedTicket}
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

    </div>
  );
};
