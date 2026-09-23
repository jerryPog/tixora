import React from 'react';
import { usePageSEO } from '../hooks/usePageSEO';
import { ReviewsSection } from '../components/ReviewsSection';
import { Star, Sparkles } from 'lucide-react';

export const ReviewsPage = () => {
  usePageSEO('reviews');

  return (
    <div className="reviews-page-container" style={{ paddingBottom: '3.5rem' }}>
      {/* Page Watermark Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          REVIEWS
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            COMMUNITY TRUST & STORIES
          </div>
          <h1 className="festival-heading">
            Verified Student Promoter & Fan Reviews
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '580px', margin: '0.35rem auto 0' }}>
            Real experiences from campus promoters and concert fans across Delhi University, NMIMS, RVCE, and St. Xavier's Mumbai.
          </p>
        </div>
      </div>

      <ReviewsSection />
    </div>
  );
};
