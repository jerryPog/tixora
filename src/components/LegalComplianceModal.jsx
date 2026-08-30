import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Scale, 
  FileText, 
  Lock, 
  CheckCircle2, 
  X,
  Users,
  Phone
} from 'lucide-react';

export const LegalComplianceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '1.75rem'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#ffffff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Scale size={20} color="#10b981" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
              Legal, Tax & Regulatory Policy
            </h3>
            <p className="text-muted" style={{ fontSize: '0.78rem' }}>
              Tixora Technologies • Compliant with Indian Law (Consumer Protection Act 2019, IT Act 2000, Income Tax Act 1961)
            </p>
          </div>
        </div>

        {/* Founders Accreditation & Direct Helpline Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div className="flex items-center gap-2">
            <Users size={16} color="#38bdf8" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Leadership:</span>
            <span style={{ fontSize: '0.8rem', color: '#e4e4e7' }}>
              <strong>Ronak Jain R</strong> (Founder) & <strong>Anshul S Balan</strong> (Co-Founder)
            </span>
          </div>

          <a
            href="tel:+917892145475"
            style={{
              fontSize: '0.8rem',
              color: '#34d399',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Phone size={13} />
            <span>+91 78921 45475</span>
          </a>
        </div>

        {/* Policy Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
          
          {/* 1. Anti-Black Marketing & Strict MRP Lock */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.85rem 1rem'
          }}>
            <div className="flex items-center gap-2" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              <ShieldCheck size={15} color="#10b981" />
              <span>1. Zero-Markup & Anti-Black Marketing Guarantee (Official MRP Only)</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.45 }}>
              Under the <strong>Consumer Protection Act, 2019</strong> and State Police Acts, selling event tickets above the printed Maximum Retail Price (MRP) or charging unauthorized scalping markups is illegal. Tixora strictly enforces fixed MRP pricing; promoters earn transparent commissions from organizers and are legally barred from charging buyer markups.
            </p>
          </div>

          {/* 2. Cash Limit & Income Tax Section 269ST */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.85rem 1rem'
          }}>
            <div className="flex items-center gap-2" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              <Lock size={15} color="#f59e0b" />
              <span>2. Cash Handling & Section 269ST Compliance</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.45 }}>
              Under <strong>Section 269ST of the Income Tax Act, 1961</strong>, no single cash transaction or aggregate receipt from a single person may exceed ₹2,00,000 in a day. Tixora enforces individual order caps (maximum 10 tickets per cash transaction) and mandates strict escrow settlement 10 days before events.
            </p>
          </div>

          {/* 3. DigiLocker Promoter Verification & Age of Majority */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.85rem 1rem'
          }}>
            <div className="flex items-center gap-2" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              <CheckCircle2 size={15} color="#3b82f6" />
              <span>3. DigiLocker KYC & 18+ Promoter Accreditation</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.45 }}>
              Promoters operating on Tixora must be 18+ college students verified via <strong>DigiLocker / Aadhaar / PAN</strong> under the <strong>Information Technology Act, 2000</strong>. Promoters act as authorized campus distribution representatives of organizers.
            </p>
          </div>

          {/* 4. GST & TDS Compliance */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.85rem 1rem'
          }}>
            <div className="flex items-center gap-2" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              <FileText size={15} color="#ec4899" />
              <span>4. GST (Goods & Services Tax) & TDS (Section 194H)</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.45 }}>
              All published face-value ticket prices are inclusive of applicable GST (18%/28%). Organizer payouts and promoter commission disbursements comply with TDS deduction requirements under Section 194H of the Indian Income Tax Act where statutory limits are reached.
            </p>
          </div>

          {/* 5. 100% Digital Ticket Control & Non-Transferable QR */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '0.85rem 1rem'
          }}>
            <div className="flex items-center gap-2" style={{ fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
              <AlertTriangle size={15} color="#f43f5e" />
              <span>5. Fraud Prevention & Digital Pass Authentication</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.45 }}>
              No physical black-box paper tickets are issued. All passes generate unique encrypted digital QR codes tied to buyer phone numbers, preventing counterfeiting, duplicate entry, and fraudulent secondary market transfers.
            </p>
          </div>

        </div>

        {/* Accept / Dismiss */}
        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1.25rem', padding: '10px', fontSize: '0.85rem' }}
        >
          I Understand & Agree to the Tixora Compliance Framework
        </button>
      </div>
    </div>
  );
};
