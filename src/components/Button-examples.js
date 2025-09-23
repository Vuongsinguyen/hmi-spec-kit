// Button Component Usage Examples
// This file demonstrates how to use the Button component with different variants

/*
Button Component Props:
- variant: 'dialog' | 'command' | 'action' (default: 'action')
- size: 'small' | 'medium' | 'large' (default: 'medium')
- label: string (required)
- onClick: function
- icon: string (emoji or icon)
- disabled: boolean (default: false)
- fullWidth: boolean (default: false)

Usage Examples:

// Dialog Buttons (for modals, confirmations)
<Button variant="dialog" label="Cancel" onClick={handleCancel} />
<Button variant="dialog" label="OK" onClick={handleConfirm} />

// Command Buttons (for actions, tools)
<Button variant="command" label="Save" icon="💾" onClick={handleSave} />
<Button variant="command" label="Export" icon="📤" onClick={handleExport} />

// Action Buttons (primary actions, CTAs)
<Button variant="action" label="Create New" icon="➕" onClick={handleCreate} />
<Button variant="action" label="Submit" size="large" onClick={handleSubmit} />

// With different sizes
<Button variant="action" size="small" label="Small" />
<Button variant="action" size="medium" label="Medium" />
<Button variant="action" size="large" label="Large" />

// Full width button
<Button variant="action" label="Full Width Button" fullWidth />

// Disabled state
<Button variant="action" label="Disabled" disabled />

// Loading state (add data-loading attribute to button element)
<button className="btn btn-action" data-loading>Loading...</button>
*/