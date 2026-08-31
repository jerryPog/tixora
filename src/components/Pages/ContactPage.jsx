import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage = ({ onOpenFAQ, onNavigateToEvents }) => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Promoter Support',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Message sent! Our support team will reply via WhatsApp/Email shortly.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'Promoter Support',
        message: ''
      });
    }, 700);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3.5rem' }}>
      
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(16, 185, 129, 0.12)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '9999px',
          padding: '4px 14px',
          fontSize: '0.74rem',
          fontWeight: 700,
          marginBottom: '0.85rem'
        }}>
          <Phone size={12} />
          <span>DIRECT HELPLINE: +91 78921 45475</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
          Get in Touch with Tixora Support & Operations
        </h1>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Have questions about campus promoter payouts, bulk college group bookings, or DigiLocker verification? Our team is active 7 days a week.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Support Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Send Us a Direct Message
            </h2>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Average response time: Under 15 minutes during live concert days.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    WhatsApp Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                  Inquiry Topic
                </label>
                <select
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Promoter Support">Promoter Support & Payouts</option>
                  <option value="Campus Ambassador Intake">Campus Ambassador Program</option>
                  <option value="Ticket Verification">Ticket Verification & Delivery</option>
                  <option value="Festival Organizer Partnership">Festival / Artist Partnership</option>
                  <option value="Founder Escalation">Founder Escalation</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your query or requirement in detail..."
                  className="input-field"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ padding: '12px', fontSize: '0.9rem', fontWeight: 700, gap: '6px', justifyContent: 'center' }}
              >
                {isSubmitting ? <span>Sending...</span> : (
                  <>
                    <span>Send Message to Support</span>
                    <Send size={15} />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Contact Channels & Direct Helpline Column */}
        <div className="lg:col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* WhatsApp Direct Action Box */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(9, 10, 13, 0.9) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ background: '#10b981', color: '#090a0d', padding: '6px', borderRadius: '6px' }}>
                <MessageSquare size={16} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                Instant WhatsApp Desk
              </h3>
            </div>

            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Chat directly with our promoter onboarding specialists and operational leads.
            </p>

            <a
              href="https://wa.me/917892145475?text=Hi%20Tixora%20Team%2C%20I%20have%20an%20inquiry%20regarding%20concert%20tickets%20and%20promoter%20onboarding."
              target="_blank"
              rel="noreferrer"
              className="btn"
              style={{
                width: '100%',
                background: '#10b981',
                color: '#090a0d',
                padding: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none',
                borderRadius: '8px'
              }}
            >
              <Phone size={15} />
              <span>Open WhatsApp: +91 78921 45475</span>
            </a>
          </div>

          {/* Details Pill */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div>
              <div style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                Board of Directors & Leadership Direct Desk
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: "Ronak Jain R", role: "Founder", email: "ronakj303@gmail.com", phone: "+91 78921 45475" },
                  { name: "Prajwal Gowrish H S", role: "Co-Founder", email: "gowrishprajwal123@gmail.com", phone: "+91 88612 00170" },
                  { name: "Anshul S Balan", role: "Co-Founder", email: "anshulsb70@gmail.com", phone: "+91 70125 37541" },
                  { name: "Kanishk Jhunjhunwala", role: "Co-Founder", email: "kanishkjhunjhunwala@gmail.com", phone: "+91 91045 73147" }
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>{item.name}</span>
                      <span style={{ fontSize: '0.64rem', color: '#10b981', fontWeight: 600 }}>{item.role}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', fontSize: '0.7rem' }}>
                      <a href={`mailto:${item.email}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{item.email}</a>
                      <a href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#34d399', fontWeight: 600, textDecoration: 'none' }}>{item.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
              <Mail size={18} color="#60a5fa" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Official Inquiries</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>support@tixora.in</div>
                <div style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>promoters@tixora.in</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Clock size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Operational Support Desk</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>10:00 AM – 10:00 PM IST</div>
                <div style={{ fontSize: '0.72rem', color: '#10b981' }}>7 Days a Week (Active During Concerts)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <MapPin size={18} color="#ec4899" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Founding Hubs</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Bengaluru & Mumbai</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Karnataka & Maharashtra, India</div>
              </div>
            </div>

          </div>

          {/* Quick FAQ Launcher */}
          {onOpenFAQ && (
            <button
              onClick={onOpenFAQ}
              className="glass-card"
              style={{
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={18} color="#ffffff" />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Need instant answers?</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Browse our comprehensive FAQ Center</div>
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600 }}>Open FAQs →</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
