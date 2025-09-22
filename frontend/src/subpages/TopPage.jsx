
import React, { useState } from 'react';
import RealTimeMonitoring from '../components/RealTimeMonitoring';
import HamburgerMenu from '../components/HamburgerMenu';
import SettingsDialog from '../components/SettingsDialog';
import DataRunning from '../components/DataRunning';
import '../styles/subpage.css';
import '../styles/HamburgerMenuDialog.css';
import '../components/DataRunning.css';


const TopPage = () => {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const handleSettingsClick = () => {
    setShowSettingsDialog(true);
  };

  const handleCloseDialog = () => {
    setShowSettingsDialog(false);
  };

  return (
    <div className="subpage top-page" style={{ position: 'relative', height: '100vh' }}>
      <div className="main-content" style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="subpage-content" style={{ flex: 1, height: '100%' }}>
          <div className="main-widget-area" style={{ width: '100%', height: '100%' }}>
            <RealTimeMonitoring />
          </div>
        </div>
      </div>
      <DataRunning />
      <HamburgerMenu onSettingsClick={handleSettingsClick} />
      {showSettingsDialog && (
        <div className="settings-dialog-overlay" onClick={handleCloseDialog}>
          <div className="settings-dialog" onClick={e => e.stopPropagation()}>
            <SettingsDialog onCancel={handleCloseDialog} onSave={handleCloseDialog} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPage;