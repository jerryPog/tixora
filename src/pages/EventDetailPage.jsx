import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { usePageSEO } from '../hooks/usePageSEO';
import { VenueLayoutModal } from '../components/VenueLayoutModal';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  ArrowLeft, 
  ShieldCheck, 
  Copy, 
  Check, 
  Map as MapIcon, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Share2, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ARTIST_IMAGE_MAP = {
  'evt-gnr-blr': '/artists/guns-n-roses.jpg',
  'evt-anyma-mum': '/artists/anyma.jpg',
  'evt-fred-del': '/artists/fred-again.jpg',
  'evt-fred-mum': '/artists/fred-again.jpg',
  'evt-chainsmokers-blr': '/artists/chainsmokers.jpg',
  'evt-khalid-del': '/artists/khalid.jpg',
};

export const EventDetailPage = ({ onOpenRecordSale }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, activePromoter, showToast } = useApp();

  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
  const [calculatorTickets, setCalculatorTickets] = useState(4);

  const event = events.find((e) => e.id === eventId);

  usePageSEO(
    'events',
    event ? `${event.name} — Passes & Price List | Tixora India` : 'Event Details | Tixora',
    event ? `Official digital passes for ${event.name} (${event.date} at ${event.venue}, ${event.city}). Instant BookMyShow QR delivery.` : null
  );

  if (!event) {
    return (
      <div style={{ maxWidth: '650px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          padding: '12px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          marginBottom: '1rem'
        }}>
          <AlertCircle size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#ffffff' }}>
          Concert Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
          The event ID <code style={{ color: '#ec4899' }}>{eventId}</code> could not be located in the 2026 published tour roster.
        </p>
        <Link to="/events" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', gap: '6px' }}>
          <ArrowLeft size={14} /> Back to Concert Lineup
        </Link>
      </div>
    );
  }

  const minPrice = Math.min(...event.priceList.map((p) => p.promoterPrice));
  const maxPrice = Math.max(...event.priceList.map((p) => p.promoterPrice));
  const avgCommission = Math.round(
    event.priceList.reduce((acc, p) => acc + p.commission, 0) / event.priceList.length
  );

  const handleCopyPitch = () => {
    const pitch = `🎟️ Official Passes for ${event.name}!
📅 ${event.date} @ ${event.venue} (${event.city})
💰 Passes start at ₹${minPrice.toLocaleString('en-IN')}. Instant BookMyShow / District QR verification.
🔒 100% DigiLocker Verified. Zero scalping.
DM me now to secure your spot before prices increase!`;

    navigator.clipboard.writeText(pitch);
    setCopiedCaption(true);
    showToast(`Caption for ${event.name} copied!`, 'success');
    setTimeout(() => setCopiedCaption(false), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Direct event URL copied to clipboard!', 'info');
  };

  // Other events in same city or lineup
  const relatedEvents = events.filter((e) => e.id !== event.id).slice(0, 3);

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', paddingBottom: '4rem' }}>
      
      {/* Top Breadcrumb Navigation & Back Link */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '8px' }}>
        <Link
          to="/events"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'color 0.15s ease'
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <ArrowLeft size={14} /> Back to all Concerts
        </Link>

        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.74rem', gap: '5px' }}
            title="Share event link"
          >
            <Share2 size={13} /> Share Link
          </button>
          <button
            onClick={handleCopyPitch}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.74rem',
              gap: '5px',
              color: copiedCaption ? '#10b981' : '#ffffff',
              borderColor: copiedCaption ? '#10b981' : 'var(--border-color)'
            }}
          >
            {copiedCaption ? <Check size={13} /> : <Copy size={13} />}
            {copiedCaption ? 'Copied' : 'Promo Pitch'}
          </button>
        </div>
      </div>

      {/* Main Event Showcase Banner */}
      <div 
        className="glass-card" 
        style={{ 
          padding: 0, 
          overflow: 'hidden', 
          borderRadius: '20px', 
          marginBottom: '2rem',
          border: '1px solid var(--border-color)',
          background: 'linear-gradient(180deg, rgba(25, 28, 38, 0.85) 0%, rgba(10, 12, 17, 0.95) 100%)'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: High-Res Artwork */}
          <div className="md:col-span-5" style={{ position: 'relative', minHeight: '340px' }}>
            <img
              src={event.posterUrl}
              alt={event.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              {event.city}
            </div>

            <div style={{
              position: 'absolute',
              bottom: '14px',
              left: '14px',
              display: 'flex',
              gap: '6px'
            }}>
              <span style={{
                background: 'rgba(16, 185, 129, 0.9)',
                color: '#ffffff',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.68rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={11} /> DigiLocker Verified
              </span>
            </div>
          </div>

          {/* Right Column: Event Meta & Highlights */}
          <div className="md:col-span-7" style={{ padding: 'clamp(1.25rem, 3vw, 2.25rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  background: 'rgba(236, 72, 153, 0.15)',
                  color: '#f472b6',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  {event.artist} Official Tour
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Phase 1 / Verified Pass Inventory
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: '1rem' }}>
                {event.name}
              </h1>

              {/* Event Metadata Strip */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Date & Schedule</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={13} color="#60a5fa" /> {event.date}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Venue Location</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <MapPin size={13} color="#f43f5e" /> {event.venue}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Pass Price Range</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                    ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>Avg Promoter Commission</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#34d399' }}>
                    ₹{avgCommission.toLocaleString('en-IN')} / ticket
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => onOpenRecordSale(event.id, null)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '11px 18px', fontSize: '0.88rem', gap: '6px' }}
              >
                <Ticket size={16} /> Issue / Book Passes Now
              </button>

              <button
                onClick={() => setIsVenueModalOpen(true)}
                className="btn btn-secondary"
                style={{ padding: '11px 16px', fontSize: '0.84rem', gap: '6px' }}
              >
                <MapIcon size={14} /> Seating Map & Layout
              </button>

              <Link
                to={`/prices?eventId=${event.id}`}
                className="btn btn-secondary"
                style={{ padding: '11px 16px', fontSize: '0.84rem', gap: '6px', textDecoration: 'none' }}
              >
                <TrendingUp size={14} /> Calculator
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Ticket Categories & Price List Breakdown */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
              Available Ticket Categories & Official Price Breakdown
            </h2>
            <p className="text-muted" style={{ fontSize: '0.8rem' }}>
              All tickets include BookMyShow digital delivery, gate fast-track entry, and verified student discounts.
            </p>
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Showing {event.priceList.length} verified categories
          </div>
        </div>

        <div className="glass-card" style={{ padding: 0, overflowX: 'auto', borderRadius: '14px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-color)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Phase</th>
                <th style={{ padding: '12px 16px' }}>Official MRP</th>
                <th style={{ padding: '12px 16px' }}>Promoter Rate</th>
                <th style={{ padding: '12px 16px' }}>Student Discount</th>
                <th style={{ padding: '12px 16px' }}>Your Cut (Per Pass)</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {event.priceList.map((tier, idx) => {
                const discount = tier.mrp - tier.promoterPrice;
                const discountPercent = Math.round((discount / tier.mrp) * 100);

                return (
                  <tr 
                    key={idx} 
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ffffff', fontSize: '0.88rem' }}>
                      {tier.category}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#a1a1aa' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontSize: '0.7rem'
                      }}>
                        {tier.phase}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      ₹{tier.mrp.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.94rem', fontWeight: 800, color: '#ffffff' }}>
                      ₹{tier.promoterPrice.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                      Save ₹{discount} ({discountPercent}%)
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: '#34d399',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 700
                      }}>
                        +₹{tier.commission.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => onOpenRecordSale(event.id, tier.category)}
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.74rem', gap: '4px' }}
                      >
                        <Ticket size={12} /> Issue Pass
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Promoter Earnings Calculator for this Concert */}
      <section className="glass-card" style={{ padding: '1.75rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <Sparkles size={16} color="#ec4899" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
            Promoter Profit Simulator for {event.name}
          </h3>
        </div>
        <p className="text-muted" style={{ fontSize: '0.82rem', marginBottom: '1.25rem' }}>
          Calculate how much you earn by selling passes to your college campus network or music circles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              NUMBER OF TICKETS SOLD: <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>{calculatorTickets} passes</strong>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={calculatorTickets}
              onChange={(e) => setCalculatorTickets(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#ec4899', cursor: 'pointer' }}
            />
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Estimated Student Savings
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10b981' }}>
              ₹{(calculatorTickets * 400).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>via official student rate</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.68rem', color: '#f472b6', textTransform: 'uppercase', fontWeight: 700 }}>
              Your Total Commission Cut
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
              ₹{(calculatorTickets * avgCommission).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>paid directly to UPI / Bank</div>
          </div>
        </div>
      </section>

      {/* Related Concerts in Tour Roster */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
            More Trending 2026 Concerts
          </h3>
          <Link to="/events" style={{ fontSize: '0.78rem', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
            View Full Lineup →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {relatedEvents.map((rel) => (
            <Link
              key={rel.id}
              to={`/events/${rel.id}`}
              className="glass-card hover-lift"
              style={{
                textDecoration: 'none',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <img
                src={rel.posterUrl}
                alt={rel.name}
                style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rel.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', gap: '6px' }}>
                  <span>{rel.city}</span> • <span>{rel.date}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>
                  From ₹{Math.min(...rel.priceList.map(p => p.promoterPrice)).toLocaleString('en-IN')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Venue Layout Modal */}
      {isVenueModalOpen && (
        <VenueLayoutModal
          isOpen={isVenueModalOpen}
          onClose={() => setIsVenueModalOpen(false)}
          event={event}
          onSelectCategory={(cat) => {
            setIsVenueModalOpen(false);
            onOpenRecordSale(event.id, cat);
          }}
        />
      )}

    </div>
  );
};
