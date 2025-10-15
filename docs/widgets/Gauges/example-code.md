# Example Code: Gauges Widget

## Basic Usage

```jsx
import React from 'react';
import { Gauges } from './components/Gauges';

export function BasicGaugeExample() {
  return (
    <Gauges
      value={75}
      min={0}
      max={100}
      unit="°C"
      label="Temperature"
    />
  );
}
```

## With Color Zones

```jsx
import React from 'react';
import { Gauges } from './components/Gauges';

export function ZonedGaugeExample() {
  const temperatureZones = [
    { from: 0, to: 60, color: 'success' },
    { from: 60, to: 85, color: 'warning' },
    { from: 85, to: 120, color: 'danger' }
  ];

  return (
    <Gauges
      value={72}
      min={0}
      max={120}
      unit="°C"
      label="Chamber Temperature"
      zones={temperatureZones}
      showZones={true}
    />
  );
}
```

## Real-time Updates with Backend

```jsx
import React, { useState, useEffect } from 'react';
import { Gauges } from './components/Gauges';

export function RealTimeGaugeExample() {
  const [temperature, setTemperature] = useState(25);
  const [pressure, setPressure] = useState(14.7);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // In real app, fetch from backend API
      setTemperature(prev => prev + (Math.random() - 0.5) * 5);
      setPressure(prev => prev + (Math.random() - 0.5) * 2);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Gauges
        value={temperature}
        min={0}
        max={100}
        unit="°C"
        label="Temperature"
        refreshRate={1000}
      />
      <Gauges
        value={pressure}
        min={0}
        max={30}
        unit="PSI"
        label="Pressure"
        refreshRate={1000}
      />
    </div>
  );
}
```

## With Threshold Alerts

```jsx
import React, { useState } from 'react';
import { Gauges } from './components/Gauges';

export function ThresholdGaugeExample() {
  const [alerts, setAlerts] = useState([]);

  const handleThresholdExceeded = (type, value, threshold) => {
    const alert = `${type.toUpperCase()}: Value ${value} exceeded ${threshold}`;
    setAlerts(prev => [...prev, alert]);
    console.warn(alert);
  };

  return (
    <div>
      <Gauges
        value={88}
        min={0}
        max={100}
        unit="°C"
        label="Critical Temperature"
        threshold={{
          warning: 75,
          critical: 90,
          onWarning: (value) => handleThresholdExceeded('warning', value, 75),
          onCritical: (value) => handleThresholdExceeded('critical', value, 90)
        }}
      />
      <div style={{ marginTop: '1rem' }}>
        {alerts.map((alert, idx) => (
          <div key={idx} style={{ color: 'red' }}>{alert}</div>
        ))}
      </div>
    </div>
  );
}
```

## Multiple Gauge Dashboard

```jsx
import React, { useState, useEffect } from 'react';
import { Gauges } from './components/Gauges';

export function GaugeDashboard() {
  const [machineData, setMachineData] = useState({
    temperature: 65,
    pressure: 18.5,
    rpm: 3500,
    efficiency: 87
  });

  useEffect(() => {
    // Simulate backend data updates
    const interval = setInterval(() => {
      setMachineData({
        temperature: 60 + Math.random() * 30,
        pressure: 15 + Math.random() * 10,
        rpm: 3000 + Math.random() * 1000,
        efficiency: 80 + Math.random() * 20
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      padding: '2rem'
    }}>
      <Gauges
        value={machineData.temperature}
        min={0}
        max={120}
        unit="°C"
        label="Temperature"
        zones={[
          { from: 0, to: 70, color: 'success' },
          { from: 70, to: 90, color: 'warning' },
          { from: 90, to: 120, color: 'danger' }
        ]}
        size={220}
      />
      
      <Gauges
        value={machineData.pressure}
        min={0}
        max={30}
        unit="PSI"
        label="Pressure"
        zones={[
          { from: 0, to: 20, color: 'success' },
          { from: 20, to: 25, color: 'warning' },
          { from: 25, to: 30, color: 'danger' }
        ]}
        size={220}
      />
      
      <Gauges
        value={machineData.rpm}
        min={0}
        max={5000}
        unit="RPM"
        label="Motor Speed"
        type="semi-circular"
        size={220}
        precision={0}
      />
      
      <Gauges
        value={machineData.efficiency}
        min={0}
        max={100}
        unit="%"
        label="Efficiency"
        zones={[
          { from: 0, to: 60, color: 'danger' },
          { from: 60, to: 80, color: 'warning' },
          { from: 80, to: 100, color: 'success' }
        ]}
        size={220}
      />
    </div>
  );
}
```

## Semi-Circular Gauge

```jsx
import React from 'react';
import { Gauges } from './components/Gauges';

export function SemiCircularGaugeExample() {
  return (
    <Gauges
      value={3500}
      min={0}
      max={5000}
      unit="RPM"
      label="Motor Speed"
      type="semi-circular"
      size={250}
      precision={0}
      animated={true}
    />
  );
}
```

## Compact Gauge (No Value Display)

```jsx
import React from 'react';
import { Gauges } from './components/Gauges';

export function CompactGaugeExample() {
  return (
    <Gauges
      value={45}
      min={0}
      max={100}
      unit="%"
      label="Progress"
      size={150}
      showValue={false}
      showZones={false}
    />
  );
}
```

## With Click Interaction

```jsx
import React, { useState } from 'react';
import { Gauges } from './components/Gauges';

export function InteractiveGaugeExample() {
  const [showDetails, setShowDetails] = useState(false);

  const handleGaugeClick = (value, label) => {
    console.log(`Clicked ${label}: ${value}`);
    setShowDetails(true);
  };

  return (
    <div>
      <Gauges
        value={75}
        min={0}
        max={100}
        unit="°C"
        label="Click for Details"
        onClick={handleGaugeClick}
        style={{ cursor: 'pointer' }}
      />
      {showDetails && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid' }}>
          <h3>Detailed Information</h3>
          <p>Current: 75°C</p>
          <p>Average: 72°C</p>
          <p>Peak: 88°C</p>
        </div>
      )}
    </div>
  );
}
```

## Integration in Subpage

```jsx
import React from 'react';
import { Gauges } from '../components/Gauges';
import '../styles/subpage.css';

export default function ProcessMonitoringSubpage() {
  return (
    <div className="subpage-container">
      <div className="subpage-header">
        <h1>Process Monitoring</h1>
      </div>
      
      <div className="subpage-content">
        <div className="main-widget-area">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            padding: '2rem'
          }}>
            <Gauges
              value={68}
              min={0}
              max={120}
              unit="°C"
              label="Chamber Temp"
            />
            <Gauges
              value={22.5}
              min={0}
              max={30}
              unit="PSI"
              label="Vacuum Pressure"
            />
            <Gauges
              value={92}
              min={0}
              max={100}
              unit="%"
              label="Throughput"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```
