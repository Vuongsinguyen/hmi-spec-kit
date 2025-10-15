# Operating Mode Indicators for Gauges

## Overview

Tính năng **Operating Mode Indicators** cho phép Gauge hiển thị trạng thái hoạt động của hệ thống áp suất/flow với visual indicators rõ ràng.

## Supported Operating Modes

### 1. 🔵 INTAKE (Hút/Nạp)
- **Màu sắc**: Blue (`var(--color-info)`)
- **Icon**: `↓` (Mũi tên xuống)
- **Ý nghĩa**: Hệ thống đang hút/nạp vào
- **Animation**: Pulse xanh dương với box-shadow expanding
- **Use cases**: 
  - Intake manifold pressure
  - Vacuum pump inlet
  - Air intake systems
  - Liquid intake flow

### 2. 🔴 EXHAUST (Thổi/Xả)
- **Màu sắc**: Orange/Warning (`var(--color-warning)`)
- **Icon**: `↑` (Mũi tên lên)
- **Ý nghĩa**: Hệ thống đang thổi/xả ra
- **Animation**: Pulse cam với box-shadow expanding
- **Use cases**:
  - Exhaust manifold pressure
  - Compressed air output
  - Exhaust vacuum systems
  - Liquid discharge flow

### 3. ⚫ IDLE (Không hoạt động)
- **Màu sắc**: Gray (`var(--color-textSecondary)`)
- **Icon**: `⏸` (Pause symbol)
- **Ý nghĩa**: Hệ thống standby/không hoạt động
- **Animation**: No animation
- **Use cases**:
  - System standby
  - Maintenance mode
  - Pressure equalization
  - Idle state monitoring

## Component Props

```jsx
<Gauges
  // ... existing props ...
  operatingMode="intake"       // 'intake' | 'exhaust' | 'idle' | null
  showModeIndicator={true}     // true | false
/>
```

### New Props Details

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `operatingMode` | `string \| null` | `null` | Operating mode: `'intake'`, `'exhaust'`, `'idle'`, or `null` (no mode) |
| `showModeIndicator` | `boolean` | `true` | Show/hide visual mode indicators |

## Visual Components

### 1. Mode Badge (Top-Left)
- **Position**: Absolute, top-left corner
- **Design**: Rounded pill badge with icon + label
- **Border**: 2px solid với màu của mode
- **Background**: Semi-transparent với backdrop-filter blur
- **Animation**: Pulse effect cho intake/exhaust modes

**CSS Classes**:
```css
.gauge-mode-badge
.gauge-mode-badge.intake
.gauge-mode-badge.exhaust
.gauge-mode-badge.idle
```

### 2. Mode Status (Bottom-Center)
- **Position**: Absolute, bottom-center
- **Design**: Icon + text với pulsing dot indicator
- **Dot Animation**: Breathing effect cho active modes
- **Opacity**: 0.8 để không che khuất gauge

**CSS Classes**:
```css
.gauge-mode-status
.mode-pulse
.mode-pulse.pulse-intake
.mode-pulse.pulse-exhaust
```

## Usage Examples

### Example 1: Intake Pressure Monitor
```jsx
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
/>
```

**Result**: 
- Blue badge hiển thị "↓ INTAKE" ở góc trên bên trái
- Pulsing blue dot với "↓ INTAKE" ở dưới gauge
- Smooth animation khi giá trị thay đổi

### Example 2: Exhaust System Monitor
```jsx
<Gauges
  value={exhaustPressure}
  min={0}
  max={20}
  unit="PSI"
  label="Exhaust Pressure"
  type="semi-circular"
  size={240}
  operatingMode="exhaust"
  showModeIndicator={true}
  zones={[
    { from: 0, to: 10, color: 'success' },
    { from: 10, to: 15, color: 'warning' },
    { from: 15, to: 20, color: 'danger' }
  ]}
/>
```

**Result**:
- Orange badge hiển thị "↑ EXHAUST"
- Faster pulsing orange dot (1s cycle vs 2s for intake)
- Warning color scheme phù hợp với exhaust systems

### Example 3: System Idle/Standby
```jsx
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
/>
```

**Result**:
- Gray badge "⏸ IDLE" (no animation)
- Static gray indicator at bottom
- Minimal visual distraction for idle state

### Example 4: Disabled Mode Indicator
```jsx
<Gauges
  value={pressure}
  min={0}
  max={30}
  unit="PSI"
  label="Standard Pressure"
  type="circular"
  size={220}
  operatingMode="intake"
  showModeIndicator={false}  // Hide indicators
/>
```

**Result**: Gauge hoạt động bình thường mà không có mode badges/status

## Animation Details

### Intake Animation
```css
@keyframes pulse-intake {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0);
  }
}
```
- **Duration**: 2s
- **Effect**: Gentle expanding blue glow
- **Purpose**: Indicate active intake operation

### Exhaust Animation
```css
@keyframes pulse-exhaust {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02);
    box-shadow: 0 0 0 4px rgba(245, 158, 11, 0);
  }
}
```
- **Duration**: 2s
- **Effect**: Gentle expanding orange glow
- **Purpose**: Indicate active exhaust operation

### Dot Pulse Animation
```css
@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}
```
- **Duration**: 1.5s (intake) / 1s (exhaust)
- **Effect**: Breathing dot indicator
- **Purpose**: Secondary activity indicator

## Best Practices

### 1. When to Use Operating Mode
✅ **Use for**:
- Pressure systems (intake/exhaust manifolds)
- Flow systems (pumps, compressors)
- Vacuum systems (inlet/outlet)
- Directional flow monitoring
- HVAC systems (supply/return)

❌ **Don't use for**:
- Temperature gauges
- Simple level indicators
- RPM gauges
- Percentage/efficiency metrics
- Static measurements

### 2. Color Coding
- **Intake**: Always use `info` (blue) color scheme
- **Exhaust**: Always use `warning` (orange) color scheme
- **Idle**: Always use `textSecondary` (gray) color scheme
- Keep consistent across application for user familiarity

### 3. Combining with Zones
Mode indicators work alongside zone colors:
```jsx
// Good: Mode shows direction, zones show safety
<Gauges
  operatingMode="intake"
  zones={[
    { from: 0, to: 15, color: 'success' },   // Safe intake range
    { from: 15, to: 20, color: 'warning' },  // Caution
    { from: 20, to: 25, color: 'danger' }    // Critical
  ]}
/>
```

### 4. Dynamic Mode Switching
```jsx
const [mode, setMode] = useState('idle');

useEffect(() => {
  // Logic to determine current mode
  if (systemActive && flowDirection > 0) {
    setMode('intake');
  } else if (systemActive && flowDirection < 0) {
    setMode('exhaust');
  } else {
    setMode('idle');
  }
}, [systemActive, flowDirection]);

return (
  <Gauges
    operatingMode={mode}
    // ... other props
  />
);
```

## Theme Compatibility

Operating mode indicators automatically adapt to all themes:
- **Standard**: Blue/Orange/Gray on white
- **Dark Night**: Blue/Orange/Gray on dark background
- **HMI Classic**: Adjusted for industrial look
- **HMI Future**: Neon-style with enhanced glow

Colors use CSS variables for automatic theme adaptation:
```css
var(--color-info)          /* Intake blue */
var(--color-warning)       /* Exhaust orange */
var(--color-textSecondary) /* Idle gray */
```

## Accessibility

- Mode badges use high contrast borders (2px)
- Text labels supplement icon symbols
- Animations can be disabled via `prefers-reduced-motion`
- Color + icon + text provides redundant information

## Performance

- CSS animations are hardware-accelerated (transform, opacity)
- No JavaScript animation loops
- Minimal DOM overhead (2 extra divs per gauge)
- Animations pause when gauge is off-screen (browser optimization)

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ All modern mobile browsers

Requires CSS `backdrop-filter` support for blur effect (graceful degradation on older browsers).

---

## Demo

See live demo at: **http://localhost:5174/gauges-demo**
- Section 2.7: "Operating Mode Indicators (Intake/Exhaust/Idle)"
- 6 examples showing all three modes in circular and semi-circular gauges
