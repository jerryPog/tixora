import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Ticket, 
  CheckCircle2, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  AlertCircle,
  Lock
} from 'lucide-react';

export const RecordSaleModal = ({ isOpen, onClose, initialEventId, initialCategory }) => {
  const { events, activePromoter, recordNewSale, showToast } = useApp();

  const [eventId, setEventId] = useState(initialEventId || events[0]?.id);
  const [ticketCategory, setTicketCategory] = useState(initialCategory || '');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [agreedToMRPPolicy, setAgreedToMRPPolicy] = useState(true);
  const [issuedTicketResult, setIssuedTicketResult] = useState(null);

  useEffect(() => {
    if (initialEventId) setEventId(initialEventId);
    const ev = events.find((e) => e.id === (initialEventId || eventId));
    if (ev && ev.priceList.length > 0) {
      setTicketCategory(initialCategory || ev.priceList[0].category);
    }
  }, [initialEventId, initialCategory, isOpen]);

  if (!isOpen) return null;

  const currentEvent = events.find((e) => e.id === eventId) || events[0];
  const priceItem = currentEvent?.priceList.find((p) => p.category === ticketCategory) || currentEvent?.priceList[0];

  const totalAmount = (priceItem?.promoterPrice || 0) * quantity;
  const commissionEarned = Math.round((priceItem?.commissionAmount || 0) * quantity);
  const remainingCredit = Math.max(0, activePromoter.creditLimit - activePromoter.creditUsed);
  const hasEnoughCredit = remainingCredit >= quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim()) {
      showToast('Please enter buyer name and mobile number', 'error');
      return;
    }

    if (!agreedToMRPPolicy) {
      showToast('You must confirm that this ticket is sold at official MRP without unauthorized markups.', 'error');
      return;
    }

    if (quantity > 10) {
      showToast('Regulatory Limit: Maximum 10 tickets allowed per individual transaction under Section 269ST guidelines.', 'error');
      return;
    }

    if (activePromoter.depositStatus === 'Suspended') {
      showToast('Account suspended due to overdue deposits. Please settle cash first.', 'error');
      return;
    }

    if (!hasEnoughCredit) {
      showToast(`Credit limit exceeded! You have ${remainingCredit} ticket credits remaining.`, 'error');
      return;
    }

    const sale = recordNewSale({
      eventId,
      ticketCategory: priceItem.category,
      quantity,
      paymentMethod,
      buyerName,
      buyerPhone
    });

    setIssuedTicketResult(sale);
  };

  const handleCopyTicketDetails = () => {
    if (!issuedTicketResult) return;
    const msg = `🎟️ *TIXORA OFFICIAL DIGITAL PASS*
Event: ${issuedTicketResult.eventName}
Category: ${issuedTicketResult.ticketCategory} (x${issuedTicketResult.quantity})
Pass Holder: ${issuedTicketResult.buyerName}
Entry Code: *${issuedTicketResult.ticketCode}*
Price Paid: ₹${issuedTicketResult.totalAmount.toLocaleString('en-IN')} (Official MRP incl. GST)
Status: DigiLocker Verified & Active
Entry: Present this digital pass QR code at the gate at ${currentEvent.venue}.
*Resale above MRP is strictly illegal.*`;

    navigator.clipboard.writeText(msg);
    showToast('Digital pass copied to clipboard for WhatsApp!', 'success');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '520px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIssuedTicketResult(null);
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#ffffff',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {/* Issued Result View */}
        {issuedTicketResult ? (
          <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.12)', color: '#10b981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem', border: '1px solid rgba(16, 185, 129, 0.25)'
            }}>
              <CheckCircle2 size={30} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Official Pass Issued & Logged!
            </h3>
            <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              Registered on Tixora with DigiLocker verified digital security.
            </p>

            {/* Ticket Pass Preview Card */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px dashed var(--border-color)',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.25rem'
            }}>
              <div className="flex justify-between items-start" style={{ marginBottom: '0.85rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> TIXORA OFFICIAL DIGITAL PASS (MRP LOCKED)
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                    {issuedTicketResult.eventName}
                  </div>
                </div>
                <div>
                  <QrCode size={36} color="#ffffff" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" style={{ fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.72rem' }}>Attendee:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>{issuedTicketResult.buyerName}</div>
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.72rem' }}>Category:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>{issuedTicketResult.ticketCategory} (x{issuedTicketResult.quantity})</div>
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.72rem' }}>Amount Collected:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>₹{issuedTicketResult.totalAmount.toLocaleString('en-IN')} (incl. GST)</div>
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.72rem' }}>Promoter Commission:</span>
                  <div style={{ fontWeight: 700, color: '#10b981' }}>+₹{issuedTicketResult.commissionEarned.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '8px 12px',
                borderRadius: '8px',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '1px'
              }}>
                {issuedTicketResult.ticketCode}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyTicketDetails}
                className="btn btn-primary"
                style={{ flex: 1, gap: '6px' }}
              >
                <Copy size={15} /> Copy Pass for WhatsApp
              </button>

              <button
                onClick={() => {
                  setIssuedTicketResult(null);
                  setBuyerName('');
                  setBuyerPhone('');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Issue Another
              </button>
            </div>
          </div>
        ) : (
          /* Issuance Form */
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Ticket size={18} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Issue Digital Pass</h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Authorized promoter credit • Exact MRP only (Anti-Scalping Enforced)
                </div>
              </div>
            </div>

            {/* Event Selection */}
            <div className="form-group">
              <label className="form-label">Concert / Event</label>
              <select
                className="form-select"
                value={eventId}
                onChange={(e) => {
                  setEventId(e.target.value);
                  const ev = events.find((x) => x.id === e.target.value);
                  if (ev && ev.priceList.length) setTicketCategory(ev.priceList[0].category);
                }}
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.name} ({ev.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Ticket Tier */}
            <div className="form-group">
              <label className="form-label">Ticket Category (Published MRP)</label>
              <select
                className="form-select"
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value)}
              >
                {currentEvent?.priceList.map((p) => (
                  <option key={p.id} value={p.category}>
                    {p.category} — ₹{p.promoterPrice.toLocaleString('en-IN')} (incl. GST | Earn ₹{p.commissionAmount}/tkt)
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity & Payment Mode */}
            <div className="grid grid-cols-2 gap-3">
              <div className="form-group">
                <label className="form-label">Quantity (Max 10/txn)</label>
                <input
                  type="number"
                  min="1"
                  max={Math.min(10, remainingCredit || 1)}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Mode</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash')}
                    className={`btn ${paymentMethod === 'Cash' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}
                  >
                    Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI / Online')}
                    className={`btn ${paymentMethod === 'UPI / Online' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, padding: '7px', fontSize: '0.78rem' }}
                  >
                    UPI
                  </button>
                </div>
              </div>
            </div>

            {/* Buyer Info */}
            <div className="form-group">
              <label className="form-label">Buyer Full Name (For Ticket Accreditation)</label>
              <input
                type="text"
                placeholder="e.g. Yash Malhotra"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Buyer WhatsApp / Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Financial Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '9px',
              padding: '10px 14px',
              margin: '0.85rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              fontSize: '0.82rem'
            }}>
              <div className="flex justify-between">
                <span className="text-muted">Total Face Value to Collect:</span>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>₹{totalAmount.toLocaleString('en-IN')} (incl. GST)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Your Authorized Commission:</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>+₹{commissionEarned.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Remaining Ticket Credit:</span>
                <span style={{ color: hasEnoughCredit ? '#ffffff' : '#f43f5e', fontWeight: 600 }}>
                  {remainingCredit} passes available
                </span>
              </div>
            </div>

            {/* Anti-Scalping & Legal Confirmation Checkbox */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '8px',
              padding: '8px 10px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <input
                type="checkbox"
                id="antiScalp"
                checked={agreedToMRPPolicy}
                onChange={(e) => setAgreedToMRPPolicy(e.target.checked)}
                style={{ marginTop: '3px', accentColor: '#10b981', cursor: 'pointer' }}
                required
              />
              <label htmlFor="antiScalp" style={{ fontSize: '0.74rem', color: '#e4e4e7', cursor: 'pointer', lineHeight: 1.35 }}>
                <strong>Anti-Black Marketing Guarantee:</strong> I declare that this pass is sold strictly at official organizer MRP without any unauthorized extra markup or scalping fee.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!hasEnoughCredit || !agreedToMRPPolicy || activePromoter.depositStatus === 'Suspended'}
              className="btn btn-primary"
              style={{ width: '100%', padding: '11px', fontSize: '0.9rem', gap: '6px' }}
            >
              <CheckCircle2 size={16} /> Issue & Deliver Official Pass
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
