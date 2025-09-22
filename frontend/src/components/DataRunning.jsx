import React, { useState, useEffect } from 'react';
import './DataRunning.css';

const DataRunning = () => {
  const [cards, setCards] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [pinnedCards, setPinnedCards] = useState([]);

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

  const togglePinCard = (cardId) => {
    console.log('Toggling pin for card:', cardId);
    setPinnedCards(prev => {
      const isPinned = prev.some(card => card.id === cardId);
      if (isPinned) {
        // Unpin: remove from pinned cards only
        console.log('Unpinning card');
        return prev.filter(card => card.id !== cardId);
      } else {
        // Pin: add to pinned cards (keep in main list)
        const cardToPin = cards.find(card => card.id === cardId);
        console.log('Card to pin:', cardToPin);
        if (cardToPin) {
          console.log('Pinning card');
          return [...prev, cardToPin];
        }
        return prev;
      }
    });
  };

  useEffect(() => {
    // Start with empty cards array
    setCards([]);

    // Generate new card every 2-4 seconds
    const interval = setInterval(() => {
      const newCard = generateNewCard();
      setCards(prevCards => {
        // Add new card to the end, then reverse for display
        const newCards = [...prevCards, newCard];
        return newCards.slice(-10); // Keep only last 10 cards
      });
    }, 2000 + Math.random() * 2000); // 2-4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="data-running-container">
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
          {cards.slice().reverse().map((card, index) => {
            const isPinned = pinnedCards.some(pinnedCard => pinnedCard.id === card.id);
            return (
              <div
                key={card.id}
                className={`operation-card ${isPinned ? 'pinned' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderLeftColor: card.color
                }}
              >
                <div className="card-header">
                  <span className="unit-name">{card.unit}</span>
                  <div className="card-header-right">
                    <span className="timestamp">{card.timestamp}</span>
                    <button
                      className="pin-button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        togglePinCard(card.id);
                      }}
                      title={isPinned ? "Unpin this card" : "Pin this card"}
                    >
                      {isPinned ? '📍' : '📌'}
                    </button>
                  </div>
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
            );
          })}
        </div>
      </div>

      {/* Pinned Cards Sidebar */}
      {pinnedCards.length > 0 && (
        <div className="pinned-cards-sidebar">
          <div className="pinned-cards-header">
            <h4>Pinned Cards ({pinnedCards.length})</h4>
          </div>
          <div className="pinned-cards-content">
            {pinnedCards.map((card) => (
              <div
                key={`pinned-${card.id}`}
                className="operation-card pinned-card"
                style={{
                  borderLeftColor: card.color
                }}
              >
                <div className="card-header">
                  <span className="unit-name">{card.unit}</span>
                  <button
                    className="unpin-button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setPinnedCards(prev => prev.filter(c => c.id !== card.id));
                    }}
                    title="Unpin this card"
                  >
                    ❌
                  </button>
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
      )}
    </div>
  );
};

export default DataRunning;