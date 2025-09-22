import React, { useState } from 'react';

// Sample initial data (replace with API or file read in real app)
const initialRoles = [
  { name: 'Admin', permissions: ['subpage:access', 'subpage:edit', 'widget:access', 'widget:edit'] },
  { name: 'Operator', permissions: ['subpage:access', 'widget:access', 'widget:view'] },
  { name: 'Viewer', permissions: ['subpage:access', 'widget:view'] }
];
const allPermissions = [
  'subpage:access', 'subpage:edit', 'subpage:view',
  'widget:access', 'widget:edit', 'widget:view'
];

export default function RolePermissionSettings() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(0);

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
    <div style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h2>Role & Permission Settings</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h3>Roles</h3>
          <ul>
            {roles.map((role, idx) => (
              <li key={role.name}>
                <button onClick={() => setSelectedRole(idx)} style={{ fontWeight: selectedRole === idx ? 'bold' : 'normal' }}>
                  {role.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Permissions for {roles[selectedRole].name}</h3>
          <ul>
            {allPermissions.map(perm => (
              <li key={perm}>
                <label>
                  <input
                    type="checkbox"
                    checked={roles[selectedRole].permissions.includes(perm)}
                    onChange={() => togglePermission(selectedRole, perm)}
                  />
                  {perm}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
