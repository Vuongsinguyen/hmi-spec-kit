import React from 'react';

export function Button({ label, onClick, type = 'primary', disabled = false, icon }) {
  const className = `btn btn-${type}${disabled ? ' btn-disabled' : ''}`;
  return (
    <button className={className} onClick={disabled ? undefined : onClick} disabled={disabled}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}
