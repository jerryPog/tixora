import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Ticket, 
  Copy, 
  Check, 
  Share2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Download,
  Home,
  Receipt
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ThankYouPage = ({ orderData, onNavigateToHome, onNavigateToLedger }) => {
  const { showToast } = useApp();
  const [copiedTicket, setCopiedTicket] = useState(false);

  const isWaitlist = orderData?.type === 'waitlist';
  const ticketCode = orderData?.ticketCode || 'TXR-GNR-8942-VERIFIED';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(ticketCode);
    setCopiedTicket(true);
    showToast('Pass verification code copied!', 'success');
    setTimeout(() => setCopiedTicket(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = isWaitlist
      ? `🎉 I just applied for the official Tixora Campus Ambassador network for 2026 concerts! Check it out: https://tixora.in/#waitlist`
      : `🎟️ Verified Concert Ticket Issued via Tixora! Code: ${ticketCode}. See you at the arena!`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1rem 0 3.5rem' }}>
      
      {/* Top Celebratory Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.15)',
          color: '#10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          boxShadow: '0 0 24px rgba(16, 185, 129, 0.3)'
        }}>
          <CheckCircle2 size={36} strokeWidth={2.4} />
        </div>

        <h1 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
          {isWaitlist ? 'Application Received! You’re on the List.' : 'Ticket Pass Issued & Verified!'}
        </h1>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto' }}>
          {isWaitlist
            ? `Thank you, ${orderData?.name || 'Ambassador'}. Your application for ${orderData?.college || 'your campus'} has been logged into the intake queue.`
            : `Digital authorization pass has been generated and dispatched to buyer's registered WhatsApp and BookMyShow account.`}
        </p>
      </div>

      {/* Main Pass / Summary Card */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '1.75rem', 
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(18, 20, 26, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '1.5rem',
          borderRadius: '16px'
        }}
      >
        {isWaitlist ? (
          /* Waitlist Summary */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{
              background: '#090a0d',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Your Waitlist Queue Position
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>
                #{orderData?.position || '142'}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Sparkles size={13} />
                <span>Priority Review Status Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3" style={{ fontSize: '0.78rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)' }}>Registered Name</div>
                <div style={{ fontWeight: 700, color: '#fff' }}>{orderData?.name || 'Rahul Sharma'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)' }}>Campus / City</div>
                <div style={{ fontWeight: 700, color: '#fff' }}>{orderData?.college || 'Delhi University'} • {orderData?.city || 'Delhi'}</div>
              </div>
            </div>
          </div>
        ) : (
          /* Ticket Pass Digital Voucher */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '1rem' }}>
              <div>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#10b981',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  Official Pass Issued
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px' }}>
                  {orderData?.eventName || "Guns N' Roses — Bengaluru"}
                </h2>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {orderData?.category || "Silver (Phase 1)"} • {orderData?.quantity || 1} Pass(es)
                </div>
              </div>

              {/* QR Mockup */}
              <div style={{
                background: '#ffffff',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=TIXORA-VERIFIED-PASS"
                  alt="Verified Digital Ticket QR Code for Entry Authorization"
                  style={{ width: '60px', height: '60px', display: 'block' }}
                />
              </div>
            </div>

            {/* Verification Code Box */}
            <div style={{
              background: '#090a0d',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Cryptographic Pass ID
                </div>
                <code style={{ fontSize: '0.92rem', fontWeight: 700, color: '#60a5fa', fontFamily: 'monospace' }}>
                  {ticketCode}
                </code>
              </div>

              <button
                onClick={handleCopyCode}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.74rem', gap: '4px' }}
                aria-label="Copy Ticket Code"
              >
                {copiedTicket ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedTicket ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" style={{ fontSize: '0.76rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)' }}>Buyer</div>
                <div style={{ fontWeight: 700, color: '#fff' }}>{orderData?.buyerName || 'Rohan Varma'}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)' }}>Amount Paid</div>
                <div style={{ fontWeight: 700, color: '#10b981' }}>₹{(orderData?.totalAmount || 4000).toLocaleString('en-IN')}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '8px' }}>
                <div style={{ color: 'var(--text-muted)' }}>Commission Earned</div>
                <div style={{ fontWeight: 700, color: '#f59e0b' }}>+₹{(orderData?.commission || 300).toLocaleString('en-IN')}</div>
              </div>
            </div>

          </div>
        )}

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>DigiLocker & Official Partner Verified</span>
          </div>

          <button
            onClick={handleShareWhatsApp}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '6px', color: '#34d399' }}
          >
            <Share2 size={13} />
            <span>Share Confirmation</span>
          </button>
        </div>

      </div>

      {/* Navigation Options */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={onNavigateToHome}
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.84rem', gap: '6px' }}
        >
          <Home size={15} />
          <span>Return to Concert Lineup</span>
        </button>

        {onNavigateToLedger && (
          <button
            onClick={onNavigateToLedger}
            className="btn btn-secondary"
            style={{ padding: '10px 18px', fontSize: '0.84rem', gap: '6px' }}
          >
            <Receipt size={15} />
            <span>View My Sales Ledger</span>
          </button>
        )}
      </div>

    </div>
  );
};
