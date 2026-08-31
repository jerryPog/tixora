import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  X, 
  Terminal, 
  Database,
  Eye,
  AlertTriangle,
  FileCode
} from 'lucide-react';
import { RLS_POLICY_DEFINITIONS, SQL_RLS_MIGRATION_SCRIPT, testRLSAccess } from '../services/rlsService';
import { useApp } from '../context/AppContext';

export const RLSInspectorModal = ({ isOpen, onClose }) => {
  const { currentRole, activePromoter, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sql' | 'tester'
  const [copiedSql, setCopiedSql] = useState(false);

  // Tester State
  const [testTable, setTestTable] = useState('ticket_sales');
  const [testAction, setTestAction] = useState('SELECT');
  const [testRole, setTestRole] = useState(currentRole);
  const [testTargetPromoter, setTestTargetPromoter] = useState('prom-2'); // Different from prom-1
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_RLS_MIGRATION_SCRIPT);
    setCopiedSql(true);
    showToast('RLS SQL Migration copied to clipboard!', 'success');
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleRunTest = () => {
    const result = testRLSAccess(
      testTable,
      testAction,
      testRole,
      activePromoter?.id || 'prom-1',
      testTargetPromoter
    );
    setTestResult(result);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#10b981', 
              padding: '6px', 
              borderRadius: '8px' 
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Endpoint Security & Row-Level Security (RLS)</h2>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Active Zero-Trust Isolation Architecture for Supabase / PostgreSQL 15+
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="btn-ghost" 
            style={{ padding: '6px' }}
            aria-label="Close Security Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Strip */}
        <div style={{ 
          display: 'flex', 
          gap: '6px', 
          borderBottom: '1px solid var(--border-color)', 
          paddingBottom: '0.5rem',
          marginBottom: '1.25rem'
        }}>
          {[
            { id: 'overview', label: 'Policy Matrix', icon: <Database size={14} /> },
            { id: 'tester', label: 'Live Endpoint Tester', icon: <Terminal size={14} /> },
            { id: 'sql', label: 'SQL DDL Policies', icon: <FileCode size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #ffffff' : '2px solid transparent',
                padding: '6px 12px',
                borderRadius: '6px 6px 0 0',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Overview Matrix */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.78rem',
              color: '#e4e4e7',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0 }} />
              <div>
                <strong>100% RLS Coverage Enabled:</strong> Every single table in the schema (`events`, `promoters`, `ticket_sales`, `waitlist_entries`, `contact_messages`) enforces strict Row-Level Security. Promoters cannot view peer sales or private KYC records.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {RLS_POLICY_DEFINITIONS.map((def) => (
                <div 
                  key={def.table} 
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <code style={{ background: '#090a0d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#60a5fa' }}>
                        {def.table}
                      </code>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {def.description}
                      </span>
                    </div>
                    <span style={{ 
                      background: 'rgba(16, 185, 129, 0.15)', 
                      color: '#10b981', 
                      fontSize: '0.65rem', 
                      fontWeight: 700, 
                      padding: '2px 6px', 
                      borderRadius: '4px' 
                    }}>
                      RLS ACTIVE
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {def.policies.map((p, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: '#090a0d',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '6px',
                          padding: '8px 10px',
                          fontSize: '0.72rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                          <span style={{ fontWeight: 700, color: '#ffffff' }}>{p.name}</span>
                          <span style={{ 
                            background: p.command === 'SELECT' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)', 
                            color: p.command === 'SELECT' ? '#93c5fd' : '#fcd34d',
                            fontSize: '0.62rem', 
                            padding: '1px 5px', 
                            borderRadius: '3px',
                            fontWeight: 700
                          }}>
                            {p.command}
                          </span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>{p.description}</div>
                        {p.using && (
                          <div style={{ color: '#a1a1aa', fontFamily: 'monospace', fontSize: '0.68rem' }}>
                            USING: <span style={{ color: '#34d399' }}>{p.using}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Live Policy Tester */}
        {activeTab === 'tester' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Test simulated database queries to verify how Row-Level Security policies respond to different roles and record ownership.
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Target Table
                </label>
                <select 
                  value={testTable} 
                  onChange={(e) => setTestTable(e.target.value)}
                  style={{ width: '100%', background: '#090a0d', color: '#fff', border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.78rem' }}
                >
                  <option value="ticket_sales">ticket_sales</option>
                  <option value="events">events</option>
                  <option value="promoters">promoters</option>
                  <option value="waitlist_entries">waitlist_entries</option>
                  <option value="contact_messages">contact_messages</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Query Action
                </label>
                <select 
                  value={testAction} 
                  onChange={(e) => setTestAction(e.target.value)}
                  style={{ width: '100%', background: '#090a0d', color: '#fff', border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.78rem' }}
                >
                  <option value="SELECT">SELECT (Read)</option>
                  <option value="INSERT">INSERT (Create)</option>
                  <option value="UPDATE">UPDATE (Edit)</option>
                  <option value="DELETE">DELETE (Remove)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Simulated Role
                </label>
                <select 
                  value={testRole} 
                  onChange={(e) => setTestRole(e.target.value)}
                  style={{ width: '100%', background: '#090a0d', color: '#fff', border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.78rem' }}
                >
                  <option value="promoter">promoter (Aarav Sharma - ID: prom-1)</option>
                  <option value="admin">admin (Tixora Operations)</option>
                  <option value="anon">anon (Public unauthenticated)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Record Owner Promoter ID
                </label>
                <select 
                  value={testTargetPromoter} 
                  onChange={(e) => setTestTargetPromoter(e.target.value)}
                  style={{ width: '100%', background: '#090a0d', color: '#fff', border: '1px solid var(--border-color)', padding: '6px 8px', borderRadius: '6px', fontSize: '0.78rem' }}
                >
                  <option value="prom-1">prom-1 (Current Session User)</option>
                  <option value="prom-2">prom-2 (Riya Sen - Other Promoter)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRunTest}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px', fontSize: '0.84rem' }}
            >
              Execute RLS Simulation
            </button>

            {testResult && (
              <div style={{
                background: testResult.allowed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                border: `1px solid ${testResult.allowed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                {testResult.allowed ? (
                  <Unlock size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <Lock size={20} color="#f43f5e" style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
                <div>
                  <div style={{ 
                    fontSize: '0.86rem', 
                    fontWeight: 700, 
                    color: testResult.allowed ? '#10b981' : '#f43f5e',
                    marginBottom: '2px'
                  }}>
                    {testResult.allowed ? 'ACCESS GRANTED' : 'ACCESS RESTRICTED BY ROW-LEVEL SECURITY'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#e4e4e7' }}>
                    {testResult.reason}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: SQL Script */}
        {activeTab === 'sql' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Copy and run this migration in your Supabase SQL Editor or PostgreSQL cluster:
              </span>
              <button
                onClick={handleCopySQL}
                className="btn btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.72rem', gap: '4px' }}
              >
                {copiedSql ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <pre style={{
              background: '#090a0d',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              color: '#34d399',
              maxHeight: '340px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {SQL_RLS_MIGRATION_SCRIPT}
            </pre>
          </div>
        )}

        {/* Modal Footer */}
        <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
            Close Security Audit
          </button>
        </div>
      </div>
    </div>
  );
};
