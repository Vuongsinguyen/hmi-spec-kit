import React, { useState } from 'react';
import Settings from '../subpages/Settings';

export default function SettingsDialog({ onCancel, onSave }) {
  // State để lưu tạm các thay đổi nếu cần
  // const [pendingChanges, setPendingChanges] = useState({});

  return (
    <div style={{
      width: '700px',
      maxHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'var(--color-background)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      position: 'relative'
    }}>
      <button
        onClick={onCancel}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: 'var(--color-text)',
          padding: '4px',
          borderRadius: '4px',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.1)'}
        onMouseLeave={(e) => e.target.style.background = 'none'}
        title="Close"
      >
        ×
      </button>
      <div style={{
        flex: 1,
        width: '100%',
        overflowY: 'auto',
        maxHeight: 'calc(80vh - 120px)',
        padding: '0 10px'
      }}>
        <Settings />
      </div>
      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '24px',
        padding: '16px 0',
        borderTop: '1px solid var(--color-border)',
        width: '100%',
        justifyContent: 'center'
      }}>
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn-primary" onClick={onSave}>Save</button>
      </div>
    </div>
  );
}