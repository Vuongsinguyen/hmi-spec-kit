# Pressure Compact Gauge (200×120px)

## Overview

**Pressure Compact Gauge** là một gauge type được thiết kế đặc biệt với kích thước cố định **200px × 120px**, tối ưu hóa để hiển thị:
- **Giá trị áp suất** (pressure/flow/vacuum)
- **Trạng thái hoạt động** (Intake/Exhaust/Idle)
- **Color zones** (safe/warning/danger ranges)

Tất cả thông tin quan trọng được tích hợp trực tiếp vào SVG, giúp gauge tự chứa (self-contained) và dễ dàng sắp xếp trong dashboard grids.

## Specifications

### Dimensions
- **Width**: 200px (fixed)
- **Height**: 120px (fixed)
- **Aspect Ratio**: 5:3
- **Total Area**: 24,000 px² (compact for dashboard)

### Layout Structure
```
┌─────────────────────────────────────┐ 200px
│ [INT] ↓        Value: 12.5          │
│                Unit: PSI             │
│                                      │
│  0  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░  25       │ ← Horizontal bar
│     └─ 25% ─┘└─ 50% ─┘└─ 75%─┘     │ ← Tick marks
│                                      │
│         • ↓ INTAKE                   │ ← Status
└─────────────────────────────────────┘
           120px
```

## Visual Components

### 1. Mode Indicator Badge (Top-Left)
- **Position**: (5, 5)
- **Size**: 60px × 22px
- **Border Radius**: 11px (pill shape)
- **Content**:
  - Icon: `↓` / `↑` / `⏸`
  - Label: `INT` / `EXH` / `IDL` (first 3 letters)
- **Colors**:
  - Intake: Blue (`var(--color-info)`)
  - Exhaust: Orange (`var(--color-warning)`)
  - Idle: Gray (`var(--color-textSecondary)`)

### 2. Value Display (Top-Right)
- **Position**: Right-aligned at (195, 20)
- **Value**: 24px font, bold, main color
- **Unit**: 11px font, secondary color, below value

### 3. Horizontal Progress Bar
- **Position**: (50, 50)
- **Size**: 140px × 24px
- **Border Radius**: 12px
- **Features**:
  - Background: Semi-transparent border color
  - Zones: Color-coded segments (15% opacity)
  - Fill: Mode color (90% opacity)
  - Outline: 2px border
  - Smooth animation on value change

### 4. Min/Max Labels
- **Position**: Left and right of bar
- **Font**: 10px, secondary color
- **Alignment**: Left (min), Right (max)

### 5. Tick Marks
- **Positions**: 25%, 50%, 75%
- **Style**: 1.5px lines, 5px length
- **Color**: Secondary text (50% opacity)

### 6. Status Indicator (Bottom-Center)
- **Position**: Center-aligned at (100, 110)
- **Content**: Icon + Full mode label
- **Pulsing Dot**: Animated for active modes (intake/exhaust)
- **Font**: 10px, mode color

## Usage

### Basic Usage
```jsx
<Gauges
  type="pressure-compact"
  value={15.5}
  min={0}
  max={25}
  unit="PSI"
  label="Intake Pressure"
  operatingMode="intake"
/>
```

### With Color Zones
```jsx
<Gauges
  type="pressure-compact"
  value={12.5}
  min={0}
  max={25}
  unit="PSI"
  label="System Pressure"
  operatingMode="intake"
  zones={[
    { from: 0, to: 15, color: 'success' },   // Green zone
    { from: 15, to: 20, color: 'warning' },  // Yellow zone
    { from: 20, to: 25, color: 'danger' }    // Red zone
  ]}
  showZones={true}
/>
```

### All Operating Modes
```jsx
// Intake Mode (Blue)
<Gauges
  type="pressure-compact"
  value={intakePressure}
  min={0}
  max={25}
  unit="PSI"
  operatingMode="intake"
  zones={[...]}
/>

// Exhaust Mode (Orange)
<Gauges
  type="pressure-compact"
  value={exhaustPressure}
  min={0}
  max={20}
  unit="PSI"
  operatingMode="exhaust"
  zones={[...]}
/>

// Idle Mode (Gray)
<Gauges
  type="pressure-compact"
  value={idlePressure}
  min={0}
  max={10}
  unit="PSI"
  operatingMode="idle"
/>
```

## Dashboard Grid Layout

### CSS Grid Example
```css
.pressure-compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 1.5rem;
  justify-content: start;
}
```

### 2-Column Layout
```jsx
<div className="pressure-compact-grid">
  <Gauges type="pressure-compact" {...} /> {/* 200x120 */}
  <Gauges type="pressure-compact" {...} /> {/* 200x120 */}
</div>
```

### 3-Column Layout
```jsx
<div className="pressure-compact-grid">
  <Gauges type="pressure-compact" {...} /> {/* 200x120 */}
  <Gauges type="pressure-compact" {...} /> {/* 200x120 */}
  <Gauges type="pressure-compact" {...} /> {/* 200x120 */}
</div>
```

### Responsive: Auto-fit
```css
.pressure-compact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 1.5rem;
  justify-content: center; /* Center on mobile */
}
```

## Props

| Prop | Type | Default | Description | Notes |
|------|------|---------|-------------|-------|
| `type` | `string` | - | Must be `'pressure-compact'` | Required |
| `value` | `number` | `0` | Current pressure value | - |
| `min` | `number` | `0` | Minimum value | Displayed on left |
| `max` | `number` | `100` | Maximum value | Displayed on right |
| `unit` | `string` | `''` | Unit label | PSI, mBar, L/min, etc. |
| `label` | `string` | `'Gauge'` | Gauge name | Not displayed (integrated) |
| `operatingMode` | `string` | `null` | `'intake'` \| `'exhaust'` \| `'idle'` | Changes color scheme |
| `zones` | `array` | `[]` | Color zones | See zones format below |
| `showZones` | `boolean` | `true` | Show/hide zones | - |
| `precision` | `number` | `1` | Decimal places | - |
| `onClick` | `function` | `null` | Click handler | - |

### Zones Format
```javascript
[
  { from: 0, to: 15, color: 'success' },  // Green
  { from: 15, to: 20, color: 'warning' }, // Yellow
  { from: 20, to: 25, color: 'danger' }   // Red
]
```

## Color Schemes by Operating Mode

### Intake (Blue)
- **Primary**: `var(--color-info)` - rgb(59, 130, 246)
- **Background**: rgba(59, 130, 246, 0.15)
- **Border**: 2px solid blue
- **Animation**: Pulse 1.5s (slower)
- **Use Case**: Intake manifold, vacuum inlet, air intake

### Exhaust (Orange)
- **Primary**: `var(--color-warning)` - rgb(245, 158, 11)
- **Background**: rgba(245, 158, 11, 0.15)
- **Border**: 2px solid orange
- **Animation**: Pulse 1s (faster)
- **Use Case**: Exhaust manifold, discharge, compressed air output

### Idle (Gray)
- **Primary**: `var(--color-textSecondary)` - rgb(128, 128, 128)
- **Background**: rgba(128, 128, 128, 0.15)
- **Border**: 2px solid gray
- **Animation**: None
- **Use Case**: Standby, maintenance, inactive state

## Animations

### Bar Fill Animation
```css
transition: width 0.3s ease-out;
```
- Smooth width change on value update
- 300ms duration
- Ease-out timing

### Pulsing Dot (Intake/Exhaust)
```svg
<animate
  attributeName="opacity"
  values="1;0.3;1"
  dur="1.5s"  /* 1s for exhaust */
  repeatCount="indefinite"
/>
<animate
  attributeName="r"
  values="3;2.5;3"
  dur="1.5s"
  repeatCount="indefinite"
/>
```

### Mode Badge Pulse
```css
@keyframes pulse-mode-compact {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}
```

## Best Practices

### ✅ Do
- Use for pressure/flow/vacuum monitoring
- Group in grids of 2-6 gauges
- Set appropriate min/max ranges
- Define color zones for safety monitoring
- Use consistent operating modes across dashboard
- Place in 200px-wide grid cells

### ❌ Don't
- Use for temperature gauges (use circular instead)
- Use for RPM or speed (use half-circle instead)
- Mix with differently-sized gauges in same row
- Exceed 6 gauges per row (readability)
- Use without operatingMode for pressure systems
- Change size (it's fixed at 200×120px)

## Use Cases

### 1. Pneumatic System Dashboard
```jsx
<div className="pressure-compact-grid">
  <Gauges type="pressure-compact" label="Main Air" operatingMode="intake" {...} />
  <Gauges type="pressure-compact" label="Exhaust" operatingMode="exhaust" {...} />
  <Gauges type="pressure-compact" label="Tank Reserve" operatingMode="idle" {...} />
</div>
```

### 2. Vacuum System Monitoring
```jsx
<div className="pressure-compact-grid">
  <Gauges type="pressure-compact" label="Inlet Vacuum" operatingMode="intake" unit="mTorr" {...} />
  <Gauges type="pressure-compact" label="Outlet Pressure" operatingMode="exhaust" unit="mBar" {...} />
  <Gauges type="pressure-compact" label="Chamber Pressure" operatingMode="idle" unit="Pa" {...} />
</div>
```

### 3. Hydraulic System
```jsx
<div className="pressure-compact-grid">
  <Gauges type="pressure-compact" label="Pump Pressure" operatingMode="intake" unit="bar" {...} />
  <Gauges type="pressure-compact" label="Flow Rate" operatingMode="exhaust" unit="L/min" {...} />
  <Gauges type="pressure-compact" label="Return Pressure" operatingMode="idle" unit="bar" {...} />
</div>
```

### 4. HVAC System
```jsx
<div className="pressure-compact-grid">
  <Gauges type="pressure-compact" label="Supply Air" operatingMode="intake" unit="inH₂O" {...} />
  <Gauges type="pressure-compact" label="Return Air" operatingMode="exhaust" unit="inH₂O" {...} />
  <Gauges type="pressure-compact" label="Filter ΔP" operatingMode="idle" unit="Pa" {...} />
</div>
```

## Advantages

### Space Efficiency
- **Fixed size**: Easy to calculate dashboard layouts
- **Compact**: 24,000px² vs 44,000px² (220×220 circular)
- **45% smaller** than equivalent circular gauge
- Fits 3 gauges in 640px width (vs 2 circular)

### Information Density
- **Value**: Large, easy-to-read number
- **Unit**: Clear label
- **Mode**: Visual icon + text label
- **Range**: Min/max displayed
- **Zones**: Color-coded segments
- **Status**: Pulsing indicator for active modes

### Self-Contained Design
- No external labels needed
- All info in SVG
- No overflow issues
- Perfect for grid layouts

### Mode Integration
- Operating mode built-in
- Color-coded by function
- Clear visual distinction
- Animated status indicators

## Theme Compatibility

Works with all themes:
- **Standard**: Light background, high contrast
- **Dark Night**: Dark background, adjusted colors
- **HMI Classic**: Industrial styling
- **HMI Future**: Neon-enhanced borders

Colors automatically adapt via CSS variables:
```css
var(--color-info)          /* Intake */
var(--color-warning)       /* Exhaust */
var(--color-textSecondary) /* Idle */
var(--color-border)        /* Borders */
var(--color-text)          /* Value */
var(--color-success/warning/danger) /* Zones */
```

## Performance

- **Lightweight**: Pure SVG, no canvas
- **Hardware-accelerated**: CSS transitions
- **No JavaScript animations**: Uses SVG `<animate>`
- **Minimal DOM**: Single SVG element
- **Fast updates**: Only bar width changes on value update

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ All modern mobile browsers

Requires SVG `<animate>` support (universal in modern browsers).

## Accessibility

- High contrast mode colors
- Text labels supplement icons
- Semantic structure (SVG groups)
- Keyboard accessible (via onClick)
- Screen reader friendly text elements

---

## Demo

See live demo at: **http://localhost:5174/gauges-demo**
- **Section 2.7**: "Compact Pressure Gauges (200×120px)"
- 6 examples with different operating modes
- Real-time value updates
- Grid layout demonstration
