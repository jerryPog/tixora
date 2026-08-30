import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Gift, 
  Ticket, 
  ShoppingBag, 
  Banknote, 
  Check, 
  Copy, 
  Share2, 
  Lock
} from 'lucide-react';

export const RewardsAndReferrals = () => {
  const { activePromoter, rewards, claimedRewardIds, referrals, claimReward, showToast } = useApp();
  const [copiedVoucherId, setCopiedVoucherId] = useState(null);
  const [copiedRefCode, setCopiedRefCode] = useState(false);

  if (!activePromoter) return null;

  const ticketsSold = activePromoter.ticketsSold || 0;
  const promoterRefCode = activePromoter.referralCode || `${activePromoter.name.split(' ')[0].toUpperCase()}-TIX26`;
  const inviteLink = `https://tixora-theta.vercel.app/join?ref=${promoterRefCode}`;

  const promoterReferrals = referrals.filter((r) => r.referrerId === activePromoter.id || true);
  const totalReferralEarnings = activePromoter.referralEarnings || promoterReferrals.reduce((acc, r) => acc + (r.rewardAmount || 0), 0);

  const getRewardIcon = (category) => {
    switch (category) {
      case 'ticket':
        return <Ticket size={18} color="#38bdf8" />;
      case 'coupon':
        return <ShoppingBag size={18} color="#f59e0b" />;
      case 'cash':
        return <Banknote size={18} color="#10b981" />;
      default:
        return <Gift size={18} color="#ec4899" />;
    }
  };

  const handleCopyVoucher = (reward) => {
    navigator.clipboard.writeText(reward.voucherCode);
    setCopiedVoucherId(reward.id);
    showToast(`Voucher code "${reward.voucherCode}" copied!`, 'success');
    setTimeout(() => setCopiedVoucherId(null), 3000);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedRefCode(true);
    showToast('Unique promoter invite link copied!', 'success');
    setTimeout(() => setCopiedRefCode(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const text = `🎟️ Hey! Become a verified Tixora campus promoter with me and earn up to 16% commission on major concerts like The Chainsmokers, Anyma, Fred again.. & Guns N' Roses!\n\nSign up with my invite code: *${promoterRefCode}*\n🔗 ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '3.5rem' }}>
      
      {/* ================= SECTION 1: PROMOTER REWARDS & FREE PASSES ================= */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '6px' }}>
              🎁 Milestone Perks & Rewards
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
              Promoter Rewards & Free Concert Passes
            </h2>
            <p className="text-muted" style={{ fontSize: '0.82rem' }}>
              Hit sales milestones to unlock complimentary VIP passes, official artist merchandise coupons, and festival food vouchers.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            padding: '8px 14px',
            borderRadius: '10px',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Current Milestone</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              {ticketsSold} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}>passes sold</span>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.map((reward, index) => {
            const isUnlocked = ticketsSold >= reward.targetSales;
            const isClaimed = claimedRewardIds.includes(reward.id);
            const progress = Math.min(100, Math.round((ticketsSold / reward.targetSales) * 100));

            return (
              <div
                key={reward.id}
                className={`glass-card card-interactive animate-slide-up stagger-${(index % 6) + 1}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.25rem',
                  border: isUnlocked && !isClaimed 
                    ? '1px solid rgba(16, 185, 129, 0.4)' 
                    : isClaimed 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : '1px solid var(--border-color)',
                  background: isUnlocked && !isClaimed 
                    ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(24, 24, 27, 0.7) 100%)' 
                    : 'rgba(18, 19, 24, 0.7)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top tags */}
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getRewardIcon(reward.category)}
                      </div>
                      <span className="badge" style={{ fontSize: '0.68rem', padding: '2px 7px' }}>
                        {reward.badge}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#34d399' }}>
                      {reward.rewardValue}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    {reward.title}
                  </h3>

                  <div style={{ fontSize: '0.74rem', color: '#93c5fd', fontWeight: 600, marginBottom: '6px' }}>
                    🎪 {reward.event}
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '1rem' }}>
                    {reward.description}
                  </p>
                </div>

                {/* Progress & Claim Actions */}
                <div style={{ marginTop: '0.5rem' }}>
                  {!isUnlocked ? (
                    <div>
                      <div className="flex justify-between" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        <span>Target: {reward.targetSales} passes</span>
                        <span>{ticketsSold}/{reward.targetSales} ({reward.targetSales - ticketsSold} to go)</span>
                      </div>
                      <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: '#3b82f6', transition: 'width 0.3s ease' }} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        fontSize: '0.74rem',
                        color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.03)',
                        padding: '6px',
                        borderRadius: '6px'
                      }}>
                        <Lock size={12} /> Locked (Need {reward.targetSales - ticketsSold} more sales)
                      </div>
                    </div>
                  ) : isClaimed ? (
                    <div>
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: '8px',
                        padding: '8px 10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Voucher Code</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                            {reward.voucherCode}
                          </div>
                        </div>
                        <button
                          onClick={() => handleCopyVoucher(reward)}
                          className="btn btn-secondary"
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.72rem',
                            color: copiedVoucherId === reward.id ? '#10b981' : '#ffffff'
                          }}
                        >
                          {copiedVoucherId === reward.id ? <Check size={12} /> : <Copy size={12} />}
                          {copiedVoucherId === reward.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#34d399', textAlign: 'center' }}>
                        ✓ Claimed & Active
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => claimReward(reward.id)}
                        className="btn btn-primary btn-shimmer"
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '0.82rem',
                          gap: '6px',
                          background: '#10b981',
                          borderColor: '#10b981'
                        }}
                      >
                        <Gift size={14} /> Claim Reward Now!
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SECTION 2: REFERRAL SYSTEM ================= */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1.25rem' }}>
          <div>
            <div className="badge badge-amber" style={{ marginBottom: '6px' }}>
              🤝 Campus Referral Program
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
              Refer Promoters & Earn ₹500 Bounty
            </h2>
            <p className="text-muted" style={{ fontSize: '0.82rem' }}>
              Invite peer student ambassadors from your college. Earn ₹500 flat cash bonus when your referred promoter sells their first 5 passes.
            </p>
          </div>
        </div>

        {/* Referral Card & Invite Link Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '1.5rem' }}>
          
          {/* Invite Link Showcase */}
          <div className="glass-card md:col-span-2" style={{ padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Your Unique Promoter Invite Code
            </h3>
            <p className="text-muted" style={{ fontSize: '0.78rem', marginBottom: '1rem' }}>
              Share this link with campus friends, batchmates, and club heads. When they join and reach 5 sales, you get ₹500 credited directly.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: '#93c5fd', wordBreak: 'break-all' }}>
                  {inviteLink}
                </span>

                <button
                  onClick={handleCopyReferral}
                  className="btn btn-secondary"
                  style={{
                    padding: '5px 12px',
                    fontSize: '0.75rem',
                    gap: '4px',
                    color: copiedRefCode ? '#10b981' : '#ffffff'
                  }}
                >
                  {copiedRefCode ? <Check size={13} /> : <Copy size={13} />}
                  {copiedRefCode ? 'Link Copied' : 'Copy Link'}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="btn"
                  style={{
                    background: '#25D366',
                    color: '#ffffff',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    gap: '6px',
                    flex: 1
                  }}
                >
                  <Share2 size={14} /> Share on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="glass-card flex flex-col justify-between" style={{ padding: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                Total Referral Bounties
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
                ₹{totalReferralEarnings.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {promoterReferrals.filter(r => r.passesSold >= 5).length} completed bounties earned
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              padding: '8px 10px',
              borderRadius: '6px',
              marginTop: '1rem',
              fontSize: '0.72rem',
              color: '#a7f3d0'
            }}>
              ✓ ₹500 bounty paid automatically on friend's 5th sale
            </div>
          </div>

        </div>

        {/* Referred Promoters Tracking Table */}
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Referred Ambassadors ({promoterReferrals.length})
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '6px' }}>AMBASSADOR</th>
                  <th style={{ padding: '6px' }}>COLLEGE</th>
                  <th style={{ padding: '6px' }}>PASSES SOLD</th>
                  <th style={{ padding: '6px' }}>BOUNTY STATUS</th>
                  <th style={{ padding: '6px', textAlign: 'right' }}>JOINED</th>
                </tr>
              </thead>
              <tbody>
                {promoterReferrals.map((ref) => (
                  <tr key={ref.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 600, color: '#ffffff' }}>
                      {ref.referredName}
                    </td>
                    <td style={{ padding: '10px 6px', color: 'var(--text-muted)' }}>
                      {ref.referredCollege}
                    </td>
                    <td style={{ padding: '10px 6px', fontWeight: 600 }}>
                      {ref.passesSold} passes
                    </td>
                    <td style={{ padding: '10px 6px' }}>
                      <span className={ref.passesSold >= 5 ? 'badge badge-emerald' : 'badge badge-amber'} style={{ fontSize: '0.68rem' }}>
                        {ref.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                      {ref.joinedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
