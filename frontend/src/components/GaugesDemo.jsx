import React, { useState, useEffect } from 'react';
import { Gauges } from './Gauges';
import './GaugesDemo.css';

/**
 * Gauges Demo Page
 * Demonstrates all gauge types and features
 */
export function GaugesDemo() {
  // Simulated real-time data
  const [temperature, setTemperature] = useState(72);
  const [pressure, setPressure] = useState(18.5);
  const [rpm, setRpm] = useState(3500);
  const [efficiency, setEfficiency] = useState(87);
  const [vacuum, setVacuum] = useState(250);
  const [flowRate, setFlowRate] = useState(45);
  
  // Operating mode states
  const [intakePressure, setIntakePressure] = useState(12.5);
  const [exhaustPressure, setExhaustPressure] = useState(8.3);
  const [idlePressure, setIdlePressure] = useState(5.0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)));
      setPressure(prev => Math.max(10, Math.min(30, prev + (Math.random() - 0.5) * 2)));
      setRpm(prev => Math.max(2000, Math.min(5000, prev + (Math.random() - 0.5) * 200)));
      setEfficiency(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setVacuum(prev => Math.max(100, Math.min(1000, prev + (Math.random() - 0.5) * 50)));
      setFlowRate(prev => Math.max(30, Math.min(70, prev + (Math.random() - 0.5) * 5)));
      
      // Update operating mode pressures
      setIntakePressure(prev => Math.max(8, Math.min(20, prev + (Math.random() - 0.5) * 2)));
      setExhaustPressure(prev => Math.max(5, Math.min(15, prev + (Math.random() - 0.5) * 1.5)));
      setIdlePressure(prev => Math.max(2, Math.min(8, prev + (Math.random() - 0.5) * 1)));
      setFlowRate(prev => Math.max(30, Math.min(70, prev + (Math.random() - 0.5) * 3)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleGaugeClick = (value, label) => {
    console.log(`Clicked ${label}: ${value}`);
    alert(`${label}: ${value}\n\nClick OK to continue monitoring.`);
  };

  const handleThresholdExceeded = (type, value, threshold) => {
    console.warn(`${type.toUpperCase()}: Value ${value} exceeded threshold ${threshold}`);
  };

  return (
    <div className="gauges-demo">
      <div className="demo-header">
        <h1>Gauges Widget - POC Demo</h1>
        <p>Real-time process parameter visualization with 8 gauge types</p>
        <div className="demo-info">
          <span>📊 Circular (360°)</span>
          <span>⚙️ Semi-Circular (270°)</span>
          <span>🚗 Half-Circle (180°)</span>
          <span>📦 Compact/Mini</span>
          <span>🍩 Donut</span>
          <span>📏 Linear</span>
        </div>
      </div>

      {/* Section 1: Basic Circular Gauges */}
      <section className="demo-section">
        <h2>🔵 Circular Gauges (360°)</h2>
        <div className="gauges-grid">
          <Gauges
            value={temperature}
            min={0}
            max={120}
            unit="°C"
            label="Chamber Temperature"
            type="circular"
            size={220}
            zones={[
              { from: 0, to: 70, color: 'success' },
              { from: 70, to: 90, color: 'warning' },
              { from: 90, to: 120, color: 'danger' }
            ]}
            threshold={{
              warning: 75,
              critical: 90,
              onWarning: (val) => handleThresholdExceeded('warning', val, 75),
              onCritical: (val) => handleThresholdExceeded('critical', val, 90)
            }}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={pressure}
            min={0}
            max={30}
            unit="PSI"
            label="System Pressure"
            type="circular"
            size={220}
            zones={[
              { from: 0, to: 20, color: 'success' },
              { from: 20, to: 25, color: 'warning' },
              { from: 25, to: 30, color: 'danger' }
            ]}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={efficiency}
            min={0}
            max={100}
            unit="%"
            label="Overall Efficiency"
            type="circular"
            size={220}
            zones={[
              { from: 0, to: 60, color: 'danger' },
              { from: 60, to: 80, color: 'warning' },
              { from: 80, to: 100, color: 'success' }
            ]}
            onClick={handleGaugeClick}
          />
        </div>
      </section>

      {/* Section 2: Semi-Circular Gauges */}
      <section className="demo-section">
        <h2>⚙️ Semi-Circular Gauges (270°)</h2>
        <div className="gauges-grid">
          <Gauges
            value={rpm}
            min={0}
            max={5000}
            unit="RPM"
            label="Motor Speed"
            type="semi-circular"
            size={250}
            zones={[
              { from: 0, to: 3000, color: 'success' },
              { from: 3000, to: 4500, color: 'warning' },
              { from: 4500, to: 5000, color: 'danger' }
            ]}
            precision={0}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={flowRate}
            min={0}
            max={100}
            unit="L/min"
            label="Flow Rate"
            type="semi-circular"
            size={250}
            zones={[
              { from: 0, to: 40, color: 'warning' },
              { from: 40, to: 60, color: 'success' },
              { from: 60, to: 100, color: 'warning' }
            ]}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={vacuum}
            min={0}
            max={1000}
            unit="mTorr"
            label="Vacuum Level"
            type="semi-circular"
            size={250}
            zones={[
              { from: 0, to: 300, color: 'success' },
              { from: 300, to: 700, color: 'warning' },
              { from: 700, to: 1000, color: 'danger' }
            ]}
            precision={0}
            onClick={handleGaugeClick}
          />
        </div>
      </section>

      {/* Section 2.5: Half-Circle Gauges */}
      <section className="demo-section">
        <h2>🚗 Half-Circle Gauges (180° - Automotive Style)</h2>
        <p className="section-description" style={{ marginBottom: '1.5rem', color: 'var(--color-textSecondary)' }}>
          Perfect half-circle design (180°) inspired by car speedometers. More compact than semi-circular (270°).
        </p>
        <div className="gauges-grid">
          <Gauges
            value={rpm * 1.6}
            min={0}
            max={8000}
            unit="RPM"
            label="Engine RPM"
            type="half-circle"
            size={240}
            zones={[
              { from: 0, to: 3000, color: 'success' },
              { from: 3000, to: 6000, color: 'warning' },
              { from: 6000, to: 8000, color: 'danger' }
            ]}
            showZones={true}
            precision={0}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={efficiency * 2.2}
            min={0}
            max={220}
            unit="km/h"
            label="Speed"
            type="half-circle"
            size={240}
            zones={[
              { from: 0, to: 80, color: 'success' },
              { from: 80, to: 150, color: 'warning' },
              { from: 150, to: 220, color: 'danger' }
            ]}
            showZones={true}
            precision={0}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={efficiency}
            min={0}
            max={100}
            unit="%"
            label="Fuel Level"
            type="half-circle"
            size={240}
            threshold={{
              warning: 30,
              critical: 10,
              onWarning: (val) => handleThresholdExceeded('warning', val, 30),
              onCritical: (val) => handleThresholdExceeded('critical', val, 10)
            }}
            onClick={handleGaugeClick}
          />
        </div>
      </section>

      {/* Section 2.7: Compact Pressure Gauges (200x120px) */}
      <section className="demo-section">
        <h2>📦 Compact Pressure Gauges - Size Comparison</h2>
        <p className="section-description" style={{ marginBottom: '1.5rem', color: 'var(--color-textSecondary)' }}>
          Three sizes optimized for different dashboard densities. All with integrated mode indicators.
        </p>

        {/* Size comparison grid */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: '2rem' }}>
          {/* Standard 200×120 */}
          <div style={{ border: '2px dashed var(--color-border)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-textSecondary)' }}>
              Standard (200×120px)
            </div>
            <Gauges
              value={intakePressure}
              min={0}
              max={25}
              unit="PSI"
              label="Intake"
              type="pressure-compact"
              operatingMode="intake"
              zones={[
                { from: 0, to: 15, color: 'success' },
                { from: 15, to: 20, color: 'warning' },
                { from: 20, to: 25, color: 'danger' }
              ]}
              showZones={true}
              onClick={handleGaugeClick}
            />
          </div>

          {/* Mini 160×80 */}
          <div style={{ border: '2px dashed var(--color-border)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-textSecondary)' }}>
              Mini (160×80px)
            </div>
            <Gauges
              value={exhaustPressure}
              min={0}
              max={20}
              unit="PSI"
              label="Exhaust"
              type="pressure-mini"
              operatingMode="exhaust"
              zones={[
                { from: 0, to: 10, color: 'success' },
                { from: 10, to: 15, color: 'warning' },
                { from: 15, to: 20, color: 'danger' }
              ]}
              showZones={true}
              onClick={handleGaugeClick}
            />
          </div>

          {/* Micro 120×60 */}
          <div style={{ border: '2px dashed var(--color-border)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-textSecondary)' }}>
              Micro (120×60px)
            </div>
            <Gauges
              value={idlePressure}
              min={0}
              max={10}
              unit="PSI"
              label="Idle"
              type="pressure-micro"
              operatingMode="idle"
              onClick={handleGaugeClick}
            />
          </div>
        </div>

        {/* Grid examples */}
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Standard (200×120px) Grid</h3>
        <div className="pressure-compact-grid">
          <Gauges
            value={intakePressure}
            min={0}
            max={25}
            unit="PSI"
            label="Intake"
            type="pressure-compact"
            operatingMode="intake"
            zones={[
              { from: 0, to: 15, color: 'success' },
              { from: 15, to: 20, color: 'warning' },
              { from: 20, to: 25, color: 'danger' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />
          <Gauges
            value={exhaustPressure}
            min={0}
            max={20}
            unit="PSI"
            label="Exhaust"
            type="pressure-compact"
            operatingMode="exhaust"
            zones={[
              { from: 0, to: 10, color: 'success' },
              { from: 10, to: 15, color: 'warning' },
              { from: 15, to: 20, color: 'danger' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />
          <Gauges
            value={idlePressure}
            min={0}
            max={10}
            unit="PSI"
            label="Idle"
            type="pressure-compact"
            operatingMode="idle"
            onClick={handleGaugeClick}
          />
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Mini (160×80px) Grid</h3>
        <div className="pressure-mini-grid">
          <Gauges
            value={pressure}
            min={0}
            max={30}
            unit="PSI"
            label="P1"
            type="pressure-mini"
            operatingMode="intake"
            zones={[
              { from: 0, to: 20, color: 'success' },
              { from: 20, to: 25, color: 'warning' },
              { from: 25, to: 30, color: 'danger' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />
          <Gauges
            value={flowRate * 0.4}
            min={0}
            max={40}
            unit="L/m"
            label="F1"
            type="pressure-mini"
            operatingMode="exhaust"
            zones={[
              { from: 0, to: 15, color: 'warning' },
              { from: 15, to: 25, color: 'success' },
              { from: 25, to: 40, color: 'warning' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />
          <Gauges
            value={vacuum / 50}
            min={0}
            max={20}
            unit="mBar"
            label="V1"
            type="pressure-mini"
            operatingMode="intake"
            onClick={handleGaugeClick}
          />
          <Gauges
            value={temperature * 0.3}
            min={0}
            max={30}
            unit="PSI"
            label="P2"
            type="pressure-mini"
            operatingMode="idle"
            onClick={handleGaugeClick}
          />
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.2rem' }}>Micro (120×60px) Grid - High Density</h3>
        <div className="pressure-micro-grid">
          <Gauges value={intakePressure} min={0} max={25} unit="PSI" type="pressure-micro" operatingMode="intake" onClick={handleGaugeClick} />
          <Gauges value={exhaustPressure} min={0} max={20} unit="PSI" type="pressure-micro" operatingMode="exhaust" onClick={handleGaugeClick} />
          <Gauges value={idlePressure} min={0} max={10} unit="PSI" type="pressure-micro" operatingMode="idle" onClick={handleGaugeClick} />
          <Gauges value={pressure} min={0} max={30} unit="PSI" type="pressure-micro" operatingMode="intake" onClick={handleGaugeClick} />
          <Gauges value={flowRate * 0.4} min={0} max={40} unit="L/m" type="pressure-micro" operatingMode="exhaust" onClick={handleGaugeClick} />
          <Gauges value={vacuum / 50} min={0} max={20} unit="mBar" type="pressure-micro" operatingMode="intake" onClick={handleGaugeClick} />
        </div>

        {/* Indicator-Only Mode Examples */}
        <h3 style={{ marginTop: '2.5rem', marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
          🎨 Indicator-Only Mode (No Numbers - Colors & Icons Only)
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-textSecondary)', marginBottom: '1rem' }}>
          Perfect for status walls where you only need quick visual recognition without detailed values.
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Standard size - indicator only */}
          <div style={{ border: '2px dashed var(--color-info)', padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--color-backgroundSecondary)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-textSecondary)' }}>
              Standard (200×120) - Indicator Only
            </div>
            <Gauges
              value={intakePressure}
              min={0}
              max={25}
              unit="PSI"
              type="pressure-compact"
              operatingMode="intake"
              indicatorOnly={true}
              zones={[
                { from: 0, to: 15, color: 'success' },
                { from: 15, to: 20, color: 'warning' },
                { from: 20, to: 25, color: 'danger' }
              ]}
              showZones={true}
              onClick={handleGaugeClick}
            />
          </div>

          {/* Mini - indicator only */}
          <div style={{ border: '2px dashed var(--color-warning)', padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--color-backgroundSecondary)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-textSecondary)' }}>
              Mini (160×80) - Indicator Only
            </div>
            <Gauges
              value={exhaustPressure}
              min={0}
              max={20}
              unit="PSI"
              type="pressure-mini"
              operatingMode="exhaust"
              indicatorOnly={true}
              zones={[
                { from: 0, to: 10, color: 'success' },
                { from: 10, to: 15, color: 'warning' },
                { from: 15, to: 20, color: 'danger' }
              ]}
              showZones={true}
              onClick={handleGaugeClick}
            />
          </div>

          {/* Micro - indicator only */}
          <div style={{ border: '2px dashed var(--color-textSecondary)', padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--color-backgroundSecondary)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-textSecondary)' }}>
              Micro (120×60) - Indicator Only
            </div>
            <Gauges
              value={idlePressure}
              min={0}
              max={10}
              unit="PSI"
              type="pressure-micro"
              operatingMode="idle"
              indicatorOnly={true}
              onClick={handleGaugeClick}
            />
          </div>
        </div>

        {/* Status wall grid - all indicator-only */}
        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '1rem' }}>Status Wall Example (Micro Grid)</h4>
        <div className="pressure-micro-grid" style={{ backgroundColor: 'var(--color-backgroundSecondary)', padding: '1rem', borderRadius: '8px' }}>
          <Gauges value={intakePressure} min={0} max={25} type="pressure-micro" operatingMode="intake" indicatorOnly={true} zones={[{ from: 0, to: 15, color: 'success' }, { from: 15, to: 20, color: 'warning' }, { from: 20, to: 25, color: 'danger' }]} showZones={true} onClick={handleGaugeClick} />
          <Gauges value={exhaustPressure} min={0} max={20} type="pressure-micro" operatingMode="exhaust" indicatorOnly={true} zones={[{ from: 0, to: 10, color: 'success' }, { from: 10, to: 15, color: 'warning' }, { from: 15, to: 20, color: 'danger' }]} showZones={true} onClick={handleGaugeClick} />
          <Gauges value={idlePressure} min={0} max={10} type="pressure-micro" operatingMode="idle" indicatorOnly={true} onClick={handleGaugeClick} />
          <Gauges value={pressure} min={0} max={30} type="pressure-micro" operatingMode="intake" indicatorOnly={true} zones={[{ from: 0, to: 20, color: 'success' }, { from: 20, to: 25, color: 'warning' }, { from: 25, to: 30, color: 'danger' }]} showZones={true} onClick={handleGaugeClick} />
          <Gauges value={flowRate * 0.4} min={0} max={40} type="pressure-micro" operatingMode="exhaust" indicatorOnly={true} zones={[{ from: 0, to: 15, color: 'warning' }, { from: 15, to: 25, color: 'success' }, { from: 25, to: 40, color: 'warning' }]} showZones={true} onClick={handleGaugeClick} />
          <Gauges value={vacuum / 50} min={0} max={20} type="pressure-micro" operatingMode="intake" indicatorOnly={true} zones={[{ from: 0, to: 6, color: 'success' }, { from: 6, to: 14, color: 'warning' }, { from: 14, to: 20, color: 'danger' }]} showZones={true} onClick={handleGaugeClick} />
          <Gauges value={temperature * 0.3} min={0} max={30} type="pressure-micro" operatingMode="idle" indicatorOnly={true} onClick={handleGaugeClick} />
          <Gauges value={intakePressure * 0.8} min={0} max={25} type="pressure-micro" operatingMode="intake" indicatorOnly={true} zones={[{ from: 0, to: 15, color: 'success' }, { from: 15, to: 20, color: 'warning' }, { from: 20, to: 25, color: 'danger' }]} showZones={true} onClick={handleGaugeClick} />
          <Gauges value={exhaustPressure * 1.2} min={0} max={20} type="pressure-micro" operatingMode="exhaust" indicatorOnly={true} zones={[{ from: 0, to: 10, color: 'success' }, { from: 10, to: 15, color: 'warning' }, { from: 15, to: 20, color: 'danger' }]} showZones={true} onClick={handleGaugeClick} />
        </div>
      </section>

      {/* Section 2.8: Operating Mode Indicators (Circular & Semi-Circular) */}
      <section className="demo-section">
        <h2>🔄 Operating Mode Indicators (Circular & Semi-Circular)</h2>
        <p className="section-description" style={{ marginBottom: '1.5rem', color: 'var(--color-textSecondary)' }}>
          Larger pressure gauges with external mode badges: Intake (↓), Exhaust (↑), or Idle (⏸)
        </p>
        <div className="gauges-grid">
          <Gauges
            value={intakePressure}
            min={0}
            max={25}
            unit="PSI"
            label="Intake Pressure"
            type="circular"
            size={220}
            operatingMode="intake"
            showModeIndicator={true}
            zones={[
              { from: 0, to: 15, color: 'success' },
              { from: 15, to: 20, color: 'warning' },
              { from: 20, to: 25, color: 'danger' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={exhaustPressure}
            min={0}
            max={20}
            unit="PSI"
            label="Exhaust Pressure"
            type="circular"
            size={220}
            operatingMode="exhaust"
            showModeIndicator={true}
            zones={[
              { from: 0, to: 10, color: 'success' },
              { from: 10, to: 15, color: 'warning' },
              { from: 15, to: 20, color: 'danger' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={idlePressure}
            min={0}
            max={10}
            unit="PSI"
            label="System Standby"
            type="circular"
            size={220}
            operatingMode="idle"
            showModeIndicator={true}
            onClick={handleGaugeClick}
          />
        </div>

        <div className="gauges-grid" style={{ marginTop: '2rem' }}>
          <Gauges
            value={flowRate}
            min={0}
            max={100}
            unit="L/min"
            label="Intake Flow"
            type="semi-circular"
            size={240}
            operatingMode="intake"
            showModeIndicator={true}
            zones={[
              { from: 0, to: 40, color: 'warning' },
              { from: 40, to: 60, color: 'success' },
              { from: 60, to: 100, color: 'warning' }
            ]}
            showZones={true}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={vacuum}
            min={0}
            max={1000}
            unit="mTorr"
            label="Exhaust Vacuum"
            type="semi-circular"
            size={240}
            operatingMode="exhaust"
            showModeIndicator={true}
            zones={[
              { from: 0, to: 300, color: 'success' },
              { from: 300, to: 700, color: 'warning' },
              { from: 700, to: 1000, color: 'danger' }
            ]}
            showZones={true}
            precision={0}
            onClick={handleGaugeClick}
          />

          <Gauges
            value={pressure}
            min={0}
            max={30}
            unit="PSI"
            label="System Idle"
            type="semi-circular"
            size={240}
            operatingMode="idle"
            showModeIndicator={true}
            onClick={handleGaugeClick}
          />
        </div>
      </section>

      {/* Section 3: Different Sizes */}
      <section className="demo-section">
        <h2>📏 Different Sizes</h2>
        <div className="gauges-grid size-demo">
          <Gauges
            value={75}
            min={0}
            max={100}
            unit="%"
            label="Small (150px)"
            size={150}
            showZones={false}
          />

          <Gauges
            value={75}
            min={0}
            max={100}
            unit="%"
            label="Medium (200px)"
            size={200}
          />

          <Gauges
            value={75}
            min={0}
            max={100}
            unit="%"
            label="Large (280px)"
            size={280}
          />
        </div>
      </section>

      {/* Section 4: Special Configurations */}
      <section className="demo-section">
        <h2>⚡ Special Configurations</h2>
        <div className="gauges-grid">
          <Gauges
            value={temperature}
            min={0}
            max={120}
            unit="°C"
            label="No Zones (Solid Color)"
            size={200}
            showZones={false}
          />

          <Gauges
            value={92}
            min={0}
            max={120}
            unit="°C"
            label="Critical Alert!"
            size={200}
            threshold={{
              warning: 75,
              critical: 90
            }}
            zones={[
              { from: 0, to: 75, color: 'success' },
              { from: 75, to: 90, color: 'warning' },
              { from: 90, to: 120, color: 'danger' }
            ]}
          />

          <Gauges
            value={temperature}
            min={0}
            max={120}
            label="No Value Display"
            size={200}
            showValue={false}
          />

          <Gauges
            value={3.14159}
            min={0}
            max={10}
            unit=""
            label="High Precision (3 decimals)"
            size={200}
            precision={3}
            showZones={false}
          />
        </div>
      </section>

      {/* Section 5: Compact & Mini Gauges */}
      <section className="demo-section">
        <h2>🔹 Compact & Mini Gauges</h2>
        <p style={{ color: 'var(--color-textSecondary)', marginBottom: '1.5rem' }}>
          Perfect for dense dashboards and space-constrained layouts
        </p>
        
        <div className="gauges-grid compact-grid">
          <div className="gauge-comparison">
            <h4>Standard (200px)</h4>
            <Gauges
              value={temperature}
              min={0}
              max={120}
              unit="°C"
              label="Temperature"
              size={200}
            />
          </div>

          <div className="gauge-comparison">
            <h4>Compact (140px)</h4>
            <Gauges
              value={temperature}
              min={0}
              max={120}
              unit="°C"
              label="Temperature"
              type="compact"
              size={200}
            />
          </div>

          <div className="gauge-comparison">
            <h4>Mini (100px)</h4>
            <Gauges
              value={temperature}
              min={0}
              max={120}
              unit="°C"
              label="Temp"
              type="mini"
              size={200}
            />
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Mini Gauge Dashboard</h3>
        <div className="mini-dashboard">
          <Gauges value={temperature} min={0} max={120} unit="°C" label="Temp" type="mini" size={120} />
          <Gauges value={pressure} min={0} max={30} unit="PSI" label="Press" type="mini" size={120} />
          <Gauges value={rpm} min={0} max={5000} unit="RPM" label="Speed" type="mini" size={120} precision={0} />
          <Gauges value={efficiency} min={0} max={100} unit="%" label="Eff" type="mini" size={120} />
          <Gauges value={vacuum} min={0} max={1000} unit="mT" label="Vac" type="mini" size={120} precision={0} />
          <Gauges value={flowRate} min={0} max={100} unit="L/m" label="Flow" type="mini" size={120} />
          <Gauges value={68} min={0} max={100} unit="%" label="CPU" type="mini" size={120} />
          <Gauges value={42} min={0} max={100} unit="%" label="Mem" type="mini" size={120} />
        </div>
      </section>

      {/* Section 6: Donut Gauges */}
      <section className="demo-section">
        <h2>🍩 Donut Gauges</h2>
        <p style={{ color: 'var(--color-textSecondary)', marginBottom: '1.5rem' }}>
          Thick ring design with prominent center value display
        </p>
        <div className="gauges-grid">
          <Gauges
            value={efficiency}
            min={0}
            max={100}
            unit="%"
            label="Overall Efficiency"
            type="donut"
            size={250}
            zones={[
              { from: 0, to: 60, color: 'danger' },
              { from: 60, to: 80, color: 'warning' },
              { from: 80, to: 100, color: 'success' }
            ]}
          />

          <Gauges
            value={temperature}
            min={0}
            max={120}
            unit="°C"
            label="Temperature"
            type="donut"
            size={250}
            zones={[
              { from: 0, to: 70, color: 'success' },
              { from: 70, to: 90, color: 'warning' },
              { from: 90, to: 120, color: 'danger' }
            ]}
          />

          <Gauges
            value={pressure}
            min={0}
            max={30}
            unit="PSI"
            label="Pressure"
            type="donut"
            size={250}
          />
        </div>
      </section>

      {/* Section 7: Linear/Bar Gauges */}
      <section className="demo-section">
        <h2>📊 Linear/Bar Gauges</h2>
        <p style={{ color: 'var(--color-textSecondary)', marginBottom: '1.5rem' }}>
          Horizontal and vertical bar-style gauges for traditional displays
        </p>
        
        <h3 style={{ marginBottom: '1rem' }}>Horizontal Bars</h3>
        <div className="linear-gauges-container">
          <Gauges
            value={temperature}
            min={0}
            max={120}
            unit="°C"
            label="Temperature"
            type="linear"
            size={400}
            orientation="horizontal"
            zones={[
              { from: 0, to: 70, color: 'success' },
              { from: 70, to: 90, color: 'warning' },
              { from: 90, to: 120, color: 'danger' }
            ]}
          />

          <Gauges
            value={pressure}
            min={0}
            max={30}
            unit="PSI"
            label="Pressure"
            type="linear"
            size={400}
            orientation="horizontal"
          />

          <Gauges
            value={efficiency}
            min={0}
            max={100}
            unit="%"
            label="Efficiency"
            type="linear"
            size={400}
            orientation="horizontal"
            zones={[
              { from: 0, to: 60, color: 'danger' },
              { from: 60, to: 80, color: 'warning' },
              { from: 80, to: 100, color: 'success' }
            ]}
          />
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Vertical Bars</h3>
        <div className="gauges-grid">
          <Gauges
            value={temperature}
            min={0}
            max={120}
            unit="°C"
            label="Temp"
            type="linear"
            size={200}
            orientation="vertical"
          />

          <Gauges
            value={pressure}
            min={0}
            max={30}
            unit="PSI"
            label="Press"
            type="linear"
            size={200}
            orientation="vertical"
          />

          <Gauges
            value={flowRate}
            min={0}
            max={100}
            unit="L/m"
            label="Flow"
            type="linear"
            size={200}
            orientation="vertical"
          />

          <Gauges
            value={efficiency}
            min={0}
            max={100}
            unit="%"
            label="Eff"
            type="linear"
            size={200}
            orientation="vertical"
          />
        </div>
      </section>

      {/* Section 8: Process Dashboard Example */}
      <section className="demo-section dashboard-section">
        <h2>📊 Complete Process Dashboard</h2>
        <div className="dashboard-layout">
          <div className="dashboard-row">
            <Gauges
              value={temperature}
              min={0}
              max={120}
              unit="°C"
              label="Temperature"
              size={200}
              zones={[
                { from: 0, to: 70, color: 'success' },
                { from: 70, to: 90, color: 'warning' },
                { from: 90, to: 120, color: 'danger' }
              ]}
              onClick={handleGaugeClick}
            />
            <Gauges
              value={pressure}
              min={0}
              max={30}
              unit="PSI"
              label="Pressure"
              size={200}
              zones={[
                { from: 0, to: 20, color: 'success' },
                { from: 20, to: 25, color: 'warning' },
                { from: 25, to: 30, color: 'danger' }
              ]}
              onClick={handleGaugeClick}
            />
            <Gauges
              value={rpm}
              min={0}
              max={5000}
              unit="RPM"
              label="Motor Speed"
              type="semi-circular"
              size={200}
              precision={0}
              onClick={handleGaugeClick}
            />
          </div>
          <div className="dashboard-row">
            <Gauges
              value={efficiency}
              min={0}
              max={100}
              unit="%"
              label="Efficiency"
              size={200}
              zones={[
                { from: 0, to: 60, color: 'danger' },
                { from: 60, to: 80, color: 'warning' },
                { from: 80, to: 100, color: 'success' }
              ]}
              onClick={handleGaugeClick}
            />
            <Gauges
              value={vacuum}
              min={0}
              max={1000}
              unit="mTorr"
              label="Vacuum"
              size={200}
              precision={0}
              onClick={handleGaugeClick}
            />
            <Gauges
              value={flowRate}
              min={0}
              max={100}
              unit="L/min"
              label="Flow Rate"
              size={200}
              onClick={handleGaugeClick}
            />
          </div>
        </div>
      </section>

      {/* Info Panel */}
      <div className="demo-info">
        <h3>ℹ️ Demo Features</h3>
        <ul>
          <li>✅ <strong>11 Gauge Types:</strong> Circular, Semi-Circular, Half-Circle, Compact, Mini, Donut, Linear H/V, Pressure-Compact (200×120), Pressure-Mini (160×80), Pressure-Micro (120×60)</li>
          <li>✅ <strong>Operating Modes:</strong> Intake (↓), Exhaust (↑), Idle (⏸) with visual indicators</li>
          <li>✅ Real-time value updates (2-second intervals)</li>
          <li>✅ Smooth animations and transitions</li>
          <li>✅ Color zones (green/yellow/red)</li>
          <li>✅ Threshold alerts (warning/critical)</li>
          <li>✅ Click interaction (try clicking any gauge)</li>
          <li>✅ Multiple size options for different dashboard densities</li>
          <li>✅ Theme support (4 themes available)</li>
        </ul>
        <p><strong>Pressure Gauge Sizes:</strong></p>
        <ul>
          <li>� <strong>Standard (200×120px)</strong> - Full features with all indicators</li>
          <li>� <strong>Mini (160×80px)</strong> - Simplified, ultra-compact</li>
          <li>⚡ <strong>Micro (120×60px)</strong> - Minimal, highest density</li>
        </ul>
        <p><strong>Try:</strong> Watch values change in real-time, click gauges for details, compare different sizes and types!</p>
      </div>
    </div>
  );
}

export default GaugesDemo;
