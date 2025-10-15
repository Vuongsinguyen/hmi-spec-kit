# Gauges Widget

Visual measurement display widget for HMI applications.

## Overview

The Gauges widget provides intuitive visual representation of real-time measurement values such as temperature, pressure, speed, and other critical machine parameters. It supports multiple gauge types with configurable color zones and threshold alerts.

## Features

- ✅ **Multiple Gauge Types**: Circular, semi-circular, and arc gauges
- ✅ **Color Zones**: Visual feedback with green/yellow/red zones
- ✅ **Real-time Updates**: Smooth animations for value changes
- ✅ **Threshold Alerts**: Configurable warning and critical thresholds
- ✅ **Theme Integration**: Fully integrated with HMI theme system
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Accessible**: ARIA labels and keyboard navigation support

## Documentation

- [High Level Design (HLD)](HLD.md) - Architecture and design overview
- [Detailed Design (DD)](DD.md) - Props, state, events, and implementation details
- [Example Code](example-code.md) - Usage examples and integration patterns
- [User Stories](user-stories.md) - Complete user stories with acceptance criteria and estimates
- [Use Cases & Diagrams](use-cases.md) - Detailed use case scenarios and interaction flows

## Quick Example

```jsx
import { Gauges } from './components/Gauges';

function TemperatureMonitor() {
  return (
    <Gauges
      value={75}
      min={0}
      max={120}
      unit="°C"
      label="Chamber Temperature"
      zones={[
        { from: 0, to: 70, color: 'success' },
        { from: 70, to: 90, color: 'warning' },
        { from: 90, to: 120, color: 'danger' }
      ]}
    />
  );
}
```

## Use Cases

1. **Process Monitoring**: Display real-time process parameters
2. **Machine Health**: Monitor equipment conditions and performance
3. **Safety Indicators**: Show critical values with visual alerts
4. **Performance Metrics**: Track efficiency and throughput
5. **Environmental Conditions**: Display temperature, humidity, pressure

## Integration

The Gauges widget can be used in:
- Subpages for dedicated monitoring views
- Dashboards for at-a-glance metrics
- Control panels for operator interfaces
- Alarm systems for threshold monitoring

## Status

📝 **Documentation Phase** - Specifications complete, implementation pending

---

*Part of the HMI Spec Kit project following Spec-Driven Development methodology.*
