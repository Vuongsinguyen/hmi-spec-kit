import React from 'react';
import RealTimeMonitoring from '../components/RealTimeMonitoring';
import '../styles/subpage.css';

const TopPage = () => {
  return (
    <div className="subpage top-page">
      <div className="subpage-content">
        <div className="main-widget-area">
          <RealTimeMonitoring />
        </div>
      </div>
    </div>
  );
};

export default TopPage;