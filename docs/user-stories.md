# User Stories

This document contains all user stories for the HMI system, managed by Business Analysts.

## Template for User Stories

### User Story: [ID]
**As a** [type of user],  
**I want** [some goal]  
**so that** [some reason].

- **Acceptance Criteria:**
  - [Criterion 1]
  - [Criterion 2]
- **Priority:** [High/Medium/Low]
- **Estimate:** [Story points or time]
- **Status:** [Backlog/Ready/In Progress/Done]
- **Notes:** [Additional details, dependencies]

## User Stories List

### US-001: User Login
**As a** system user,  
**I want** to log into the HMI system  
**so that** I can access authorized features.

- **Acceptance Criteria:**
  - User can enter username and password.
  - System validates credentials and grants access.
  - Invalid login shows error message.
- **Priority:** High
- **Status:** Done

### US-002: View Machine Status
**As an** operator,  
**I want** to view real-time machine status  
**so that** I can monitor operations.

- **Acceptance Criteria:**
  - Status indicators show current state.
  - Data updates automatically.
- **Priority:** High
- **Status:** In Progress

---

## Gauges Widget User Stories

### US-G001: View Temperature Gauge
**As an** operator,  
**I want** to see the current chamber temperature displayed on a visual gauge  
**so that** I can quickly assess if the temperature is within normal operating range.

- **Acceptance Criteria:**
  - Gauge displays current temperature value with unit (°C or °F)
  - Gauge shows min/max range clearly
  - Color zones indicate normal (green), warning (yellow), and critical (red) ranges
  - Needle/arc position accurately represents current value
  - Value updates in real-time (within 1 second of actual change)
- **Priority:** High
- **Estimate:** 5 story points
- **Status:** Backlog
- **Dependencies:** Backend temperature sensor API
- **Notes:** Critical for process control and safety monitoring

### US-G002: Monitor Multiple Process Parameters
**As an** operator,  
**I want** to view multiple gauges (temperature, pressure, RPM) simultaneously on one screen  
**so that** I can monitor overall process health at a glance.

- **Acceptance Criteria:**
  - Dashboard displays 3-6 gauges in a grid layout
  - Each gauge shows different parameter with appropriate units
  - All gauges update independently in real-time
  - Layout is responsive and readable on different screen sizes
  - Each gauge has clear label identifying the parameter
- **Priority:** High
- **Estimate:** 8 story points
- **Status:** Backlog
- **Dependencies:** US-G001, multiple sensor APIs
- **Notes:** Essential for comprehensive process monitoring

### US-G003: Receive Visual Threshold Alerts
**As an** operator,  
**I want** the gauge to change color when values exceed warning thresholds  
**so that** I can immediately notice potential issues without constantly watching numbers.

- **Acceptance Criteria:**
  - Gauge turns yellow when value enters warning zone (e.g., 75-90°C)
  - Gauge turns red when value enters critical zone (e.g., >90°C)
  - Color transitions are smooth and clearly visible
  - Current zone color is easily distinguishable
  - System logs threshold violations
- **Priority:** High
- **Estimate:** 3 story points
- **Status:** Backlog
- **Dependencies:** US-G001
- **Notes:** Critical safety feature

### US-G004: View Gauge Details on Click
**As an** operator,  
**I want** to click on a gauge to see detailed information  
**so that** I can access historical trends and precise measurements.

- **Acceptance Criteria:**
  - Clicking gauge opens detail panel or modal
  - Detail view shows: current value, min/max range, average, peak values
  - Historical trend chart is displayed (last 1 hour)
  - Close button returns to gauge view
  - Detail view updates in real-time
- **Priority:** Medium
- **Estimate:** 5 story points
- **Status:** Backlog
- **Dependencies:** US-G001, historical data API
- **Notes:** Enhancement for detailed analysis

### US-G005: Configure Gauge Thresholds
**As a** maintenance engineer,  
**I want** to configure warning and critical thresholds for each gauge  
**so that** alerts are relevant to specific equipment and processes.

- **Acceptance Criteria:**
  - Settings panel allows threshold configuration per gauge
  - Can set warning threshold value
  - Can set critical threshold value
  - Changes save and persist across sessions
  - Gauges immediately reflect new threshold zones
  - Validation prevents invalid threshold values (e.g., warning > critical)
- **Priority:** Medium
- **Estimate:** 8 story points
- **Status:** Backlog
- **Dependencies:** US-G001, configuration management system
- **Notes:** Required for flexible process control

### US-G006: View Pressure in Multiple Units
**As an** operator in different regions,  
**I want** to toggle gauge units (PSI/Bar/kPa for pressure)  
**so that** I can view measurements in my preferred unit system.

- **Acceptance Criteria:**
  - Unit selector available for applicable gauges
  - Common conversions supported (PSI/Bar/kPa, °C/°F, etc.)
  - Unit selection persists per user preference
  - Conversion is accurate and immediate
  - Min/max ranges adjust to selected unit
- **Priority:** Low
- **Estimate:** 5 story points
- **Status:** Backlog
- **Dependencies:** US-G001, user preferences system
- **Notes:** International deployment requirement

### US-G007: Monitor Motor Speed (RPM)
**As an** operator,  
**I want** to see motor speed displayed on a semi-circular gauge  
**so that** I can quickly verify motor operation within specified ranges.

- **Acceptance Criteria:**
  - Semi-circular gauge shows RPM from 0 to max speed
  - Current RPM displayed prominently in center
  - Different visual style from temperature/pressure gauges
  - Color zones indicate safe, caution, and over-speed ranges
  - Updates smoothly without jitter
- **Priority:** Medium
- **Estimate:** 3 story points
- **Status:** Backlog
- **Dependencies:** US-G001, motor controller API
- **Notes:** Required for motor-driven equipment

### US-G008: View Process Efficiency Percentage
**As a** production manager,  
**I want** to see overall equipment efficiency (OEE) on a percentage gauge  
**so that** I can track production performance targets.

- **Acceptance Criteria:**
  - Gauge shows 0-100% range
  - Color zones: red (0-60%), yellow (60-80%), green (80-100%)
  - Current efficiency percentage displayed clearly
  - Updates every 5 seconds with calculated OEE
  - Trend indicator shows if improving or declining
- **Priority:** Medium
- **Estimate:** 5 story points
- **Status:** Backlog
- **Dependencies:** US-G001, OEE calculation service
- **Notes:** KPI tracking for management

### US-G009: Receive Audio Alert on Critical Values
**As an** operator,  
**I want** to hear an audio alert when any gauge enters critical zone  
**so that** I am notified even when not actively looking at the screen.

- **Acceptance Criteria:**
  - Distinct sound plays when value enters critical zone
  - Different sound for warning vs critical levels
  - Alert can be acknowledged to stop sound
  - Sound respects system volume settings
  - Option to enable/disable audio alerts
- **Priority:** Medium
- **Estimate:** 3 story points
- **Status:** Backlog
- **Dependencies:** US-G003, audio notification system
- **Notes:** Accessibility and safety enhancement

### US-G010: View Gauge History and Trends
**As a** process engineer,  
**I want** to see historical gauge values over time  
**so that** I can analyze trends and optimize process parameters.

- **Acceptance Criteria:**
  - Historical view available for each gauge
  - Can select time range: 1 hour, 8 hours, 24 hours, 7 days
  - Line chart shows value trends over selected period
  - Min/max/average values displayed for period
  - Can export data to CSV
- **Priority:** Low
- **Estimate:** 8 story points
- **Status:** Backlog
- **Dependencies:** US-G001, historical data storage
- **Notes:** Advanced analytics feature

### US-G011: Customize Gauge Appearance
**As a** system administrator,  
**I want** to customize gauge size, colors, and style to match our facility theme  
**so that** the HMI integrates with our corporate branding.

- **Acceptance Criteria:**
  - Can adjust gauge size (small/medium/large)
  - Theme system integration for consistent colors
  - Custom color schemes for zones (if needed)
  - Changes apply across all gauges or individually
  - Preview available before applying changes
- **Priority:** Low
- **Estimate:** 5 story points
- **Status:** Backlog
- **Dependencies:** US-G001, theme management system
- **Notes:** Branding and customization requirement

### US-G012: Monitor Vacuum Level
**As an** operator,  
**I want** to monitor vacuum chamber pressure on an inverted gauge  
**so that** I can ensure proper vacuum levels for process quality.

- **Acceptance Criteria:**
  - Gauge supports negative pressure/vacuum display
  - Range from atmospheric (0) to high vacuum (e.g., -100 kPa)
  - Color zones configured for vacuum ranges
  - Clear indication of vacuum quality (rough/medium/high vacuum)
  - Updates in real-time with sensor data
- **Priority:** Medium
- **Estimate:** 3 story points
- **Status:** Backlog
- **Dependencies:** US-G001, vacuum sensor API
- **Notes:** Specific to vacuum processing equipment

[Add more user stories here...]