import React from 'react';
import { ControlPanel } from '../components/ControlPanel';
import '../styles/subpage.css';
import '../styles/settings.css';

const Settings = () => {
  return (
    <div className="subpage settings-page">
      <div className="subpage-header">
        <h1>Settings - HMI Configuration</h1>
        <div className="page-info">
          <span className="timestamp">{new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="subpage-content">
        <div className="settings-grid">
          <div className="settings-section">
            <h2>Language & Theme</h2>
            <div className="settings-controls">
              <ControlPanel />
            </div>
          </div>

          <div className="settings-section">
            <h2>Display Settings</h2>
            <div className="setting-item">
              <label>Screen Resolution</label>
              <select>
                <option>1920x1080 (Full HD)</option>
                <option>2560x1440 (2K)</option>
                <option>3840x2160 (4K)</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Refresh Rate</label>
              <select>
                <option>60 Hz</option>
                <option>120 Hz</option>
                <option>144 Hz</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Auto-hide UI</label>
              <input type="checkbox" />
            </div>
          </div>

          <div className="settings-section">
            <h2>3D Rendering</h2>
            <div className="setting-item">
              <label>Anti-aliasing</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-item">
              <label>Animation Speed</label>
              <input type="range" min="0.1" max="2" step="0.1" defaultValue="1" />
            </div>
            <div className="setting-item">
              <label>Auto-rotation</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <div className="settings-section">
            <h2>System Settings</h2>
            <div className="setting-item">
              <label>Debug Mode</label>
              <input type="checkbox" />
            </div>
            <div className="setting-item">
              <label>Performance Monitor</label>
              <input type="checkbox" />
            </div>
            <div className="setting-item">
              <label>Auto-save Interval</label>
              <select>
                <option>30 seconds</option>
                <option>1 minute</option>
                <option>5 minutes</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h2>Network Settings</h2>
            <div className="setting-item">
              <label>API Endpoint</label>
              <input type="text" defaultValue="http://localhost:8080" />
            </div>
            <div className="setting-item">
              <label>Connection Timeout</label>
              <input type="number" defaultValue="5000" min="1000" max="30000" />
            </div>
            <div className="setting-item">
              <label>Auto-reconnect</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <div className="settings-section">
            <h2>Actions</h2>
            <div className="settings-actions">
              <button className="btn-primary">Save Settings</button>
              <button className="btn-secondary">Reset to Default</button>
              <button className="btn-secondary">Export Config</button>
              <button className="btn-secondary">Import Config</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;