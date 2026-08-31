import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowRight, X } from 'lucide-react';

const NEWS_ARTICLES = [
  {
    id: 'news-1',
    category: 'TOUR UPDATE',
    title: "Guns N' Roses Bengaluru: Phase 1 Silver Pass Quota Reaches 85%",
    date: '30 Aug 2026',
    image: '/posters/guns-n-roses-banner.webp',
    snippet: 'With massive demand from rock fans across South India, Phase 1 Silver and Gold tickets are entering their final allocation before Phase 2 price escalation.',
    author: 'Ronak Jain R'
  },
  {
    id: 'news-2',
    category: 'LINEUP DROP',
    title: "Matteo Milleri's Anyma presents ÆDEN Mumbai: Hologram Rig Breakdown",
    date: '28 Aug 2026',
    image: '/posters/anyma-aeden-poster-2.jpg',
    snippet: 'The colossal 40-meter LED hyper-structure will be deployed at Mahalaxmi Racecourse with custom 3D visuals tailored for the Mumbai skyline.',
    author: 'Anshul S Balan'
  },
  {
    id: 'news-3',
    category: 'PROMOTER NETWORK',
    title: "Fred again.. Delhi & Mumbai: Student Ambassador Quotas Now Active",
    date: '25 Aug 2026',
    image: '/posters/fred-again-india-poster-1.png',
    snippet: 'Verified university reps can now issue authorized Student Passes at ₹1,750 with instant DigiLocker student ID verification.',
    author: 'Tixora Operations'
  }
];

export const TourNewsSection = ({ onSelectArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section className="tour-news-section" style={{ marginBottom: '3.5rem' }}>
      
      {/* Watermark Section Header */}
      <div className="section-watermark-wrapper">
        <div className="section-watermark-bg" aria-hidden="true">
          NEWS
        </div>
        <div className="section-watermark-front">
          <div className="festival-tag">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            TOUR DISPATCHES & BUZZ
          </div>
          <h2 className="festival-heading">
            Latest Festival News & Updates
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0.35rem auto 0' }}>
            Stay informed on artist tour announcements, stage production drops, and ticket quota milestones.
          </p>
        </div>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {NEWS_ARTICLES.map((article) => (
          <div
            key={article.id}
            className="glass-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setSelectedArticle(article)}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.4)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                color: '#f472b6',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                {article.category}
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                <Calendar size={11} />
                <span>{article.date} • By {article.author}</span>
              </div>

              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.35, marginBottom: '8px' }}>
                {article.title}
              </h3>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                {article.snippet}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: '#f472b6', fontWeight: 700, marginTop: 'auto' }}>
                <span>Read Full Article</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)} style={{ zIndex: 1200 }}>
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()} 
            style={{ maxWidth: '640px', background: '#07080b', border: '1px solid rgba(236, 72, 153, 0.3)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{
                background: 'rgba(236, 72, 153, 0.15)',
                color: '#f472b6',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 700
              }}>
                {selectedArticle.category}
              </span>
              <button onClick={() => setSelectedArticle(null)} className="btn-ghost" style={{ padding: '4px' }}>
                <X size={18} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              {selectedArticle.title}
            </h3>

            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Published on {selectedArticle.date} • Verified Tixora Editorial
            </div>

            <div style={{ borderRadius: '10px', overflow: 'hidden', height: '220px', marginBottom: '1.25rem' }}>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <p style={{ fontSize: '0.84rem', color: '#e4e4e7', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedArticle.snippet} All ticket transactions on Tixora are protected with 100% DigiLocker promoter identity verification and direct digital QR issuance to BookMyShow & District accounts.
            </p>

            <button
              onClick={() => setSelectedArticle(null)}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '8px' }}
            >
              Close Article
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
