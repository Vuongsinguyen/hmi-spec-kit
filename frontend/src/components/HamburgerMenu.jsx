import React, { useState } from 'react';
import './HamburgerMenu.css';

export default function HamburgerMenu({ onSettingsClick }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hamburger-menu-container">
      <button
        className="hamburger-icon"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
      {open && (
        <div className="menu-popup">
          <button className="menu-item" onClick={onSettingsClick}>
            Settings
          </button>
        </div>
      )}
    </div>
  );
}
