import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Ticket, 
  CheckCircle2, 
  Copy, 
  Check, 
  QrCode,
  CreditCard,
  Building2,
  Lock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const RecordSaleModal = ({ isOpen, onClose, initialEventId = null, initialCategory = null }) => {
  const { events, recordNewSale, activePromoter, showToast } = useApp();

  const [eventId, setEventId] = useState(initialEventId || events[0]?.id || '');
  const [ticketCategory, setTicketCategory] = useState(initialCategory || '');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'Bank Transfer'
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [agreedToMRPPolicy, setAgreedToMRPPolicy] = useState(true);
  const [issuedTicketResult, setIssuedTicketResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

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

  const handlePayAndIssue = (e) => {
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
      showToast('Regulatory Limit: Maximum 10 tickets allowed per transaction under Section 269ST guidelines.', 'error');
      return;
    }

    setIsProcessingPayment(true);

    // Simulate instant secure payment clearance & BookMyShow/District ticket dispatch
    setTimeout(() => {
      const sale = recordNewSale({
        eventId,
        ticketCategory: priceItem.category,
        quantity,
        paymentMethod: paymentMethod === 'UPI' ? 'UPI Direct' : paymentMethod === 'Card' ? 'Card (Debit/Credit)' : 'Bank Transfer (IMPS/NEFT)',
        buyerName,
        buyerPhone
      });

      setIsProcessingPayment(false);
      setIssuedTicketResult(sale);
    }, 600);
  };

  const handleCopyTicketDetails = () => {
    if (!issuedTicketResult) return;
    const msg = `🎟️ *TIXORA OFFICIAL DIGITAL PASS*
Event: ${issuedTicketResult.eventName}
Category: ${issuedTicketResult.ticketCategory} (x${issuedTicketResult.quantity})
Pass Holder: ${issuedTicketResult.buyerName}
Entry Code: *${issuedTicketResult.ticketCode}*
Total Paid: ₹${issuedTicketResult.totalAmount.toLocaleString('en-IN')} (Official MRP incl. GST)
Payment Mode: ${issuedTicketResult.paymentMethod} (Paid & Cleared)
Delivery: Delivered directly to BookMyShow / District Account

*Present this pass code and your mobile number at venue gate.*`;

    navigator.clipboard.writeText(msg);
    setIsCopied(true);
    showToast('Digital Pass receipt copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleResetAndClose = () => {
    setIssuedTicketResult(null);
    setBuyerName('');
    setBuyerPhone('');
    setQuantity(1);
    setIsProcessingPayment(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{ maxWidth: '520px', width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
        
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
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
          <X size={16} />
        </button>

        {issuedTicketResult ? (
          /* ================= SUCCESS & ISSUED STATE ================= */
          <div style={{ padding: '0.5rem 0', textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#10b981'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
              Payment Verified • Pass Issued
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Digital Pass Dispatched!
            </h3>
            <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              Payment settled via <strong>{issuedTicketResult.paymentMethod}</strong>. Delivered directly to BookMyShow/District account.
            </p>

            {/* Pass Ticket Stub */}
            <div style={{
              background: 'rgba(0,0,0,0.65)',
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.25rem'
            }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem' }}>
                <span className="badge badge-emerald">Official Verified Pass</span>
                <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>
                  ✓ Instant Clearance
                </span>
              </div>

              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                {issuedTicketResult.eventName}
              </div>

              <div style={{ fontSize: '0.82rem', color: '#e4e4e7', marginBottom: '0.85rem' }}>
                {issuedTicketResult.ticketCategory} • Quantity: <strong>{issuedTicketResult.quantity}</strong>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.06)',
                padding: '8px 12px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.85rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Entry Pass Code</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.05em', color: '#ffffff' }}>
                    {issuedTicketResult.ticketCode}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Holder</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#e4e4e7' }}>
                    {issuedTicketResult.buyerName}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center" style={{ fontSize: '0.78rem' }}>
                <span className="text-muted">Total Paid Upfront:</span>
                <span style={{ fontWeight: 700, color: '#ffffff' }}>
                  ₹{issuedTicketResult.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center" style={{ fontSize: '0.78rem', marginTop: '4px' }}>
                <span className="text-muted">Your Instant Promoter Commission:</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>
                  +₹{issuedTicketResult.commissionEarned.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyTicketDetails}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: '9px',
                  fontSize: '0.82rem',
                  gap: '6px',
                  borderColor: isCopied ? '#10b981' : 'var(--border-color)',
                  color: isCopied ? '#10b981' : '#ffffff'
                }}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                {isCopied ? 'Receipt Copied' : 'Copy Buyer Receipt'}
              </button>

              <button
                onClick={handleResetAndClose}
                className="btn btn-primary"
                style={{ flex: 1, padding: '9px', fontSize: '0.82rem' }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* ================= FORM & UPFRONT PAYMENT SELECTION ================= */
          <form onSubmit={handlePayAndIssue}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Ticket size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Pay & Issue Digital Pass</h3>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Pay via Card, UPI, or Bank Transfer • Ticket issues immediately on payment
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

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">Quantity (Max 10 passes)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="form-input"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Select Payment Method</span>
                <span style={{ color: '#34d399', fontSize: '0.7rem' }}>🔒 Instant Verification</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`btn ${paymentMethod === 'UPI' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 4px', fontSize: '0.76rem', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}
                >
                  <QrCode size={16} />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`btn ${paymentMethod === 'Card' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 4px', fontSize: '0.76rem', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}
                >
                  <CreditCard size={16} />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Bank Transfer')}
                  className={`btn ${paymentMethod === 'Bank Transfer' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '8px 4px', fontSize: '0.76rem', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}
                >
                  <Building2 size={16} />
                  <span>Bank (IMPS)</span>
                </button>
              </div>
            </div>

            {/* Buyer Info */}
            <div className="form-group">
              <label className="form-label">Buyer Full Name (BookMyShow / District Account Name)</label>
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
              <label className="form-label">Buyer WhatsApp / Phone (For Digital Ticket Delivery)</label>
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
              gap: '6px',
              fontSize: '0.82rem'
            }}>
              <div className="flex justify-between">
                <span className="text-muted">Total Payable Amount:</span>
                <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.05rem' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Your Authorized Promoter Cut:</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>+₹{commissionEarned.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: '#93c5fd', marginTop: '2px' }}>
                ⚡ Payment is settled via <strong>{paymentMethod}</strong>. The ticket is immediately generated and delivered to the buyer's account upon completion.
              </div>
            </div>

            {/* Anti-Scalping & Legal Confirmation */}
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
                <strong>Official MRP & Instant Delivery Guarantee:</strong> I confirm this pass is purchased strictly at official organizer MRP.
              </label>
            </div>

            {/* Submit & Pay Button */}
            <button
              type="submit"
              disabled={isProcessingPayment || !agreedToMRPPolicy}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.92rem', gap: '8px' }}
            >
              {isProcessingPayment ? (
                <span>Verifying Payment & Issuing Pass...</span>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Pay ₹{totalAmount.toLocaleString('en-IN')} & Issue Pass</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
