# Detailed Design: Gauges Widget

## Props
- **value** (number, required): Current measurement value to display
- **min** (number, default: 0): Minimum value on gauge scale
- **max** (number, default: 100): Maximum value on gauge scale
- **unit** (string, default: ''): Unit of measurement (e.g., '°C', 'PSI', 'RPM', '%')
- **label** (string, required): Gauge label/title
- **type** (string, default: 'circular'): Gauge type - 'circular', 'semi-circular', 'arc'
- **size** (number, default: 200): Gauge diameter in pixels
- **zones** (array, optional): Color zone definitions
  ```javascript
  [
    { from: 0, to: 60, color: 'success' },    // Green zone
    { from: 60, to: 85, color: 'warning' },   // Yellow zone
    { from: 85, to: 100, color: 'danger' }    // Red zone
  ]
  ```
- **showValue** (boolean, default: true): Show numeric value in center
- **showZones** (boolean, default: true): Display colored zones
- **animated** (boolean, default: true): Animate needle/arc transitions
- **threshold** (object, optional): Alert threshold configuration
  ```javascript
  {
    warning: 75,
    critical: 90,
    onWarning: (value) => {},
    onCritical: (value) => {}
  }
  ```
- **precision** (number, default: 1): Decimal places for displayed value
- **refreshRate** (number, default: 1000): Update interval in milliseconds

## State
- **currentValue**: Tracks the current displayed value for animations
- **isWarning**: Boolean flag when value exceeds warning threshold
- **isCritical**: Boolean flag when value exceeds critical threshold
- **lastUpdate**: Timestamp of last value update

## Events
- **onClick**: Handler for gauge click interaction
  - Signature: `(value, label) => void`
  - Use case: Show detailed view or drill-down data

- **onThresholdExceeded**: Handler for threshold violations
  - Signature: `(type, value, threshold) => void`
  - Type: 'warning' | 'critical'
  - Use case: Trigger alarms or notifications

- **onValueChange**: Handler for value updates
  - Signature: `(newValue, oldValue) => void`
  - Use case: Logging or analytics

## Internal Logic

### Value Calculation
```javascript
// Calculate gauge angle based on value
const valueToAngle = (value) => {
  const percentage = (value - min) / (max - min);
  const startAngle = type === 'circular' ? -90 : -135;
  const totalAngle = type === 'circular' ? 360 : 270;
  return startAngle + (percentage * totalAngle);
};
```

### Zone Detection
```javascript
// Determine current zone based on value
const getCurrentZone = (value) => {
  return zones.find(zone => value >= zone.from && value < zone.to);
};
```

### Animation
- Use CSS transitions or requestAnimationFrame for smooth needle movement
- Transition duration: 300ms for value changes
- Easing function: ease-out for natural motion

## Theme Integration
- Uses CSS variables from ThemeContext:
  - `--color-success`: Green zone color
  - `--color-warning`: Yellow zone color
  - `--color-danger`: Red zone color
  - `--color-text`: Label and value text
  - `--color-surface`: Background
  - `--color-border`: Gauge border
  - `--font-family`: Typography

## Error Handling
- **Invalid value**: Clamp to min/max range, log warning
- **Missing required props**: Display error state with message
- **Backend connection lost**: Show last known value with stale indicator
- **NaN or undefined value**: Display '--' and error state
- **Zone configuration errors**: Fall back to single color, log error

## Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Semantic HTML with proper roles

## Performance Considerations
- Debounce rapid value updates (< 100ms)
- Use CSS transforms for animations (GPU acceleration)
- Memoize SVG path calculations
- Lazy load when not visible (Intersection Observer)

## Test Cases

### Display Tests
1. **Renders correctly with required props**
   - Given: value=50, min=0, max=100, label="Temperature"
   - Expected: Gauge displays with needle at 50% position

2. **Shows correct value and unit**
   - Given: value=75.5, unit="°C", precision=1
   - Expected: Center displays "75.5°C"

3. **Applies color zones correctly**
   - Given: value=65, zones=[{0-60: green}, {60-85: yellow}, {85-100: red}]
   - Expected: Gauge shows yellow zone color

### Behavior Tests
4. **Animates value changes**
   - Given: value changes from 30 to 70
   - Expected: Needle smoothly transitions over 300ms

5. **Triggers threshold callbacks**
   - Given: value crosses warning threshold (75)
   - Expected: onThresholdExceeded('warning', 75, 75) is called

6. **Clamps out-of-range values**
   - Given: value=150, min=0, max=100
   - Expected: Displays 100, logs warning

### Edge Cases
7. **Handles negative ranges**
   - Given: min=-50, max=50, value=-25
   - Expected: Displays correctly at 25% position

8. **Works with zero range**
   - Given: min=100, max=100, value=100
   - Expected: Shows full gauge, doesn't crash

9. **Theme changes apply immediately**
   - Given: Theme switches from light to dark
   - Expected: Colors update without re-render delay

### Integration Tests
10. **Updates from backend data**
    - Given: Real-time data stream sending values
    - Expected: Gauge reflects current values within refreshRate

11. **Multiple gauges on same page**
    - Given: 4 different gauges with different ranges
    - Expected: All render independently without conflicts

12. **Responsive sizing**
    - Given: Container width changes
    - Expected: Gauge scales proportionally
