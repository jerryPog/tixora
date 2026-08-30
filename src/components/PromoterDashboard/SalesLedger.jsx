import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Receipt, 
  Clock, 
  SendHorizontal
} from 'lucide-react';

export const SalesLedger = ({ onOpenDepositModal }) => {
  const { sales, activePromoter } = useApp();

  const promoterSales = sales.filter((s) => s.promoterId === activePromoter.id);

  return (
    <div style={{ marginBottom: '3rem' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            Sales Ledger & Deadlines
          </h2>
          <p className="text-muted" style={{ fontSize: '0.8rem' }}>
            Audit log of all digital passes issued, cash collected, and 10-day event deposit schedules.
          </p>
        </div>

        <button
          onClick={onOpenDepositModal}
          className="btn btn-primary"
          style={{ padding: '7px 14px', fontSize: '0.78rem', gap: '5px', width: '100%', maxWidth: '200px' }}
        >
          <SendHorizontal size={13} /> Settle Cash
        </button>
      </div>

      {/* Deposit Deadlines Alert Strip */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.05)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        borderRadius: '10px',
        padding: '0.85rem 1rem',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div className="flex items-center gap-2.5">
          <div style={{
            width: '32px', height: '32px', borderRadius: '7px',
            background: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <Clock size={16} color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>
              10-Day Pre-Concert Cash Settlement
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Cash collected from peer sales must be deposited at least 10 days prior to the show.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Outstanding</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f59e0b' }}>
            ₹{activePromoter.cashOwed.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Sales Table with responsive touch scrolling */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div className="table-responsive">
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '6px 4px' }}>TICKET CODE</th>
                <th style={{ padding: '6px 4px' }}>EVENT & CATEGORY</th>
                <th style={{ padding: '6px 4px' }}>BUYER</th>
                <th style={{ padding: '6px 4px' }}>QTY</th>
                <th style={{ padding: '6px 4px' }}>AMOUNT</th>
                <th style={{ padding: '6px 4px' }}>COMMISSION</th>
                <th style={{ padding: '6px 4px' }}>DEPOSIT DUE</th>
                <th style={{ padding: '6px 4px', textAlign: 'right' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {promoterSales.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No sales recorded yet. Click "Issue Ticket" to start selling to your network!
                  </td>
                </tr>
              ) : (
                promoterSales.map((sale) => (
                  <tr
                    key={sale.id}
                    style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}
                  >
                    <td style={{ padding: '10px 4px', fontFamily: 'monospace', fontWeight: 600, color: '#f4f4f6' }}>
                      {sale.ticketCode}
                    </td>
                    <td style={{ padding: '10px 4px' }}>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>{sale.eventName}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sale.ticketCategory}</div>
                    </td>
                    <td style={{ padding: '10px 4px' }}>
                      <div style={{ fontWeight: 500, color: '#ffffff' }}>{sale.buyerName}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{sale.buyerPhone}</div>
                    </td>
                    <td style={{ padding: '10px 4px', fontWeight: 600 }}>
                      {sale.quantity}
                    </td>
                    <td style={{ padding: '10px 4px', fontWeight: 600, color: '#ffffff' }}>
                      ₹{sale.totalAmount.toLocaleString('en-IN')}
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>
                        via {sale.paymentMethod}
                      </span>
                    </td>
                    <td style={{ padding: '10px 4px', fontWeight: 600, color: '#10b981' }}>
                      +₹{sale.commissionEarned.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 4px', color: '#fbbf24', fontSize: '0.74rem' }}>
                      {sale.depositDueDate}
                    </td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>
                      <span className={sale.depositStatus === 'Deposited' ? 'badge badge-emerald' : 'badge badge-amber'}>
                        {sale.depositStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
