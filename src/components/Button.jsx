import React from 'react';
import './Button.css';

export function Button({
  label,
  onClick,
  variant = 'action',
  disabled = false,
  icon,
  size = 'medium',
  fullWidth = false
}) {
  const className = `btn btn-${variant} btn-${size}${disabled ? ' btn-disabled' : ''}${fullWidth ? ' btn-full-width' : ''}`;

  return (
    <button
      className={className}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {label}
    </button>
  );
}