import React, { useState, useEffect } from 'react';
import './DataRunning.css';

const DataRunning = () => {
  const [cards, setCards] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // Sample machine operations data
  const machineOperations = [
    { unit: 'H6', action: 'Get Wafer', source: 'Buffer', status: 'Success' },
    { unit: 'H7', action: 'Put Wafer', source: 'Process Chamber', status: 'In Progress' },
    { unit: 'H5', action: 'Move Wafer', source: 'Load Lock', status: 'Completed' },
    { unit: 'H8', action: 'Transfer Wafer', source: 'Storage', status: 'Success' },
    { unit: 'H4', action: 'Pick Wafer', source: 'Input Port', status: 'Failed' },
    { unit: 'H9', action: 'Place Wafer', source: 'Output Port', status: 'Success' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return '#10b981';
      case 'Completed': return '#059669';
      case 'In Progress': return '#f59e0b';
      case 'Failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const generateRandomPosition = () => {
    return Math.floor(Math.random() * 100) + 1; // Position 1-100
  };

  const generateNewCard = () => {
    const operation = machineOperations[Math.floor(Math.random() * machineOperations.length)];
    const position = generateRandomPosition();
    const timestamp = new Date().toLocaleTimeString();

    return {
      id: Date.now(),
      unit: operation.unit,
      action: operation.action,
      source: operation.source,
      position: position,
      status: operation.status,
      timestamp: timestamp,
      color: getStatusColor(operation.status)
    };
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Generate initial cards
    const initialCards = [];
    for (let i = 0; i < 5; i++) {
      initialCards.push(generateNewCard());
    }
    setCards(initialCards);

    // Generate new card every 2-4 seconds
    const interval = setInterval(() => {
      const newCard = generateNewCard();
      setCards(prevCards => {
        // Keep only last 10 cards to prevent overflow
        const updatedCards = [newCard, ...prevCards].slice(0, 10);
        return updatedCards;
      });
    }, 2000 + Math.random() * 2000); // 2-4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`data-running-widget ${!isVisible ? 'hidden' : ''}`}>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? '◀' : '▶'}
      </button>
      <div className="data-running-header">
        <h3>Machine Operations</h3>
        <div className="status-indicator">
          <span className="status-dot active"></span>
          Live Data
        </div>
      </div>
      <div className="data-running-content">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="operation-card"
            style={{
              animationDelay: `${index * 0.2}s`,
              borderLeftColor: card.color
            }}
          >
            <div className="card-header">
              <span className="unit-name">{card.unit}</span>
              <span className="timestamp">{card.timestamp}</span>
            </div>
            <div className="card-content">
              <div className="operation-info">
                <span className="action">{card.action}</span>
                <span className="source">from {card.source}</span>
              </div>
              <div className="position-info">
                Position: <strong>{card.position}</strong>
              </div>
            </div>
            <div className="card-status">
              <span
                className="status-badge"
                style={{ backgroundColor: card.color }}
              >
                {card.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataRunning;