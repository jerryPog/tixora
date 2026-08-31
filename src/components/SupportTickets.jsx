import React, { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock3, Headphones, PackageSearch, ReceiptIndianRupee, Search, Send, TicketCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CATEGORIES = [
  { label: 'Refund', icon: ReceiptIndianRupee, help: 'Payment reversal, cancellation, or refund status' },
  { label: 'Inventory', icon: PackageSearch, help: 'Incorrect availability, quota, or seat inventory' },
  { label: 'Ticket issuance', icon: TicketCheck, help: 'Missing QR, delivery delay, or invalid pass' }
];

const STATUS_ICON = { Open: AlertCircle, 'In progress': Clock3, Resolved: CheckCircle2 };

export const SupportTickets = () => {
  const { currentRole, activePromoter, supportTickets, createSupportTicket, updateSupportTicket } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [form, setForm] = useState({ category: 'Refund', subject: '', orderId: '', description: '', priority: 'Normal' });

  const visibleTickets = useMemo(() => supportTickets.filter((ticket) => {
    const roleMatch = currentRole === 'admin' || ticket.promoterId === activePromoter.id;
    const statusMatch = status === 'All' || ticket.status === status;
    const haystack = `${ticket.id} ${ticket.subject} ${ticket.orderId || ''} ${ticket.promoterName}`.toLowerCase();
    return roleMatch && statusMatch && haystack.includes(query.toLowerCase());
  }), [activePromoter.id, currentRole, query, status, supportTickets]);

  const submit = (event) => {
    event.preventDefault();
    createSupportTicket(form);
    setForm({ category: 'Refund', subject: '', orderId: '', description: '', priority: 'Normal' });
    setShowForm(false);
  };

  return (
    <section className="support-page" aria-labelledby="support-title">
      <div className="support-hero">
        <div>
          <div className="support-eyebrow"><Headphones size={15} /> Resolution center</div>
          <h1 id="support-title">Get an issue moving.</h1>
          <p>Report refunds, inventory mismatches, or ticket delivery problems and track every update in one place.</p>
        </div>
        {currentRole === 'promoter' && (
          <button className="btn btn-primary" onClick={() => setShowForm((value) => !value)} aria-expanded={showForm}>
            <Send size={16} /> {showForm ? 'Close form' : 'Create request'}
          </button>
        )}
      </div>

      {currentRole === 'promoter' && showForm && (
        <form className="support-form glass-card" onSubmit={submit}>
          <div className="support-form-heading">
            <div><span>New support request</span><small>Required fields are marked with *</small></div>
          </div>
          <fieldset className="category-picker">
            <legend>Issue type *</legend>
            {CATEGORIES.map(({ label, icon: Icon, help }) => (
              <label key={label} className={form.category === label ? 'selected' : ''}>
                <input type="radio" name="category" value={label} checked={form.category === label} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <Icon size={20} /><span><strong>{label}</strong><small>{help}</small></span>
              </label>
            ))}
          </fieldset>
          <div className="support-form-grid">
            <label className="form-group"><span className="form-label">Subject *</span><input className="form-input" required maxLength={90} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Briefly describe the issue" /></label>
            <label className="form-group"><span className="form-label">Order / sale ID</span><input className="form-input" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} placeholder="e.g. SAL-2026-0842" /></label>
            <label className="form-group"><span className="form-label">Priority</span><select className="form-select" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Normal</option><option>High</option><option>Urgent</option></select></label>
            <label className="form-group support-description"><span className="form-label">What happened? *</span><textarea className="form-input" required rows="4" maxLength={600} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Include payment status, expected result, and what you have tried." /></label>
          </div>
          <div className="support-form-actions"><span>Typical first response: within 4 business hours</span><button className="btn btn-primary" type="submit">Submit request</button></div>
        </form>
      )}

      <div className="support-toolbar">
        <label className="support-search"><Search size={16} /><span className="sr-only">Search requests</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search ID, order, or subject" /></label>
        <label><span className="sr-only">Filter by status</span><select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Open</option><option>In progress</option><option>Resolved</option></select></label>
      </div>

      <div className="support-list" aria-live="polite">
        {visibleTickets.length === 0 ? <div className="support-empty"><TicketCheck size={30} /><h2>No requests found</h2><p>Try another filter or create a new support request.</p></div> : visibleTickets.map((ticket) => {
          const StatusIcon = STATUS_ICON[ticket.status] || AlertCircle;
          return <article className="support-ticket" key={ticket.id}>
            <div className="support-ticket-main">
              <div className="support-ticket-meta"><span className={`status status-${ticket.status.toLowerCase().replace(' ', '-')}`}><StatusIcon size={13} />{ticket.status}</span><span>{ticket.id}</span><span>{ticket.category}</span><span className={`priority priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></div>
              <h2>{ticket.subject}</h2><p>{ticket.description}</p>
              <div className="support-ticket-foot"><span>{ticket.orderId || 'No order ID'}</span>{currentRole === 'admin' && <span>Raised by {ticket.promoterName}</span>}<span>Updated {new Date(ticket.updatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span></div>
            </div>
            <div className="support-ticket-actions">
              <span>Owner: {ticket.assignee}</span>
              {currentRole === 'admin' && <><select className="form-select" aria-label={`Status for ${ticket.id}`} value={ticket.status} onChange={(e) => updateSupportTicket(ticket.id, { status: e.target.value, assignee: e.target.value === 'Open' ? 'Unassigned' : 'Support operations' })}><option>Open</option><option>In progress</option><option>Resolved</option></select></>}
            </div>
          </article>;
        })}
      </div>
    </section>
  );
};
