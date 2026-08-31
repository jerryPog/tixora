import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ThumbsUp, 
  MessageSquarePlus, 
  Filter,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Aarav Sharma",
    role: "Verified Campus Promoter",
    college: "Hansraj College, Delhi University",
    city: "Delhi NCR",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    eventTag: "Fred again.. — Delhi NCR",
    date: "2 days ago",
    content: "Tixora has completely changed how we promote college events in North Campus. Sold 32 passes for Fred again.. in just 48 hours directly to my classmates. Commissions hit my UPI within hours of reconciliation. 100% legitimate!",
    earnings: "₹6,840 Earned",
    type: "promoter",
    helpfulCount: 42
  },
  {
    id: "rev-2",
    author: "Riya Sen",
    role: "Gold Tier Ambassador",
    college: "St. Xavier's College",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    eventTag: "Anyma presents ÆDEN",
    date: "1 week ago",
    content: "The DigiLocker verification gives all my buyers instant peace of mind. Nobody has to worry about black-market scam passes. Plus, I unlocked a free backstage artist wristband for Anyma!",
    earnings: "₹24,500 Earned",
    type: "promoter",
    helpfulCount: 68
  },
  {
    id: "rev-3",
    author: "Tanmay Bhatia",
    role: "Concert Attendee",
    college: "PES University",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    eventTag: "Guns N' Roses — Bengaluru",
    date: "August 2026",
    content: "Bought 4 Silver Phase 1 tickets through our college promoter Vikram. Got the BookMyShow QR passes delivered straight to my phone within 5 minutes. No exorbitant black-market markup!",
    type: "attendee",
    helpfulCount: 31
  },
  {
    id: "rev-4",
    author: "Ananya Deshmukh",
    role: "Campus Ambassador Lead",
    college: "NMIMS Mumbai",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    eventTag: "The Chainsmokers — Sunburn",
    date: "August 2026",
    content: "The dashboard with instant price calculators and WhatsApp pitch copy makes selling effortless. My team has already processed 90+ tickets this season.",
    earnings: "₹18,200 Earned",
    type: "promoter",
    helpfulCount: 54
  },
  {
    id: "rev-5",
    author: "Rohan Varma",
    role: "Concert Attendee",
    college: "IIT Bombay",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    eventTag: "Anyma presents ÆDEN",
    date: "August 2026",
    content: "Seamless verification. Received official booking ID with valid invoice. Great to support student reps rather than shady scalper accounts.",
    type: "attendee",
    helpfulCount: 19
  }
];

export const ReviewsSection = () => {
  const { showToast } = useApp();
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'promoter' | 'attendee'
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    role: 'Campus Ambassador',
    college: '',
    rating: 5,
    eventTag: "Guns N' Roses — Bengaluru",
    content: ''
  });

  const filteredReviews = reviews.filter(r => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  const handleHelpful = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    showToast('Marked as helpful!', 'info');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.content || !newReview.college) {
      showToast('Please fill out all required review fields', 'error');
      return;
    }

    const created = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      role: newReview.role,
      college: newReview.college,
      city: "India",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      rating: newReview.rating,
      eventTag: newReview.eventTag,
      date: "Just now",
      content: newReview.content,
      type: "promoter",
      helpfulCount: 1
    };

    setReviews([created, ...reviews]);
    setShowReviewModal(false);
    showToast('🌟 Review posted successfully! Thank you for supporting Tixora.', 'success');
  };

  return (
    <section className="reviews-section" style={{ marginBottom: '3rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
            <Sparkles size={13} />
            <span>REAL STORIES & VERIFIED REPUTATION</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            Student Promoters & Concert-Goer Reviews
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real feedback from verified campus ambassadors across top universities in India.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          
          {/* Filter Pills */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '2px',
            display: 'flex',
            gap: '2px'
          }}>
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'promoter', label: 'Promoters' },
              { id: 'attendee', label: 'Buyers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                style={{
                  background: filterType === tab.id ? '#ffffff' : 'transparent',
                  color: filterType === tab.id ? '#090a0d' : 'var(--text-muted)',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn btn-secondary"
            style={{ padding: '5px 11px', fontSize: '0.74rem', gap: '4px' }}
          >
            <MessageSquarePlus size={13} />
            <span>Write Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.map(review => (
          <div 
            key={review.id} 
            className="glass-card"
            style={{
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '12px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div>
              
              {/* Header Info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={review.avatar}
                    alt={`Avatar of ${review.author}`}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{review.author}</span>
                      <ShieldCheck size={12} color="#10b981" title="DigiLocker Verified" />
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {review.college}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>

              {/* Event Badge & Earnings */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '0.66rem',
                  color: '#e4e4e7',
                  fontWeight: 600
                }}>
                  {review.eventTag}
                </span>

                {review.earnings && (
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    fontSize: '0.66rem',
                    fontWeight: 700
                  }}>
                    {review.earnings}
                  </span>
                )}
              </div>

              {/* Text */}
              <p style={{ fontSize: '0.78rem', color: '#e4e4e7', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                "{review.content}"
              </p>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '8px', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              <span>{review.date}</span>

              <button
                onClick={() => handleHelpful(review.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 4px'
                }}
              >
                <ThumbsUp size={11} />
                <span>Helpful ({review.helpfulCount})</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Submit Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)} style={{ zIndex: 1100 }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              Share Your Tixora Experience
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Your review will appear in the verified community feed.
            </p>

            <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, display: 'block', marginBottom: '3px' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Reddy"
                  className="input-field"
                  value={newReview.author}
                  onChange={e => setNewReview({ ...newReview, author: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, display: 'block', marginBottom: '3px' }}>College / University *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RVCE Bengaluru"
                  className="input-field"
                  value={newReview.college}
                  onChange={e => setNewReview({ ...newReview, college: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, display: 'block', marginBottom: '3px' }}>Concert Event</label>
                <select
                  className="input-field"
                  value={newReview.eventTag}
                  onChange={e => setNewReview({ ...newReview, eventTag: e.target.value })}
                >
                  <option value="Guns N' Roses — Bengaluru">Guns N' Roses — Bengaluru</option>
                  <option value="Anyma presents ÆDEN">Anyma presents ÆDEN — Mumbai</option>
                  <option value="Fred again.. — Delhi NCR">Fred again.. — Delhi NCR</option>
                  <option value="The Chainsmokers — Sunburn">The Chainsmokers — Sunburn</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, display: 'block', marginBottom: '3px' }}>Your Feedback *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How was the payout speed, ticket delivery, or buyer experience?"
                  className="input-field"
                  value={newReview.content}
                  onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '6px 16px' }}>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
