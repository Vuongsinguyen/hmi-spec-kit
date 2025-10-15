# Use Cases and Diagrams - Gauges Widget

This document contains comprehensive use case scenarios and diagrams for the Gauges widget.

---

## Use Case Diagram (Text-based Representation)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Gauges Widget System                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ┌─────────────┐                                                │
│   │  Operator   │                                                │
│   └──────┬──────┘                                                │
│          │                                                        │
│          ├────► UC-G01: View Real-time Gauge Values              │
│          │                                                        │
│          ├────► UC-G02: Monitor Multiple Parameters              │
│          │                                                        │
│          ├────► UC-G03: Receive Visual Threshold Alerts          │
│          │                                                        │
│          ├────► UC-G04: View Gauge Details                       │
│          │                                                        │
│          └────► UC-G09: Acknowledge Audio Alerts                 │
│                                                                   │
│   ┌──────────────────┐                                           │
│   │ Process Engineer │                                           │
│   └────────┬─────────┘                                           │
│            │                                                      │
│            ├────► UC-G04: View Gauge Details                     │
│            │      (includes)                                     │
│            └────► UC-G10: Analyze Historical Trends              │
│                                                                   │
│   ┌──────────────────────┐                                       │
│   │ Maintenance Engineer │                                       │
│   └──────────┬───────────┘                                       │
│              │                                                    │
│              ├────► UC-G05: Configure Gauge Thresholds           │
│              │                                                    │
│              └────► UC-G06: Change Measurement Units             │
│                                                                   │
│   ┌───────────────────┐                                          │
│   │ Production Manager│                                          │
│   └─────────┬─────────┘                                          │
│             │                                                     │
│             └────► UC-G08: Monitor Process Efficiency            │
│                                                                   │
│   ┌────────────────────┐                                         │
│   │ System Administrator│                                        │
│   └──────────┬─────────┘                                         │
│              │                                                    │
│              └────► UC-G11: Customize Gauge Appearance           │
│                                                                   │
│                                                                   │
│   External Systems:                                              │
│   ┌────────────────┐                                             │
│   │  Backend API   │◄───── All Use Cases (Data Source)          │
│   └────────────────┘                                             │
│                                                                   │
│   ┌────────────────┐                                             │
│   │ Alarm System   │◄───── UC-G03, UC-G09                        │
│   └────────────────┘                                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Detailed Use Cases

### UC-G01: View Real-time Gauge Values

- **ID:** UC-G01
- **Actor:** Operator
- **Description:** Operator views current process parameter values displayed on visual gauges with color-coded zones
- **Preconditions:** 
  - System is logged in
  - Gauges are configured and connected to data sources
  - Backend sensors are operational
- **Main Success Scenario:**
  1. Operator navigates to monitoring dashboard/subpage
  2. System displays configured gauges (temperature, pressure, etc.)
  3. Each gauge shows:
     - Current numerical value with unit
     - Visual indicator (needle/arc) at correct position
     - Color zone corresponding to current value
  4. System updates gauge values in real-time (≤ 1 second latency)
  5. Operator observes values and confirms normal operation
- **Alternative Flows:**
  - **A1: Value in Warning Zone**
    - At step 3, if value is in warning zone (yellow)
    - System displays gauge in yellow/warning color
    - Operator takes note for monitoring
  - **A2: Value in Critical Zone**
    - At step 3, if value is in critical zone (red)
    - System displays gauge in red/critical color
    - Triggers UC-G03 (Visual Threshold Alerts)
- **Exception Flows:**
  - **E1: No Data Available**
    - At step 2, if backend connection is lost
    - System displays gauge with "No Data" indicator
    - Shows last known value with timestamp
    - Logs connection error
  - **E2: Invalid Data Received**
    - At step 3, if data is out of expected range or NaN
    - System clamps value to min/max range
    - Displays error indicator
    - Logs data validation error
- **Postconditions:** 
  - Operator has current awareness of process parameters
  - System continues updating values
- **Business Rules:** 
  - Update frequency must not exceed configured refresh rate
  - Values must be within configured min/max ranges
- **Non-Functional Requirements:** 
  - Performance: Render 6 gauges simultaneously without lag
  - Latency: < 1 second from sensor to display
  - Accuracy: Display precision as configured (0-3 decimal places)
- **Related User Stories:** US-G001, US-G002
- **Priority:** High
- **Status:** Approved

---

### UC-G02: Monitor Multiple Parameters

- **ID:** UC-G02
- **Actor:** Operator
- **Description:** Operator monitors multiple process parameters simultaneously on a dashboard with multiple gauges
- **Preconditions:** 
  - System is logged in
  - Dashboard is configured with 3-6 gauges
  - All data sources are available
- **Main Success Scenario:**
  1. Operator opens process monitoring dashboard
  2. System displays grid of gauges (e.g., 3 columns × 2 rows)
  3. Each gauge displays different parameter:
     - Temperature gauge (0-120°C)
     - Pressure gauge (0-30 PSI)
     - RPM gauge (0-5000 RPM)
     - Efficiency gauge (0-100%)
     - Vacuum gauge (0-1000 mTorr)
     - Flow rate gauge (0-100 L/min)
  4. All gauges update independently in real-time
  5. Operator scans all gauges and assesses overall process health
  6. Operator identifies any parameters approaching thresholds
- **Alternative Flows:**
  - **A1: Responsive Layout (Tablet)**
    - At step 2, if display width < 1024px
    - System arranges gauges in 2-column grid
    - Maintains readability and proportions
  - **A2: Responsive Layout (Mobile)**
    - At step 2, if display width < 768px
    - System stacks gauges in single column
    - User scrolls to view all gauges
- **Exception Flows:**
  - **E1: Partial Data Loss**
    - During step 4, if one sensor fails
    - Affected gauge displays "No Data"
    - Other gauges continue normal operation
    - Operator still has visibility of working sensors
- **Postconditions:** 
  - Operator has comprehensive view of process status
  - All parameters are within acceptable ranges or identified as issues
- **Business Rules:** 
  - Maximum 8 gauges per dashboard for optimal readability
  - Each gauge must have unique label
  - Grid layout adapts to screen size
- **Non-Functional Requirements:** 
  - Performance: 60 FPS rendering with 6 gauges updating
  - Responsiveness: Layout adapts within 200ms of resize
  - Accessibility: Keyboard navigation between gauges
- **Related User Stories:** US-G002
- **Priority:** High
- **Status:** Approved

---

### UC-G03: Receive Visual Threshold Alerts

- **ID:** UC-G03
- **Actor:** Operator
- **Description:** Operator receives immediate visual feedback when gauge values exceed configured thresholds
- **Preconditions:** 
  - Gauges are displayed and updating
  - Thresholds are configured (warning and critical)
  - Process is running
- **Main Success Scenario:**
  1. System monitors gauge values continuously
  2. Temperature value increases from 70°C to 78°C (enters warning zone: 75-90°C)
  3. System detects threshold crossing
  4. Gauge color transitions from green to yellow smoothly
  5. System logs threshold event: "Temperature entered WARNING zone at 78°C"
  6. Operator notices yellow gauge immediately
  7. Operator takes corrective action (reduce heat)
  8. Temperature decreases back to 72°C
  9. Gauge returns to green (normal) color
- **Alternative Flows:**
  - **A1: Critical Threshold Exceeded**
    - At step 2, value increases to 92°C (critical zone: >90°C)
    - Gauge turns red (critical color)
    - System triggers additional alerts:
      - Audio alert (if enabled) → leads to UC-G09
      - Alarm system notification
      - Event logged with HIGH severity
    - Gauge may flash or pulse to draw attention
  - **A2: Multiple Thresholds Simultaneously**
    - Multiple gauges exceed thresholds at same time
    - System prioritizes alerts by severity (critical > warning)
    - Each gauge displays appropriate color
    - Notification center shows list of all alerts
  - **A3: Rapid Oscillation**
    - Value oscillates around threshold (74°C ↔ 76°C)
    - System debounces alerts (minimum 5 seconds between transitions)
    - Prevents alert fatigue
- **Exception Flows:**
  - **E1: Alert System Unavailable**
    - At step 5, if logging service is down
    - Visual alert still displays on gauge
    - Event queued for logging when service recovers
- **Postconditions:** 
  - Threshold violation is visually indicated
  - Event is logged for audit trail
  - Operator is aware of condition
- **Business Rules:** 
  - Warning threshold < Critical threshold
  - Color transitions must be smooth (300ms)
  - Events logged with timestamp, value, and threshold crossed
- **Non-Functional Requirements:** 
  - Response time: Visual change within 100ms of threshold crossing
  - Color contrast: WCAG AAA compliant for accessibility
  - Event logging: 99.9% reliability
- **Related User Stories:** US-G003, US-G009
- **Priority:** High
- **Status:** Approved

---

### UC-G04: View Gauge Details

- **ID:** UC-G04
- **Actor:** Operator, Process Engineer
- **Description:** User clicks on a gauge to view detailed information including historical trends and statistics
- **Preconditions:** 
  - Gauge is displayed and operational
  - Historical data is available
  - User has permission to view details
- **Main Success Scenario:**
  1. User clicks on temperature gauge showing 75°C
  2. System opens detail modal (600px × 400px)
  3. Modal displays:
     - **Header:** "Chamber Temperature Details"
     - **Current Status:**
       - Current Value: 75.2°C
       - Min/Max Range: 0-120°C
       - Current Zone: Warning (Yellow)
     - **Statistics (Last 1 Hour):**
       - Average: 72.5°C
       - Minimum: 68.0°C
       - Maximum: 78.5°C
       - Standard Deviation: 3.2°C
     - **Trend Chart:**
       - Line chart showing last 1 hour
       - 5-minute interval data points
       - Threshold lines overlay (warning/critical)
       - Current time marker
  4. Chart updates in real-time with new data points
  5. User hovers over chart to see exact values
  6. User analyzes trend and makes decision
  7. User clicks close button or clicks outside modal
  8. Modal closes, returns to gauge view
- **Alternative Flows:**
  - **A1: Change Time Range**
    - At step 3, user selects different time range (8 hours, 24 hours, 7 days)
    - System fetches data for selected range
    - Chart updates with new data and appropriate intervals
    - Statistics recalculate for new range
  - **A2: Export Data**
    - At step 6, user clicks "Export CSV" button
    - System generates CSV file with timestamp, value columns
    - File downloads with name: "Temperature_2025-10-15_14-30.csv"
  - **A3: Compare Multiple Parameters**
    - At step 3, user selects "Add Parameter" option
    - Additional gauge data overlays on same chart
    - Dual Y-axis for different units
    - Legend shows all parameters
- **Exception Flows:**
  - **E1: Historical Data Unavailable**
    - At step 2, if historical database is down
    - Modal displays current status only
    - Message: "Historical data temporarily unavailable"
    - Chart shows empty state with message
  - **E2: Insufficient Permissions**
    - At step 1, if user role doesn't allow detail view
    - System shows tooltip: "Contact administrator for access"
    - Click has no effect
- **Postconditions:** 
  - User has detailed understanding of parameter behavior
  - User can make informed decisions
  - Data can be exported for further analysis
- **Business Rules:** 
  - Historical data retention: 30 days minimum
  - Chart must show at least 10 data points
  - Modal should be dismissible by ESC key
- **Non-Functional Requirements:** 
  - Load time: Modal appears within 500ms
  - Chart rendering: 60 FPS smooth scrolling/zooming
  - Data export: CSV generation within 2 seconds
- **Related User Stories:** US-G004, US-G010
- **Priority:** Medium
- **Status:** Approved

---

### UC-G05: Configure Gauge Thresholds

- **ID:** UC-G05
- **Actor:** Maintenance Engineer, System Administrator
- **Description:** Engineer configures warning and critical threshold values for gauges
- **Preconditions:** 
  - User is logged in with Engineer or Admin role
  - Gauge configuration interface is accessible
  - System is not in locked/production mode
- **Main Success Scenario:**
  1. Engineer opens Settings → Gauge Configuration
  2. System displays list of all configured gauges
  3. Engineer selects "Chamber Temperature" gauge
  4. System displays current configuration:
     - Current Warning Threshold: 75°C
     - Current Critical Threshold: 90°C
     - Min Value: 0°C
     - Max Value: 120°C
  5. Engineer changes values:
     - Warning Threshold: 80°C (new value)
     - Critical Threshold: 95°C (new value)
  6. System validates inputs:
     - Warning < Critical ✓
     - Both within Min/Max range ✓
     - Values are numeric ✓
  7. Engineer clicks "Save Changes"
  8. System displays confirmation dialog:
     - "Warning threshold: 75°C → 80°C"
     - "Critical threshold: 90°C → 95°C"
     - "Confirm changes?"
  9. Engineer confirms
  10. System saves configuration to backend
  11. All temperature gauges update zones immediately
  12. System logs change: "Thresholds updated by [engineer_id] at [timestamp]"
  13. Confirmation message: "Thresholds updated successfully"
- **Alternative Flows:**
  - **A1: Apply to Multiple Gauges**
    - At step 3, engineer selects multiple gauges (e.g., all temperature gauges)
    - Changes apply to all selected gauges
    - Bulk update confirmation required
  - **A2: Reset to Defaults**
    - At step 5, engineer clicks "Reset to Default"
    - System restores factory default thresholds
    - Confirmation required before applying
- **Exception Flows:**
  - **E1: Validation Failure**
    - At step 6, if Warning ≥ Critical
    - System displays error: "Warning threshold must be less than critical threshold"
    - Changes not saved, user can correct
  - **E2: Save Failure**
    - At step 10, if backend is unavailable
    - Error message: "Unable to save configuration. Please try again."
    - Changes not applied to gauges
    - User can retry or cancel
  - **E3: Insufficient Permissions**
    - At step 1, if user role is Operator
    - Settings page shows read-only view
    - Message: "Configuration requires Engineer privileges"
- **Postconditions:** 
  - Thresholds are updated in system
  - All affected gauges reflect new zones
  - Audit trail records configuration change
  - Users see new threshold behavior immediately
- **Business Rules:** 
  - Only users with Engineer or Admin role can modify thresholds
  - Warning threshold must be < Critical threshold
  - Thresholds must be within gauge min/max range
  - Changes require explicit confirmation
  - All configuration changes are audited
- **Non-Functional Requirements:** 
  - Save operation: < 2 seconds
  - Zone update: Immediate (< 100ms)
  - Audit log: 100% reliable
  - Concurrent edit protection: Last write wins with warning
- **Related User Stories:** US-G005
- **Priority:** Medium
- **Status:** Approved

---

### UC-G06: Change Measurement Units

- **ID:** UC-G06
- **Actor:** Operator, Engineer
- **Description:** User changes the display unit for pressure gauge from PSI to Bar
- **Preconditions:** 
  - Pressure gauge is displayed
  - Multiple units are supported for pressure
  - User preferences service is available
- **Main Success Scenario:**
  1. User views pressure gauge showing "22.5 PSI"
  2. User clicks on unit label "PSI" or gauge settings icon
  3. System displays unit selector dropdown:
     - ● PSI (currently selected)
     - ○ Bar
     - ○ kPa
     - ○ MPa
  4. User selects "Bar"
  5. System performs conversion: 22.5 PSI = 1.55 Bar
  6. Gauge updates immediately:
     - Value changes to "1.55 Bar"
     - Scale adjusts: 0-30 PSI → 0-2.07 Bar
     - Thresholds convert: Warning 20 PSI → 1.38 Bar
  7. System saves user preference: user_id → pressure_unit = "Bar"
  8. User sees all pressure gauges now display in Bar
- **Alternative Flows:**
  - **A1: Temperature Unit Change**
    - User changes temperature from °C to °F
    - 75°C converts to 167°F
    - Scale: 0-120°C → 32-248°F
    - Thresholds: 75°C → 167°F, 90°C → 194°F
  - **A2: Revert to Previous Unit**
    - User changes back to PSI
    - All values convert back correctly
    - Previous preference is overwritten
- **Exception Flows:**
  - **E1: Preference Save Failure**
    - At step 7, if user service is down
    - Unit change still applies to current session
    - Warning: "Unable to save preference"
    - Preference resets to default on next login
  - **E2: Conversion Error**
    - At step 5, if conversion function fails
    - Error logged to console
    - Gauge displays original unit
    - Error message: "Unable to convert units"
- **Postconditions:** 
  - Gauge displays in selected unit
  - User preference is saved
  - Future sessions use saved preference
  - All related gauges update consistently
- **Business Rules:** 
  - Conversions must be mathematically accurate
  - Precision maintained within 0.1%
  - All instances of same parameter type update together
  - Unit preferences are per-user, not global
- **Non-Functional Requirements:** 
  - Conversion time: < 50ms
  - UI update: Smooth transition (200ms)
  - Preference persistence: Across sessions and devices
- **Supported Conversions:**
  - **Pressure:** PSI ↔ Bar ↔ kPa ↔ MPa ↔ Torr
  - **Temperature:** °C ↔ °F ↔ K
  - **Speed:** RPM ↔ Hz ↔ rad/s
  - **Flow:** L/min ↔ gal/min ↔ m³/h
- **Related User Stories:** US-G006
- **Priority:** Low
- **Status:** Draft

---

### UC-G08: Monitor Process Efficiency

- **ID:** UC-G08
- **Actor:** Production Manager
- **Description:** Manager views OEE (Overall Equipment Efficiency) gauge to track production performance
- **Preconditions:** 
  - OEE calculation service is operational
  - Production data is being collected
  - Manager dashboard is accessible
- **Main Success Scenario:**
  1. Manager opens Production Dashboard
  2. System displays OEE gauge prominently
  3. Current OEE: 87.5%
  4. Gauge shows:
     - Red zone: 0-60% (Unacceptable)
     - Yellow zone: 60-80% (Needs Improvement)
     - Green zone: 80-100% (Target)
  5. Current position in green zone
  6. Trend indicator shows: ↑ (Improving)
  7. Tooltip displays breakdown:
     - Availability: 95% (Planned time vs actual running time)
     - Performance: 92% (Actual output vs maximum output)
     - Quality: 100% (Good units vs total units)
     - OEE = 0.95 × 0.92 × 1.00 = 87.4%
  8. Manager observes target is being met
  9. Gauge updates every 5 seconds with new calculation
- **Alternative Flows:**
  - **A1: Below Target Performance**
    - At step 3, OEE is 72% (yellow zone)
    - Manager clicks gauge to see details
    - Detail view shows which factor is low (e.g., Performance = 78%)
    - Manager investigates root cause
  - **A2: Critical Performance**
    - OEE drops to 55% (red zone)
    - Gauge color turns red
    - Alert notification sent to manager
    - Manager initiates corrective action
- **Exception Flows:**
  - **E1: Insufficient Data**
    - At step 2, if production just started
    - Gauge shows "Calculating... (Need 5 min of data)"
    - Partial data displayed with disclaimer
  - **E2: Calculation Service Down**
    - During step 9, if OEE service fails
    - Gauge shows last calculated value
    - Indicator: "OEE (Last: 14:25)" with stale timestamp
    - Manager is aware data is not current
- **Postconditions:** 
  - Manager has visibility into production efficiency
  - Performance metrics are tracked over time
  - Decisions can be made based on data
- **Business Rules:** 
  - OEE calculation: Availability × Performance × Quality
  - Update frequency: Every 5 seconds
  - Target zones configurable per facility
  - Historical OEE stored for reporting
- **Non-Functional Requirements:** 
  - Calculation accuracy: ±0.5%
  - Update latency: < 5 seconds
  - Historical data: 90 days retention
- **Related User Stories:** US-G008
- **Priority:** Medium
- **Status:** Approved

---

### UC-G09: Acknowledge Audio Alerts

- **ID:** UC-G09
- **Actor:** Operator
- **Description:** Operator acknowledges an audio alert triggered by critical gauge threshold
- **Preconditions:** 
  - Audio alerts are enabled
  - Browser has audio permission
  - Temperature gauge has exceeded critical threshold
- **Main Success Scenario:**
  1. Temperature reaches 92°C (critical threshold: 90°C)
  2. System triggers audio alert: 3 beeps (♪ ♪ ♪)
  3. Gauge flashes red to indicate alert state
  4. Audio repeats every 30 seconds
  5. Operator hears alert and looks at screen
  6. Operator identifies critical temperature gauge (flashing red)
  7. Operator clicks "Acknowledge Alert" button on gauge
  8. Audio alert stops immediately
  9. Gauge stops flashing but remains red (still in critical zone)
  10. System logs: "Critical temp alert acknowledged by [operator_id] at [timestamp]"
  11. Operator takes corrective action to reduce temperature
- **Alternative Flows:**
  - **A1: Keyboard Acknowledgment**
    - At step 7, operator presses ESC key
    - Same effect as clicking acknowledge button
  - **A2: Multiple Alerts**
    - Multiple gauges in critical state
    - Different alert sounds for different severity/types
    - Acknowledge button appears on each critical gauge
    - Operator must acknowledge each separately
  - **A3: Auto-Acknowledge on Resolution**
    - Temperature drops below critical threshold
    - Audio alert stops automatically
    - Visual alert (red color) transitions to warning or normal
    - System logs auto-resolution
- **Exception Flows:**
  - **E1: Audio Permission Denied**
    - At step 2, browser blocks audio
    - Visual alert still functions (flashing)
    - System displays: "Enable audio for alerts"
    - Operator still aware via visual cues
  - **E2: Operator Away from Station**
    - Operator doesn't acknowledge within 5 minutes
    - System escalates to supervisor
    - Alarm sent to mobile device (if configured)
    - Audio continues until acknowledged
- **Postconditions:** 
  - Audio alert is silenced
  - Operator is aware of critical condition
  - Acknowledgment is logged
  - Visual indicator remains until condition resolves
- **Business Rules:** 
  - Critical alerts require explicit acknowledgment
  - Warning alerts may auto-dismiss
  - Acknowledgment logged for compliance
  - Alerts cannot be permanently disabled for critical values
- **Non-Functional Requirements:** 
  - Audio latency: < 500ms from threshold crossing
  - Volume: Audible in industrial environment (configurable)
  - Accessibility: Visual equivalent for hearing-impaired users
- **Related User Stories:** US-G009, US-G003
- **Priority:** Medium
- **Status:** Approved

---

### UC-G10: Analyze Historical Trends

- **ID:** UC-G10
- **Actor:** Process Engineer
- **Description:** Engineer analyzes historical gauge data to optimize process parameters
- **Preconditions:** 
  - Historical data is stored (minimum 7 days)
  - User has Engineer role
  - Trend analysis tools are available
- **Main Success Scenario:**
  1. Engineer opens gauge detail view for Chamber Temperature
  2. Default view shows last 1 hour trend
  3. Engineer selects "7 Days" time range
  4. System retrieves historical data (2,016 data points at 5-min intervals)
  5. Chart displays weekly trend showing:
     - Daily temperature cycles
     - Weekend shutdown periods (flat lines)
     - Weekday operation patterns
  6. Engineer notices temperature spike on Oct 12, 14:00
  7. Engineer zooms into Oct 12, 13:00-15:00
  8. Chart shows detailed 2-hour view
  9. Engineer hovers over spike: "92.5°C at 14:23"
  10. Engineer clicks "Export Data" for Oct 12
  11. System generates CSV: "Temperature_2025-10-12.csv"
  12. Engineer downloads file for offline analysis
  13. Engineer identifies correlation with batch #1234
  14. Process parameters adjusted for future batches
- **Alternative Flows:**
  - **A1: Compare Multiple Parameters**
    - At step 3, engineer selects "Add Parameter"
    - Adds pressure gauge to same chart
    - Dual Y-axis chart displays both temperature and pressure
    - Engineer identifies correlation between parameters
    - Pressure drop coincides with temperature spike
  - **A2: Statistical Analysis**
    - At step 5, engineer clicks "Show Statistics"
    - System calculates and displays:
      - Mean: 73.2°C
      - Median: 72.8°C
      - Std Dev: 4.5°C
      - 95th Percentile: 81.5°C
      - Min: 65.0°C, Max: 92.5°C
    - Box plot overlay on chart
- **Exception Flows:**
  - **E1: Data Gap**
    - At step 5, data missing for Oct 13 (sensor failure)
    - Chart shows gap with dotted line
    - Annotation: "No data: Oct 13, 10:00-14:00"
    - Analysis continues with available data
  - **E2: Export Failure**
    - At step 11, if export service is down
    - Error: "Unable to export. Please try again."
    - Engineer can retry or use chart screenshot
- **Postconditions:** 
  - Engineer has insights into process behavior
  - Data exported for further analysis
  - Process optimization opportunities identified
  - Knowledge documented for team
- **Business Rules:** 
  - Historical data: 90-day retention minimum
  - Export format: CSV with timestamp, value, unit columns
  - Data aggregation for long ranges to manage performance
  - Annotations allowed for significant events
- **Non-Functional Requirements:** 
  - Chart load time: < 3 seconds for 7-day range
  - Zoom/pan: 60 FPS smooth interaction
  - Export size: Up to 100,000 rows
  - Concurrent users: Support 10 engineers analyzing simultaneously
- **Related User Stories:** US-G010
- **Priority:** Low
- **Status:** Draft

---

### UC-G11: Customize Gauge Appearance

- **ID:** UC-G11
- **Actor:** System Administrator
- **Description:** Administrator customizes gauge appearance to match corporate branding
- **Preconditions:** 
  - User has Administrator role
  - Theme editor is accessible
  - No active production processes (optional, based on policy)
- **Main Success Scenario:**
  1. Admin opens Settings → Appearance → Gauge Theme Editor
  2. System displays preview panel with sample gauges
  3. Admin selects "Create Custom Theme"
  4. Theme editor shows customization options:
     - **Size:** Small (150px), Medium (200px), Large (300px)
     - **Colors:**
       - Primary Color: #0066CC
       - Normal Zone: #28A745 (green)
       - Warning Zone: #FFC107 (yellow)
       - Critical Zone: #DC3545 (red)
       - Background: #FFFFFF
       - Text Color: #000000
     - **Fonts:**
       - Font Family: "Arial, sans-serif"
       - Value Font Size: 24px
       - Label Font Size: 14px
     - **Style:**
       - Border Width: 2px
       - Shadow: Enabled
       - Animation Speed: 300ms
  5. Admin changes values:
     - Primary Color: #FF6600 (company orange)
     - Normal Zone: #00AA00 (brighter green)
  6. Preview panel updates in real-time
  7. Admin reviews appearance on different gauge types
  8. Admin enters theme name: "Acme Corp Theme"
  9. Admin clicks "Save Theme"
  10. System saves theme configuration
  11. Admin selects "Apply to All Gauges"
  12. Confirmation: "Apply 'Acme Corp Theme' to all gauges? This will affect all users."
  13. Admin confirms
  14. All gauges across system update to new theme
  15. Success message: "Theme applied successfully"
- **Alternative Flows:**
  - **A1: Apply to Specific Gauges**
    - At step 11, admin selects "Apply to Selected Gauges"
    - Checklist shows all gauge instances
    - Admin selects temperature gauges only
    - Theme applies only to selected gauges
  - **A2: Import Theme**
    - At step 3, admin clicks "Import Theme"
    - Uploads JSON theme file
    - System validates and loads configuration
    - Preview displays imported theme
  - **A3: Export Theme**
    - After step 10, admin clicks "Export Theme"
    - System generates JSON: "acme-corp-theme.json"
    - File can be shared across facilities
- **Exception Flows:**
  - **E1: Invalid Color Value**
    - At step 5, if admin enters invalid hex code
    - Validation error: "Invalid color format. Use #RRGGBB"
    - Field highlighted in red
    - Changes not saved until corrected
  - **E2: Theme Conflict**
    - At step 14, if another admin modified theme simultaneously
    - Warning: "Theme was modified by another user. Reload?"
    - Admin can review changes or overwrite
- **Postconditions:** 
  - Custom theme is saved in system
  - Gauges display with new appearance
  - Theme is available for future use
  - Corporate branding is consistent
- **Business Rules:** 
  - Only Administrator role can create/modify themes
  - Color contrast must meet WCAG AA standards
  - Theme changes can be reverted
  - Default themes cannot be deleted
  - Version control for theme configurations
- **Non-Functional Requirements:** 
  - Preview update: Real-time (< 100ms)
  - Theme application: < 5 seconds for all gauges
  - Color validation: WCAG contrast ratio ≥ 4.5:1
  - Theme export: JSON format, human-readable
- **Related User Stories:** US-G011
- **Priority:** Low
- **Status:** Draft

---

## Scenario Flows

### Scenario 1: Normal Operations Monitoring

```
┌──────────┐
│  START   │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator logs in to system      │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Opens Process Monitoring Page   │
│ (UC-G02)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ 6 Gauges displayed:             │
│ • Temperature: 72°C (Green)     │
│ • Pressure: 18 PSI (Green)      │
│ • RPM: 3200 (Green)             │
│ • Efficiency: 85% (Green)       │
│ • Vacuum: 250 mTorr (Green)     │
│ • Flow: 45 L/min (Green)        │
│ (UC-G01)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ All values within normal range  │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator monitors periodically  │
│ Values update real-time         │
└────┬────────────────────────────┘
     │
     ▼
┌──────────┐
│   END    │
└──────────┘
```

### Scenario 2: Threshold Alert Response

```
┌──────────┐
│  START   │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────┐
│ System monitoring temperature   │
│ Current: 73°C (Normal)          │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Temperature increases to 78°C   │
│ Enters WARNING zone (75-90°C)   │
│ (UC-G03)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Gauge turns YELLOW              │
│ Event logged                    │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator notices yellow gauge   │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator clicks gauge           │
│ Opens detail view (UC-G04)      │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Reviews trend: Rising steadily  │
│ Max in last hour: 78°C          │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│ Decision: Take preventive action    │
│ Adjusts cooling system              │
└────┬────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Temperature decreases to 71°C   │
│ Returns to NORMAL zone          │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Gauge turns GREEN               │
│ Resolution logged               │
└────┬────────────────────────────┘
     │
     ▼
┌──────────┐
│   END    │
└──────────┘
```

### Scenario 3: Critical Alert with Audio

```
┌──────────┐
│  START   │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────┐
│ Temperature at 89°C (Warning)   │
│ Gauge is YELLOW                 │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Temperature spikes to 93°C      │
│ Exceeds CRITICAL (90°C)         │
│ (UC-G03)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Gauge turns RED and FLASHES     │
│ Audio alert: ♪ ♪ ♪ (3 beeps)   │
│ (UC-G09)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator hears alert            │
│ Immediately looks at screen     │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Identifies red flashing gauge   │
│ Temperature: 93°C (CRITICAL!)   │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator clicks "Acknowledge"   │
│ Audio stops, flashing stops     │
│ Gauge remains RED               │
│ (UC-G09)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator initiates emergency    │
│ cooling procedure               │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Temperature drops to 85°C       │
│ Still in WARNING zone           │
│ Gauge turns YELLOW              │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Continues cooling               │
│ Temperature reaches 72°C        │
│ Returns to NORMAL               │
│ Gauge turns GREEN               │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Operator documents incident     │
│ Reviews logs                    │
└────┬────────────────────────────┘
     │
     ▼
┌──────────┐
│   END    │
└──────────┘
```

### Scenario 4: Configuration Change

```
┌──────────┐
│  START   │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────┐
│ Engineer logs in                │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Opens Gauge Configuration       │
│ (UC-G05)                        │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Selects Chamber Temperature     │
│ Current thresholds:             │
│ • Warning: 75°C                 │
│ • Critical: 90°C                │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Changes to new recipe values:   │
│ • Warning: 80°C                 │
│ • Critical: 95°C                │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ System validates:               │
│ ✓ Warning < Critical            │
│ ✓ Within min/max range          │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Engineer confirms changes       │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ System saves configuration      │
│ Logs change with audit trail    │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ All temperature gauges update   │
│ New color zones applied         │
│ Immediate effect                │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│ Success confirmation displayed  │
└────┬────────────────────────────┘
     │
     ▼
┌──────────┐
│   END    │
└──────────┘
```

---

## Actor-System Interaction Matrix

| Use Case | Operator | Engineer | Manager | Admin | Backend API | Alarm System |
|----------|----------|----------|---------|-------|-------------|--------------|
| UC-G01   | Primary  | -        | -       | -     | Required    | -            |
| UC-G02   | Primary  | Secondary| -       | -     | Required    | -            |
| UC-G03   | Primary  | -        | -       | -     | Required    | Notified     |
| UC-G04   | Primary  | Primary  | -       | -     | Required    | -            |
| UC-G05   | -        | Primary  | -       | Primary| Required   | -            |
| UC-G06   | Primary  | Primary  | -       | -     | -           | -            |
| UC-G08   | Secondary| -        | Primary | -     | Required    | -            |
| UC-G09   | Primary  | -        | -       | -     | -           | Integrated   |
| UC-G10   | -        | Primary  | Secondary| -    | Required    | -            |
| UC-G11   | -        | -        | -       | Primary| Required   | -            |

---

*Document Version: 1.0*  
*Last Updated: October 15, 2025*  
*Author: Business Analysis Team*
