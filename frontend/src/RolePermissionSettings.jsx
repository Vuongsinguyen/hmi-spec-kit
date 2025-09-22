import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { Button } from './components/Button';

// Sample initial data (replace with API or file read in real app)
const initialRoles = [
  { name: 'ADMIN', permissions: ['subpage:access', 'subpage:edit', 'subpage:view', 'widget:access', 'widget:edit', 'widget:view'] },
  { name: 'OPERATOR', permissions: ['subpage:access', 'subpage:view', 'widget:access', 'widget:view'] },
  { name: 'MAINTAINER', permissions: ['subpage:access', 'subpage:edit', 'subpage:view', 'widget:access', 'widget:edit'] },
  { name: 'ENGINEER', permissions: ['subpage:access', 'subpage:edit', 'subpage:view', 'widget:access', 'widget:edit', 'widget:view'] },
  { name: 'ACCRETECH', permissions: ['subpage:access', 'subpage:view', 'widget:access', 'widget:view'] }
];
const allPermissions = [
  'subpage:access', 'subpage:edit', 'subpage:view',
  'widget:access', 'widget:edit', 'widget:view'
];

export default function RolePermissionSettings() {
  const { t } = useLanguage();
  const [roles, setRoles] = useState(initialRoles);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch roles from backend on mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:8080/roles');
      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles || initialRoles);
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  const saveRoles = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roles })
      });
      if (response.ok) {
        setMessage(t('common.success'));
      } else {
        setMessage(t('common.error'));
      }
    } catch (error) {
      setMessage(t('common.error'));
    }
    setLoading(false);
  };

  function togglePermission(roleIdx, perm) {
    setRoles(roles => roles.map((role, idx) => {
      if (idx !== roleIdx) return role;
      const hasPerm = role.permissions.includes(perm);
      return {
        ...role,
        permissions: hasPerm
          ? role.permissions.filter(p => p !== perm)
          : [...role.permissions, perm]
      };
    }));
  }

  return (
    <div style={{
      padding: '2rem',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family)',
      minHeight: '100vh'
    }}>
      <h2 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>{t('nav.settings')}</h2>
      {message && <p style={{
        color: 'var(--color-success)',
        padding: '0.5rem',
        backgroundColor: 'var(--color-light)',
        borderRadius: 'var(--border-radius)',
        marginBottom: '1rem'
      }}>{message}</p>}
      <table style={{
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        boxShadow: `0 2px 8px var(--color-shadow)`
      }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--color-light)' }}>
            <th style={{
              border: `1px solid var(--color-border)`,
              padding: '12px',
              textAlign: 'left',
              fontWeight: 'bold',
              color: 'var(--color-text)'
            }}>{t('common.role')}</th>
            {allPermissions.map(perm => (
              <th key={perm} style={{
                border: `1px solid var(--color-border)`,
                padding: '12px',
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'var(--color-text)'
              }}>{perm}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles.map((role, roleIdx) => (
            <tr key={role.name} style={{
              backgroundColor: roleIdx % 2 === 0 ? 'var(--color-background)' : 'var(--color-light)'
            }}>
              <td style={{
                border: `1px solid var(--color-border)`,
                padding: '12px',
                fontWeight: 'bold',
                color: 'var(--color-text)'
              }}>{role.name}</td>
              {allPermissions.map(perm => (
                <td key={perm} style={{
                  border: `1px solid var(--color-border)`,
                  padding: '12px',
                  textAlign: 'center'
                }}>
                  <input
                    type="checkbox"
                    checked={role.permissions.includes(perm)}
                    onChange={() => togglePermission(roleIdx, perm)}
                    style={{
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                      accentColor: 'var(--color-primary)'
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Button
        label={loading ? t('common.loading') : t('common.save')}
        onClick={saveRoles}
        disabled={loading}
        type="primary"
      />
    </div>
  );
}