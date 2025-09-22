# Dynamic Roles & Permissions

## Model
- Roles and permissions are defined in a config file (e.g., `src/config/roles.json`).
- Each role has a set of permissions (e.g., access/edit/view for subpages and widgets).
- Permissions are checked dynamically in both frontend and backend.

## Rules
- On login, assign user roles dynamically.
- Check permissions before rendering or enabling actions (edit/view/access) for subpages and widgets.
- Restrict API calls and UI elements based on user permissions.
- Permissions can be updated in the config file without code changes.

## Example Permissions
- `subpage:access`, `subpage:edit`, `subpage:view`
- `widget:access`, `widget:edit`, `widget:view`

## Example Usage
```jsx
function canEditSubpage(user) {
   return user.permissions.includes('subpage:edit');
}

function Subpage({ user }) {
   if (!user.permissions.includes('subpage:access')) return <div>No Access</div>;
   return (
      <div>
         {canEditSubpage(user) ? <button>Edit</button> : <span>View Only</span>}
         {/* ...subpage content... */}
      </div>
   );
}
```
# Documentation Standards

---
# UX/UI Standardization

## General Guidelines
- **Color:** Define primary, secondary, accent, and status colors. Use a consistent palette for all screens and components.
- **Size:** Standardize font sizes, spacing, margins, and paddings for readability and consistency.
- **Icon:** Use a unified icon set for actions, status, and navigation. Document icon usage and meaning.
- **Button:** Specify styles for primary, secondary, disabled, and icon buttons. Include size, color, and interaction states (hover, active, focus).
- **Table:** Standardize table layout, header style, row spacing, sorting/filtering controls, and empty state.
- **Scroll:** Define scroll behavior and appearance for long content, tables, and panels.
- **Header:** Consistent header layout, title placement, and action buttons.
- **Body:** Main content area guidelines, including layout, spacing, and grouping of widgets/components.
- **Footer:** Footer style, placement of status/info, and navigation links.

## Functional Areas
- **Monitoring:** UI standards for real-time data display, status indicators, alarms, and trends.
- **Operation:** Guidelines for control panels, action buttons, feedback, and safety confirmations.
- **Maintenance:** Layout and interaction for diagnostics, logs, and maintenance actions.
- **Settings:** Consistent design for configuration screens, forms, and validation feedback.
# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
[Describe the main user journey in plain language]

### Acceptance Scenarios
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

### Edge Cases
- What happens when [boundary condition]?
- How does system handle [error scenario]?
## Requirements *(mandatory)*

### Functional Requirements

*Example of marking unclear requirements:*

## Reference: HMI Machine Simulation SPEC

## UI Structure: Subpage, Widget, Component

---
# Documentation Standards

## High Level Design (HLD)
- Overview of purpose, responsibilities, and interactions for each Component and Widget.
- Architecture diagram or description.
- Key data flows and integration points.

## Detailed Design (DD)
- Internal logic, state management, and API interactions for each Component and Widget.
- Props, events, lifecycle, error handling.
- Test cases and edge scenarios.

## Common Information & Definitions

- **Component:** Reusable UI building block, encapsulates presentation and local logic.
- **Widget:** Functional unit composed of components, includes backend/API logic, represents a feature (e.g., device control).
- **Subpage:** Container for widgets, represents a logical section or page in the app.
- **CEM (Component Entity Model):** Hierarchical model for machine structure, defines relationships between units, modules, and equipment.
- **CEM Structure:** Organization of CEM entities (units, modules, equipment) and their IO mapping.
- **Unit in CEM:** Fundamental block in CEM, represents a physical or logical part of the machine.
- **Module in CEM:** Group of units, defines a subsystem or functional area.
- **Equipment in CEM:** Top-level entity, represents the whole machine or major assembly.
- **AI/AO/DI/DO:** Analog Input/Output, Digital Input/Output; types of IO devices in automation.
- **CI/CD:** Continuous Integration/Continuous Deployment; automated build, test, and deployment pipeline.
- **Integration:** Process of connecting components, widgets, backend, and external systems for seamless operation.

- **Component:** UI building block, reusable, may have local logic/state.
- **Widget:** Composed of components, includes backend/API logic, represents a functional unit (e.g., device control, dashboard card).
- **Subpage:** Container for widgets, represents a page or section in the app.

### Typical Hierarchy
Subpage → contains Widgets
Widget → built from Components, has its own logic (including backend/API calls)
Component → UI building block, may have local logic/state

### Summary
- Component = UI building block
- Widget = UI + backend logic, composed of components
- Subpage = container for widgets

## Architecture Overview
- **Backend:** C++
   - Handles business logic, device communication, and exposes APIs (REST/WebSocket) for frontend.
   - Provides mock data and simulation endpoints when real hardware is unavailable.
- **Frontend:** React + Three.js
   - UI for machine control and monitoring.
   - 3D visualization using Three.js to simulate machine state and actions.

## Simulation & Mocking
- **CEM Structure:**
   - Define Component Entity Model (CEM) for machine: modules, submodules, IO mapping.
- **Mock Data:**
   - **Parameters:** Simulate machine parameters (speed, temperature, etc.).
   - **IO Devices:**
      - DI (Digital Input), DO (Digital Output), AI (Analog Input), AO (Analog Output).
      - Provide mock states and values for each IO type.
- **3D Model:**
   - Use Three.js to visualize machine, animate based on mock data and simulated IO.

## Quality Control
- **Automated Testing:**
   - C++: Unit/integration tests (Google Test, Catch2).
   - React: UI/unit tests (Jest, React Testing Library).
- **Static Analysis:**
   - C++: clang-tidy, cppcheck.
   - React: ESLint, TypeScript.
- **CI/CD:**
   - Integrate automated build, test, and analysis for both backend and frontend.

## Development Notes
- No real machine required for initial development; all device interactions are simulated.
- API endpoints for mock data should be documented for frontend integration.
- 3D model should be modular to reflect CEM structure and IO changes.
### Key Entities *(include if feature involves data)*
- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---
