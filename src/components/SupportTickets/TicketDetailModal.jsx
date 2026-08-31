import React, { useState } from 'react';
import { 
  X, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  LifeBuoy, 
  CornerDownRight,
  Phone,
  Mail,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TicketDetailModal = ({ ticket, isOpen, onClose }) => {
  const { replyToTicket, updateTicketStatus, escalateTicket, currentRole } = useApp();
  const [replyText, setReplyText] = useState('');
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalateReason, setEscalateReason] = useState('');

  if (!isOpen || !ticket) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    replyToTicket(ticket.id, replyText, currentRole === 'admin' ? 'support' : 'promoter');
    setReplyText('');
  };

  const handleEscalate = () => {
    escalateTicket(ticket.id, escalateReason);
    setIsEscalating(false);
    setEscalateReason('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: '#3b82f6' };
      case 'In Progress': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: '#f59e0b' };
      case 'Awaiting Reply': return { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6', border: '#ec4899' };
      case 'Escalated': return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', border: '#ef4444' };
      case 'Resolved': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: '#10b981' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: '#ffffff', border: 'var(--border-color)' };
    }
  };

  const sc = getStatusColor(ticket.status);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      background: 'rgba(5, 6, 8, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div 
        className="glass-card" 
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem',
          background: '#0d0f14',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
          animation: 'fadeInUp 0.25s ease-out',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ec4899', letterSpacing: '0.04em' }}>
                {ticket.ticketNumber || `#${ticket.id}`}
              </span>
              <span style={{
                background: sc.bg,
                color: sc.text,
                border: `1px solid ${sc.border}`,
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '0.68rem',
                fontWeight: 700
              }}>
                {ticket.status}
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#e4e4e7',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 600
              }}>
                {ticket.category}
              </span>
            </div>

            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
              {ticket.subject}
            </h2>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Raised by <strong>{ticket.promoterName}</strong> • {ticket.createdAt}
              {ticket.orderId && <span> • Ref: <code>{ticket.orderId}</code></span>}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Action Toolbar for Resolution / Escalation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '8px 12px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Status Actions:
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {ticket.status !== 'Resolved' && (
              <button
                onClick={() => updateTicketStatus(ticket.id, 'Resolved')}
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  border: '1px solid #10b981',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CheckCircle2 size={12} />
                <span>Mark Resolved</span>
              </button>
            )}

            {ticket.status !== 'Escalated' && ticket.status !== 'Resolved' && (
              <button
                onClick={() => setIsEscalating(!isEscalating)}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  border: '1px solid #ef4444',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Flame size={12} />
                <span>Escalate to Founders</span>
              </button>
            )}
          </div>
        </div>

        {/* Escalation Box if toggled */}
        {isEscalating && (
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '10px', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f87171', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={13} />
              <span>Direct Escalation to Executive Desk (Ronak Jain R & Prajwal H S)</span>
            </div>
            <input
              type="text"
              placeholder="Reason for escalation (e.g. Urgent concert gate entry in 2 hours)..."
              className="input-field"
              value={escalateReason}
              onChange={(e) => setEscalateReason(e.target.value)}
              style={{ fontSize: '0.75rem', padding: '6px 10px', marginBottom: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <button onClick={() => setIsEscalating(false)} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>Cancel</button>
              <button onClick={handleEscalate} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 12px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Confirm Escalation</button>
            </div>
          </div>
        )}

        {/* Message Thread Scroll Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingRight: '6px',
          marginBottom: '1rem'
        }}>
          {(ticket.messages || []).map((msg, i) => {
            const isSupport = msg.sender === 'support';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={i} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', fontSize: '0.74rem', color: '#f87171' }}>
                  {msg.text}
                </div>
              );
            }

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: isSupport ? 'flex-start' : 'flex-end',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '3px',
                  alignSelf: isSupport ? 'flex-start' : 'flex-end',
                  fontSize: '0.68rem',
                  color: isSupport ? '#60a5fa' : '#a1a1aa'
                }}>
                  {isSupport ? <ShieldCheck size={12} /> : <User size={12} />}
                  <strong>{msg.senderName}</strong>
                  <span>• {msg.timestamp}</span>
                </div>

                <div
                  style={{
                    background: isSupport ? 'rgba(30, 41, 59, 0.85)' : 'rgba(236, 72, 153, 0.15)',
                    border: isSupport ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    lineHeight: 1.5,
                    color: '#ffffff'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSendReply} style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.85rem' }}>
          <input
            type="text"
            placeholder={currentRole === 'admin' ? "Reply to promoter as Tixora Support..." : "Type your reply or additional details..."}
            className="input-field"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            style={{
              background: '#ec4899',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0 16px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Send size={14} />
            <span>Send</span>
          </button>
        </form>

      </div>
    </div>
  );
};
