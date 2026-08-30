import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '420px',
      width: 'calc(100% - 48px)'
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' :
                        toast.type === 'info' ? 'rgba(59, 130, 246, 0.95)' :
                        'rgba(16, 185, 129, 0.95)',
            color: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            fontSize: '0.9rem',
            fontWeight: '500',
            animation: 'slideIn 0.3s ease-out',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {toast.type === 'error' ? <AlertCircle size={20} /> :
           toast.type === 'info' ? <Info size={20} /> :
           <CheckCircle2 size={20} />}
          <div style={{ flex: 1 }}>{toast.message}</div>
        </div>
      ))}
    </div>
  );
};
