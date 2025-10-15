import React, { useState, useEffect, useRef } from 'react';
import './Gauges.css';

/**
 * Gauges Widget Component
 * Displays measurement values in visual gauge format with configurable ranges and color zones
 * 
 * @component
 * @see docs/widgets/Gauges/DD.md for detailed design
 */
export function Gauges({
  value = 0,
  min = 0,
  max = 100,
  unit = '',
  label = 'Gauge',
  type = 'circular', // 'circular', 'semi-circular', 'half-circle', 'compact', 'mini', 'linear', 'donut', 'pressure-compact', 'pressure-mini', 'pressure-micro'
  size = 200,
  zones = [
    { from: 0, to: 60, color: 'success' },
    { from: 60, to: 85, color: 'warning' },
    { from: 85, to: 100, color: 'danger' }
  ],
  showValue = true,
  showZones = true,
  animated = true,
  threshold = null,
  precision = 1,
  onClick = null,
  orientation = 'horizontal', // for linear type: 'horizontal' or 'vertical'
  operatingMode = null, // 'intake', 'exhaust', 'idle', null
  showModeIndicator = true,
  indicatorOnly = false, // When true, hides all numbers - shows only colors and icons
  style = {}
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);
  const previousValue = useRef(value);

  // Update current value with animation
  useEffect(() => {
    if (animated) {
      const steps = 20;
      const increment = (value - currentValue) / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        setCurrentValue(prev => {
          if (step >= steps) {
            clearInterval(timer);
            return value;
          }
          return prev + increment;
        });
      }, 15);

      return () => clearInterval(timer);
    } else {
      setCurrentValue(value);
    }
  }, [value, animated]);

  // Check thresholds
  useEffect(() => {
    if (threshold) {
      const newIsWarning = currentValue >= threshold.warning && currentValue < threshold.critical;
      const newIsCritical = currentValue >= threshold.critical;

      if (newIsWarning !== isWarning) {
        setIsWarning(newIsWarning);
        if (newIsWarning && threshold.onWarning) {
          threshold.onWarning(currentValue);
        }
      }

      if (newIsCritical !== isCritical) {
        setIsCritical(newIsCritical);
        if (newIsCritical && threshold.onCritical) {
          threshold.onCritical(currentValue);
        }
      }
    }

    if (previousValue.current !== currentValue) {
      previousValue.current = currentValue;
    }
  }, [currentValue, threshold, isWarning, isCritical]);

  // Clamp value to min/max range
  const clampedValue = Math.max(min, Math.min(max, currentValue));

  // Calculate percentage
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // Get current zone
  const getCurrentZone = () => {
    if (!showZones || !zones || zones.length === 0) return null;
    return zones.find(zone => clampedValue >= zone.from && clampedValue < zone.to) || zones[zones.length - 1];
  };

  const currentZone = getCurrentZone();

  // Get color based on zone or threshold
  const getColor = () => {
    if (isCritical) return 'var(--color-danger)';
    if (isWarning) return 'var(--color-warning)';
    if (currentZone) {
      const colorMap = {
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        info: 'var(--color-info)',
        primary: 'var(--color-primary)'
      };
      return colorMap[currentZone.color] || 'var(--color-primary)';
    }
    return 'var(--color-primary)';
  };

  // Calculate angle for needle/arc
  const getAngle = () => {
    const startAngle = type === 'circular' ? -90 : -135;
    const totalAngle = type === 'circular' ? 360 : 270;
    return startAngle + (percentage / 100) * totalAngle;
  };

  const handleClick = () => {
    if (onClick) {
      onClick(clampedValue, label);
    }
  };

  const displayValue = clampedValue.toFixed(precision);
  const angle = getAngle();
  const color = getColor();

  // Calculate container dimensions based on type
  const getContainerStyle = () => {
    const baseStyle = { ...style };
    
    switch (type) {
      case 'circular':
        return { ...baseStyle, width: size, height: size };
      case 'semi-circular':
        return { ...baseStyle, width: size, height: size * 0.6 };
      case 'half-circle':
        return { ...baseStyle, width: size, height: size * 0.55 };
      case 'compact':
        return { ...baseStyle, width: size * 0.7, height: size * 0.7 };
      case 'mini':
        return { ...baseStyle, width: size * 0.5, height: size * 0.5 };
      case 'donut':
        return { ...baseStyle, width: size * 0.8, height: size * 0.8 };
      case 'pressure-compact':
        return { ...baseStyle, width: 200, height: 120 }; // Fixed compact size
      case 'pressure-mini':
        return { ...baseStyle, width: 160, height: 80 }; // Ultra compact
      case 'pressure-micro':
        return { ...baseStyle, width: 120, height: 60 }; // Minimal size
      case 'linear':
        if (orientation === 'horizontal') {
          return { ...baseStyle, width: size, height: 40 };
        } else {
          return { ...baseStyle, width: 40, height: size };
        }
      default:
        return { ...baseStyle, width: size, height: size };
    }
  };

  // Render appropriate gauge type
  const renderGauge = () => {
    const commonProps = {
      percentage,
      size,
      color,
      zones: showZones ? zones : null,
      min,
      max,
      displayValue,
      unit,
      indicatorOnly
    };

    switch (type) {
      case 'circular':
        return <CircularGauge {...commonProps} />;
      case 'semi-circular':
        return <SemiCircularGauge {...commonProps} />;
      case 'half-circle':
        return <HalfCircleGauge {...commonProps} />;
      case 'compact':
        return <CompactGauge {...commonProps} />;
      case 'mini':
        return <MiniGauge {...commonProps} />;
      case 'donut':
        return <DonutGauge {...commonProps} />;
      case 'pressure-compact':
        return <PressureCompactGauge {...commonProps} operatingMode={operatingMode} />;
      case 'pressure-mini':
        return <PressureMiniGauge {...commonProps} operatingMode={operatingMode} />;
      case 'pressure-micro':
        return <PressureMicroGauge {...commonProps} operatingMode={operatingMode} />;
      case 'linear':
        return <LinearGauge {...commonProps} orientation={orientation} />;
      default:
        return <CircularGauge {...commonProps} />;
    }
  };

  // Operating mode configuration
  const getModeConfig = () => {
    if (!operatingMode) return null;
    
    const modeConfigs = {
      intake: {
        label: 'INTAKE',
        icon: '↓',
        color: 'var(--color-info)',
        bgColor: 'rgba(59, 130, 246, 0.1)',
        animation: 'pulse-intake'
      },
      exhaust: {
        label: 'EXHAUST',
        icon: '↑',
        color: 'var(--color-warning)',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        animation: 'pulse-exhaust'
      },
      idle: {
        label: 'IDLE',
        icon: '⏸',
        color: 'var(--color-textSecondary)',
        bgColor: 'rgba(128, 128, 128, 0.1)',
        animation: 'none'
      }
    };
    
    return modeConfigs[operatingMode] || null;
  };

  const modeConfig = getModeConfig();

  return (
    <div 
      className={`gauge-container ${type} ${onClick ? 'clickable' : ''} ${orientation} ${operatingMode ? `mode-${operatingMode}` : ''}`}
      style={getContainerStyle()}
      onClick={handleClick}
    >
      {/* Operating Mode Indicator - Top Badge */}
      {operatingMode && showModeIndicator && modeConfig && (
        <div 
          className={`gauge-mode-badge ${operatingMode}`}
          style={{
            backgroundColor: modeConfig.bgColor,
            borderColor: modeConfig.color,
            color: modeConfig.color
          }}
        >
          <span className="mode-icon">{modeConfig.icon}</span>
          <span className="mode-label">{modeConfig.label}</span>
        </div>
      )}

      {!['mini', 'compact', 'half-circle'].includes(type) && (
        <div className="gauge-label">{label}</div>
      )}
      
      {renderGauge()}

      {showValue && (
        <div className="gauge-value">
          <span className="value-number">{displayValue}</span>
          <span className="value-unit">{unit}</span>
        </div>
      )}

      {/* Operating Mode Indicator - Bottom Status */}
      {operatingMode && showModeIndicator && modeConfig && (
        <div 
          className={`gauge-mode-status ${operatingMode}`}
          style={{ color: modeConfig.color }}
        >
          <div className={`mode-pulse ${modeConfig.animation}`}></div>
          <span>{modeConfig.icon} {modeConfig.label}</span>
        </div>
      )}

      {['mini', 'compact', 'half-circle'].includes(type) && label && (
        <div className="gauge-label-bottom">{label}</div>
      )}

      {isCritical && <div className="gauge-alert critical">!</div>}
      {isWarning && !isCritical && <div className="gauge-alert warning">⚠</div>}
    </div>
  );
}

/**
 * Circular Gauge (360°)
 */
function CircularGauge({ percentage, size, color, zones, min, max }) {
  const radius = (size / 2) - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="gauge-svg" width={size} height={size}>
      {/* Background circle */}
      <circle
        className="gauge-background"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="12"
      />

      {/* Zone arcs (if enabled) */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;
        const zoneLength = (zonePercentage / 100) * circumference;
        const zoneOffset = circumference - ((zoneStart / 100) * circumference);

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        return (
          <circle
            key={index}
            className="gauge-zone"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={zoneColorMap[zone.color]}
            strokeWidth="8"
            strokeDasharray={`${zoneLength} ${circumference}`}
            strokeDashoffset={-zoneOffset}
            opacity="0.3"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}

      {/* Value arc */}
      <circle
        className="gauge-progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
      />

      {/* Tick marks */}
      {[0, 25, 50, 75, 100].map(tick => {
        const tickAngle = -90 + (tick / 100) * 360;
        const tickRadians = (tickAngle * Math.PI) / 180;
        const x1 = size / 2 + (radius - 15) * Math.cos(tickRadians);
        const y1 = size / 2 + (radius - 15) * Math.sin(tickRadians);
        const x2 = size / 2 + (radius - 5) * Math.cos(tickRadians);
        const y2 = size / 2 + (radius - 5) * Math.sin(tickRadians);

        return (
          <line
            key={tick}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-text)"
            strokeWidth="2"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

/**
 * Semi-Circular Gauge (270°)
 */
function SemiCircularGauge({ percentage, size, color, zones, min, max }) {
  const radius = (size / 2) - 20;
  const startAngle = -135;
  const endAngle = 135;
  const totalAngle = endAngle - startAngle;

  // Calculate arc path
  const getArcPath = (percent, innerRadius = 0) => {
    const angle = startAngle + (percent / 100) * totalAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (angle * Math.PI) / 180;

    const x1 = size / 2 + radius * Math.cos(startRad);
    const y1 = size / 2 + radius * Math.sin(startRad);
    const x2 = size / 2 + radius * Math.cos(endRad);
    const y2 = size / 2 + radius * Math.sin(endRad);

    const largeArc = percent > 50 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <svg className="gauge-svg semi-circular" width={size} height={size * 0.6}>
      {/* Background arc */}
      <path
        className="gauge-background"
        d={getArcPath(100)}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Zone arcs (if enabled) */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        // Create arc for zone
        const startAngleZone = startAngle + (zoneStart / 100) * totalAngle;
        const endAngleZone = startAngle + ((zoneStart + zonePercentage) / 100) * totalAngle;

        const startRad = (startAngleZone * Math.PI) / 180;
        const endRad = (endAngleZone * Math.PI) / 180;

        const x1 = size / 2 + radius * Math.cos(startRad);
        const y1 = size / 2 + radius * Math.sin(startRad);
        const x2 = size / 2 + radius * Math.cos(endRad);
        const y2 = size / 2 + radius * Math.sin(endRad);

        const largeArc = zonePercentage > 50 ? 1 : 0;
        const zonePath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

        return (
          <path
            key={index}
            className="gauge-zone"
            d={zonePath}
            fill="none"
            stroke={zoneColorMap[zone.color]}
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.3"
          />
        );
      })}

      {/* Value arc */}
      <path
        className="gauge-progress"
        d={getArcPath(percentage)}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        style={{ transition: 'all 0.3s ease-out' }}
      />

      {/* Tick marks */}
      {[0, 25, 50, 75, 100].map(tick => {
        const tickAngle = startAngle + (tick / 100) * totalAngle;
        const tickRadians = (tickAngle * Math.PI) / 180;
        const x1 = size / 2 + (radius - 15) * Math.cos(tickRadians);
        const y1 = size / 2 + (radius - 15) * Math.sin(tickRadians);
        const x2 = size / 2 + (radius - 5) * Math.cos(tickRadians);
        const y2 = size / 2 + (radius - 5) * Math.sin(tickRadians);

        return (
          <line
            key={tick}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-text)"
            strokeWidth="2"
            opacity="0.5"
          />
        );
      })}

      {/* Min/Max labels */}
      <text
        x={20}
        y={size * 0.55}
        fill="var(--color-textSecondary)"
        fontSize="12"
        textAnchor="start"
      >
        {min}
      </text>
      <text
        x={size - 20}
        y={size * 0.55}
        fill="var(--color-textSecondary)"
        fontSize="12"
        textAnchor="end"
      >
        {max}
      </text>
    </svg>
  );
}

/**
 * Half-Circle Gauge (180° - Perfect Half Circle)
 * Similar to automotive speedometers
 */
function HalfCircleGauge({ percentage, size, color, zones, min, max }) {
  const radius = (size / 2) - 20;
  const startAngle = -180; // Start from left
  const endAngle = 0;      // End at right
  const totalAngle = endAngle - startAngle; // 180°

  // Calculate arc path for half circle
  const getArcPath = (percent) => {
    const angle = startAngle + (percent / 100) * totalAngle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (angle * Math.PI) / 180;

    const x1 = size / 2 + radius * Math.cos(startRad);
    const y1 = size / 2 + radius * Math.sin(startRad);
    const x2 = size / 2 + radius * Math.cos(endRad);
    const y2 = size / 2 + radius * Math.sin(endRad);

    const largeArc = 0; // Half circle never needs large arc

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <svg className="gauge-svg half-circle" width={size} height={size * 0.55}>
      {/* Background arc - half circle */}
      <path
        className="gauge-background"
        d={getArcPath(100)}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Zone arcs */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        const startAngleZone = startAngle + (zoneStart / 100) * totalAngle;
        const endAngleZone = startAngle + ((zoneStart + zonePercentage) / 100) * totalAngle;

        const startRad = (startAngleZone * Math.PI) / 180;
        const endRad = (endAngleZone * Math.PI) / 180;

        const x1 = size / 2 + radius * Math.cos(startRad);
        const y1 = size / 2 + radius * Math.sin(startRad);
        const x2 = size / 2 + radius * Math.cos(endRad);
        const y2 = size / 2 + radius * Math.sin(endRad);

        const largeArc = 0;
        const zonePath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

        return (
          <path
            key={index}
            className="gauge-zone"
            d={zonePath}
            fill="none"
            stroke={zoneColorMap[zone.color]}
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.3"
          />
        );
      })}

      {/* Value arc */}
      <path
        className="gauge-progress"
        d={getArcPath(percentage)}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        style={{ transition: 'all 0.3s ease-out' }}
      />

      {/* Tick marks - evenly distributed */}
      {[0, 25, 50, 75, 100].map(tick => {
        const tickAngle = startAngle + (tick / 100) * totalAngle;
        const tickRadians = (tickAngle * Math.PI) / 180;
        const x1 = size / 2 + (radius - 15) * Math.cos(tickRadians);
        const y1 = size / 2 + (radius - 15) * Math.sin(tickRadians);
        const x2 = size / 2 + (radius - 5) * Math.cos(tickRadians);
        const y2 = size / 2 + (radius - 5) * Math.sin(tickRadians);

        return (
          <line
            key={tick}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-text)"
            strokeWidth="2"
            opacity="0.5"
          />
        );
      })}

      {/* Needle pointer (optional - commented for now) */}
      {/* 
      <g className="gauge-needle">
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + (radius - 10) * Math.cos((startAngle + (percentage / 100) * totalAngle) * Math.PI / 180)}
          y2={size / 2 + (radius - 10) * Math.sin((startAngle + (percentage / 100) * totalAngle) * Math.PI / 180)}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={size / 2} cy={size / 2} r="6" fill={color} />
      </g>
      */}

      {/* Min/Max labels */}
      <text
        x={15}
        y={size * 0.52}
        fill="var(--color-textSecondary)"
        fontSize="12"
        textAnchor="start"
      >
        {min}
      </text>
      <text
        x={size - 15}
        y={size * 0.52}
        fill="var(--color-textSecondary)"
        fontSize="12"
        textAnchor="end"
      >
        {max}
      </text>
    </svg>
  );
}

/**
 * Compact Gauge - Smaller circular gauge without external label
 */
function CompactGauge({ percentage, size, color, zones, min, max }) {
  const compactSize = size * 0.7;
  const radius = (compactSize / 2) - 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="gauge-svg compact" width={compactSize} height={compactSize}>
      {/* Background circle */}
      <circle
        className="gauge-background"
        cx={compactSize / 2}
        cy={compactSize / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="8"
      />

      {/* Value arc */}
      <circle
        className="gauge-progress"
        cx={compactSize / 2}
        cy={compactSize / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${compactSize / 2} ${compactSize / 2})`}
        style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
      />
    </svg>
  );
}

/**
 * Mini Gauge - Very small gauge for dense dashboards
 */
function MiniGauge({ percentage, size, color }) {
  const miniSize = size * 0.5;
  const radius = (miniSize / 2) - 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="gauge-svg mini" width={miniSize} height={miniSize}>
      <circle
        className="gauge-background"
        cx={miniSize / 2}
        cy={miniSize / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="4"
      />
      <circle
        className="gauge-progress"
        cx={miniSize / 2}
        cy={miniSize / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${miniSize / 2} ${miniSize / 2})`}
        style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
      />
    </svg>
  );
}

/**
 * Donut Gauge - Thick ring gauge with center hole
 */
function DonutGauge({ percentage, size, color, zones, min, max }) {
  const donutSize = size * 0.8;
  const radius = (donutSize / 2) - 25;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="gauge-svg donut" width={donutSize} height={donutSize}>
      {/* Background ring */}
      <circle
        className="gauge-background"
        cx={donutSize / 2}
        cy={donutSize / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="20"
      />

      {/* Zone arcs */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;
        const zoneLength = (zonePercentage / 100) * circumference;
        const zoneOffset = circumference - ((zoneStart / 100) * circumference);

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        return (
          <circle
            key={index}
            className="gauge-zone"
            cx={donutSize / 2}
            cy={donutSize / 2}
            r={radius}
            fill="none"
            stroke={zoneColorMap[zone.color]}
            strokeWidth="16"
            strokeDasharray={`${zoneLength} ${circumference}`}
            strokeDashoffset={-zoneOffset}
            opacity="0.25"
            transform={`rotate(-90 ${donutSize / 2} ${donutSize / 2})`}
          />
        );
      })}

      {/* Value ring */}
      <circle
        className="gauge-progress"
        cx={donutSize / 2}
        cy={donutSize / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="20"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${donutSize / 2} ${donutSize / 2})`}
        style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
      />
    </svg>
  );
}

/**
 * Linear Gauge - Horizontal or vertical bar gauge
 */
/**
 * Pressure Compact Gauge (200x120px fixed size)
 * Optimized for displaying pressure with operating mode in compact space
 */
function PressureCompactGauge({ percentage, size, color, zones, min, max, displayValue, unit, operatingMode }) {
  const width = 200;
  const height = 120;
  const barWidth = 140;
  const barHeight = 24;
  const barX = 50;
  const barY = 50;

  // Get mode configuration
  const getModeIcon = () => {
    if (!operatingMode) return '';
    return {
      intake: '↓',
      exhaust: '↑',
      idle: '⏸'
    }[operatingMode] || '';
  };

  const getModeColor = () => {
    if (!operatingMode) return color;
    return {
      intake: 'var(--color-info)',
      exhaust: 'var(--color-warning)',
      idle: 'var(--color-textSecondary)'
    }[operatingMode] || color;
  };

  const getModeLabel = () => {
    if (!operatingMode) return '';
    return {
      intake: 'INTAKE',
      exhaust: 'EXHAUST',
      idle: 'IDLE'
    }[operatingMode] || '';
  };

  const modeColor = getModeColor();
  const modeIcon = getModeIcon();
  const modeLabel = getModeLabel();

  // Calculate fill width
  const fillWidth = (percentage / 100) * barWidth;

  return (
    <svg className="gauge-svg pressure-compact" width={width} height={height}>
      {/* Mode indicator - Top left */}
      {operatingMode && (
        <g className="mode-indicator-compact">
          <rect
            x="5"
            y="5"
            width="60"
            height="22"
            rx="11"
            fill={modeColor}
            opacity="0.15"
          />
          <rect
            x="5"
            y="5"
            width="60"
            height="22"
            rx="11"
            fill="none"
            stroke={modeColor}
            strokeWidth="2"
          />
          <text
            x="15"
            y="20"
            fill={modeColor}
            fontSize="14"
            fontWeight="700"
          >
            {modeIcon}
          </text>
          <text
            x="28"
            y="20"
            fill={modeColor}
            fontSize="10"
            fontWeight="700"
            letterSpacing="0.5"
          >
            {modeLabel.substring(0, 3)}
          </text>
        </g>
      )}

      {/* Value display - Top right */}
      <text
        x={width - 5}
        y={20}
        fill="var(--color-text)"
        fontSize="24"
        fontWeight="700"
        textAnchor="end"
      >
        {displayValue}
      </text>
      <text
        x={width - 5}
        y={35}
        fill="var(--color-textSecondary)"
        fontSize="11"
        fontWeight="600"
        textAnchor="end"
      >
        {unit}
      </text>

      {/* Horizontal bar background */}
      <rect
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        rx="12"
        fill="var(--color-border)"
        opacity="0.3"
      />

      {/* Zone backgrounds */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;
        const zoneWidth = (zonePercentage / 100) * barWidth;
        const zoneX = barX + (zoneStart / 100) * barWidth;

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        return (
          <rect
            key={index}
            x={zoneX}
            y={barY}
            width={zoneWidth}
            height={barHeight}
            rx="12"
            fill={zoneColorMap[zone.color]}
            opacity="0.15"
          />
        );
      })}

      {/* Filled bar (value) */}
      <rect
        x={barX}
        y={barY}
        width={fillWidth}
        height={barHeight}
        rx="12"
        fill={modeColor}
        opacity="0.9"
        style={{ transition: 'width 0.3s ease-out' }}
      />

      {/* Bar outline */}
      <rect
        x={barX}
        y={barY}
        width={barWidth}
        height={barHeight}
        rx="12"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="2"
      />

      {/* Min/Max labels */}
      <text
        x={barX - 5}
        y={barY + barHeight / 2 + 4}
        fill="var(--color-textSecondary)"
        fontSize="10"
        textAnchor="end"
      >
        {min}
      </text>
      <text
        x={barX + barWidth + 5}
        y={barY + barHeight / 2 + 4}
        fill="var(--color-textSecondary)"
        fontSize="10"
        textAnchor="start"
      >
        {max}
      </text>

      {/* Tick marks */}
      {[25, 50, 75].map(tick => {
        const tickX = barX + (tick / 100) * barWidth;
        return (
          <line
            key={tick}
            x1={tickX}
            y1={barY + barHeight + 3}
            x2={tickX}
            y2={barY + barHeight + 8}
            stroke="var(--color-textSecondary)"
            strokeWidth="1.5"
            opacity="0.5"
          />
        );
      })}

      {/* Status text at bottom */}
      {operatingMode && (
        <text
          x={width / 2}
          y={height - 10}
          fill={modeColor}
          fontSize="10"
          fontWeight="600"
          textAnchor="middle"
          opacity="0.8"
        >
          {modeIcon} {modeLabel}
        </text>
      )}

      {/* Animated pulse dot for active modes */}
      {operatingMode && operatingMode !== 'idle' && (
        <circle
          cx={width / 2 - 45}
          cy={height - 13}
          r="3"
          fill={modeColor}
          opacity="1"
        >
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur={operatingMode === 'exhaust' ? '1s' : '1.5s'}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="3;2.5;3"
            dur={operatingMode === 'exhaust' ? '1s' : '1.5s'}
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}

/**
 * Pressure Mini Gauge (160×80px - Ultra Compact)
 * Simplified version with minimal components
 */
function PressureMiniGauge({ percentage, size, color, zones, min, max, displayValue, unit, operatingMode, indicatorOnly }) {
  const width = 160;
  const height = 80;
  const barWidth = 100;
  const barHeight = 18;
  const barX = 40;
  const barY = 35;

  const getModeColor = () => {
    if (!operatingMode) return color;
    return {
      intake: 'var(--color-info)',
      exhaust: 'var(--color-warning)',
      idle: 'var(--color-textSecondary)'
    }[operatingMode] || color;
  };

  const getModeIcon = () => {
    if (!operatingMode) return '';
    return { intake: '↓', exhaust: '↑', idle: '⏸' }[operatingMode] || '';
  };

  const modeColor = getModeColor();
  const modeIcon = getModeIcon();
  const fillWidth = (percentage / 100) * barWidth;

  return (
    <svg className="gauge-svg pressure-mini" width={width} height={height}>
      {/* Mode icon - Top left (compact) */}
      {operatingMode && (
        <g>
          <circle cx="12" cy="12" r="10" fill={modeColor} opacity="0.15" />
          <circle cx="12" cy="12" r="10" fill="none" stroke={modeColor} strokeWidth="1.5" />
          <text x="12" y="17" fill={modeColor} fontSize="12" fontWeight="700" textAnchor="middle">
            {modeIcon}
          </text>
        </g>
      )}

      {/* Value - Top right (hidden in indicator-only mode) */}
      {!indicatorOnly && (
        <>
          <text x={width - 5} y="14" fill="var(--color-text)" fontSize="16" fontWeight="700" textAnchor="end">
            {displayValue}
          </text>
          <text x={width - 5} y="26" fill="var(--color-textSecondary)" fontSize="8" fontWeight="600" textAnchor="end">
            {unit}
          </text>
        </>
      )}

      {/* Bar background */}
      <rect x={barX} y={barY} width={barWidth} height={barHeight} rx="9" fill="var(--color-border)" opacity="0.3" />

      {/* Zone backgrounds */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;
        const zoneWidth = (zonePercentage / 100) * barWidth;
        const zoneX = barX + (zoneStart / 100) * barWidth;

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        return (
          <rect key={index} x={zoneX} y={barY} width={zoneWidth} height={barHeight} rx="9"
            fill={zoneColorMap[zone.color]} opacity="0.12" />
        );
      })}

      {/* Fill bar */}
      <rect x={barX} y={barY} width={fillWidth} height={barHeight} rx="9"
        fill={modeColor} opacity="0.9" style={{ transition: 'width 0.3s ease-out' }} />

      {/* Bar outline */}
      <rect x={barX} y={barY} width={barWidth} height={barHeight} rx="9"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" />

      {/* Min/Max labels (hidden in indicator-only mode) */}
      {!indicatorOnly && (
        <>
          <text x={barX - 3} y={barY + barHeight / 2 + 3} fill="var(--color-textSecondary)"
            fontSize="8" textAnchor="end">{min}</text>
          <text x={barX + barWidth + 3} y={barY + barHeight / 2 + 3} fill="var(--color-textSecondary)"
            fontSize="8" textAnchor="start">{max}</text>
        </>
      )}

      {/* Tick marks (hidden in indicator-only mode) */}
      {!indicatorOnly && [50].map(tick => {
        const tickX = barX + (tick / 100) * barWidth;
        return (
          <line key={tick} x1={tickX} y1={barY + barHeight + 2} x2={tickX} y2={barY + barHeight + 6}
            stroke="var(--color-textSecondary)" strokeWidth="1" opacity="0.5" />
        );
      })}

      {/* Status with pulse dot */}
      {operatingMode && operatingMode !== 'idle' && (
        <circle cx={width / 2 - 20} cy={height - 8} r="2" fill={modeColor}>
          <animate attributeName="opacity" values="1;0.3;1"
            dur={operatingMode === 'exhaust' ? '0.8s' : '1.2s'} repeatCount="indefinite" />
        </circle>
      )}
      {operatingMode && (
        <text x={width / 2} y={height - 5} fill={modeColor} fontSize="8" fontWeight="600" textAnchor="middle" opacity="0.7">
          {modeIcon}
        </text>
      )}
    </svg>
  );
}

/**
 * Pressure Micro Gauge (120×60px - Minimal)
 * Absolute minimal design - only bar and value
 */
function PressureMicroGauge({ percentage, size, color, zones, min, max, displayValue, unit, operatingMode, indicatorOnly }) {
  const width = 120;
  const height = 60;
  const barWidth = 80;
  const barHeight = 14;
  const barX = 20;
  const barY = 28;

  const getModeColor = () => {
    if (!operatingMode) return color;
    return {
      intake: 'var(--color-info)',
      exhaust: 'var(--color-warning)',
      idle: 'var(--color-textSecondary)'
    }[operatingMode] || color;
  };

  const getModeIcon = () => {
    if (!operatingMode) return '';
    return { intake: '↓', exhaust: '↑', idle: '⏸' }[operatingMode] || '';
  };

  const modeColor = getModeColor();
  const modeIcon = getModeIcon();
  const fillWidth = (percentage / 100) * barWidth;

  return (
    <svg className="gauge-svg pressure-micro" width={width} height={height}>
      {/* Mode icon - tiny top left */}
      {operatingMode && (
        <text x="6" y="12" fill={modeColor} fontSize="10" fontWeight="700">
          {modeIcon}
        </text>
      )}

      {/* Value - top center (hidden in indicator-only mode) */}
      {!indicatorOnly && (
        <>
          <text x={width / 2} y="14" fill="var(--color-text)" fontSize="14" fontWeight="700" textAnchor="middle">
            {displayValue}
          </text>
          <text x={width / 2} y="23" fill="var(--color-textSecondary)" fontSize="7" fontWeight="600" textAnchor="middle">
            {unit}
          </text>
        </>
      )}

      {/* Bar background */}
      <rect x={barX} y={barY} width={barWidth} height={barHeight} rx="7" fill="var(--color-border)" opacity="0.3" />

      {/* Zone backgrounds - simplified */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;
        const zoneWidth = (zonePercentage / 100) * barWidth;
        const zoneX = barX + (zoneStart / 100) * barWidth;

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        return (
          <rect key={index} x={zoneX} y={barY} width={zoneWidth} height={barHeight} rx="7"
            fill={zoneColorMap[zone.color]} opacity="0.1" />
        );
      })}

      {/* Fill bar */}
      <rect x={barX} y={barY} width={fillWidth} height={barHeight} rx="7"
        fill={modeColor} opacity="0.85" style={{ transition: 'width 0.3s ease-out' }} />

      {/* Bar outline */}
      <rect x={barX} y={barY} width={barWidth} height={barHeight} rx="7"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" />

      {/* Min/Max - tiny (hidden in indicator-only mode) */}
      {!indicatorOnly && (
        <>
          <text x={barX - 2} y={barY + barHeight / 2 + 3} fill="var(--color-textSecondary)"
            fontSize="7" textAnchor="end">{min}</text>
          <text x={barX + barWidth + 2} y={barY + barHeight / 2 + 3} fill="var(--color-textSecondary)"
            fontSize="7" textAnchor="start">{max}</text>
        </>
      )}

      {/* Pulse dot - minimal */}
      {operatingMode && operatingMode !== 'idle' && (
        <circle cx={width / 2} cy={height - 6} r="1.5" fill={modeColor}>
          <animate attributeName="opacity" values="1;0.3;1"
            dur={operatingMode === 'exhaust' ? '0.8s' : '1.2s'} repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

/**
 * Linear/Bar Gauge (Horizontal or Vertical)
 */
function LinearGauge({ percentage, size, color, zones, min, max, orientation = 'horizontal' }) {
  const isHorizontal = orientation === 'horizontal';
  const width = isHorizontal ? size : 40;
  const height = isHorizontal ? 40 : size;
  const barLength = isHorizontal ? size - 40 : height - 40;
  const fillLength = (percentage / 100) * barLength;

  return (
    <svg className={`gauge-svg linear ${orientation}`} width={width} height={height}>
      {/* Background bar */}
      <rect
        className="gauge-background"
        x={isHorizontal ? 20 : 12}
        y={isHorizontal ? 12 : 20}
        width={isHorizontal ? barLength : 16}
        height={isHorizontal ? 16 : barLength}
        rx="8"
        fill="var(--color-border)"
        opacity="0.3"
      />

      {/* Zone bars */}
      {zones && zones.map((zone, index) => {
        const zonePercentage = ((zone.to - zone.from) / (max - min)) * 100;
        const zoneStart = ((zone.from - min) / (max - min)) * 100;
        const zoneStartPos = (zoneStart / 100) * barLength;
        const zoneLength = (zonePercentage / 100) * barLength;

        const zoneColorMap = {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          danger: 'var(--color-danger)',
          info: 'var(--color-info)',
          primary: 'var(--color-primary)'
        };

        return (
          <rect
            key={index}
            className="gauge-zone"
            x={isHorizontal ? 20 + zoneStartPos : 12}
            y={isHorizontal ? 12 : 20 + zoneStartPos}
            width={isHorizontal ? zoneLength : 16}
            height={isHorizontal ? 16 : zoneLength}
            rx="8"
            fill={zoneColorMap[zone.color]}
            opacity="0.2"
          />
        );
      })}

      {/* Value bar */}
      <rect
        className="gauge-progress"
        x={isHorizontal ? 20 : 12}
        y={isHorizontal ? 12 : 20 + (barLength - fillLength)}
        width={isHorizontal ? fillLength : 16}
        height={isHorizontal ? 16 : fillLength}
        rx="8"
        fill={color}
        style={{ transition: isHorizontal ? 'width 0.3s ease-out' : 'height 0.3s ease-out, y 0.3s ease-out' }}
      />

      {/* Tick marks */}
      {[0, 25, 50, 75, 100].map(tick => {
        const tickPos = (tick / 100) * barLength;
        return (
          <line
            key={tick}
            x1={isHorizontal ? 20 + tickPos : 10}
            y1={isHorizontal ? 30 : 20 + tickPos}
            x2={isHorizontal ? 20 + tickPos : 30}
            y2={isHorizontal ? 30 : 20 + tickPos}
            stroke="var(--color-text)"
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}
    </svg>
  );
}

export default Gauges;
