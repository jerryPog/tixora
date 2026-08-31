import React, { useState } from 'react';
import { 
  X, 
  LifeBuoy, 
  Send, 
  CreditCard, 
  Coins, 
  Ticket, 
  ShieldCheck, 
  Smartphone, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RaiseTicketModal = ({ isOpen, onClose, initialCategory = null, initialSubject = null }) => {
  const { raiseTicket, activePromoter, events } = useApp();

  const [category, setCategory] = useState(initialCategory || 'Booking / Refund');
  const [subject, setSubject] = useState(initialSubject || '');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update if initial props change
  React.useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
    if (initialSubject) setSubject(initialSubject);
  }, [initialCategory, initialSubject]);

  if (!isOpen) return null;

  const categories = [
    { label: 'Booking / Refund', icon: <CreditCard size={15} color="#ec4899" /> },
    { label: 'Partner Discount', icon: <Coins size={15} color="#f59e0b" /> },
    { label: 'Inventory', icon: <Ticket size={15} color="#60a5fa" /> },
    { label: 'DigiLocker Verification', icon: <ShieldCheck size={15} color="#10b981" /> },
    { label: 'Pass Delivery (BMS / District)', icon: <Smartphone size={15} color="#a855f7" /> },
    { label: 'General Inquiry', icon: <LifeBuoy size={15} color="#e4e4e7" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      raiseTicket({
        category,
        subject,
        description,
        priority,
        orderId
      });
      setIsSubmitting(false);
      onClose();
      // Reset form
      setSubject('');
      setDescription('');
      setOrderId('');
    }, 400);
  };

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
          maxWidth: '560px',
          padding: '1.75rem',
          background: '#0d0f14',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
          animation: 'fadeInUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(236, 72, 153, 0.15)',
              border: '1px solid rgba(236, 72, 153, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ec4899'
            }}>
              <LifeBuoy size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                Raise Support Ticket
              </h2>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Tixora Executive Resolution Desk • Average reply under 15 mins
              </p>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          
          {/* Issue Category Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '6px' }}>
              Select Issue Category *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '6px' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCategory(cat.label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: category === cat.label ? 'rgba(236, 72, 153, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                    border: category === cat.label ? '1px solid #ec4899' : '1px solid var(--border-color)',
                    color: category === cat.label ? '#ffffff' : 'var(--text-muted)',
                    textAlign: 'left'
                  }}
                >
                  {cat.icon}
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject & Order Reference in 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '4px' }}>
                Subject / Issue Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Refund stuck for Phase 1 transaction"
                className="input-field"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '4px' }}>
                Order / Ref ID (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., ORD-9814"
                className="input-field"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '4px' }}>
              Urgency / Priority
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: priority === p ? (p === 'Urgent' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(236, 72, 153, 0.2)') : 'rgba(255,255,255,0.03)',
                    border: priority === p ? (p === 'Urgent' ? '1px solid #ef4444' : '1px solid #ec4899') : '1px solid var(--border-color)',
                    color: priority === p ? '#ffffff' : 'var(--text-muted)'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Message */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#e4e4e7', marginBottom: '4px' }}>
              Detailed Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your issue with exact transaction amounts, buyer contact, or concert details..."
              className="input-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Footer Submit Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '9px 16px', fontSize: '0.82rem' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: '#ec4899',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '9px 20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)'
              }}
            >
              {isSubmitting ? <span>Creating Ticket...</span> : (
                <>
                  <Send size={14} />
                  <span>Submit Ticket</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
