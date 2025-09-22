# Detailed Design: Table Component

## Props
- columns (array): Table columns
- data (array): Table data
- onSort (function): Sort handler
- onFilter (function): Filter handler

## State
- Current sort/filter state

## Events
- onSort, onFilter

## Error Handling
- Handles empty data gracefully

## Test Cases
- Renders headers and rows
- Sorts and filters data
- Shows empty state
