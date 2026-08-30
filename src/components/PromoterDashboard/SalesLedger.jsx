import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Receipt, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const SalesLedger = ({ onOpenRecordSale }) => {
  const { sales, activePromoter } = useApp();

  const promoterSales = sales.filter((s) => s.promoterId === activePromoter.id);

  return (
    <div style={{ marginBottom: '3rem' }}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            Pass & Payment Ledger
          </h2>
          <p className="text-muted" style={{ fontSize: '0.8rem' }}>
            Verified log of passes issued with upfront payment and instant BookMyShow / District delivery.
          </p>
        </div>

        <button
          onClick={onOpenRecordSale}
          className="btn btn-primary"
          style={{ padding: '7px 14px', fontSize: '0.78rem', gap: '5px', width: '100%', maxWidth: '200px' }}
        >
          <Zap size={13} /> Pay & Issue Pass
        </button>
      </div>

      {/* Upfront Payment Policy Strip */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.05)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
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
            background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <ShieldCheck size={16} color="#10b981" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#ffffff' }}>
              100% Upfront Paid & Dispatched
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Passes are dispatched directly to the buyer's account immediately upon verified Card/UPI/Bank settlement.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Earnings</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981' }}>
            ₹{activePromoter.totalCommissionEarned.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Sales Table with responsive touch scrolling */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div className="table-responsive">
          <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '6px 4px' }}>PASS CODE</th>
                <th style={{ padding: '6px 4px' }}>EVENT & CATEGORY</th>
                <th style={{ padding: '6px 4px' }}>BUYER (BMS / DISTRICT)</th>
                <th style={{ padding: '6px 4px' }}>QTY</th>
                <th style={{ padding: '6px 4px' }}>TOTAL PAID</th>
                <th style={{ padding: '6px 4px' }}>COMMISSION</th>
                <th style={{ padding: '6px 4px' }}>PAYMENT CHANNEL</th>
                <th style={{ padding: '6px 4px', textAlign: 'right' }}>DELIVERY</th>
              </tr>
            </thead>
            <tbody>
              {promoterSales.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No sales recorded yet. Click "Pay & Issue Pass" to start selling to your network!
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
                    </td>
                    <td style={{ padding: '10px 4px', fontWeight: 600, color: '#10b981' }}>
                      +₹{sale.commissionEarned.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '10px 4px', color: '#93c5fd', fontSize: '0.74rem' }}>
                      {sale.paymentMethod}
                    </td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>
                      <span className="badge badge-emerald">
                        ✓ Delivered
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
