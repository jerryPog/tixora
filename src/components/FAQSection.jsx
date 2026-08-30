import React, { useState, useMemo } from 'react';
import { FAQ_DATA, FAQ_CATEGORIES } from '../data/faqData';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Users, 
  Ticket, 
  RotateCcw, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  Check, 
  Copy,
  ExternalLink,
  Info
} from 'lucide-react';

const CATEGORY_ICON_MAP = {
  HelpCircle: HelpCircle,
  Users: Users,
  Ticket: Ticket,
  RotateCcw: RotateCcw,
  ShieldCheck: ShieldCheck,
  Building2: Building2
};

export const FAQSection = ({ onAskInChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState({ 'faq-promoter-deadline': true, 'faq-delivery-platform': true });
  const [copiedId, setCopiedId] = useState(null);

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const all = {};
    FAQ_DATA.forEach(item => { all[item.id] = true; });
    setOpenItems(all);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  const handleCopy = (item) => {
    const text = `${item.question}\n\n${item.answer}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return FAQ_DATA.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCategory) return false;
      if (!query) return true;

      const inQuestion = item.question.toLowerCase().includes(query);
      const inAnswer = item.answer.toLowerCase().includes(query);
      const inKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
      return inQuestion || inAnswer || inKeywords;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div style={{ marginBottom: '3rem', animation: 'fadeIn 0.25s ease' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '1.75rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
              <div style={{
                background: '#ffffff',
                color: '#090a0d',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Knowledge Base
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Official Operational Policies & Guidelines
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Frequently Asked Questions
            </h2>
            <p className="text-muted" style={{ fontSize: '0.84rem', marginTop: '0.35rem', maxWidth: '650px' }}>
              Everything promoters and organizers need to know about cash deposit deadlines, digital ticket delivery to BookMyShow/District, cancellations, and DigiLocker verification.
            </p>
          </div>

          {/* Direct helpline pill */}
          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '10px 16px',
            textAlign: 'right',
            flexShrink: 0
          }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Need urgent assistance?
            </div>
            <a 
              href="https://wa.me/917892145475" 
              target="_blank" 
              rel="noreferrer"
              style={{
                color: '#34d399',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '2px'
              }}
            >
              <Phone size={14} /> +91 78921 45475
            </a>
          </div>
        </div>

        {/* Search Input Bar */}
        <div style={{ marginTop: '1.5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={17} />
          </div>
          <input
            type="text"
            placeholder="Search any question, policy, 'deadline', 'refund', 'BookMyShow', 'DigiLocker'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              background: 'rgba(9, 10, 13, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '10px',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              backdropFilter: 'blur(10px)'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#ffffff')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                color: '#ffffff',
                fontSize: '0.7rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills & Bulk Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2" style={{ marginTop: '1.25rem' }}>
          <div className="flex flex-wrap items-center gap-1.5">
            {FAQ_CATEGORIES.map(cat => {
              const IconComp = CATEGORY_ICON_MAP[cat.icon] || HelpCircle;
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? FAQ_DATA.length 
                : FAQ_DATA.filter(f => f.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#090a0d' : 'var(--text-muted)',
                    border: `1px solid ${isSelected ? '#ffffff' : 'var(--border-color)'}`,
                    borderRadius: '9999px',
                    padding: '6px 12px',
                    fontSize: '0.76rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconComp size={13} />
                  <span>{cat.label}</span>
                  <span style={{
                    fontSize: '0.66rem',
                    background: isSelected ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)',
                    padding: '1px 5px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExpandAll}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.74rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Expand All
            </button>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <button
              onClick={handleCollapseAll}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.74rem',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '3rem 1.5rem' }}>
          <HelpCircle size={36} color="var(--text-muted)" style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            No matching questions found
          </h3>
          <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
            We couldn't find anything matching "{searchQuery}". Try a different keyword or contact our support team.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="btn btn-outline"
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];

            return (
              <div
                key={faq.id}
                className="glass-card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  border: isOpen ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid var(--border-color)',
                  background: isOpen ? 'rgba(18, 20, 26, 0.75)' : 'rgba(12, 13, 17, 0.55)',
                  transition: 'border-color 0.2s ease, background 0.2s ease'
                }}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  style={{
                    width: '100%',
                    padding: '1.1rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-muted)'
                      }}>
                        {faq.categoryLabel}
                      </span>
                      {faq.highlight && (
                        <span style={{ fontSize: '0.72rem', color: '#a1a1aa' }}>
                          • {faq.highlight}
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      color: isOpen ? '#ffffff' : '#e4e4e7',
                      lineHeight: 1.35
                    }}>
                      {faq.question}
                    </div>
                  </div>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: isOpen ? '#ffffff' : 'var(--text-muted)',
                    transition: 'transform 0.2s ease'
                  }}>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.25rem 1.25rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '1rem',
                    animation: 'fadeIn 0.2s ease'
                  }}>
                    <div style={{
                      fontSize: '0.86rem',
                      color: '#d4d4d8',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line'
                    }}>
                      {faq.answer}
                    </div>

                    {/* Action Bar inside Accordion */}
                    <div className="flex flex-wrap items-center justify-between gap-2" style={{
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                    }}>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(faq)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            padding: '4px 9px',
                            color: copiedId === faq.id ? '#34d399' : 'var(--text-muted)',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Copy Q&A"
                        >
                          {copiedId === faq.id ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copiedId === faq.id ? 'Copied' : 'Copy Answer'}</span>
                        </button>

                        {onAskInChat && (
                          <button
                            onClick={() => onAskInChat(faq.question)}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '6px',
                              padding: '4px 9px',
                              color: '#ffffff',
                              fontSize: '0.72rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Ask Tixora AI Assistant about this"
                          >
                            <Sparkles size={12} />
                            <span>Ask in Chat Assistant</span>
                          </button>
                        )}
                      </div>

                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        Verified Policy Guideline
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Help Banner at bottom of FAQ */}
      <div className="glass-card" style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(14, 16, 22, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}>
          <MessageCircle size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
            Don't see your question here?
          </h4>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px', maxWidth: '500px' }}>
            Reach out to the Tixora team directly and we'll add it. Our operations team is active daily from 10:00 AM to 10:00 PM IST.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3" style={{ marginTop: '0.25rem' }}>
          <a
            href="https://wa.me/917892145475"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ fontSize: '0.8rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Phone size={14} /> WhatsApp Support (+91 78921 45475)
          </a>
          {onAskInChat && (
            <button
              onClick={() => onAskInChat("I have a question about Tixora policies")}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Sparkles size={14} /> Open AI Chatbox
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
