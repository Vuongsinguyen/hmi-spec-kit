# Use Cases

This document contains all use cases for the HMI system, managed by Business Analysts.

## Template for Use Cases

### Use Case: [Title]
- **ID:** UC-001
- **Actor:** [Who performs the action, e.g., Operator, Admin]
- **Description:** [Brief overview]
- **Preconditions:** [What must be true before the use case starts]
- **Main Success Scenario:**
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Alternative Flows:**
  - [Alternative 1]: [Description]
- **Exception Flows:**
  - [Exception 1]: [Description]
- **Postconditions:** [What is true after successful completion]
- **Business Rules:** [Any constraints or rules]
- **Non-Functional Requirements:** [Performance, security, etc.]
- **Priority:** [High/Medium/Low]
- **Status:** [Draft/Approved/Implemented]

## Use Cases List

### UC-001: Login to System
- **Actor:** User
- **Description:** User logs into the HMI system.
- **Preconditions:** User has valid credentials.
- **Main Success Scenario:**
  1. User enters username and password.
  2. System validates credentials.
  3. User is granted access.
- **Priority:** High
- **Status:** Approved

---

## Gauges Widget Use Cases

> **Note:** Comprehensive use cases for Gauges widget are documented in [widgets/Gauges/use-cases.md](widgets/Gauges/use-cases.md)

### UC-G01: View Real-time Gauge Values
- **Actor:** Operator
- **Description:** Operator views current process parameter values on visual gauges
- **Priority:** High
- **Status:** Approved
- **Details:** See [Gauges Use Cases](widgets/Gauges/use-cases.md#uc-g01-view-real-time-gauge-values)

### UC-G02: Monitor Multiple Parameters
- **Actor:** Operator
- **Description:** Monitor multiple process parameters simultaneously on dashboard
- **Priority:** High
- **Status:** Approved
- **Details:** See [Gauges Use Cases](widgets/Gauges/use-cases.md#uc-g02-monitor-multiple-parameters)

### UC-G03: Receive Visual Threshold Alerts
- **Actor:** Operator
- **Description:** Receive visual feedback when values exceed thresholds
- **Priority:** High
- **Status:** Approved
- **Details:** See [Gauges Use Cases](widgets/Gauges/use-cases.md#uc-g03-receive-visual-threshold-alerts)

### UC-G04: View Gauge Details
- **Actor:** Operator, Process Engineer
- **Description:** View detailed information and historical trends
- **Priority:** Medium
- **Status:** Approved
- **Details:** See [Gauges Use Cases](widgets/Gauges/use-cases.md#uc-g04-view-gauge-details)

### UC-G05: Configure Gauge Thresholds
- **Actor:** Maintenance Engineer, System Administrator
- **Description:** Configure warning and critical threshold values
- **Priority:** Medium
- **Status:** Approved
- **Details:** See [Gauges Use Cases](widgets/Gauges/use-cases.md#uc-g05-configure-gauge-thresholds)

[Add more use cases here...]