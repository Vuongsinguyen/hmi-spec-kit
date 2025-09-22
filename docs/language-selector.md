# Language Selector Component

The `LanguageSelector` component provides a dropdown to switch between different languages in the HMI application.

## Usage

Import and use the component in any React component:

```jsx
import { LanguageSelector } from '../../src/components/LanguageSelector';

function MyComponent() {
  return (
    <div>
      <LanguageSelector />
      {/* Your other content */}
    </div>
  );
}
```

## Features

- Supports 8 languages: English, Japanese, Traditional Chinese, Simplified Chinese, Vietnamese, Spanish, Korean, German
- Automatically updates all components using the `useLanguage` hook
- Persists language selection during the session
- Styled with clean, minimal design

## Using Translations in Components

To use translations in your components:

```jsx
import { useLanguage } from '../../src/context/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('nav.dashboard')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

## Available Translation Keys

### Common Keys
- `common.save`, `common.cancel`, `common.confirm`
- `common.loading`, `common.error`, `common.success`
- `common.language`, `common.role`, `common.status`
- `common.name`, `common.value`, `common.type`, `common.description`

### Navigation
- `nav.dashboard`, `nav.settings`, `nav.monitoring`
- `nav.operation`, `nav.maintenance`, `nav.alarm`, `nav.report`

### HMI Controls
- `hmi.start`, `hmi.stop`, `hmi.pause`, `hmi.resume`
- `hmi.reset`, `hmi.emergency`, `hmi.manual`, `hmi.auto`

## Adding New Languages or Keys

1. Add new language codes to `src/config/languages.json`
2. Add translations for all existing keys
3. Update the `languages` array in `LanguageSelector.jsx` if needed

## Positioning

Place the `LanguageSelector` component wherever you want in your layout. For example:

- Top-right corner for global access
- In a header/navigation bar
- In settings panels

The component will apply language changes to all components wrapped by the `LanguageProvider`.