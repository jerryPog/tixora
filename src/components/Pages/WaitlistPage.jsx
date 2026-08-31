import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Gift, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Send 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WaitlistPage = ({ onSubmitSuccess, onNavigateToEvents }) => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    city: 'Bengaluru',
    instagram: '',
    expectedSales: '20-50 tickets',
    referralCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.college) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('🎉 Application received! Welcome to the Tixora Promoter Network.', 'success');
      if (onSubmitSuccess) {
        onSubmitSuccess({
          type: 'waitlist',
          name: formData.fullName,
          email: formData.email,
          college: formData.college,
          city: formData.city,
          position: Math.floor(Math.random() * 15) + 142
        });
      }
    }, 800);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', paddingBottom: '3rem' }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(245, 158, 11, 0.12)',
          color: '#fbbf24',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '9999px',
          padding: '4px 14px',
          fontSize: '0.74rem',
          fontWeight: 700,
          marginBottom: '0.85rem'
        }}>
          <Sparkles size={13} />
          <span>CAMPUS AMBASSADOR INTAKE 2026</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
          Become the Official Tixora Promoter on Your Campus
        </h1>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Join top college promoters across India selling official concert passes for Guns N' Roses, Anyma, Fred again.., & Sunburn Arena. Earn up to 10% commission + backstage VIP passes.
        </p>

        {/* Live Queue Counter */}
        <div style={{
          marginTop: '1.25rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '0.78rem',
          color: '#e4e4e7'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          <span><strong>1,482 student promoters</strong> on the waitlist across 45+ universities</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Application Form */}
        <div className="lg:col-span-7">
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Campus Promoter Application
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Applications are reviewed within 24 hours with immediate DigiLocker KYC onboarding.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="input-field"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@college.edu.in"
                    className="input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    WhatsApp Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="input-field"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Xavier's Mumbai / DU"
                    className="input-field"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    Metro City *
                  </label>
                  <select
                    className="input-field"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="@yourhandle"
                    className="input-field"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                    Promoter Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AARAV-DU"
                    className="input-field"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, marginBottom: '4px' }}>
                  Estimated Ticket Sales Per Major Concert
                </label>
                <select
                  className="input-field"
                  value={formData.expectedSales}
                  onChange={(e) => setFormData({ ...formData, expectedSales: e.target.value })}
                >
                  <option value="10-20 tickets">10 – 20 tickets (Casual Ambassador)</option>
                  <option value="20-50 tickets">20 – 50 tickets (Active Promoter)</option>
                  <option value="50-150 tickets">50 – 150 tickets (Campus Head / Greek Life)</option>
                  <option value="150+ tickets">150+ tickets (Power Promoter / Regional Lead)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  padding: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <span>Submit Ambassador Application</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <ShieldCheck size={13} color="#10b981" />
                <span>100% Zero upfront investment. Payouts directly via UPI & Bank.</span>
              </div>

            </form>
          </div>
        </div>

        {/* Perks & Value Column */}
        <div className="lg:col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
              Why Join Tixora?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  icon: <Zap size={18} color="#f59e0b" />,
                  title: "7.5% – 10% Instant Payouts",
                  desc: "Earn ₹300 – ₹3,200 per ticket directly credited after event reconciliation."
                },
                {
                  icon: <Gift size={18} color="#ec4899" />,
                  title: "Free Artist Backstage Passes",
                  desc: "Top promoters in each city unlock all-access wristbands to Fred again.., Anyma, and Sunburn."
                },
                {
                  icon: <Award size={18} color="#3b82f6" />,
                  title: "Official Leadership Letter",
                  desc: "Verified Letter of Recommendation & Brand Ambassador Certificate from Tixora founders."
                },
                {
                  icon: <ShieldCheck size={18} color="#10b981" />,
                  title: "Zero Risk & DigiLocker Safety",
                  desc: "Never hold inventory. All passes generated digitally to buyer's official BookMyShow account."
                }
              ].map((perk, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.06)',
                    padding: '8px',
                    borderRadius: '8px',
                    height: 'fit-content',
                    flexShrink: 0
                  }}>
                    {perk.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                      {perk.title}
                    </h4>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Lineup Link */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.5) 100%)',
              cursor: 'pointer'
            }}
            onClick={onNavigateToEvents}
          >
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>Want to see what you'll be promoting?</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Explore 2026 Concert Lineup & Official MRPs</div>
            </div>
            <ArrowRight size={16} color="#ffffff" />
          </div>

        </div>

      </div>

    </div>
  );
};
