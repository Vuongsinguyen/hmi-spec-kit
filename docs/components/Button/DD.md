# Detailed Design: Button Component

## Props
- label (string): Button text
- onClick (function): Click handler
- type (primary | secondary | icon): Button style
- disabled (bool): Disable interaction
- icon (optional): Icon to display

## State
- Stateless (all via props)

## Events
- onClick: Called when button is pressed

## Error Handling
- Ignores clicks when disabled

## Test Cases
- Renders with label and icon
- Calls onClick when enabled
- Does not call onClick when disabled
